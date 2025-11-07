import type { Metadata } from "next"
import SystemHealthCard from "@/components/monitoring/SystemHealthCard"
import PerformanceMetricsChart from "@/components/monitoring/PerformanceMetricsChart"
import ComputationMapDashboard from "@/components/monitoring/ComputationMapDashboard"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "System Monitoring | WinMix TipsterHub",
  description: "Monitor system health and performance metrics",
}

export default function MonitoringPage() {
  return (
    <div className="container mx-auto p-6 space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">System Monitoring</h1>
        <p className="text-muted-foreground mt-2">Real-time system health and performance monitoring</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <SystemHealthCard />
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Quick Stats</CardTitle>
            <CardDescription>System overview</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Uptime</span>
              <span className="font-semibold">99.9%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">API Response</span>
              <span className="font-semibold">234ms</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Active Users</span>
              <span className="font-semibold">1,247</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Performance Metrics</CardTitle>
          <CardDescription>Historical performance data</CardDescription>
        </CardHeader>
        <CardContent>
          <PerformanceMetricsChart />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Computation Map</CardTitle>
          <CardDescription>System computation flow visualization</CardDescription>
        </CardHeader>
        <CardContent>
          <ComputationMapDashboard />
        </CardContent>
      </Card>
    </div>
  )
}
