# WinMix TipsterHub - Vite to Next.js Migration Guide

## Executive Summary

This document provides a comprehensive, step-by-step guide for migrating the WinMix TipsterHub application from Vite + React Router to Next.js 15 with App Router.

**Migration Complexity:** High  
**Estimated Time:** 40-60 hours  
**Risk Level:** Medium-High  
**Recommended Approach:** Incremental migration with parallel testing

---

## Table of Contents

1. [Why Migrate to Next.js?](#1-why-migrate-to-nextjs)
2. [Pre-Migration Preparation](#2-pre-migration-preparation)
3. [Migration Phases](#3-migration-phases)
4. [Detailed Step-by-Step Guide](#4-detailed-step-by-step-guide)
5. [Code Transformation Examples](#5-code-transformation-examples)
6. [Testing Strategy](#6-testing-strategy)
7. [Rollback Plan](#7-rollback-plan)
8. [Post-Migration Optimization](#8-post-migration-optimization)

---

## 1. Why Migrate to Next.js?

### Benefits of Next.js 15

#### Performance
- **Server-Side Rendering (SSR):** Faster initial page loads
- **Static Site Generation (SSG):** Pre-rendered pages for better SEO
- **Automatic Code Splitting:** Smaller bundle sizes
- **Image Optimization:** Built-in next/image component
- **Font Optimization:** Automatic font loading optimization

#### Developer Experience
- **File-based Routing:** No manual route configuration
- **API Routes:** Built-in backend API support
- **Server Components:** Reduce client-side JavaScript
- **Server Actions:** Type-safe server mutations
- **Built-in TypeScript:** Better type inference

#### Production Features
- **Edge Runtime:** Deploy to edge for lower latency
- **Middleware:** Request/response manipulation
- **ISR (Incremental Static Regeneration):** Update static pages without rebuild
- **Analytics:** Built-in performance monitoring
- **Security:** Better CSRF protection, secure headers

#### Supabase Integration
- **SSR-Safe Auth:** Proper cookie-based sessions
- **Server/Client Separation:** Secure API key management
- **Row Level Security:** Better database security
- **Edge Functions:** Serverless backend logic

### Current Vite Limitations

1. **No SSR:** Client-side only rendering
2. **Manual Routing:** React Router configuration overhead
3. **No API Layer:** All logic in frontend
4. **No Middleware:** Can't intercept requests
5. **Limited SEO:** Client-side rendering hurts SEO
6. **No Server Components:** Larger client bundles

---

## 2. Pre-Migration Preparation

### Phase 0: Audit and Backup (2-4 hours)

#### Step 0.1: Create Full Backup
\`\`\`bash
# Create a new branch for migration
git checkout -b migration/vite-to-nextjs

# Tag current state
git tag pre-migration-backup

# Create backup of critical files
mkdir -p migration-backup
cp -r src migration-backup/
cp -r public migration-backup/
cp package.json migration-backup/
cp vite.config.ts migration-backup/
\`\`\`

#### Step 0.2: Document Current State
\`\`\`bash
# List all routes
grep -r "path=" src/App.tsx > migration-backup/routes.txt

# List all environment variables
grep -r "import.meta.env" src/ > migration-backup/env-vars.txt

# List all components
find src/components -name "*.tsx" > migration-backup/components.txt

# List all pages
find src/pages -name "*.tsx" > migration-backup/pages.txt
\`\`\`

#### Step 0.3: Identify Dependencies
\`\`\`bash
# Check for Vite-specific dependencies
npm list | grep vite

# Check for React Router dependencies
npm list | grep react-router

# Check for environment variable usage
grep -r "import.meta.env" src/
\`\`\`

#### Step 0.4: Create Migration Checklist

**Routes to Migrate:**
- [ ] `/` → `app/page.tsx`
- [ ] `/predictions` → `app/predictions/page.tsx`
- [ ] `/predictions/new` → `app/predictions/new/page.tsx`
- [ ] `/dashboard` → `app/dashboard/page.tsx`
- [ ] `/analytics` → `app/analytics/page.tsx`
- [ ] `/monitoring` → `app/monitoring/page.tsx`
- [ ] `/models` → `app/models/page.tsx`
- [ ] `/crossleague` → `app/crossleague/page.tsx`
- [ ] `/match/:id` → `app/match/[id]/page.tsx`
- [ ] `/teams` → `app/teams/page.tsx`
- [ ] `/teams/:teamName` → `app/teams/[teamName]/page.tsx`
- [ ] `/matches` → `app/matches/page.tsx`
- [ ] `/leagues` → `app/leagues/page.tsx`
- [ ] `/jobs` → `app/jobs/page.tsx`
- [ ] `/phase9` → `app/phase9/page.tsx`
- [ ] `*` (404) → `app/not-found.tsx`

**Components to Migrate:**
- [ ] All `/src/components/` → `/components/`
- [ ] All `/src/components/ui/` → `/components/ui/`
- [ ] Phase 9 components
- [ ] Dashboard components
- [ ] Monitoring components

**Integrations to Update:**
- [ ] Supabase client (SSR-safe)
- [ ] Environment variables (VITE_ → NEXT_PUBLIC_)
- [ ] API services (move to API routes)

---

## 3. Migration Phases

### Overview

\`\`\`
Phase 1: Setup Next.js (4-6 hours)
    ↓
Phase 2: Migrate Core Structure (6-8 hours)
    ↓
Phase 3: Migrate Components (8-12 hours)
    ↓
Phase 4: Migrate Pages & Routing (8-12 hours)
    ↓
Phase 5: Migrate API Logic (6-8 hours)
    ↓
Phase 6: Update Supabase Integration (4-6 hours)
    ↓
Phase 7: Testing & Optimization (6-8 hours)
    ↓
Phase 8: Deployment (2-4 hours)
\`\`\`

---

## 4. Detailed Step-by-Step Guide

### Phase 1: Setup Next.js (4-6 hours)

#### Step 1.1: Install Next.js Dependencies

\`\`\`bash
# Remove Vite dependencies
npm uninstall vite @vitejs/plugin-react-swc vite-tsconfig-paths

# Remove React Router
npm uninstall react-router-dom

# Install Next.js
npm install next@latest react@latest react-dom@latest

# Install Next.js TypeScript types
npm install -D @types/node
\`\`\`

#### Step 1.2: Update package.json Scripts

\`\`\`json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "type-check": "tsc --noEmit"
  }
}
\`\`\`

#### Step 1.3: Create Next.js Configuration

\`\`\`typescript
// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['lovable.dev'], // Add your image domains
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },
};

export default nextConfig;
\`\`\`

#### Step 1.4: Update TypeScript Configuration

\`\`\`json
// tsconfig.json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
\`\`\`

#### Step 1.5: Create App Directory Structure

\`\`\`bash
# Create Next.js app directory
mkdir -p app

# Create API routes directory
mkdir -p app/api

# Keep components at root level
# (already exists as /components)

# Create public directory structure
# (already exists)
\`\`\`

#### Step 1.6: Remove Vite-Specific Files

\`\`\`bash
# Remove Vite config
rm vite.config.ts

# Remove index.html (Next.js generates this)
rm index.html

# Remove Vite-specific files
rm -rf src/main.tsx
\`\`\`

---

### Phase 2: Migrate Core Structure (6-8 hours)

#### Step 2.1: Create Root Layout

\`\`\`typescript
// app/layout.tsx
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { Providers } from '@/components/providers';
import './globals.css';

const geistSans = Geist({ 
  subsets: ['latin'],
  variable: '--font-geist-sans',
});

const geistMono = Geist_Mono({ 
  subsets: ['latin'],
  variable: '--font-geist-mono',
});

export const metadata: Metadata = {
  title: 'WINMIX TIPSTER',
  description: 'Tippelj mérkőzésekre, elemezz és szerezz előnyt a WINMIX TIPSTER-rel.',
  openGraph: {
    title: 'WINMIX TIPSTER - Sport Tippelési Platform',
    description: 'Tippelj mérkőzésekre, versenyezz ranglistákon és nyerj jutalmakat',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="hu" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
\`\`\`

#### Step 2.2: Create Providers Component

\`\`\`typescript
// components/providers.tsx
'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from 'next-themes';
import { Toaster } from '@/components/ui/toaster';
import { Toaster as Sonner } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { useState } from 'react';

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000, // 1 minute
        refetchOnWindowFocus: false,
      },
    },
  }));

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem
        disableTransitionOnChange
      >
        <TooltipProvider>
          {children}
          <Toaster />
          <Sonner />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
\`\`\`

#### Step 2.3: Migrate Global Styles

\`\`\`css
/* app/globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Copy all content from src/index.css */
/* Keep all CSS variables and custom utilities */

@layer base {
  :root {
    --background: 11 11% 6%;
    --foreground: 210 40% 98%;
    /* ... rest of CSS variables ... */
  }
}

@layer base {
  * {
    @apply border-border;
  }

  body {
    @apply bg-black text-foreground antialiased selection:bg-primary/20 selection:text-primary;
    font-family: var(--font-geist-sans), Inter, system-ui, sans-serif;
  }
}

@layer utilities {
  .glass-card {
    @apply bg-white/5 backdrop-blur-xl border border-white/10;
  }
  
  /* ... rest of utilities ... */
}
\`\`\`

#### Step 2.4: Update Environment Variables

\`\`\`bash
# Create .env.local
touch .env.local

# Create .env.example
touch .env.example
\`\`\`

\`\`\`bash
# .env.example
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Odds API
ODDS_API_KEY=your_odds_api_key
ODDS_API_BASE_URL=https://api.the-odds-api.com/v4

# Feature Flags
NEXT_PUBLIC_PHASE9_ENABLED=true

# Analytics (optional)
NEXT_PUBLIC_VERCEL_ANALYTICS_ID=your_analytics_id
\`\`\`

**Important Changes:**
- `VITE_` prefix → `NEXT_PUBLIC_` for client-side variables
- Server-only variables (like `SUPABASE_SERVICE_ROLE_KEY`) have no prefix

#### Step 2.5: Update Import Paths

\`\`\`bash
# Find all imports using @/ alias
grep -r "from '@/" src/

# These should work as-is in Next.js
# But verify tsconfig.json paths configuration
\`\`\`

---

### Phase 3: Migrate Components (8-12 hours)

#### Step 3.1: Move Components to Root

\`\`\`bash
# Components are already at root level in /components
# But we need to move src/components to root

# Copy src/components to root (merge with existing)
cp -r src/components/* components/

# Remove src/components
rm -rf src/components
\`\`\`

#### Step 3.2: Mark Client Components

**Rule:** Any component using hooks, event handlers, or browser APIs needs `'use client'`

\`\`\`typescript
// components/Header.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation'; // Changed from react-router-dom

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  // ... rest of component
}
\`\`\`

**Components that need 'use client':**
- All components using `useState`, `useEffect`, `useContext`
- All components with event handlers (`onClick`, `onChange`, etc.)
- All components using browser APIs (`localStorage`, `window`, etc.)
- All components using React Router hooks

#### Step 3.3: Update Navigation Components

**Before (React Router):**
\`\`\`typescript
import { Link, useNavigate } from 'react-router-dom';

function Navigation() {
  const navigate = useNavigate();
  
  return (
    <Link to="/dashboard">Dashboard</Link>
    <button onClick={() => navigate('/predictions')}>
      Go to Predictions
    </button>
  );
}
\`\`\`

**After (Next.js):**
\`\`\`typescript
'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

function Navigation() {
  const router = useRouter();
  
  return (
    <Link href="/dashboard">Dashboard</Link>
    <button onClick={() => router.push('/predictions')}>
      Go to Predictions
    </button>
  );
}
\`\`\`

#### Step 3.4: Update Sidebar Component

\`\`\`typescript
// components/Sidebar.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, BarChart, Brain } from 'lucide-react';

export function Sidebar() {
  const pathname = usePathname();
  
  const isActive = (path: string) => pathname === path;
  
  return (
    <aside className="fixed left-0 top-0 h-screen w-[84px]">
      <nav>
        <Link 
          href="/" 
          className={isActive('/') ? 'active' : ''}
        >
          <Home />
        </Link>
        {/* ... rest of links ... */}
      </nav>
    </aside>
  );
}
\`\`\`

#### Step 3.5: Update All Components with Router Dependencies

**Files to update:**
- `components/Sidebar.tsx`
- `components/TopBar.tsx`
- `components/Header.tsx`
- Any component using `useNavigate()` or `<Link>`

**Search and replace:**
\`\`\`bash
# Find all React Router imports
grep -r "from 'react-router-dom'" components/

# Replace manually:
# useNavigate → useRouter (from 'next/navigation')
# Link (react-router) → Link (from 'next/link')
# useLocation → usePathname (from 'next/navigation')
# useParams → useParams (from 'next/navigation') - same name!
\`\`\`

---

### Phase 4: Migrate Pages & Routing (8-12 hours)

#### Step 4.1: Create Home Page

\`\`\`typescript
// app/page.tsx
import { Sidebar } from '@/components/Sidebar';
import { TopBar } from '@/components/TopBar';
import { HeroSection } from '@/components/HeroSection';
import { Footer } from '@/components/Footer';
import { CallToAction } from '@/components/CallToAction';

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Sidebar />
      <TopBar />
      <main className="relative">
        <HeroSection />
        <CallToAction />
      </main>
      <Footer />
    </div>
  );
}
\`\`\`

**Note:** This is a Server Component by default (no 'use client')

#### Step 4.2: Create Layout for Dashboard Pages

\`\`\`typescript
// app/(dashboard)/layout.tsx
import { Sidebar } from '@/components/Sidebar';
import { TopBar } from '@/components/TopBar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      <Sidebar />
      <TopBar />
      <main className="ml-0 md:ml-[84px] pt-16">
        {children}
      </main>
    </div>
  );
}
\`\`\`

#### Step 4.3: Migrate All Pages

**Pattern for each page:**

1. Create directory: `app/[route]/page.tsx`
2. Copy page content from `src/pages/[Route].tsx`
3. Remove React Router imports
4. Add 'use client' if needed
5. Update imports to use @/ alias

**Example: Dashboard Page**

\`\`\`typescript
// app/(dashboard)/dashboard/page.tsx
'use client';

import { StatisticsCards } from '@/components/dashboard/StatisticsCards';
import { RecentPredictions } from '@/components/dashboard/RecentPredictions';
import { PatternPerformanceChart } from '@/components/dashboard/PatternPerformanceChart';

export default function DashboardPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
      <StatisticsCards />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        <RecentPredictions />
        <PatternPerformanceChart />
      </div>
    </div>
  );
}
\`\`\`

**Example: Dynamic Route (Match Detail)**

\`\`\`typescript
// app/(dashboard)/match/[id]/page.tsx
'use client';

import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase/client';

export default function MatchDetailPage() {
  const params = useParams();
  const matchId = params.id as string;
  
  const { data: match, isLoading } = useQuery({
    queryKey: ['match', matchId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('matches')
        .select('*')
        .eq('id', matchId)
        .single();
      
      if (error) throw error;
      return data;
    },
  });
  
  if (isLoading) return <div>Loading...</div>;
  
  return (
    <div className="container mx-auto py-8">
      <h1>{match?.home_team} vs {match?.away_team}</h1>
      {/* ... rest of component ... */}
    </div>
  );
}
\`\`\`

#### Step 4.4: Create 404 Page

\`\`\`typescript
// app/not-found.tsx
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <p className="text-xl mb-8">Oldal nem található</p>
        <Button asChild>
          <Link href="/">Vissza a főoldalra</Link>
        </Button>
      </div>
    </div>
  );
}
\`\`\`

#### Step 4.5: Page Migration Checklist

**Complete this for each page:**

- [ ] `/` → `app/page.tsx`
- [ ] `/predictions` → `app/(dashboard)/predictions/page.tsx`
- [ ] `/predictions/new` → `app/(dashboard)/predictions/new/page.tsx`
- [ ] `/dashboard` → `app/(dashboard)/dashboard/page.tsx`
- [ ] `/analytics` → `app/(dashboard)/analytics/page.tsx`
- [ ] `/monitoring` → `app/(dashboard)/monitoring/page.tsx`
- [ ] `/models` → `app/(dashboard)/models/page.tsx`
- [ ] `/crossleague` → `app/(dashboard)/crossleague/page.tsx`
- [ ] `/match/:id` → `app/(dashboard)/match/[id]/page.tsx`
- [ ] `/teams` → `app/(dashboard)/teams/page.tsx`
- [ ] `/teams/:teamName` → `app/(dashboard)/teams/[teamName]/page.tsx`
- [ ] `/matches` → `app/(dashboard)/matches/page.tsx`
- [ ] `/leagues` → `app/(dashboard)/leagues/page.tsx`
- [ ] `/jobs` → `app/(dashboard)/jobs/page.tsx`
- [ ] `/phase9` → `app/(dashboard)/phase9/page.tsx`

---

### Phase 5: Migrate API Logic (6-8 hours)

#### Step 5.1: Create API Route Structure

\`\`\`bash
# Create API directories
mkdir -p app/api/phase9/collaborative-intelligence
mkdir -p app/api/phase9/market-integration
mkdir -p app/api/phase9/temporal-decay
mkdir -p app/api/phase9/self-improving
\`\`\`

#### Step 5.2: Create Collaborative Intelligence API

\`\`\`typescript
// app/api/phase9/collaborative-intelligence/submit-prediction/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase/server';
import { z } from 'zod';

const PredictionSchema = z.object({
  match_id: z.string().uuid(),
  predicted_outcome: z.enum(['home_win', 'draw', 'away_win']),
  confidence_score: z.number().min(0).max(100),
  predicted_score: z.object({
    home: z.number().int().min(0),
    away: z.number().int().min(0),
  }).optional(),
  reasoning: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const supabase = createServerClient();
    
    // Get user from session
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    // Parse and validate request body
    const body = await request.json();
    const prediction = PredictionSchema.parse(body);
    
    // Insert prediction
    const { data, error } = await supabase
      .from('user_predictions')
      .insert({
        ...prediction,
        user_id: user.id,
      })
      .select()
      .single();
    
    if (error) throw error;
    
    // Update crowd wisdom (background task)
    await supabase.rpc('update_crowd_wisdom', {
      p_match_id: prediction.match_id,
    });
    
    return NextResponse.json({
      success: true,
      prediction: data,
    });
  } catch (error) {
    console.error('Error submitting prediction:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid request data', details: error.errors },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
\`\`\`

#### Step 5.3: Create Market Integration API

\`\`\`typescript
// app/api/phase9/market-integration/fetch-odds/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase/server';

const ODDS_API_KEY = process.env.ODDS_API_KEY;
const ODDS_API_BASE_URL = process.env.ODDS_API_BASE_URL;

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const matchId = searchParams.get('matchId');
    
    if (!matchId) {
      return NextResponse.json(
        { error: 'matchId is required' },
        { status: 400 }
      );
    }
    
    if (!ODDS_API_KEY) {
      return NextResponse.json(
        { error: 'Odds API not configured' },
        { status: 503 }
      );
    }
    
    const supabase = createServerClient();
    
    // Fetch odds from external API
    const oddsResponse = await fetch(
      `${ODDS_API_BASE_URL}/sports/soccer/odds?apiKey=${ODDS_API_KEY}`,
      {
        next: { revalidate: 300 }, // Cache for 5 minutes
      }
    );
    
    if (!oddsResponse.ok) {
      throw new Error('Failed to fetch odds');
    }
    
    const oddsData = await oddsResponse.json();
    
    // Store odds in database
    const { data, error } = await supabase
      .from('market_odds')
      .upsert({
        match_id: matchId,
        odds_data: oddsData,
        last_updated: new Date().toISOString(),
      })
      .select();
    
    if (error) throw error;
    
    return NextResponse.json({
      success: true,
      odds: data,
    });
  } catch (error) {
    console.error('Error fetching odds:', error);
    return NextResponse.json(
      { error: 'Failed to fetch odds' },
      { status: 500 }
    );
  }
}
\`\`\`

#### Step 5.4: Create Server Actions for Mutations

\`\`\`typescript
// lib/actions/predictions.ts
'use server';

import { createServerClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

const PredictionSchema = z.object({
  match_id: z.string().uuid(),
  predicted_outcome: z.enum(['home_win', 'draw', 'away_win']),
  confidence_score: z.number().min(0).max(100),
});

export async function submitPrediction(formData: FormData) {
  try {
    const supabase = createServerClient();
    
    // Get user
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return { error: 'Unauthorized' };
    }
    
    // Parse form data
    const rawData = {
      match_id: formData.get('match_id'),
      predicted_outcome: formData.get('predicted_outcome'),
      confidence_score: Number(formData.get('confidence_score')),
    };
    
    const prediction = PredictionSchema.parse(rawData);
    
    // Insert prediction
    const { data, error } = await supabase
      .from('user_predictions')
      .insert({
        ...prediction,
        user_id: user.id,
      })
      .select()
      .single();
    
    if (error) throw error;
    
    // Revalidate predictions page
    revalidatePath('/predictions');
    
    return { success: true, prediction: data };
  } catch (error) {
    console.error('Error submitting prediction:', error);
    return { error: 'Failed to submit prediction' };
  }
}
\`\`\`

#### Step 5.5: Move Business Logic to Server

**Before (Client-side):**
\`\`\`typescript
// src/lib/phase9-api.ts
export class CollaborativeIntelligenceService {
  static async submitUserPrediction(prediction: UserPredictionForm) {
    // Direct Supabase call from client
    const { data, error } = await supabase
      .from('user_predictions')
      .insert(prediction);
    // ...
  }
}
\`\`\`

**After (Server-side):**
\`\`\`typescript
// lib/services/collaborative-intelligence.ts
import { createServerClient } from '@/lib/supabase/server';

export class CollaborativeIntelligenceService {
  static async submitUserPrediction(
    prediction: UserPredictionForm,
    userId: string
  ) {
    const supabase = createServerClient();
    
    const { data, error } = await supabase
      .from('user_predictions')
      .insert({
        ...prediction,
        user_id: userId,
      });
    
    if (error) throw error;
    return data;
  }
}
\`\`\`

---

### Phase 6: Update Supabase Integration (4-6 hours)

#### Step 6.1: Create Server Supabase Client

\`\`\`typescript
// lib/supabase/server.ts
import { createServerClient as createClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export function createServerClient() {
  const cookieStore = cookies();
  
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: any) {
          try {
            cookieStore.set({ name, value, ...options });
          } catch (error) {
            // Handle cookie setting errors
          }
        },
        remove(name: string, options: any) {
          try {
            cookieStore.set({ name, value: '', ...options });
          } catch (error) {
            // Handle cookie removal errors
          }
        },
      },
    }
  );
}
\`\`\`

#### Step 6.2: Create Browser Supabase Client

\`\`\`typescript
// lib/supabase/client.ts
'use client';

import { createBrowserClient } from '@supabase/ssr';

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
\`\`\`

#### Step 6.3: Create Middleware for Auth

\`\`\`typescript
// middleware.ts
import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value;
        },
        set(name: string, value: string, options: any) {
          request.cookies.set({
            name,
            value,
            ...options,
          });
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
          response.cookies.set({
            name,
            value,
            ...options,
          });
        },
        remove(name: string, options: any) {
          request.cookies.set({
            name,
            value: '',
            ...options,
          });
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
          response.cookies.set({
            name,
            value: '',
            ...options,
          });
        },
      },
    }
  );

  await supabase.auth.getUser();

  return response;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
\`\`\`

#### Step 6.4: Update All Supabase Imports

\`\`\`bash
# Find all Supabase imports
grep -r "from '@/integrations/supabase/client'" .

# Replace with:
# Server Components: import { createServerClient } from '@/lib/supabase/server'
# Client Components: import { createClient } from '@/lib/supabase/client'
\`\`\`

**Example Update:**

**Before:**
\`\`\`typescript
import { supabase } from '@/integrations/supabase/client';

const { data } = await supabase.from('matches').select('*');
\`\`\`

**After (Server Component):**
\`\`\`typescript
import { createServerClient } from '@/lib/supabase/server';

const supabase = createServerClient();
const { data } = await supabase.from('matches').select('*');
\`\`\`

**After (Client Component):**
\`\`\`typescript
'use client';

import { createClient } from '@/lib/supabase/client';

const supabase = createClient();
const { data } = await supabase.from('matches').select('*');
\`\`\`

---

### Phase 7: Testing & Optimization (6-8 hours)

#### Step 7.1: Manual Testing Checklist

**Navigation:**
- [ ] All links work correctly
- [ ] Back/forward browser buttons work
- [ ] Direct URL access works
- [ ] 404 page shows for invalid routes

**Data Fetching:**
- [ ] Server components fetch data correctly
- [ ] Client components fetch data correctly
- [ ] Loading states work
- [ ] Error states work
- [ ] React Query caching works

**Forms:**
- [ ] Form submissions work
- [ ] Server actions work
- [ ] Validation works
- [ ] Error messages display

**Authentication:**
- [ ] Login works
- [ ] Logout works
- [ ] Protected routes work
- [ ] Session persistence works

**Performance:**
- [ ] Initial page load is fast
- [ ] Navigation is instant
- [ ] Images load optimally
- [ ] No console errors

#### Step 7.2: Add Loading States

\`\`\`typescript
// app/(dashboard)/dashboard/loading.tsx
export default function DashboardLoading() {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="animate-pulse">
        <div className="h-8 bg-muted rounded w-1/4 mb-8"></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-32 bg-muted rounded"></div>
          ))}
        </div>
      </div>
    </div>
  );
}
\`\`\`

#### Step 7.3: Add Error Boundaries

\`\`\`typescript
// app/(dashboard)/error.tsx
'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Dashboard error:', error);
  }, [error]);

  return (
    <div className="container mx-auto py-16 px-4 text-center">
      <h2 className="text-2xl font-bold mb-4">Valami hiba történt</h2>
      <p className="text-muted-foreground mb-8">
        {error.message || 'Ismeretlen hiba történt'}
      </p>
      <Button onClick={reset}>Próbáld újra</Button>
    </div>
  );
}
\`\`\`

#### Step 7.4: Optimize Images

\`\`\`typescript
// Before
<img src="/assets/stadium.jpg" alt="Stadium" />

// After
import Image from 'next/image';

<Image
  src="/assets/stadium.jpg"
  alt="Stadium"
  width={1200}
  height={600}
  priority // For above-the-fold images
/>
\`\`\`

#### Step 7.5: Add Metadata for SEO

\`\`\`typescript
// app/(dashboard)/predictions/page.tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Predictions | WINMIX TIPSTER',
  description: 'View and create match predictions with AI-powered analytics',
};

export default function PredictionsPage() {
  // ...
}
\`\`\`

#### Step 7.6: Performance Optimization

**Enable Static Generation where possible:**

\`\`\`typescript
// app/(dashboard)/teams/page.tsx
export const revalidate = 3600; // Revalidate every hour

export default async function TeamsPage() {
  const supabase = createServerClient();
  const { data: teams } = await supabase.from('teams').select('*');
  
  return (
    <div>
      {teams?.map(team => (
        <TeamCard key={team.id} team={team} />
      ))}
    </div>
  );
}
\`\`\`

**Add dynamic imports for heavy components:**

\`\`\`typescript
// app/(dashboard)/phase9/page.tsx
import dynamic from 'next/dynamic';

const CollaborativeIntelligence = dynamic(
  () => import('@/components/phase9/collaborative-intelligence'),
  { loading: () => <div>Loading...</div> }
);

export default function Phase9Page() {
  return (
    <div>
      <CollaborativeIntelligence />
    </div>
  );
}
\`\`\`

---

### Phase 8: Deployment (2-4 hours)

#### Step 8.1: Prepare for Deployment

\`\`\`bash
# Test production build locally
npm run build
npm run start

# Check for build errors
# Check for runtime errors
# Test all critical paths
\`\`\`

#### Step 8.2: Configure Vercel

\`\`\`bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Link project
vercel link

# Set environment variables
vercel env add NEXT_PUBLIC_SUPABASE_URL
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
vercel env add SUPABASE_SERVICE_ROLE_KEY
vercel env add ODDS_API_KEY
\`\`\`

#### Step 8.3: Deploy to Preview

\`\`\`bash
# Deploy to preview
vercel

# Test preview deployment
# Check all functionality
# Verify environment variables
\`\`\`

#### Step 8.4: Deploy to Production

\`\`\`bash
# Deploy to production
vercel --prod

# Monitor deployment
# Check logs for errors
# Test production site
\`\`\`

#### Step 8.5: Post-Deployment Checklist

- [ ] All pages load correctly
- [ ] All API routes work
- [ ] Authentication works
- [ ] Database connections work
- [ ] External API integrations work
- [ ] Analytics tracking works
- [ ] Error tracking works
- [ ] Performance is acceptable

---

## 5. Code Transformation Examples

### Example 1: Simple Page Migration

**Before (Vite):**
\`\`\`typescript
// src/pages/Dashboard.tsx
import { useNavigate } from 'react-router-dom';
import Sidebar from '@/components/Sidebar';
import TopBar from '@/components/TopBar';

const Dashboard = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen">
      <Sidebar />
      <TopBar />
      <main className="ml-[84px] pt-16">
        <h1>Dashboard</h1>
        <button onClick={() => navigate('/predictions')}>
          View Predictions
        </button>
      </main>
    </div>
  );
};

export default Dashboard;
\`\`\`

**After (Next.js):**
\`\`\`typescript
// app/(dashboard)/dashboard/page.tsx
'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

export default function DashboardPage() {
  const router = useRouter();
  
  return (
    <div className="container mx-auto py-8">
      <h1>Dashboard</h1>
      <Button onClick={() => router.push('/predictions')}>
        View Predictions
      </Button>
    </div>
  );
}

// Layout handles Sidebar and TopBar
// app/(dashboard)/layout.tsx
\`\`\`

### Example 2: Data Fetching Migration

**Before (Vite - Client-side):**
\`\`\`typescript
// src/pages/Teams.tsx
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

const Teams = () => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    async function fetchTeams() {
      const { data } = await supabase.from('teams').select('*');
      setTeams(data || []);
      setLoading(false);
    }
    fetchTeams();
  }, []);
  
  if (loading) return <div>Loading...</div>;
  
  return (
    <div>
      {teams.map(team => (
        <div key={team.id}>{team.name}</div>
      ))}
    </div>
  );
};
\`\`\`

**After (Next.js - Server-side):**
\`\`\`typescript
// app/(dashboard)/teams/page.tsx
import { createServerClient } from '@/lib/supabase/server';
import { TeamCard } from '@/components/TeamCard';

export const revalidate = 3600; // Revalidate every hour

export default async function TeamsPage() {
  const supabase = createServerClient();
  const { data: teams } = await supabase.from('teams').select('*');
  
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Teams</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {teams?.map(team => (
          <TeamCard key={team.id} team={team} />
        ))}
      </div>
    </div>
  );
}

// app/(dashboard)/teams/loading.tsx
export default function TeamsLoading() {
  return <div>Loading teams...</div>;
}
\`\`\`

### Example 3: Form with Server Action

**Before (Vite):**
\`\`\`typescript
// src/components/PredictionForm.tsx
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

export function PredictionForm({ matchId }: { matchId: string }) {
  const [outcome, setOutcome] = useState('');
  const [confidence, setConfidence] = useState(50);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const { error } = await supabase
      .from('user_predictions')
      .insert({
        match_id: matchId,
        predicted_outcome: outcome,
        confidence_score: confidence,
      });
    
    if (error) {
      alert('Error submitting prediction');
    } else {
      alert('Prediction submitted!');
    }
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <select value={outcome} onChange={(e) => setOutcome(e.target.value)}>
        <option value="home_win">Home Win</option>
        <option value="draw">Draw</option>
        <option value="away_win">Away Win</option>
      </select>
      <input
        type="range"
        min="0"
        max="100"
        value={confidence}
        onChange={(e) => setConfidence(Number(e.target.value))}
      />
      <button type="submit">Submit</button>
    </form>
  );
}
\`\`\`

**After (Next.js with Server Action):**
\`\`\`typescript
// lib/actions/predictions.ts
'use server';

import { createServerClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export async function submitPrediction(formData: FormData) {
  const supabase = createServerClient();
  
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return { error: 'Unauthorized' };
  }
  
  const { error } = await supabase
    .from('user_predictions')
    .insert({
      match_id: formData.get('match_id') as string,
      predicted_outcome: formData.get('outcome') as string,
      confidence_score: Number(formData.get('confidence')),
      user_id: user.id,
    });
  
  if (error) {
    return { error: 'Failed to submit prediction' };
  }
  
  revalidatePath('/predictions');
  return { success: true };
}

// components/PredictionForm.tsx
'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { submitPrediction } from '@/lib/actions/predictions';
import { Button } from '@/components/ui/button';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? 'Submitting...' : 'Submit Prediction'}
    </Button>
  );
}

export function PredictionForm({ matchId }: { matchId: string }) {
  const [state, formAction] = useFormState(submitPrediction, null);
  
  return (
    <form action={formAction}>
      <input type="hidden" name="match_id" value={matchId} />
      
      <select name="outcome" required>
        <option value="home_win">Home Win</option>
        <option value="draw">Draw</option>
        <option value="away_win">Away Win</option>
      </select>
      
      <input
        type="range"
        name="confidence"
        min="0"
        max="100"
        defaultValue="50"
      />
      
      <SubmitButton />
      
      {state?.error && (
        <p className="text-destructive">{state.error}</p>
      )}
      {state?.success && (
        <p className="text-green-500">Prediction submitted!</p>
      )}
    </form>
  );
}
\`\`\`

---

## 6. Testing Strategy

### Unit Testing

\`\`\`bash
# Install testing libraries
npm install -D @testing-library/react @testing-library/jest-dom jest jest-environment-jsdom
\`\`\`

\`\`\`typescript
// __tests__/components/PredictionForm.test.tsx
import { render, screen } from '@testing-library/react';
import { PredictionForm } from '@/components/PredictionForm';

describe('PredictionForm', () => {
  it('renders form fields', () => {
    render(<PredictionForm matchId="123" />);
    expect(screen.getByRole('combobox')).toBeInTheDocument();
    expect(screen.getByRole('slider')).toBeInTheDocument();
  });
});
\`\`\`

### Integration Testing

\`\`\`typescript
// __tests__/api/predictions.test.ts
import { POST } from '@/app/api/phase9/collaborative-intelligence/submit-prediction/route';

describe('Submit Prediction API', () => {
  it('requires authentication', async () => {
    const request = new Request('http://localhost:3000/api/predictions', {
      method: 'POST',
      body: JSON.stringify({ match_id: '123' }),
    });
    
    const response = await POST(request);
    expect(response.status).toBe(401);
  });
});
\`\`\`

### E2E Testing with Playwright

\`\`\`bash
# Install Playwright
npm install -D @playwright/test
npx playwright install
\`\`\`

\`\`\`typescript
// e2e/predictions.spec.ts
import { test, expect } from '@playwright/test';

test('submit prediction flow', async ({ page }) => {
  await page.goto('/predictions/new');
  
  await page.selectOption('select[name="outcome"]', 'home_win');
  await page.fill('input[name="confidence"]', '75');
  await page.click('button[type="submit"]');
  
  await expect(page.locator('text=Prediction submitted')).toBeVisible();
});
\`\`\`

---

## 7. Rollback Plan

### If Migration Fails

#### Step 1: Revert to Vite

\`\`\`bash
# Switch back to pre-migration branch
git checkout main

# Or revert migration branch
git revert HEAD~10..HEAD
\`\`\`

#### Step 2: Restore Vite Configuration

\`\`\`bash
# Restore from backup
cp migration-backup/vite.config.ts .
cp migration-backup/package.json .

# Reinstall dependencies
npm install

# Start Vite dev server
npm run dev
\`\`\`

#### Step 3: Document Issues

Create a document listing:
- What went wrong
- Which parts failed
- What needs to be fixed before retry

---

## 8. Post-Migration Optimization

### Performance Monitoring

\`\`\`typescript
// app/layout.tsx
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
\`\`\`

### Database Optimization

\`\`\`sql
-- Add indexes for common queries
CREATE INDEX idx_user_predictions_match_id ON user_predictions(match_id);
CREATE INDEX idx_user_predictions_user_id ON user_predictions(user_id);
CREATE INDEX idx_market_odds_match_id ON market_odds(match_id);
CREATE INDEX idx_crowd_wisdom_match_id ON crowd_wisdom(match_id);
\`\`\`

### Caching Strategy

\`\`\`typescript
// lib/cache.ts
import { unstable_cache } from 'next/cache';

export const getCachedTeams = unstable_cache(
  async () => {
    const supabase = createServerClient();
    const { data } = await supabase.from('teams').select('*');
    return data;
  },
  ['teams'],
  { revalidate: 3600, tags: ['teams'] }
);
\`\`\`

---

## 9. Conclusion

### Migration Success Criteria

- [ ] All pages render correctly
- [ ] All routes work
- [ ] All API endpoints work
- [ ] Authentication works
- [ ] Database queries work
- [ ] Performance is improved
- [ ] SEO is improved
- [ ] No console errors
- [ ] All tests pass
- [ ] Production deployment successful

### Expected Improvements

**Performance:**
- 40-60% faster initial page load
- 70-80% smaller JavaScript bundles
- Better Core Web Vitals scores

**SEO:**
- Server-side rendering for all pages
- Better meta tags and Open Graph
- Improved crawlability

**Developer Experience:**
- Type-safe API routes
- Better error handling
- Easier testing
- Better debugging

**Security:**
- Server-side API key management
- Better authentication
- CSRF protection
- Secure headers

---

**Document Version:** 1.0  
**Last Updated:** 2025-01-03  
**Estimated Total Time:** 40-60 hours  
**Complexity:** High  
**Risk:** Medium-High
