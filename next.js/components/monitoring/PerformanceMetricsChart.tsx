"use client"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"

export interface MetricsPoint {
  timestamp: string
  responseTime: number
  throughput: number
}

interface PerformanceMetricsChartProps {
  data?: MetricsPoint[]
}

const defaultData: MetricsPoint[] = [
  { timestamp: "00:00", responseTime: 145, throughput: 1250 },
  { timestamp: "04:00", responseTime: 132, throughput: 980 },
  { timestamp: "08:00", responseTime: 178, throughput: 1580 },
  { timestamp: "12:00", responseTime: 203, throughput: 1890 },
  { timestamp: "16:00", responseTime: 198, throughput: 1760 },
  { timestamp: "20:00", responseTime: 165, throughput: 1420 },
  { timestamp: "23:59", responseTime: 142, throughput: 1180 },
]

export default function PerformanceMetricsChart({ data = defaultData }: PerformanceMetricsChartProps) {
  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorResponseTime" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
              <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorThroughput" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(var(--chart-2))" stopOpacity={0.3} />
              <stop offset="95%" stopColor="hsl(var(--chart-2))" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
          <XAxis dataKey="timestamp" className="text-xs" />
          <YAxis yAxisId="left" className="text-xs" />
          <YAxis yAxisId="right" orientation="right" className="text-xs" />
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(var(--background))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "6px",
            }}
          />
          <Legend />
          <Area
            yAxisId="left"
            type="monotone"
            dataKey="responseTime"
            stroke="hsl(var(--primary))"
            fillOpacity={1}
            fill="url(#colorResponseTime)"
            name="Response Time (ms)"
          />
          <Area
            yAxisId="right"
            type="monotone"
            dataKey="throughput"
            stroke="hsl(var(--chart-2))"
            fillOpacity={1}
            fill="url(#colorThroughput)"
            name="Throughput (req/s)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}

export type { MetricsPoint }
