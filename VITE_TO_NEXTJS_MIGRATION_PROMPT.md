Migration Prompt: Convert Vite + React SPA to Next.js with 1:1 Parity

Context
- Current app: Vite + React + TypeScript + React Query + React Router + TailwindCSS + Supabase client auth.
- Key client-side integrations: Sentry via CDN (src/lib/sentry.ts), Cloudflare Browser Insights beacon (src/lib/cloudflare.ts), simple performance monitor (src/lib/performance-monitor.ts), structured logger (src/lib/logger.ts).
- Feature flags drive conditional routes via VITE_FEATURE_PHASE{5..9} in FeatureFlagsProvider.
- Protected UX: AuthProvider (Supabase) + AuthGate + RoleGate lock down routes and sections.
- Admin feature: Integrations status page (src/pages/admin/IntegrationsPage.tsx) that reads environment_variables_safe via Supabase and checks VITE_* runtime keys for Sentry/Cloudflare.

Goal
- Port the app to Next.js (14+ with the App Router) preserving behavior, UI, state, routes, URLs, and environment-driven flags. No feature drops or regressions.
- Keep a client-first architecture (CSR) for parity. Do not rewrite app logic to server components or server actions. Route components may be client components.
- Preserve Supabase client-side auth session behavior exactly.

Hard Requirements
- Routes and URLs must remain identical to the Vite version. This includes public, protected, admin, feature-flagged, and legacy routes.
- All pages render the same JSX and styling. Reuse existing components; do not redesign.
- Global providers (React Query, TooltipProvider, Toasters, AuthProvider, FeatureFlagsProvider, ErrorBoundary) must be mounted globally and behave like today.
- Error reporting (Sentry) and RUM (Cloudflare beacon) must initialize only when their public envs are present and work across all pages.
- Feature flags must continue to come from public env vars and gate pages at runtime.
- Logging and performance monitoring remain active in the browser.

Routing Parity (map 1:1)
Public
- / -> src/pages/Index.tsx
- /login -> src/pages/Auth/Login.tsx
- /signup -> src/pages/Auth/Signup.tsx
- /feature-flags -> src/pages/FeatureFlagsDemo.tsx

Demo (read-only for unauthenticated)
- /predictions -> src/pages/PredictionsView.tsx
- /matches -> src/pages/Matches.tsx
- /match/:id -> src/pages/MatchDetail.tsx (dynamic)
- /teams -> src/pages/Teams.tsx
- /teams/:teamName -> src/pages/TeamDetail.tsx (dynamic)
- /leagues -> src/pages/Leagues.tsx

Protected
- /predictions/new -> src/pages/NewPredictions.tsx
- /dashboard -> src/pages/Dashboard.tsx

Feature-gated
- /patterns (Phase5) -> placeholder div in AppRoutes today; render a client component that shows the same content when enabled; 404 otherwise.
- /models (Phase6) -> src/pages/Models.tsx
- /crossleague (Phase7) -> src/pages/CrossLeague.tsx
- /analytics (Phase8) -> src/pages/Analytics.tsx
- /monitoring (Phase8) -> src/pages/Monitoring.tsx
- /phase9 (Phase9) -> src/pages/Phase9.tsx

Admin (protected with roles)
- /admin -> src/pages/admin/AdminDashboard.tsx
- /admin/users -> src/pages/admin/users/UsersPage.tsx
- /admin/jobs -> src/pages/admin/jobs/RunningJobsPage.tsx
- /admin/phase9 -> src/pages/admin/phase9/Phase9SettingsPage.tsx
- /admin/health -> src/pages/admin/HealthDashboard.tsx
- /admin/integrations -> src/pages/admin/IntegrationsPage.tsx

Legacy
- /jobs -> src/pages/ScheduledJobsPage.tsx (if any of Phase5..8 enabled)
- /admin/models -> src/pages/ModelsPage.tsx (if Phase6 or Phase8)
- /admin/matches -> src/pages/MatchesPage.tsx (if Phase8)
- /admin/monitoring -> src/pages/MonitoringPage.tsx (if Phase8)

Environment
- /admin/environment -> src/pages/EnvVariables.tsx (admin only)

Catch-all
- * -> src/pages/NotFound.tsx

Implementation Plan (Next.js App Router)
1) Create a Next.js 14+ project (TypeScript, Tailwind)
- Use the App Router (app directory). Preserve src/ for components and utilities. Configure baseUrl and path alias @ -> src.
- Keep Tailwind config largely as-is; ensure content includes app/**/* and src/**/*.

2) Global Providers and Scripts
- Create a client-only Providers component that wraps existing providers in this exact order:
  ReactQuery (single QueryClient instance) -> TooltipProvider -> Toaster + Sonner -> AuthProvider -> ErrorBoundary -> FeatureFlagsProvider.
- Mount Providers in app/layout.tsx. The root layout should import global CSS (migrated from src/index.css) and include scripts for Sentry and Cloudflare using next/script.
- Call initPerformanceMonitoring on the client after hydration.

3) Environment Variables (browser)
- Replace import.meta.env.VITE_* with process.env.NEXT_PUBLIC_* in Next.js pages/components. Maintain dual-read fallback where practical to ease transition.
  For example: read NEXT_PUBLIC_SENTRY_DSN and NEXT_PUBLIC_SENTRY_ENV, falling back to VITE_SENTRY_DSN and VITE_SENTRY_ENV if present.
- For Supabase, prefer NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY (keep VITE_* fallback in the client for safety).
- For Cloudflare RUM, prefer NEXT_PUBLIC_CLOUDFLARE_BEACON_TOKEN with VITE_ fallback.
- For feature flags, prefer NEXT_PUBLIC_FEATURE_PHASE5..NEXT_PUBLIC_FEATURE_PHASE9 with VITE_ fallback.

4) Logger and Performance
- Update src/lib/logger.ts to derive isDev from process.env.NODE_ENV instead of import.meta.env.MODE. Keep the StructuredLog shape and methods unchanged.
- Keep src/lib/performance-monitor.ts as-is and call initPerformanceMonitoring in a client-side useEffect mounted from app/layout.tsx (or Providers).

5) Sentry (CDN) and Cloudflare Beacon
- Keep the CDN approach used today, but implement it with next/script in app/layout.tsx for safe injection and SSR compatibility.
  Sentry: only initialize when NEXT_PUBLIC_SENTRY_DSN is set; preserve captureExceptionSafe signature.
  Cloudflare: only inject when NEXT_PUBLIC_CLOUDFLARE_BEACON_TOKEN is set.
- Preserve the Integrations page test button that throws and calls captureExceptionSafe.

6) Routing
- Replace React Router with file-based routing in app/:
  - app/page.tsx -> wraps src/pages/Index.tsx with AuthGate requireAuth={false}
  - app/login/page.tsx -> src/pages/Auth/Login.tsx with AuthGate requireAuth={false}
  - app/signup/page.tsx -> src/pages/Auth/Signup.tsx with AuthGate requireAuth={false}
  - app/feature-flags/page.tsx -> src/pages/FeatureFlagsDemo.tsx (no auth)
  - app/predictions/page.tsx -> src/pages/PredictionsView.tsx (no auth)
  - app/matches/page.tsx -> src/pages/Matches.tsx (no auth)
  - app/match/[id]/page.tsx -> src/pages/MatchDetail.tsx (no auth)
  - app/teams/page.tsx -> src/pages/Teams.tsx (no auth)
  - app/teams/[teamName]/page.tsx -> src/pages/TeamDetail.tsx (no auth)
  - app/leagues/page.tsx -> src/pages/Leagues.tsx (no auth)
  - app/predictions/new/page.tsx -> src/pages/NewPredictions.tsx (require auth)
  - app/dashboard/page.tsx -> src/pages/Dashboard.tsx (require auth)
  - app/patterns/page.tsx -> feature-gated by Phase5
  - app/models/page.tsx -> feature-gated by Phase6
  - app/crossleague/page.tsx -> feature-gated by Phase7
  - app/analytics/page.tsx -> feature-gated by Phase8
  - app/monitoring/page.tsx -> feature-gated by Phase8
  - app/phase9/page.tsx -> feature-gated by Phase9
  - app/jobs/page.tsx -> feature-gated by Phase5..8 (legacy visibility)
  - app/admin/page.tsx -> AdminDashboard wrapped by AuthGate + RoleGate(["admin","analyst"])
  - app/admin/users/page.tsx -> UsersPage wrapped by AuthGate + RoleGate(["admin"]) 
  - app/admin/jobs/page.tsx -> RunningJobsPage wrapped by AuthGate + RoleGate(["admin","analyst"]) 
  - app/admin/phase9/page.tsx -> Phase9SettingsPage wrapped by AuthGate + RoleGate(["admin","analyst"]) 
  - app/admin/health/page.tsx -> HealthDashboard wrapped by AuthGate + RoleGate(["admin","analyst"]) 
  - app/admin/integrations/page.tsx -> IntegrationsPage wrapped by AuthGate + RoleGate(["admin","analyst"]) 
  - app/admin/environment/page.tsx -> EnvVariables wrapped by AuthGate + RoleGate(["admin"]) 
  - app/admin/models/page.tsx -> ModelsPage wrapped by AuthGate + RoleGate(["admin","analyst"]) + Phase gate (Phase6 or Phase8)
  - app/admin/matches/page.tsx -> MatchesPage wrapped by AuthGate + RoleGate(["admin","analyst"]) + Phase gate (Phase8)
  - app/admin/monitoring/page.tsx -> MonitoringPage wrapped by AuthGate + RoleGate(["admin","analyst"]) + Phase gate (Phase8)
- Implement not-found.tsx using the existing NotFound component.
- Replace Suspense/lazy with next/dynamic where necessary. You can also keep components client-only and let Next split per route.

7) Guards in Next.js
- Mark all route components that use hooks/state as client components ("use client").
- Reuse AuthGate and RoleGate exactly as written. For feature flags, create a small PhaseGate wrapper that calls next/navigation notFound() when disabled.
  Example:
  // app/(client)/phase-gate.tsx
  "use client";
  import { notFound } from "next/navigation";
  import { useFeatureFlags } from "@/providers/FeatureFlagsProvider";
  export default function PhaseGate({ flag, children }: { flag: keyof ReturnType<typeof import("@/hooks/usePhaseFlags").default> extends `is${string}` ? never : any; children: React.ReactNode }) {
    const { isEnabled } = useFeatureFlags();
    if (!isEnabled(flag as any)) notFound();
    return <>{children}</>;
  }

8) Providers Skeleton (client only)
- Create app/providers.tsx:
  "use client";
  import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
  import { TooltipProvider } from "@/components/ui/tooltip";
  import { Toaster } from "@/components/ui/toaster";
  import { Toaster as Sonner } from "@/components/ui/sonner";
  import { AuthProvider } from "@/providers/AuthProvider";
  import ErrorBoundary from "@/components/ErrorBoundary";
  import { FeatureFlagsProvider } from "@/providers/FeatureFlagsProvider";
  import { useEffect, useMemo } from "react";
  import { initPerformanceMonitoring } from "@/lib/performance-monitor";
  const Providers = ({ children }: { children: React.ReactNode }) => {
    const queryClient = useMemo(() => new QueryClient(), []);
    useEffect(() => { initPerformanceMonitoring(); }, []);
    return (
      <FeatureFlagsProvider>
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <AuthProvider>
              <ErrorBoundary>{children}</ErrorBoundary>
            </AuthProvider>
          </TooltipProvider>
        </QueryClientProvider>
      </FeatureFlagsProvider>
    );
  };
  export default Providers;

- Create app/layout.tsx:
  import type { Metadata } from "next";
  import Script from "next/script";
  import Providers from "./providers";
  import "@/index.css"; // Move to app/globals.css if preferred
  import { initSentry, isSentryEnabled } from "@/lib/sentry";
  import { isCloudflareBeaconEnabled } from "@/lib/cloudflare";
  export const metadata: Metadata = { title: "App" };
  export default function RootLayout({ children }: { children: React.ReactNode }) {
    const sentry = isSentryEnabled();
    const cf = isCloudflareBeaconEnabled();
    return (
      <html lang="en">
        <body>
          {sentry ? (
            <Script src="https://browser.sentry-cdn.com/7.114.0/bundle.min.js" strategy="afterInteractive" crossOrigin="anonymous" onLoad={() => initSentry()} />
          ) : null}
          {cf ? (
            <Script src="https://static.cloudflareinsights.com/beacon.min.js" strategy="afterInteractive" data-cf-beacon={JSON.stringify({ token: process.env.NEXT_PUBLIC_CLOUDFLARE_BEACON_TOKEN })} />
          ) : null}
          <Providers>{children}</Providers>
        </body>
      </html>
    );
  }

9) Supabase Client
- Reuse src/integrations/supabase/client.ts. Ensure it runs only in the browser and reads NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY with VITE_* fallback. Keep storage in localStorage and persistSession: true.

10) Aliases and TS Config
- Preserve @ -> ./src path alias via tsconfig paths. Next supports jsconfig/tsconfig path aliases. Ensure tsconfig.json contains:
  {
    "compilerOptions": { "baseUrl": ".", "paths": { "@/*": ["./src/*"] } }
  }

11) Tailwind and CSS
- Move src/index.css into app/globals.css (or keep path and import in layout). Ensure Tailwind content includes app/**/* and src/**/*.

12) Component Reuse
- Do not change any component logic. Route files should simply wrap the existing page components with AuthGate/RoleGate/PhaseGate as required. Use "use client" at the top of any page that uses hooks.

13) Not Found and Error
- Implement app/not-found.tsx that renders the existing NotFound component.
- We keep our ErrorBoundary wrapper for Sentry reporting. You may optionally add route-level error.tsx files, but not required.

14) Scripts, Build, and Cleanup
- Update package.json:
  - Add scripts: "dev": "next dev", "build": "next build", "start": "next start".
- Remove Vite-only bootstrapping files after parity is verified: index.html, src/main.tsx, vite-env.d.ts, vite.config.*.
- Keep Tailwind and PostCSS configs.

Acceptance Criteria
- Every route above renders and functions identically to the Vite version, including auth gates and role restrictions.
- Feature-flagged routes 404 (notFound) when their flag is disabled, and render correctly when enabled.
- Sentry initializes only when NEXT_PUBLIC_SENTRY_DSN is set and the Integrations page "Send test error" button creates an event in Sentry.
- Cloudflare beacon loads only when NEXT_PUBLIC_CLOUDFLARE_BEACON_TOKEN is set.
- Logger prints structured logs; debug logs are suppressed in production (process.env.NODE_ENV === "production").
- Supabase auth works client-side with persisted session; login, signup, and signout flows unchanged.
- Build passes with next build; dev server works with next dev.
- No component regressions or visual changes.

Env Keys (browser, public)
- NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY (keep VITE_* fallback)
- NEXT_PUBLIC_SENTRY_DSN, NEXT_PUBLIC_SENTRY_ENV (keep VITE_* fallback)
- NEXT_PUBLIC_CLOUDFLARE_BEACON_TOKEN (keep VITE_* fallback)
- NEXT_PUBLIC_FEATURE_PHASE5..NEXT_PUBLIC_FEATURE_PHASE9 (keep VITE_* fallback)

Out of Scope
- No server actions, no SSR data fetching rewrites, no Prisma/Neon backend wiring. Those remain backend-only and are referenced by the Admin Integrations page for status display only.

Checklist
- [ ] Next app bootstrapped (App Router), @ alias preserved.
- [ ] Providers mounted globally, performance monitor initialized on client.
- [ ] Logger updated to use process.env.NODE_ENV.
- [ ] Env helper reads NEXT_PUBLIC_* with VITE_* fallback.
- [ ] Sentry and Cloudflare scripts injected via next/script, conditionally.
- [ ] All routes mapped with AuthGate/RoleGate/PhaseGate.
- [ ] NotFound wired via app/not-found.tsx.
- [ ] Tailwind paths updated; CSS imported globally.
- [ ] Build succeeds; QA verifies route parity and integrations.
