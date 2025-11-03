# 🚀 Vite → Next.js Migrációs Útmutató
## WinMix Tipster Hub Projekt

**Dátum:** 2025. november  
**Verziósz:** 1.0  
**Stato:** Tervezett arquitectúra

---

## 📋 Tartalom
1. [Projekt Áttekintés](#projekt-áttekintés)
2. [Mappastruktúra](#mappastruktúra)
3. [Routing és Oldalak](#routing-és-oldalak)
4. [API Routes](#api-routes)
5. [Komponensek Szervezete](#komponensek-szervezete)
6. [Adatkezelés és Integráció](#adatkezelés-és-integráció)
7. [Stíluskezelés](#stíluskezelés)
8. [Konfigurációs Fájlok](#konfigurációs-fájlok)
9. [Függőségek](#függőségek)
10. [Migrációs Lépések](#migrációs-lépések)

---

## 🎯 Projekt Áttekintés

A **WinMix Tipster Hub** egy komplex, sportpredikcióval foglalkozó platform, amely több modulból áll:

| Modul | Leírás | Fázis |
|-------|--------|-------|
| **Alap Funkciók** | Match szerkesztés, csapat kezelés | 1-2 |
| **Automatizálás** | Ütemezett feladatok, job kezelés | 3 |
| **Feedback & ML** | Predikciók nyomon követése, modell értékelés | 4 |
| **Pattern Detection** | Csapat-minták felismerése | 5 |
| **Champion/Challenger** | Model AB testing keretrendszer | 6 |
| **Cross-League** | Liga-összehasonlítás és korrelációk | 7 |
| **Monitoring** | Sistem egészség és vizualizáció | 8 |
| **Advanced** | Crowd wisdom, market integration, temporal decay | 9 |

---

## 📁 Mappastruktúra

### Teljes Next.js Projekt Struktúra

\`\`\`
winmix-tipster-hub/
├── app/                              # Next.js App Router
│   ├── layout.tsx                   # Root layout (Auth, Providers)
│   ├── page.tsx                     # Landing / Dashboard
│   ├── globals.css                  # Global stílusok
│   │
│   ├── (authenticated)/             # Protected routes group
│   │   ├── layout.tsx              # Auth layout (Sidebar, Header)
│   │   ├── dashboard/
│   │   │   └── page.tsx            # Dashboard fő oldala
│   │   ├── predictions/
│   │   │   ├── page.tsx            # Predikciók listája
│   │   │   ├── new/
│   │   │   │   └── page.tsx        # Új predikció
│   │   │   └── [id]/
│   │   │       └── page.tsx        # Predikció részletek
│   │   ├── teams/
│   │   │   ├── page.tsx            # Csapatok listája
│   │   │   └── [name]/
│   │   │       └── page.tsx        # Csapat részletek & minták
│   │   ├── matches/
│   │   │   ├── page.tsx            # Mérkőzések listája
│   │   │   └── [id]/
│   │   │       └── page.tsx        # Mérkőzés részletek
│   │   ├── leagues/
│   │   │   └── page.tsx            # Ligák listája
│   │   ├── analytics/
│   │   │   └── page.tsx            # Analytics dashboard
│   │   ├── models/
│   │   │   └── page.tsx            # Model management
│   │   ├── cross-league/
│   │   │   └── page.tsx            # Liga összehasonlítás
│   │   ├── monitoring/
│   │   │   └── page.tsx            # System monitoring
│   │   ├── phase9/
│   │   │   └── page.tsx            # Advanced features
│   │   └── jobs/
│   │       └── page.tsx            # Scheduled jobs
│   │
│   ├── api/                        # API Routes (Server-side)
│   │   ├── predictions/
│   │   │   ├── route.ts           # GET/POST predictions
│   │   │   ├── user/
│   │   │   │   └── route.ts       # User predictions (Phase 9)
│   │   │   ├── crowd/
│   │   │   │   └── [matchId]/
│   │   │   │       └── route.ts   # Crowd wisdom (Phase 9)
│   │   │   ├── track/
│   │   │   │   └── route.ts       # Track prediction (Phase 4)
│   │   │   └── update-results/
│   │   │       └── route.ts       # Update results (Phase 4)
│   │   ├── models/
│   │   │   ├── register/
│   │   │   │   └── route.ts       # Register model (Phase 6)
│   │   │   ├── select/
│   │   │   │   └── route.ts       # Select model (Phase 6)
│   │   │   ├── performance/
│   │   │   │   └── route.ts       # Get performance (Phase 4)
│   │   │   ├── compare/
│   │   │   │   └── route.ts       # Compare models (Phase 4)
│   │   │   └── promote/
│   │   │       └── route.ts       # Promote challenger (Phase 6)
│   │   ├── patterns/
│   │   │   ├── detect/
│   │   │   │   └── route.ts       # Detect patterns (Phase 5)
│   │   │   ├── team/
│   │   │   │   └── [name]/
│   │   │   │       └── route.ts   # Team patterns (Phase 5)
│   │   │   └── verify/
│   │   │       └── route.ts       # Verify pattern (Phase 5)
│   │   ├── market/
│   │   │   ├── odds/
│   │   │   │   └── [matchId]/
│   │   │   │       └── route.ts   # Market odds (Phase 9)
│   │   │   └── value-bets/
│   │   │       └── route.ts       # Value bets (Phase 9)
│   │   ├── jobs/
│   │   │   ├── list/
│   │   │   │   └── route.ts       # List jobs (Phase 3)
│   │   │   ├── logs/
│   │   │   │   └── route.ts       # Job logs (Phase 3)
│   │   │   ├── trigger/
│   │   │   │   └── route.ts       # Trigger job (Phase 3)
│   │   │   ├── toggle/
│   │   │   │   └── route.ts       # Toggle job (Phase 3)
│   │   │   └── scheduler/
│   │   │       └── route.ts       # Cron scheduler (Phase 3)
│   │   ├── cross-league/
│   │   │   ├── correlations/
│   │   │   │   └── route.ts       # Get correlations (Phase 7)
│   │   │   └── analyze/
│   │   │       └── route.ts       # Analyze leagues (Phase 7)
│   │   ├── meta-patterns/
│   │   │   ├── discover/
│   │   │   │   └── route.ts       # Discover patterns (Phase 7)
│   │   │   └── apply/
│   │   │       └── route.ts       # Apply pattern (Phase 7)
│   │   ├── monitoring/
│   │   │   ├── health/
│   │   │   │   └── route.ts       # System health (Phase 8)
│   │   │   ├── metrics/
│   │   │   │   └── route.ts       # Performance metrics (Phase 8)
│   │   │   ├── computation-graph/
│   │   │   │   └── route.ts       # Computation graph (Phase 8)
│   │   │   └── alerts/
│   │   │       └── route.ts       # Get alerts (Phase 8)
│   │   ├── temporal/
│   │   │   ├── freshness/
│   │   │   │   └── route.ts       # Freshness score (Phase 9)
│   │   │   └── check-stale/
│   │   │       └── route.ts       # Check stale data (Phase 9)
│   │   ├── self-improving/
│   │   │   ├── generate-features/
│   │   │   │   └── route.ts       # Generate features (Phase 9)
│   │   │   ├── test-feature/
│   │   │   │   └── route.ts       # Test feature (Phase 9)
│   │   │   └── continuous-learning/
│   │   │       └── route.ts       # Learning pipeline (Phase 9)
│   │   └── experiments/
│   │       ├── create/
│   │       │   └── route.ts       # Create experiment (Phase 6)
│   │       └── evaluate/
│   │           └── route.ts       # Evaluate experiment (Phase 6)
│   │
│   └── not-found.tsx              # 404 error page
│
├── components/                     # React komponensek
│   ├── ui/                        # shadcn/ui komponensek
│   │   ├── accordion.tsx
│   │   ├── alert.tsx
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── chart.tsx
│   │   ├── dialog.tsx
│   │   ├── form.tsx
│   │   ├── input.tsx
│   │   ├── sidebar.tsx
│   │   ├── table.tsx
│   │   ├── tabs.tsx
│   │   ├── toast.tsx
│   │   ├── toaster.tsx
│   │   ├── sonner.tsx
│   │   └── ... (50+ további komponens)
│   │
│   ├── layout/                   # Layout komponensek
│   │   ├── sidebar.tsx           # Navigációs sidebar
│   │   ├── header.tsx            # Top header
│   │   ├── footer.tsx            # Footer
│   │   └── navbar.tsx            # Navigation bar
│   │
│   ├── dashboard/               # Dashboard komponensek
│   │   ├── statistics-cards.tsx
│   │   ├── recent-predictions.tsx
│   │   ├── performance-chart.tsx
│   │   └── pattern-performance-chart.tsx
│   │
│   ├── predictions/             # Predikció komponensek
│   │   ├── prediction-display.tsx
│   │   ├── prediction-results.tsx
│   │   ├── prediction-form.tsx
│   │   ├── score-input.tsx
│   │   ├── match-selection.tsx
│   │   └── control-panel.tsx
│   │
│   ├── teams/                   # Csapat komponensek
│   │   ├── team-list.tsx
│   │   ├── team-statistics-table.tsx
│   │   └── team-detail.tsx
│   │
│   ├── matches/                 # Mérkőzés komponensek
│   │   ├── match-card.tsx
│   │   ├── match-list.tsx
│   │   ├── match-detail.tsx
│   │   └── halftime-score-input.tsx
│   │
│   ├── patterns/                # Pattern detection komponensek
│   │   ├── pattern-badge.tsx
│   │   ├── team-patterns-section.tsx
│   │   └── pattern-display.tsx
│   │
│   ├── models/                  # Model management komponensek
│   │   ├── model-card.tsx
│   │   ├── model-performance-chart.tsx
│   │   ├── model-comparison.tsx
│   │   └── champion-challenger.tsx
│   │
│   ├── cross-league/           # Cross-league komponensek
│   │   ├── league-comparison-radar-chart.tsx
│   │   ├── correlation-heatmap.tsx
│   │   └── league-list.tsx
│   │
│   ├── monitoring/             # Monitoring komponensek
│   │   ├── computation-map-dashboard.tsx
│   │   ├── system-health-card.tsx
│   │   ├── performance-metrics-chart.tsx
│   │   └── alerts-panel.tsx
│   │
│   ├── jobs/                   # Job management komponensek
│   │   ├── job-status-card.tsx
│   │   ├── job-logs-dialog.tsx
│   │   ├── jobs-list.tsx
│   │   └── schedule-job-form.tsx
│   │
│   ├── phase9/                 # Phase 9 advanced komponensek
│   │   ├── collaborative-intelligence.tsx
│   │   ├── market-integration.tsx
│   │   ├── temporal-decay.tsx
│   │   ├── self-improving-system.tsx
│   │   ├── user-prediction-form.tsx
│   │   ├── crowd-wisdom-display.tsx
│   │   ├── market-odds-display.tsx
│   │   ├── value-bet-highlights.tsx
│   │   ├── temporal-decay-dashboard.tsx
│   │   └── experiment-dashboard.tsx
│   │
│   ├── forms/                  # Form komponensek
│   │   ├── feedback-form.tsx
│   │   ├── league-form.tsx
│   │   └── match-form.tsx
│   │
│   ├── common/                 # Közös komponensek
│   │   ├── hero-section.tsx
│   │   ├── call-to-action.tsx
│   │   ├── stat-card.tsx
│   │   ├── hero-card.tsx
│   │   ├── top-predictions.tsx
│   │   ├── narrative-section.tsx
│   │   ├── css-badge.tsx
│   │   └── loading-spinner.tsx
│   │
│   ├── theme-provider.tsx      # Dark mode & theme provider
│   └── error-boundary.tsx      # Error boundary komponens
│
├── hooks/                      # React custom hooks
│   ├── use-mobile.ts          # Mobile detection hook
│   ├── use-toast.ts           # Toast notification hook
│   ├── use-predictions.ts     # Predictions data hook
│   ├── use-models.ts          # Models data hook
│   ├── use-patterns.ts        # Patterns data hook
│   ├── use-monitoring.ts      # Monitoring data hook
│   ├── use-jobs.ts            # Jobs data hook
│   └── use-phase9.ts          # Phase 9 features hook
│
├── lib/                        # Utility funkciók és konstansok
│   ├── utils.ts               # General utilities (cn function)
│   ├── teamStatistics.ts      # Team statistics calculations
│   ├── phase9-api.ts          # Phase 9 API utilities
│   ├── pattern-detection.ts   # Pattern detection algorithms
│   ├── model-evaluation.ts    # Model evaluation utilities
│   ├── cross-league-analysis.ts # Cross-league analysis
│   ├── temporal-decay.ts      # Temporal decay calculations
│   └── constants.ts           # App constants
│
├── services/                   # API & external services
│   ├── supabase/
│   │   ├── client.ts          # Supabase client (server)
│   │   ├── browser-client.ts  # Supabase client (browser)
│   │   └── types.ts           # Database types
│   ├── predictions.ts         # Predictions service
│   ├── models.ts              # Models service
│   ├── teams.ts               # Teams service
│   ├── matches.ts             # Matches service
│   ├── patterns.ts            # Patterns service
│   ├── jobs.ts                # Jobs service
│   ├── monitoring.ts          # Monitoring service
│   ├── market-odds.ts         # Market odds service (Phase 9)
│   ├── crowd-wisdom.ts        # Crowd wisdom service (Phase 9)
│   └── external-apis.ts       # External API integrations
│
├── data/                       # Static data & fixtures
│   ├── teamOptions.ts         # Team list
│   ├── leagueOptions.ts       # League list
│   ├── matchHistory.ts        # Sample matches
│   └── patterns-templates.ts  # Pattern templates
│
├── types/                      # TypeScript típusok
│   ├── index.ts               # Main types
│   ├── prediction.ts          # Prediction types
│   ├── model.ts               # Model types
│   ├── pattern.ts             # Pattern types
│   ├── job.ts                 # Job types
│   ├── market.ts              # Market types (Phase 9)
│   ├── monitoring.ts          # Monitoring types
│   └── supabase.ts            # Supabase types
│
├── middleware.ts              # Next.js middleware (auth, redirects)
│
├── public/                     # Static assets
│   ├── favicon.ico
│   ├── robots.txt
│   ├── placeholder.svg
│   ├── placeholder.jpg
│   ├── placeholder-logo.png
│   ├── placeholder-logo.svg
│   └── assets/
│       ├── stadium-champions-league.jpg
│       ├── team-logo-arsenal.png
│       ├── team-logo-liverpool.png
│       ├── team-logo-mancity.png
│       └── team-logo-villa.png
│
├── styles/                    # Tailwind & CSS modulok
│   ├── globals.css           # Global CSS (helyette app/globals.css)
│   ├── variables.css         # CSS változók
│   └── animations.css        # Custom animációk
│
├── .env.local                # Helyi environment variables
├── .env.example              # Environment template
├── .gitignore
├── .eslintrc.json
├── eslint.config.js
├── next.config.mjs           # Next.js konfigurációs
├── tsconfig.json             # TypeScript konfigurációs
├── tailwind.config.ts        # Tailwind CSS konfigurációs
├── postcss.config.js         # PostCSS konfigurációs
├── package.json
├── pnpm-lock.yaml            # Package lock file
├── README.md
└── MIGRATION.md              # Migrációs útmutató

\`\`\`

---

## 🛣️ Routing és Oldalak

### Publikus Oldalak
- **`/`** - Landing page / Public dashboard

### Hitelesített Oldalak (Protected Routes)

| Route | Oldal | Komponens | Fázis |
|-------|-------|-----------|-------|
| `/dashboard` | Dashboard | Dashboard.tsx | 1-2 |
| `/predictions` | Predikciók listája | PredictionsView.tsx | 1-2 |
| `/predictions/new` | Új predikció | NewPredictions.tsx | 1-2 |
| `/predictions/:id` | Predikció részletek | PredictionDetail.tsx | 1-2 |
| `/teams` | Csapatok listája | Teams.tsx | 1-2 |
| `/teams/:name` | Csapat részletek + minták | TeamDetail.tsx | 1-2, 5 |
| `/matches` | Mérkőzések listája | Matches.tsx | 1-2 |
| `/matches/:id` | Mérkőzés részletek | MatchDetail.tsx | 1-2 |
| `/leagues` | Ligák listája | Leagues.tsx | 1-2 |
| `/analytics` | Analytics dashboard | Analytics.tsx | 4 |
| `/models` | Model management | Models.tsx | 6 |
| `/cross-league` | Liga összehasonlítás | CrossLeague.tsx | 7 |
| `/monitoring` | System monitoring | Monitoring.tsx | 8 |
| `/phase9` | Advanced features | Phase9.tsx | 9 |
| `/jobs` | Scheduled jobs | ScheduledJobs.tsx | 3 |
| `/404` | Not found | NotFound.tsx | - |

---

## 🔌 API Routes

### Predikciók API
\`\`\`
POST   /api/predictions              - Create prediction
GET    /api/predictions              - List predictions
POST   /api/predictions/track        - Track prediction
POST   /api/predictions/update-results - Update results
POST   /api/predictions/user         - Submit user prediction (Phase 9)
GET    /api/predictions/crowd/:matchId - Get crowd wisdom (Phase 9)
\`\`\`

### Modellek API
\`\`\`
GET    /api/models/performance       - Get model performance
POST   /api/models/compare           - Compare models
POST   /api/models/register          - Register model (Phase 6)
POST   /api/models/select            - Select model (Phase 6)
POST   /api/models/promote           - Promote challenger (Phase 6)
POST   /api/models/shadow-run        - Run shadow mode (Phase 6)
\`\`\`

### Minták API
\`\`\`
POST   /api/patterns/detect          - Detect patterns
GET    /api/patterns/team/:name      - Get team patterns
POST   /api/patterns/verify          - Verify pattern
\`\`\`

### Piac API (Phase 9)
\`\`\`
GET    /api/market/odds/:matchId     - Get external odds
GET    /api/market/value-bets        - Get value bets
\`\`\`

### Cross-Liga API (Phase 7)
\`\`\`
GET    /api/cross-league/correlations - Get correlations
POST   /api/cross-league/analyze     - Analyze leagues
GET    /api/meta-patterns/discover   - Discover patterns
POST   /api/meta-patterns/apply      - Apply pattern
\`\`\`

### Monitoring API (Phase 8)
\`\`\`
GET    /api/monitoring/health        - Get system health
GET    /api/monitoring/metrics       - Get metrics
GET    /api/monitoring/computation-graph - Get graph
GET    /api/monitoring/alerts        - Get alerts
\`\`\`

### Feladatok API (Phase 3)
\`\`\`
GET    /api/jobs/list                - List jobs
GET    /api/jobs/logs                - Get logs
POST   /api/jobs/trigger             - Trigger job
POST   /api/jobs/toggle              - Toggle job
POST   /api/jobs/scheduler           - Cron scheduler
\`\`\`

### Temporal & Self-Improving API (Phase 9)
\`\`\`
POST   /api/temporal/freshness       - Calculate freshness
POST   /api/temporal/check-stale     - Check stale data
POST   /api/self-improving/generate-features - Generate features
POST   /api/self-improving/test-feature - Test feature
POST   /api/self-improving/continuous-learning - Learning pipeline
\`\`\`

---

## 🧩 Komponensek Szervezete

### Komponens Hierarchia

\`\`\`
App Layout (Root)
├── Header
│   └── Navigation
├── Sidebar
│   └── Navigation Links
├── Main Content
│   ├── Page komponensek
│   ├── Feature komponensek
│   └── UI komponensek
└── Footer
\`\`\`

### Komponens Kategóriák

#### 1. **Layout komponensek** (`/components/layout/`)
- `Sidebar.tsx` - Navigációs sidebar
- `Header.tsx` - Top header
- `Footer.tsx` - Footer
- `Navbar.tsx` - Navigation bar

#### 2. **UI Komponensek** (`/components/ui/`)
- 50+ shadcn/ui komponens
- Reusable, sztyilizált komponensek
- Form elements, dialogs, tables, charts stb.

#### 3. **Feature Komponensek** (feature-specifikus mappák)
- Dashboard komponensek
- Prediction komponensek
- Team komponensek
- Matches komponensek
- Patterns komponensek
- Models komponensek
- Cross-league komponensek
- Monitoring komponensek
- Jobs komponensek
- Phase 9 komponensek

#### 4. **Közös Komponensek** (`/components/common/`)
- `HeroSection.tsx` - Hero szakasz
- `CallToAction.tsx` - CTA banner
- `StatCard.tsx` - Stat megjelenítés
- `TopPredictions.tsx` - Top predictions widget

---

## 💾 Adatkezelés és Integráció

### Supabase Integration

\`\`\`typescript
// services/supabase/client.ts (Server-side)
import { createServerClient } from '@supabase/ssr'

export function createClient() {
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { ... }
  )
}

// services/supabase/browser-client.ts (Client-side)
import { createBrowserClient } from '@supabase/ssr'

export function createBrowserSupabaseClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  )
}
\`\`\`

### Adatbázis Táblák

| Táblázat | Fázis | Típus |
|----------|-------|-------|
| `matches` | 1-2 | Mérkőzések |
| `teams` | 1-2 | Csapatok |
| `leagues` | 1-2 | Ligák |
| `predictions` | 4 | Predikciók |
| `model_performance` | 4 | Model teljesítmény |
| `team_patterns` | 5 | Csapat minták |
| `model_registry` | 6 | Model regisztrációs |
| `model_experiments` | 6 | Model kísérletek |
| `cross_league_correlations` | 7 | Liga korrelációk |
| `meta_patterns` | 7 | Meta-minták |
| `system_health` | 8 | System monitoring |
| `performance_metrics` | 8 | Performance metrikák |
| `user_predictions` | 9 | User predikciók (Phase 9) |
| `crowd_wisdom` | 9 | Crowd wisdom (Phase 9) |
| `market_odds` | 9 | Market odds (Phase 9) |
| `value_bets` | 9 | Value bets (Phase 9) |
| `information_freshness` | 9 | Data freshness (Phase 9) |
| `feature_experiments` | 9 | Feature kísérletek (Phase 9) |
| `scheduled_jobs` | 3 | Ütemezett feladatok |
| `job_execution_logs` | 3 | Job naplók |

### Adatfetching

**React Query (SWR)** használattal az ügyféloldali adatkezeléshez:

\`\`\`typescript
// hooks/use-predictions.ts
import { useQuery } from '@tanstack/react-query'

export function usePredictions() {
  return useQuery({
    queryKey: ['predictions'],
    queryFn: async () => {
      const response = await fetch('/api/predictions')
      return response.json()
    }
  })
}
\`\`\`

---

## 🎨 Stíluskezelés

### Tailwind CSS + shadcn/ui

\`\`\`css
/* app/globals.css - Design Tokens */
:root {
  --background: oklch(1 0 0);
  --foreground: oklch(0.145 0 0);
  --primary: oklch(0.205 0 0);
  --secondary: oklch(0.97 0 0);
  /* ... több token ... */
}

.dark {
  --background: oklch(0.145 0 0);
  --foreground: oklch(0.985 0 0);
  /* ... dark mode tokenek ... */
}
\`\`\`

### Témakezelés

\`\`\`typescript
// components/theme-provider.tsx
'use client'

import { ThemeProvider } from 'next-themes'

export function Providers({ children }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark">
      {children}
    </ThemeProvider>
  )
}
\`\`\`

---

## ⚙️ Konfigurációs Fájlok

### `next.config.mjs`
\`\`\`javascript
const nextConfig = {
  typescript: { strict: true },
  eslint: { dirs: ['app', 'components', 'lib', 'services'] },
  rewrites: async () => ({
    beforeFiles: [
      // Any custom rewrites
    ]
  })
}

export default nextConfig
\`\`\`

### `tailwind.config.ts`
\`\`\`typescript
import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        primary: 'var(--primary)',
        // ...
      }
    }
  },
  plugins: [require("@tailwindcss/typography")]
}
export default config
\`\`\`

### `tsconfig.json`
\`\`\`json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "jsx": "react-jsx",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "allowImportingTsExtensions": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["./*"]
    }
  }
}
\`\`\`

---

## 📦 Függőségek

### Főbb Függőségek

| Csomag | Verzió | Cél |
|--------|--------|-----|
| `next` | ^15.0 | React framework |
| `react` | ^18.3 | React library |
| `typescript` | ^5.8 | Type safety |
| `tailwindcss` | ^3.4 | Styling |
| `@supabase/ssr` | Latest | DB & Auth |
| `@tanstack/react-query` | ^5.83 | Data fetching |
| `@hookform/resolvers` | ^3.10 | Form validation |
| `zod` | ^3.25 | Schema validation |
| `recharts` | ^2.15 | Charts |
| `lucide-react` | ^0.462 | Icons |
| `sonner` | ^1.7 | Toast notifications |
| `next-themes` | ^0.3 | Dark mode |
| `react-hook-form` | ^7.61 | Form management |
| `clsx` | ^2.1 | Class merging |
| `date-fns` | ^3.6 | Date utilities |

### Dev Függőségek

- `@types/react` - React types
- `@types/node` - Node types
- `eslint` - Linting
- `typescript-eslint` - TS linting
- `autoprefixer` - CSS prefixing
- `postcss` - CSS processing

---

## 🚀 Migrációs Lépések

### 1. **Projekt Inicializálása**
\`\`\`bash
npx create-next-app@latest winmix-tipster-hub --typescript --tailwind
cd winmix-tipster-hub
\`\`\`

### 2. **Dependencies Telepítése**
\`\`\`bash
npm install @supabase/ssr @supabase/supabase-js
npm install @tanstack/react-query @hookform/resolvers zod
npm install recharts lucide-react sonner next-themes
npm install react-hook-form clsx class-variance-authority
npm install date-fns dompurify tinycolor2 lodash.debounce
\`\`\`

### 3. **Mappastruktúra Létrehozása**
- `app/` - Next.js App Router
- `components/` - React komponensek
- `services/` - API clients
- `lib/` - Utilities
- `hooks/` - Custom hooks
- `types/` - TypeScript típusok
- `public/` - Static assets

### 4. **Komponensek Migrálása**
\`\`\`
src/components/ → components/
src/pages/ → app/(authenticated)/[page]/page.tsx
src/integrations/ → services/
src/lib/ → lib/
src/hooks/ → hooks/
\`\`\`

### 5. **Routing Migrálása**
- React Router → Next.js App Router
- Pages & Routes átrendezése

### 6. **API Routes Létrehozása**
- `/api/` mappában végpontok
- Server-side logika implementálása

### 7. **Autentikálás Beállítása**
- Supabase auth
- Middleware konfigurációs
- Protected routes

### 8. **Testing & Deployment**
- Local testing
- Build & preview
- Vercel deployment

---

## 📊 Migrációs Összegzés

### Fájlok száma
- **UI Komponensek:** 50+
- **Feature Komponensek:** 30+
- **API Routes:** 30+
- **Hooks:** 8+
- **Services:** 10+
- **Typesz:** 5+

### Idő becslés
- **Projekt setup:** 1 nap
- **Komponensek:** 5 nap
- **API Routes:** 3 nap
- **Autentikálás:** 2 nap
- **Testing:** 2 nap
- **Deployment:** 1 nap
- **Teljes:** ~2 hét

---

## ✅ Ellenőrzőlista

- [ ] Next.js projekt inicializálva
- [ ] Supabase konfigurálva
- [ ] Mappastruktúra létrehozva
- [ ] Komponensek migrálva
- [ ] API Routes implementálva
- [ ] Autentikálás beállítva
- [ ] Environment variables konfigurálva
- [ ] Local testing sikeres
- [ ] Build sikeres
- [ ] Vercel deployment sikeres

---

## 📝 Megjegyzések

- A Next.js 16 App Router a legjobb választás
- Supabase auth integrálható közvetlenül
- shadcn/ui komponensek használhatóak
- Server Components & Server Actions ajánlottak
- Middleware a protected routes kezeléséhez

**Verzió:** 1.0  
**Utolsó frissítés:** 2025. november 3.
