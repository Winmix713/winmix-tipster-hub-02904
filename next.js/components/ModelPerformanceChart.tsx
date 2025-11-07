"use client"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"

export interface PerformancePoint {
  date: string
  accuracy: number
  confidence: number
}

interface ModelPerformanceChartProps {
  data?: PerformancePoint[]
  title?: string
}

const defaultData: PerformancePoint[] = [
  { date: "2024-01-01", accuracy: 72, confidence: 68 },
  { date: "2024-01-08", accuracy: 74, confidence: 71 },
  { date: "2024-01-15", accuracy: 76, confidence: 73 },
  { date: "2024-01-22", accuracy: 75, confidence: 72 },
  { date: "2024-01-29", accuracy: 78, confidence: 76 },
  { date: "2024-02-05", accuracy: 79, confidence: 77 },
]

export default function ModelPerformanceChart({
  data = defaultData,
  title = "Model Performance",
}: ModelPerformanceChartProps) {
  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
          <XAxis
            dataKey="date"
            className="text-xs"
            tickFormatter={(value) => new Date(value).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
          />
          <YAxis className="text-xs" domain={[0, 100]} />
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(var(--background))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "6px",
            }}
            labelFormatter={(value) => new Date(value).toLocaleDateString()}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="accuracy"
            stroke="hsl(var(--primary))"
            strokeWidth={2}
            name="Accuracy (%)"
            dot={{ fill: "hsl(var(--primary))" }}
          />
          <Line
            type="monotone"
            dataKey="confidence"
            stroke="hsl(var(--chart-2))"
            strokeWidth={2}
            name="Confidence (%)"
            dot={{ fill: "hsl(var(--chart-2))" }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export type { PerformancePoint }
