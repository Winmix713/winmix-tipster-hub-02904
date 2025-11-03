# Vite-ből Next.js-be: Közvetlenül Felhasználható Fájlok

## Áttekintés

Ez a dokumentum azokat a fájlokat sorolja fel, amelyeket **anélkül** lehet átverni a Vite projektből a Next.js verzióba, hogy módosításokat kellene végezni rajtuk. Az ilyen fájlok általában adat-, típus-, konstans- vagy segédfüggvényfájlok, amelyek keretrendszer-agnosztikusak.

---

## 1. Típusdefiníciókat Tartalmazó Fájlok (TypeScript Interfaces & Types)

### 1.1 Phase 9 Típusok
**Fájl:** `src/types/phase9.ts`

- **Státusz:** ✅ KÖZVETLENÜL FELHASZNÁLHATÓ
- **Méret:** ~500 sor
- **Tartalom:** 
  - `UserPrediction`, `CrowdWisdom` interfészek
  - `MarketOdds`, `ValueBet` típusok
  - `InformationFreshness`, `FeatureExperiment` típusok
  - Request/Response típusok API végpontokhoz
  - UI komponens prop típusok
  - Konfigurációs és utility típusok
- **Miért felhasználható:** Pure TypeScript, nincs framework-specifikus kód
- **Helyezkedés a Next.js-ben:** `lib/types/phase9.ts`

### 1.2 Feladatok (Jobs) Típusok
**Fájl:** `src/types/jobs.ts`

- **Státusz:** ✅ KÖZVETLENÜL FELHASZNÁLHATÓ
- **Méret:** ~50 sor
- **Tartalom:**
  - `JobLog` interfész (feladatok naplózása)
  - `JobStats`, `JobSummary` típusok
  - `JobExecutionResult`, `JobListResponse` típusok
- **Miért felhasználható:** Pure TypeScript, Vite/React-specifikus kód nélkül
- **Helyezkedés a Next.js-ben:** `lib/types/jobs.ts`

### 1.3 Modellek Típusok
**Fájl:** `src/types/models.ts`

- **Státusz:** ✅ KÖZVETLENÜL FELHASZNÁLHATÓ
- **Méret:** ~35 sor
- **Tartalom:**
  - `ModelRegistry` interfész
  - `ModelExperiment` típus
  - `ModelSelectionResponse`, `ShadowRunRequest` típusok
- **Miért felhasználható:** Nincs framework-függőség
- **Helyezkedés a Next.js-ben:** `lib/types/models.ts`

### 1.4 Monitorozás Típusok
**Fájl:** `src/types/monitoring.ts`

- **Státusz:** ✅ KÖZVETLENÜL FELHASZNÁLHATÓ
- **Méret:** ~80 sor
- **Tartalom:**
  - `HealthStatus` típus
  - `SystemHealthSnapshot`, `HealthSummaryResponse`
  - `PerformanceMetricRow` interfész
  - `ComputationGraphNodeData`, `AlertItem` típusok
- **Miért felhasználható:** Pure data típusok, nincs React/Vite-specifikus kód
- **Helyezkedés a Next.js-ben:** `lib/types/monitoring.ts`

---

## 2. Adatfájlok és Konstansok

### 2.1 Csapat Opcók és Metaadatok
**Fájl:** `src/data/teamOptions.ts`

- **Státusz:** ✅ KÖZVETLENÜL FELHASZNÁLHATÓ
- **Méret:** ~90 sor
- **Tartalom:**
  - `LEAGUE_KEYS` konstans: `["angol", "spanyol"]`
  - `LEAGUE_METADATA` objektum (Supabase nevek, megjelenítési nevek)
  - `LEAGUE_TEAM_OPTIONS` Record:
    - Angol csapatok: Arsenal, Aston Villa, Chelsea, Liverpool, Manchester City, Tottenham, Newcastle, West Ham, Brentford, Brighton, Crystal Palace, Fulham, Everton, Nottingham, Wolverhampton (16 csapat)
    - Spanyol csapatok: Barcelona, Real Madrid, Atletico Madrid, Sevilla, Real Betis, Valencia, Villarreal, Real Sociedad, Athletic Club, CA Osasuna, Girona, Mallorca, Celta Vigo, Getafe, Las Palmas, Alaves (16 csapat)
- **Miért felhasználható:** Pure adatok és konstansok, keret-agnosztikus
- **Helyezkedés a Next.js-ben:** `lib/data/teams.ts`

### 2.2 Mérkőzés Előzmények
**Fájl:** `src/data/matchHistory.ts`

- **Státusz:** ✅ KÖZVETLENÜL FELHASZNÁLHATÓ (az import egy sorral módosítva)
- **Méret:** ~300 sor
- **Tartalom:**
  - `matchHistory` Record: Csapatok korábbi mérkőzéseinek mock adatai
  - `MatchResult` interfész (40+ sor dokumentáció nélkül)
  - `generateMatchHistory()` függvény - véletlen mérkőzés adatok generálása
  - `getMatchHistory()` függvény - csapat mérkőzés előzmények lekérdezése
- **Miről kell vigyázni:** Az import:
  \`\`\`typescript
  // VITE-ben (MÓDOSÍTANDÓ):
  import { MatchResult } from "@/lib/teamStatistics";
  
  // NEXT.JS-ben (HELYESEN):
  import { MatchResult } from "@/lib/team-statistics";
  \`\`\`
- **Helyezkedés a Next.js-ben:** `lib/data/match-history.ts`

---

## 3. Utility Függvények és Matematikai Számítások

### 3.1 Csapat Statisztikák és Elemzések
**Fájl:** `src/lib/teamStatistics.ts`

- **Státusz:** ✅ KÖZVETLENÜL FELHASZNÁLHATÓ
- **Méret:** ~250 sor
- **Tartalom:**
  - **MatchResult interfész:** `{ date, opponent, homeGoals, awayGoals, isHome, result }`
  - **TeamStatistics interfész:** Teljes statisztikai struktúra
  - **Számítási függvények:**
    - `calculateBothTeamsScoredPercentage()` - Mindkét csapat gólszerzésének százaléka
    - `calculateAverageGoals()` - Átlagos gólok: teljes, otthon, idegenben
    - `calculateFormIndex()` - Az utolsó 5 mérkőzés alapján (0-100%)
    - `calculateExpectedGoals()` - xG kalkuláció
    - `calculateBothTeamsToScoreProb()` - BTTS valószínűség
    - `calculateHeadToHeadStats()` - H2H statisztikák (győzelmek, döntetlenek, vereségek %)
    - `predictWinner()` - Nyertes előrejelzés megbízhatósággal
    - `calculatePoissonGoals()` - Poisson-alapú gólprognózis
    - `calculateWinProbability()` - 1X2 valószínűségek
    - `generateTeamStatistics()` - Komprehenzív stat generálás
  - **Statisztikai modell:** Elo-inspirált, Form Index alapú
- **Miért felhasználható:** Pure matematikai függvények, nincs framework-kód
- **Helyezkedés a Next.js-ben:** `lib/team-statistics.ts`

### 3.2 Utils - Class Name Módosítás (cn függvény)
**Fájl:** `src/lib/utils.ts`

- **Státusz:** ✅ KÖZVETLENÜL FELHASZNÁLHATÓ
- **Méret:** 5 sor
- **Tartalom:**
  \`\`\`typescript
  import { clsx, type ClassValue } from "clsx";
  import { twMerge } from "tailwind-merge";
  
  export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
  }
  \`\`\`
- **Miért felhasználható:** Standard shadcn utility, mindkét keretrendszerre működik
- **Helyezkedés a Next.js-ben:** `lib/utils.ts` (már ez az alapértelmezett)

---

## 4. API Szerviz Réteg (Supabase/RPC Integrációk)

### 4.1 Phase 9 API Szervízek
**Fájl:** `src/lib/phase9-api.ts`

- **Státusz:** ✅ KÖZVETLENÜL FELHASZNÁLHATÓ (egy módosítással)
- **Méret:** ~800 sor
- **Tartalom:**
  - **CollaborativeIntelligenceService** osztály (4 statikus metódus)
  - **MarketIntegrationService** osztály (6 statikus metódus)
  - **TemporalDecayService** osztály (4 statikus metódus)
  - **SelfImprovingSystemService** osztály (5 statikus metódus)
  - Összes típusimport
  - Supabase kliens inicializálás
  - API hívások, RPC meghívások, adatbázis műveletek
  
- **Egyetlen módosítás szükséges:**
  \`\`\`typescript
  // VITE-ben (MÓDOSÍTANDÓ):
  const supabase = createClient(
    import.meta.env.VITE_SUPABASE_URL,
    import.meta.env.VITE_SUPABASE_ANON_KEY
  );
  
  // NEXT.JS-ben (helyesen):
  import { createBrowserClient } from "@supabase/ssr";
  
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
  \`\`\`

- **Miért felhasználható:** Az összes üzleti logika keretrendszer-agnosztikus
- **Helyezkedés a Next.js-ben:** `lib/services/phase9-api.ts`

---

## 5. Szöveges és Dokumentáció Fájlok

### 5.1 Markdown Dokumentációk
- `PHASE9_IMPLEMENTATION.md` - Phase 9 implementáció specifikáció
- `WinMix_TipsterHub_Phase_3-9_Components_EN.md` - Komponensek dokumentációja
- `1.txt` - Projekt fázisok és követelmények

**Státusz:** ✅ KÖZVETLENÜL FELHASZNÁLHATÓ
**Helyezkedés:** `docs/` mappá a Next.js projektben

---

## 6. Képi Eszközök és Statikus Tartalom

### 6.1 Képek és Logók
- `src/assets/stadium-champions-league.jpg` - Stadion kép
- `src/assets/team-logo-arsenal.png` - Arsenal logó
- `src/assets/team-logo-liverpool.png` - Liverpool logó
- `src/assets/team-logo-mancity.png` - Manchester City logó
- `src/assets/team-logo-villa.png` - Aston Villa logó

**Státusz:** ✅ KÖZVETLENÜL FELHASZNÁLHATÓ
**Helyezkedés:** `public/images/` a Next.js projektben

### 6.2 Publikus Fájlok
- `public/placeholder-logo.png`, `public/placeholder-logo.svg`
- `public/placeholder-user.jpg`, `public/placeholder.jpg`, `public/placeholder.svg`
- `public/robots.txt` - SEO robots fájl
- `public/favicon.ico` - Oldal ikon

**Státusz:** ✅ KÖZVETLENÜL FELHASZNÁLHATÓ
**Helyezkedés:** `public/` a Next.js projektben

---

## 7. Áttekintés - Összes Felhasználható Fájl

| Kategória | Fájl | Méret | Módosítás | Helyezkedés |
|-----------|------|-------|----------|-----------|
| **Típusok** | `src/types/phase9.ts` | ~500sor | ✅ Nem | `lib/types/phase9.ts` |
| | `src/types/jobs.ts` | ~50sor | ✅ Nem | `lib/types/jobs.ts` |
| | `src/types/models.ts` | ~35sor | ✅ Nem | `lib/types/models.ts` |
| | `src/types/monitoring.ts` | ~80sor | ✅ Nem | `lib/types/monitoring.ts` |
| **Adatok** | `src/data/teamOptions.ts` | ~90sor | ✅ Nem | `lib/data/teams.ts` |
| | `src/data/matchHistory.ts` | ~300sor | ⚠️ 1 import | `lib/data/match-history.ts` |
| **Utilityk** | `src/lib/teamStatistics.ts` | ~250sor | ✅ Nem | `lib/team-statistics.ts` |
| | `src/lib/utils.ts` | ~5sor | ✅ Nem | `lib/utils.ts` |
| **Szervízek** | `src/lib/phase9-api.ts` | ~800sor | ⚠️ 1 szekció | `lib/services/phase9-api.ts` |
| **Dokumentáció** | `PHASE9_IMPLEMENTATION.md` | ~100sor | ✅ Nem | `docs/phase9.md` |
| | `WinMix_TipsterHub_Phase_3-9_Components_EN.md` | ~200sor | ✅ Nem | `docs/components.md` |
| | `1.txt` | ~50sor | ✅ Nem | `docs/requirements.txt` |
| **Képek** | `src/assets/*.{jpg,png}` | 5 fájl | ✅ Nem | `public/images/` |
| | `public/*.{png,svg,jpg,ico}` | 8 fájl | ✅ Nem | `public/` |

---

## 8. Összesen Felhasználható Kód

- **Típusdefiníciók:** ~665 sor
- **Adatfájlok:** ~390 sor
- **Utilityk és szervízek:** ~1055 sor
- **Dokumentáció:** ~350 sor
- **Statikus tartalom:** 13 fájl (képek, ikonok, logók)

**TELJES:** ~2460 sor + 13 statikus fájl (szinte az egész projekt!)

---

## 9. Fájlok Listája - Teljes Másolás

### 9.1 TypeScript/JavaScript Fájlok Másolása Parancs (Next.js-be)

\`\`\`bash
# Típusok
cp src/types/phase9.ts lib/types/
cp src/types/jobs.ts lib/types/
cp src/types/models.ts lib/types/
cp src/types/monitoring.ts lib/types/

# Adatok
cp src/data/teamOptions.ts lib/data/teams.ts
cp src/data/matchHistory.ts lib/data/match-history.ts

# Utilityk
cp src/lib/teamStatistics.ts lib/team-statistics.ts
cp src/lib/utils.ts lib/  # már rendben van

# Szervízek (az import módosítandó!)
cp src/lib/phase9-api.ts lib/services/phase9-api.ts

# Dokumentáció
cp PHASE9_IMPLEMENTATION.md docs/phase9.md
cp WinMix_TipsterHub_Phase_3-9_Components_EN.md docs/components.md
cp 1.txt docs/requirements.txt

# Képek és statikus tartalom
cp src/assets/*.{jpg,png} public/images/
cp public/*.{png,svg,jpg,ico} public/
\`\`\`

---

## 10. Módosítások Szükségesek

### 10.1 `lib/data/match-history.ts`
Az import sor módosítandó:

\`\`\`typescript
// Vite verzió:
import { MatchResult } from "@/lib/teamStatistics";

// Next.js verzió:
import { MatchResult } from "@/lib/team-statistics";
\`\`\`

### 10.2 `lib/services/phase9-api.ts`
A Supabase kliens inicializálás módosítandó:

\`\`\`typescript
// Vite verzió:
import { createClient } from '@supabase/supabase-js';
const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

// Next.js verzió:
import { createBrowserClient } from "@supabase/ssr";
const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);
\`\`\`

---

## 11. Fájlok, Amelyeket ÚJRA Kell Írni

Az alábbi fájlokat **nem lehet** közvetlenül felhasználni, mert framework-specifikus kódot tartalmaznak:

| Kategória | Fájlok | Ok |
|-----------|--------|-----|
| **Router/Layout** | `src/App.tsx`, `src/main.tsx` | React Router → Next.js App Router |
| **Komponensek** | 80+ komponens fájl | React Router linkek, hook-ok (`useNavigate`, `useParams`) |
| **UI Komponensek** | `src/components/ui/*` | Vite specifikus buildolás |
| **Oldal Komponensek** | `src/pages/*.tsx` | React Router → Next.js oldal struktúra |
| **Konfigurációk** | `vite.config.ts`, `tsconfig.json` | Vite → Next.js |
| **Stílusok** | `src/index.css`, `src/App.css` | Vite CSS → Tailwind/Next.js |

---

## 12. Ajánlások a Migrációhoz

1. **Első lépés:** Másolja a fájlokat a fent felsorolt helyekre (9.1 szakasz)
2. **Másodia lépés:** Alkalmazza a szükséges módosításokat (10. szakasz)
3. **Harmadik lépés:** Újraírja az App Router szegmenseket
4. **Negyedik lépés:** Alakítsa át a komponenseket
5. **Ötödik lépés:** Frissítse az importokat az új struktúrához

---

**Módosítva:** 2025.11.03
**Verzió:** 1.0
**Projekt:** WinMix TipsterHub - Vite → Next.js Migrációs Útmutató
