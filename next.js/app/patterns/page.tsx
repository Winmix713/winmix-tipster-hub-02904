import type { Metadata } from "next"
import TeamPatternsSection from "@/components/patterns/TeamPatternsSection"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "Pattern Analysis | WinMix TipsterHub",
  description: "Discover and analyze team patterns",
}

export default function PatternsPage() {
  return (
    <div className="container mx-auto p-6 space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Pattern Analysis</h1>
        <p className="text-muted-foreground mt-2">Deep dive into team performance patterns and trends</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Team Patterns</CardTitle>
          <CardDescription>Analyze historical patterns and performance trends</CardDescription>
        </CardHeader>
        <CardContent>
          <TeamPatternsSection />
        </CardContent>
      </Card>
    </div>
  )
}
