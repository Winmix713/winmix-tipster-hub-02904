import type { Metadata } from "next"
import CorrelationHeatmap from "@/components/crossleague/CorrelationHeatmap"
import LeagueComparisonRadarChart from "@/components/crossleague/LeagueComparisonRadarChart"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "Cross-League Analysis | WinMix TipsterHub",
  description: "Compare statistics across different leagues",
}

export default function CrossLeaguePage() {
  return (
    <div className="container mx-auto p-6 space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Cross-League Analysis</h1>
        <p className="text-muted-foreground mt-2">Compare and analyze statistics across different leagues</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>League Comparison Radar</CardTitle>
          <CardDescription>Visual comparison of key metrics across leagues</CardDescription>
        </CardHeader>
        <CardContent>
          <LeagueComparisonRadarChart />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Correlation Heatmap</CardTitle>
          <CardDescription>Statistical correlations between leagues</CardDescription>
        </CardHeader>
        <CardContent>
          <CorrelationHeatmap />
        </CardContent>
      </Card>
    </div>
  )
}
