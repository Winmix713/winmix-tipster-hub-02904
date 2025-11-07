"use client"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"

const data = [
  { month: "Jan", homeWin: 68, draw: 45, awayWin: 62, btts: 71 },
  { month: "Feb", homeWin: 72, draw: 48, awayWin: 65, btts: 69 },
  { month: "Mar", homeWin: 70, draw: 52, awayWin: 68, btts: 74 },
  { month: "Apr", homeWin: 75, draw: 49, awayWin: 70, btts: 76 },
  { month: "May", homeWin: 78, draw: 51, awayWin: 72, btts: 78 },
  { month: "Jun", homeWin: 76, draw: 53, awayWin: 74, btts: 79 },
]

export default function PatternPerformanceChart() {
  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
          <XAxis dataKey="month" className="text-xs" />
          <YAxis className="text-xs" />
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(var(--background))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "6px",
            }}
          />
          <Legend />
          <Line type="monotone" dataKey="homeWin" stroke="hsl(var(--primary))" strokeWidth={2} name="Home Win" />
          <Line type="monotone" dataKey="draw" stroke="hsl(var(--chart-2))" strokeWidth={2} name="Draw" />
          <Line type="monotone" dataKey="awayWin" stroke="hsl(var(--chart-3))" strokeWidth={2} name="Away Win" />
          <Line type="monotone" dataKey="btts" stroke="hsl(var(--chart-4))" strokeWidth={2} name="BTTS" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
