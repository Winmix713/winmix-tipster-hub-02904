import type { Metadata } from "next"
import MatchSelection from "@/components/MatchSelection"
import PredictionDisplay from "@/components/PredictionDisplay"
import FeedbackForm from "@/components/FeedbackForm"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "Create Prediction | WinMix TipsterHub",
  description: "Create new match predictions with AI-powered analysis",
}

export default function PredictionsPage() {
  return (
    <div className="container mx-auto p-6 space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Create Prediction</h1>
        <p className="text-muted-foreground mt-2">Select a match and get AI-powered predictions and analysis</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Match Selection</CardTitle>
              <CardDescription>Choose teams and match details to generate predictions</CardDescription>
            </CardHeader>
            <CardContent>
              <MatchSelection />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Prediction Results</CardTitle>
              <CardDescription>AI-generated analysis and betting tips</CardDescription>
            </CardHeader>
            <CardContent>
              <PredictionDisplay />
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Feedback</CardTitle>
              <CardDescription>Help us improve our predictions</CardDescription>
            </CardHeader>
            <CardContent>
              <FeedbackForm />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
