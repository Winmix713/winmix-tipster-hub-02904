import type { Metadata } from "next"
import AdminLayout from "@/components/admin/AdminLayout"
import JobStatusCard from "@/components/jobs/JobStatusCard"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "Job Management | Admin",
  description: "Monitor and manage background jobs",
}

export default function AdminJobsPage() {
  return (
    <AdminLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Job Management</h1>
          <p className="text-muted-foreground mt-2">Monitor and manage background processing jobs</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <JobStatusCard />
          <JobStatusCard />
          <JobStatusCard />
          <JobStatusCard />
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Job Queue Statistics</CardTitle>
            <CardDescription>Overview of job processing</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-4">
              <div className="text-center">
                <p className="text-3xl font-bold">124</p>
                <p className="text-sm text-muted-foreground">Completed</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold">8</p>
                <p className="text-sm text-muted-foreground">Running</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold">15</p>
                <p className="text-sm text-muted-foreground">Pending</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold">2</p>
                <p className="text-sm text-muted-foreground">Failed</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}
