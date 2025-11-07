"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

export default function TeamPatternsSection() {
  const homeFormData = [
    { match: "Last 5", wins: 4, draws: 1, losses: 0 },
    { match: "Last 10", wins: 7, draws: 2, losses: 1 },
    { match: "Last 20", wins: 12, draws: 5, losses: 3 },
  ]

  const patterns = [
    { name: "Home Dominance", confidence: 92, trend: "up" },
    { name: "First Half Goals", confidence: 78, trend: "stable" },
    { name: "Late Winners", confidence: 65, trend: "down" },
    { name: "Clean Sheets", confidence: 88, trend: "up" },
  ]

  const scoringPatterns = [
    { time: "0-15", goals: 12 },
    { time: "16-30", goals: 18 },
    { time: "31-45", goals: 22 },
    { time: "46-60", goals: 15 },
    { time: "61-75", goals: 20 },
    { time: "76-90", goals: 28 },
  ]

  return (
    <div className="space-y-6">
      <Tabs defaultValue="patterns" className="space-y-4">
        <TabsList>
          <TabsTrigger value="patterns">Pattern Overview</TabsTrigger>
          <TabsTrigger value="scoring">Scoring Patterns</TabsTrigger>
          <TabsTrigger value="form">Form Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="patterns" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {patterns.map((pattern, idx) => (
              <Card key={idx}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base">{pattern.name}</CardTitle>
                    <Badge variant={pattern.confidence > 80 ? "default" : "secondary"}>
                      {pattern.confidence}% confident
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Trend:</span>
                    <Badge variant="outline">{pattern.trend}</Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="scoring">
          <Card>
            <CardHeader>
              <CardTitle>Goals by Time Period</CardTitle>
              <CardDescription>Distribution of goals across match time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={scoringPatterns}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis dataKey="time" className="text-xs" />
                    <YAxis className="text-xs" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--background))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "6px",
                      }}
                    />
                    <Bar dataKey="goals" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="form">
          <Card>
            <CardHeader>
              <CardTitle>Recent Form Analysis</CardTitle>
              <CardDescription>Win/Draw/Loss distribution</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={homeFormData}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis dataKey="match" className="text-xs" />
                    <YAxis className="text-xs" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--background))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "6px",
                      }}
                    />
                    <Bar dataKey="wins" fill="hsl(var(--chart-1))" radius={[4, 4, 0, 0]} name="Wins" />
                    <Bar dataKey="draws" fill="hsl(var(--chart-2))" radius={[4, 4, 0, 0]} name="Draws" />
                    <Bar dataKey="losses" fill="hsl(var(--chart-3))" radius={[4, 4, 0, 0]} name="Losses" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
