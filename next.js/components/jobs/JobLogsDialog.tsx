"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface JobLogsDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  jobId: string
  logs: string[]
}

export function JobLogsDialog({ open, onOpenChange, jobId, logs }: JobLogsDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-auto">
        <DialogHeader>
          <DialogTitle>Job Logs</DialogTitle>
          <DialogDescription>Viewing logs for job: {jobId}</DialogDescription>
        </DialogHeader>
        <div className="bg-muted p-4 rounded-md font-mono text-sm space-y-1">
          {logs.length > 0 ? (
            logs.map((log, i) => <div key={i}>{log}</div>)
          ) : (
            <div className="text-muted-foreground">No logs available</div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
