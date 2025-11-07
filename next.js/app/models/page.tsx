import type { Metadata } from "next"
import ModelCard from "@/components/models/ModelCard"
import ModelPerformanceChart from "@/components/ModelPerformanceChart"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export const metadata: Metadata = {
  title: "AI Models | WinMix TipsterHub",
  description: "Manage and monitor AI prediction models",
}

export default function ModelsPage() {
  return (
    <div className="container mx-auto p-6 space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">AI Models</h1>
        <p className="text-muted-foreground mt-2">Manage prediction models and view their performance</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <ModelCard />
        <ModelCard />
        <ModelCard />
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Model Performance Comparison</CardTitle>
              <CardDescription>Accuracy trends over time</CardDescription>
            </div>
            <Badge variant="outline">Last 30 days</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <ModelPerformanceChart />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Model Registry</CardTitle>
          <CardDescription>All registered prediction models</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {["Champion Model", "Challenger Model A", "Challenger Model B", "Baseline Model"].map((model, idx) => (
              <div key={idx} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <p className="font-medium">{model}</p>
                  <p className="text-sm text-muted-foreground">Version 1.{idx + 2}.0</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-sm font-medium">{(85 + idx * 2).toFixed(1)}%</p>
                    <p className="text-xs text-muted-foreground">Accuracy</p>
                  </div>
                  <Badge variant={idx === 0 ? "default" : "secondary"}>{idx === 0 ? "Active" : "Testing"}</Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
