import StatCard from "@/components/StatCard"
import { TrendingUp, Target, Cpu, Trophy } from "lucide-react"

export default function StatisticsCards() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <StatCard
        title="Total Predictions"
        value="1,234"
        description="+12% from last month"
        icon={<Target className="h-4 w-4 text-muted-foreground" />}
        trend="up"
      />
      <StatCard
        title="Accuracy Rate"
        value="78.5%"
        description="+2.3% from last month"
        icon={<TrendingUp className="h-4 w-4 text-muted-foreground" />}
        trend="up"
      />
      <StatCard
        title="Active Models"
        value="8"
        description="3 champion, 5 challenger"
        icon={<Cpu className="h-4 w-4 text-muted-foreground" />}
      />
      <StatCard
        title="Win Rate"
        value="65.2%"
        description="+5% from last month"
        icon={<Trophy className="h-4 w-4 text-muted-foreground" />}
        trend="up"
      />
    </div>
  )
}
