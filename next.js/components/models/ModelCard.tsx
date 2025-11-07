import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { TrendingUp, Calendar, Activity } from "lucide-react"

interface ModelCardProps {
  name?: string
  version?: string
  accuracy?: number
  type?: "champion" | "challenger"
}

export default function ModelCard({
  name = "Prediction Model",
  version = "1.0.0",
  accuracy = 78.5,
  type = "champion",
}: ModelCardProps = {}) {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg">{name}</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">v{version}</p>
          </div>
          <Badge variant={type === "champion" ? "default" : "secondary"} className="capitalize">
            {type}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground flex items-center gap-1">
              <TrendingUp className="h-3 w-3" />
              Accuracy
            </span>
            <span className="font-semibold">{accuracy}%</span>
          </div>
          <Progress value={accuracy} className="h-2" />
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-muted-foreground flex items-center gap-1 mb-1">
              <Activity className="h-3 w-3" />
              Predictions
            </p>
            <p className="font-semibold">1,247</p>
          </div>
          <div>
            <p className="text-muted-foreground flex items-center gap-1 mb-1">
              <Calendar className="h-3 w-3" />
              Last Updated
            </p>
            <p className="font-semibold">2 days ago</p>
          </div>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="flex-1 bg-transparent">
            View Details
          </Button>
          {type === "challenger" && (
            <Button size="sm" className="flex-1">
              Promote
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
