import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { CheckCircle2 } from "lucide-react"

export default function SystemHealthCard() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>System Health</CardTitle>
          <Badge variant="default" className="gap-1">
            <CheckCircle2 className="h-3 w-3" />
            Healthy
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">API Status:</span>
              <span className="text-green-600 font-medium">Operational</span>
            </div>
            <Progress value={99} className="h-2" />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Database:</span>
              <span className="text-green-600 font-medium">Connected</span>
            </div>
            <Progress value={98} className="h-2" />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Cache:</span>
              <span className="text-green-600 font-medium">Active</span>
            </div>
            <Progress value={95} className="h-2" />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Queue:</span>
              <span className="text-green-600 font-medium">Running</span>
            </div>
            <Progress value={92} className="h-2" />
          </div>

          <div className="pt-4 border-t">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Uptime:</span>
              <span className="font-semibold">99.9%</span>
            </div>
            <div className="flex items-center justify-between text-sm mt-2">
              <span className="text-muted-foreground">Last Incident:</span>
              <span className="text-muted-foreground">12 days ago</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
