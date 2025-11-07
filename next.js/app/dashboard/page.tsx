import { Suspense } from "react"
import type { Metadata } from "next"
import StatisticsCards from "@/components/dashboard/StatisticsCards"
import RecentPredictions from "@/components/dashboard/RecentPredictions"
import PatternPerformanceChart from "@/components/dashboard/PatternPerformanceChart"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export const metadata: Metadata = {
  title: "Dashboard | WinMix TipsterHub",
  description: "View your prediction statistics and performance metrics",
}

function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      <Skeleton className="h-8 w-64" />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <Skeleton key={i} className="h-32" />
        ))}
      </div>
      <Skeleton className="h-96" />
    </div>
  )
}

export default function DashboardPage() {
  return (
    <div className="container mx-auto p-6 space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground mt-2">Overview of your prediction performance and statistics</p>
      </div>

      <Suspense fallback={<DashboardSkeleton />}>
        <div className="space-y-6">
          <StatisticsCards />

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Pattern Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <PatternPerformanceChart />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Predictions</CardTitle>
              </CardHeader>
              <CardContent>
                <RecentPredictions />
              </CardContent>
            </Card>
          </div>
        </div>
      </Suspense>
    </div>
  )
}
