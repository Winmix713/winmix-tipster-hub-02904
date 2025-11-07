import type { MatchResult } from "@/lib/teamStatistics"

export function getMatchHistory(team: string): MatchResult[] {
  // Mock data - in a real implementation, this would fetch from an API
  return [
    {
      team,
      opponent: "Team A",
      goalsFor: 2,
      goalsAgainst: 1,
      date: "2024-01-15",
      result: "W",
    },
    {
      team,
      opponent: "Team B",
      goalsFor: 1,
      goalsAgainst: 1,
      date: "2024-01-22",
      result: "D",
    },
    {
      team,
      opponent: "Team C",
      goalsFor: 0,
      goalsAgainst: 2,
      date: "2024-01-29",
      result: "L",
    },
  ]
}
