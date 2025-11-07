"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Brain, Zap, Target, TrendingUp } from "lucide-react"

export function Phase9Dashboard() {
  const experiments = [
    { name: "Deep Learning Model", status: "active", progress: 78, accuracy: 82.3 },
    { name: "Ensemble Predictor", status: "testing", progress: 45, accuracy: 79.1 },
    { name: "Neural Network v2", status: "completed", progress: 100, accuracy: 85.7 },
  ]

  const features = [
    { name: "Advanced Pattern Recognition", enabled: true, performance: 89 },
    { name: "Real-time Predictions", enabled: true, performance: 92 },
    { name: "Multi-league Analysis", enabled: false, performance: 0 },
    { name: "Sentiment Analysis", enabled: true, performance: 76 },
  ]

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Experiments</CardTitle>
            <Brain className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">2 in progress</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Best Accuracy</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">85.7%</div>
            <p className="text-xs text-muted-foreground">Neural Network v2</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Features Enabled</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3/4</div>
            <p className="text-xs text-muted-foreground">75% active</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Performance</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">85.7%</div>
            <p className="text-xs text-muted-foreground text-green-600">+3.2% vs baseline</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="experiments" className="space-y-4">
        <TabsList>
          <TabsTrigger value="experiments">Experiments</TabsTrigger>
          <TabsTrigger value="features">Features</TabsTrigger>
          <TabsTrigger value="insights">Insights</TabsTrigger>
        </TabsList>

        <TabsContent value="experiments" className="space-y-4">
          {experiments.map((exp, idx) => (
            <Card key={idx}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg">{exp.name}</CardTitle>
                    <CardDescription>Accuracy: {exp.accuracy}%</CardDescription>
                  </div>
                  <Badge
                    variant={exp.status === "active" ? "default" : exp.status === "completed" ? "secondary" : "outline"}
                  >
                    {exp.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="font-medium">{exp.progress}%</span>
                  </div>
                  <Progress value={exp.progress} />
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="features" className="space-y-4">
          {features.map((feature, idx) => (
            <Card key={idx}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">{feature.name}</CardTitle>
                  <Badge variant={feature.enabled ? "default" : "secondary"}>
                    {feature.enabled ? "Enabled" : "Disabled"}
                  </Badge>
                </div>
              </CardHeader>
              {feature.enabled && (
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Performance</span>
                      <span className="font-medium">{feature.performance}%</span>
                    </div>
                    <Progress value={feature.performance} />
                  </div>
                </CardContent>
              )}
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="insights">
          <Card>
            <CardHeader>
              <CardTitle>Key Insights</CardTitle>
              <CardDescription>Data-driven discoveries from Phase 9 experiments</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border-l-4 border-primary pl-4">
                <p className="font-medium">Neural Network v2 outperforms baseline by 8.2%</p>
                <p className="text-sm text-muted-foreground mt-1">
                  The new neural network architecture shows significant improvements in predicting away wins
                </p>
              </div>
              <div className="border-l-4 border-chart-2 pl-4">
                <p className="font-medium">Pattern recognition enhances BTTS predictions</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Advanced pattern analysis improves Both Teams To Score accuracy by 12%
                </p>
              </div>
              <div className="border-l-4 border-chart-3 pl-4">
                <p className="font-medium">Sentiment analysis shows promise</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Integrating social media sentiment improves confidence scoring
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
