"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Clock, CheckCircle2, XCircle, Loader2 } from "lucide-react"
import { JobLogsDialog } from "./JobLogsDialog"

interface JobStatusCardProps {
  job?: {
    id?: string
    name?: string
    status?: "pending" | "running" | "completed" | "failed"
    createdAt?: string
    error?: string
    progress?: number
  }
}

export default function JobStatusCard({ job }: JobStatusCardProps = {}) {
  const [logsOpen, setLogsOpen] = useState(false)

  // Default mock data if no job provided
  const defaultJob = {
    id: "1",
    name: "Model Training Job",
    status: "running" as const,
    createdAt: new Date().toISOString(),
    progress: 65,
  }

  const jobData = job || defaultJob

  const statusConfig = {
    pending: { variant: "secondary" as const, icon: Clock, color: "text-yellow-500" },
    running: { variant: "default" as const, icon: Loader2, color: "text-blue-500" },
    completed: { variant: "default" as const, icon: CheckCircle2, color: "text-green-500" },
    failed: { variant: "destructive" as const, icon: XCircle, color: "text-red-500" },
  }

  const config = statusConfig[jobData.status]
  const StatusIcon = config.icon

  const mockLogs = [
    `[${new Date().toISOString()}] Job started: ${jobData.name}`,
    `[${new Date().toISOString()}] Loading data...`,
    `[${new Date().toISOString()}] Processing records...`,
    `[${new Date().toISOString()}] Progress: ${jobData.progress}%`,
  ]

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <StatusIcon className={`h-4 w-4 ${config.color} ${jobData.status === "running" ? "animate-spin" : ""}`} />
              <CardTitle className="text-base">{jobData.name}</CardTitle>
            </div>
            <Badge variant={config.variant}>{jobData.status}</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {jobData.status === "running" && jobData.progress !== undefined && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Progress</span>
                <span className="font-medium">{jobData.progress}%</span>
              </div>
              <Progress value={jobData.progress} />
            </div>
          )}

          <div className="text-sm space-y-1">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Created:</span>
              <span>{new Date(jobData.createdAt).toLocaleString()}</span>
            </div>
            {jobData.error && (
              <div className="text-destructive text-xs bg-destructive/10 p-2 rounded">Error: {jobData.error}</div>
            )}
          </div>

          <Button variant="outline" size="sm" className="w-full bg-transparent" onClick={() => setLogsOpen(true)}>
            View Logs
          </Button>
        </CardContent>
      </Card>

      <JobLogsDialog open={logsOpen} onOpenChange={setLogsOpen} jobId={jobData.id} logs={mockLogs} />
    </>
  )
}
