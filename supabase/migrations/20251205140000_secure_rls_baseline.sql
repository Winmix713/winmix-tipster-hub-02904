-- Secure RLS Baseline Migration
-- This migration establishes proper row-level security foundations

-- 1. Create user_profiles table for role-based access control
CREATE TABLE IF NOT EXISTS public.user_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('admin', 'analyst', 'viewer', 'demo')),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  CONSTRAINT unique_user_profile UNIQUE (user_id)
);

COMMENT ON TABLE public.user_profiles IS 'User profile information for role-based access control.';
COMMENT ON COLUMN public.user_profiles.role IS 'User role: admin (full access), analyst (read analytics + write experiments), viewer (read-only), demo (limited read-only)';
COMMENT ON COLUMN public.user_profiles.is_active IS 'Whether this user profile is active';

-- Index for fast role lookups
CREATE INDEX IF NOT EXISTS idx_user_profiles_user_id ON public.user_profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_user_profiles_role ON public.user_profiles(role);
CREATE INDEX IF NOT EXISTS idx_user_profiles_active ON public.user_profiles(is_active) WHERE is_active = true;

-- 2. Add created_by columns to user-owned tables that lack them
ALTER TABLE public.detected_patterns 
ADD COLUMN IF NOT EXISTS created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL;

ALTER TABLE public.team_patterns 
ADD COLUMN IF NOT EXISTS created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL;

-- Note: user_predictions already has user_id TEXT column, we'll add created_by UUID for consistency
ALTER TABLE public.user_predictions 
ADD COLUMN IF NOT EXISTS created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL;

-- 3. Create triggers for automatic created_by population
CREATE OR REPLACE FUNCTION public.set_created_by()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Set created_by to current user if not provided
  IF NEW.created_by IS NULL AND auth.uid() IS NOT NULL THEN
    NEW.created_by := auth.uid();
  END IF;
  RETURN NEW;
END;
$$;

-- Apply triggers to tables with created_by columns
CREATE TRIGGER trg_set_created_by_detected_patterns
  BEFORE INSERT OR UPDATE ON public.detected_patterns
  FOR EACH ROW EXECUTE FUNCTION public.set_created_by();

CREATE TRIGGER trg_set_created_by_team_patterns
  BEFORE INSERT OR UPDATE ON public.team_patterns
  FOR EACH ROW EXECUTE FUNCTION public.set_created_by();

CREATE TRIGGER trg_set_created_by_user_predictions
  BEFORE INSERT OR UPDATE ON public.user_predictions
  FOR EACH ROW EXECUTE FUNCTION public.set_created_by();

-- 4. Backfill existing data with service role ownership
-- For existing detected_patterns without created_by, set to NULL (service data)
UPDATE public.detected_patterns 
SET created_by = NULL 
WHERE created_by IS NULL;

-- For existing team_patterns without created_by, set to NULL (service data)
UPDATE public.team_patterns 
SET created_by = NULL 
WHERE created_by IS NULL;

-- For existing user_predictions, map user_id TEXT to created_by UUID if possible
-- This is a best-effort migration - in production this would need proper user mapping
UPDATE public.user_predictions 
SET created_by = NULL 
WHERE created_by IS NULL;

-- 5. Create security helper functions
CREATE OR REPLACE FUNCTION public.current_app_role()
RETURNS TEXT
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  user_role TEXT;
BEGIN
  -- Check if user is authenticated
  IF auth.uid() IS NULL THEN
    RETURN 'anonymous';
  END IF;
  
  -- Get user role from user_profiles
  SELECT role INTO user_role 
  FROM public.user_profiles 
  WHERE user_id = auth.uid() AND is_active = true;
  
  -- Return role or default to 'viewer'
  RETURN COALESCE(user_role, 'viewer');
END;
$$;

CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN public.current_app_role() = 'admin';
END;
$$;

CREATE OR REPLACE FUNCTION public.is_analyst()
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN public.current_app_role() IN ('admin', 'analyst');
END;
$$;

CREATE OR REPLACE FUNCTION public.is_service_role()
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Check if the current role is a service role (postgres, authenticated, service_role)
  RETURN current_setting('request.jwt.claims', true)::jsonb->>'role' IN ('service_role', 'postgres');
END;
$$;

-- 6. Enable RLS on user_profiles table
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_profiles FORCE ROW LEVEL SECURITY;

-- 7. Create policies for user_profiles table
-- Users can only see their own profile
CREATE POLICY "Users can view own profile" ON public.user_profiles
  FOR SELECT USING (auth.uid() = user_id);

-- Users can update their own profile (except role)
CREATE POLICY "Users can update own profile" ON public.user_profiles
  FOR UPDATE USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id AND role = OLD.role);

-- Only admins can insert new profiles
CREATE POLICY "Admins can insert profiles" ON public.user_profiles
  FOR INSERT WITH CHECK (public.is_admin());

-- Only admins can delete profiles
CREATE POLICY "Admins can delete profiles" ON public.user_profiles
  FOR DELETE USING (public.is_admin());

-- Admins can view all profiles
CREATE POLICY "Admins can view all profiles" ON public.user_profiles
  FOR SELECT USING (public.is_admin());

-- 8. Seed default user profiles
-- Create a demo user profile for testing
INSERT INTO public.user_profiles (user_id, role, is_active)
VALUES 
  ('00000000-0000-0000-0000-000000000000', 'demo', true),
  ('00000000-0000-0000-0000-000000000001', 'viewer', true),
  ('00000000-0000-0000-0000-000000000002', 'analyst', true),
  ('00000000-0000-0000-0000-000000000003', 'admin', true)
ON CONFLICT (user_id) DO NOTHING;

-- 9. Grant minimal privileges to service roles
-- Revoke default permissions from public
REVOKE ALL ON ALL TABLES IN SCHEMA public FROM public;
REVOKE ALL ON ALL SEQUENCES IN SCHEMA public FROM public;

-- Grant essential permissions to authenticated users
GRANT USAGE ON SCHEMA public TO authenticated;
GRANT SELECT ON ALL TABLES IN SCHEMA public TO authenticated;

-- Grant essential permissions to service role
GRANT USAGE ON SCHEMA public TO service_role;
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO service_role;

-- Grant sequence usage
GRANT USAGE ON ALL SEQUENCES IN SCHEMA public TO authenticated;
GRANT USAGE ON ALL SEQUENCES IN SCHEMA public TO service_role;

-- 10. Create updated_at trigger for user_profiles
CREATE OR REPLACE FUNCTION public.touch_user_profiles_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

CREATE TRIGGER trg_touch_user_profiles_updated_at
  BEFORE UPDATE ON public.user_profiles
  FOR EACH ROW EXECUTE FUNCTION public.touch_user_profiles_updated_at();