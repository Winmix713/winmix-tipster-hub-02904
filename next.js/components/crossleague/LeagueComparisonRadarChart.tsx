import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export interface LeagueRadarMetric {
  metric: string
  value: number
}

interface LeagueComparisonRadarChartProps {
  league1: string
  league2: string
  metrics: LeagueRadarMetric[]
}

export default function LeagueComparisonRadarChart({ league1, league2, metrics }: LeagueComparisonRadarChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {league1} vs {league2}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80 flex items-center justify-center text-muted-foreground">
          Radar chart placeholder - {metrics.length} metrics
        </div>
      </CardContent>
    </Card>
  )
}

export type { LeagueRadarMetric }
