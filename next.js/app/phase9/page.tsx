import type { Metadata } from "next"
import { Phase9Dashboard } from "@/components/phase9"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "Phase 9 Analytics | WinMix TipsterHub",
  description: "Advanced analytics and experimental features",
}

export default function Phase9Page() {
  return (
    <div className="container mx-auto p-6 space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Phase 9 Analytics</h1>
        <p className="text-muted-foreground mt-2">Advanced experimental features and analytics</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Phase 9 Dashboard</CardTitle>
          <CardDescription>Cutting-edge prediction features and experiments</CardDescription>
        </CardHeader>
        <CardContent>
          <Phase9Dashboard />
        </CardContent>
      </Card>
    </div>
  )
}
