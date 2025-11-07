// Team statistics calculation utilities

export interface MatchResult {
  team: string
  opponent: string
  goalsFor: number
  goalsAgainst: number
  date: string
  result: "W" | "D" | "L"
}

export interface TeamStatistics {
  team: string
  matchesPlayed: number
  wins: number
  draws: number
  losses: number
  goalsFor: number
  goalsAgainst: number
  goalDifference: number
  averageGoalsScored: number
  averageGoalsConceded: number
  bothTeamsScored: number
  bothTeamsScoredPercentage: number
  form: string[]
}

export interface HeadToHeadStats {
  totalMatches: number
  team1Wins: number
  team2Wins: number
  draws: number
  team1GoalsScored: number
  team2GoalsScored: number
  averageGoals: number
}

export function calculateAverageGoals(matches: MatchResult[]): { for: number; against: number } {
  if (matches.length === 0) return { for: 0, against: 0 }

  const totalGoalsFor = matches.reduce((sum, match) => sum + match.goalsFor, 0)
  const totalGoalsAgainst = matches.reduce((sum, match) => sum + match.goalsAgainst, 0)

  return {
    for: totalGoalsFor / matches.length,
    against: totalGoalsAgainst / matches.length,
  }
}

export function calculateBothTeamsScoredPercentage(matches: MatchResult[]): number {
  if (matches.length === 0) return 0

  const bothScored = matches.filter((match) => match.goalsFor > 0 && match.goalsAgainst > 0).length
  return (bothScored / matches.length) * 100
}

export function calculateExpectedGoals(
  team: string,
  opponent: string,
  matches: MatchResult[],
): { team: number; opponent: number } {
  const avgGoals = calculateAverageGoals(matches)
  return {
    team: avgGoals.for,
    opponent: avgGoals.against,
  }
}

export function calculateWinProbability(
  team1: string,
  team2: string,
  matches: MatchResult[],
): { team1: number; draw: number; team2: number } {
  if (matches.length === 0) return { team1: 33.33, draw: 33.33, team2: 33.33 }

  const team1Wins = matches.filter((m) => m.result === "W" && m.team === team1).length
  const draws = matches.filter((m) => m.result === "D").length
  const team2Wins = matches.filter((m) => m.result === "W" && m.team === team2).length

  const total = matches.length

  return {
    team1: (team1Wins / total) * 100,
    draw: (draws / total) * 100,
    team2: (team2Wins / total) * 100,
  }
}

export function calculatePoissonGoals(averageGoals: number): number[] {
  // Simplified Poisson distribution calculation
  const probabilities: number[] = []
  for (let i = 0; i <= 5; i++) {
    const prob = (Math.pow(averageGoals, i) * Math.exp(-averageGoals)) / factorial(i)
    probabilities.push(prob * 100)
  }
  return probabilities
}

function factorial(n: number): number {
  if (n <= 1) return 1
  return n * factorial(n - 1)
}

export function generateTeamStatistics(matches: MatchResult[]): TeamStatistics {
  if (matches.length === 0) {
    return {
      team: "",
      matchesPlayed: 0,
      wins: 0,
      draws: 0,
      losses: 0,
      goalsFor: 0,
      goalsAgainst: 0,
      goalDifference: 0,
      averageGoalsScored: 0,
      averageGoalsConceded: 0,
      bothTeamsScored: 0,
      bothTeamsScoredPercentage: 0,
      form: [],
    }
  }

  const wins = matches.filter((m) => m.result === "W").length
  const draws = matches.filter((m) => m.result === "D").length
  const losses = matches.filter((m) => m.result === "L").length
  const goalsFor = matches.reduce((sum, m) => sum + m.goalsFor, 0)
  const goalsAgainst = matches.reduce((sum, m) => sum + m.goalsAgainst, 0)
  const bothTeamsScored = matches.filter((m) => m.goalsFor > 0 && m.goalsAgainst > 0).length

  return {
    team: matches[0]?.team || "",
    matchesPlayed: matches.length,
    wins,
    draws,
    losses,
    goalsFor,
    goalsAgainst,
    goalDifference: goalsFor - goalsAgainst,
    averageGoalsScored: goalsFor / matches.length,
    averageGoalsConceded: goalsAgainst / matches.length,
    bothTeamsScored,
    bothTeamsScoredPercentage: (bothTeamsScored / matches.length) * 100,
    form: matches.slice(-5).map((m) => m.result),
  }
}

export function generateTeamStatisticsLegacy(matches: MatchResult[]): TeamStatistics {
  return generateTeamStatistics(matches)
}

export function calculateHeadToHeadStats(team1: string, team2: string, matches: MatchResult[]): HeadToHeadStats {
  const relevantMatches = matches.filter(
    (m) => (m.team === team1 && m.opponent === team2) || (m.team === team2 && m.opponent === team1),
  )

  const team1Wins = relevantMatches.filter((m) => m.team === team1 && m.result === "W").length
  const team2Wins = relevantMatches.filter((m) => m.team === team2 && m.result === "W").length
  const draws = relevantMatches.filter((m) => m.result === "D").length
  const team1Goals = relevantMatches.filter((m) => m.team === team1).reduce((sum, m) => sum + m.goalsFor, 0)
  const team2Goals = relevantMatches.filter((m) => m.team === team2).reduce((sum, m) => sum + m.goalsFor, 0)

  return {
    totalMatches: relevantMatches.length,
    team1Wins,
    team2Wins,
    draws,
    team1GoalsScored: team1Goals,
    team2GoalsScored: team2Goals,
    averageGoals: relevantMatches.length > 0 ? (team1Goals + team2Goals) / relevantMatches.length : 0,
  }
}

export function predictWinner(
  team1: string,
  team2: string,
  matches: MatchResult[],
): { winner: string | null; confidence: number } {
  const probabilities = calculateWinProbability(team1, team2, matches)

  if (probabilities.team1 > probabilities.team2 && probabilities.team1 > probabilities.draw) {
    return { winner: team1, confidence: probabilities.team1 }
  } else if (probabilities.team2 > probabilities.team1 && probabilities.team2 > probabilities.draw) {
    return { winner: team2, confidence: probabilities.team2 }
  }

  return { winner: null, confidence: probabilities.draw }
}
