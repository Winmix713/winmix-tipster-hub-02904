export interface LeagueMetadata {
  name: string
  country: string
  tier: number
  teams: number
}

export const LEAGUE_METADATA: Record<string, LeagueMetadata> = {
  "Premier League": {
    name: "Premier League",
    country: "England",
    tier: 1,
    teams: 20,
  },
  "La Liga": {
    name: "La Liga",
    country: "Spain",
    tier: 1,
    teams: 20,
  },
  Bundesliga: {
    name: "Bundesliga",
    country: "Germany",
    tier: 1,
    teams: 18,
  },
  "Serie A": {
    name: "Serie A",
    country: "Italy",
    tier: 1,
    teams: 20,
  },
  "Ligue 1": {
    name: "Ligue 1",
    country: "France",
    tier: 1,
    teams: 18,
  },
}

export const LEAGUE_TEAM_OPTIONS: Record<string, string[]> = {
  "Premier League": [
    "Arsenal",
    "Aston Villa",
    "Bournemouth",
    "Brentford",
    "Brighton",
    "Chelsea",
    "Crystal Palace",
    "Everton",
    "Fulham",
    "Liverpool",
    "Manchester City",
    "Manchester United",
    "Newcastle",
    "Nottingham Forest",
    "Southampton",
    "Tottenham",
    "West Ham",
    "Wolves",
  ],
  "La Liga": ["Athletic Bilbao", "Atletico Madrid", "Barcelona", "Real Madrid", "Sevilla", "Valencia", "Villarreal"],
  Bundesliga: ["Bayern Munich", "Borussia Dortmund", "RB Leipzig", "Bayer Leverkusen"],
  "Serie A": ["AC Milan", "Inter Milan", "Juventus", "Napoli", "Roma"],
  "Ligue 1": ["Lyon", "Marseille", "Monaco", "PSG"],
}
