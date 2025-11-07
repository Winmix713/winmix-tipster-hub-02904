import type { Metadata } from "next"
import AdminLayout from "@/components/admin/AdminLayout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

export const metadata: Metadata = {
  title: "Audit Logs | Admin",
  description: "View system activity and audit logs",
}

export default function AdminAuditPage() {
  return (
    <AdminLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Audit Logs</h1>
          <p className="text-muted-foreground mt-2">Review system activity and user actions</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest system events and user actions</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Timestamp</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Action</TableHead>
                  <TableHead>Resource</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[...Array(10)].map((_, i) => (
                  <TableRow key={i}>
                    <TableCell className="font-mono text-sm">
                      {new Date(Date.now() - i * 3600000).toLocaleString()}
                    </TableCell>
                    <TableCell>admin@example.com</TableCell>
                    <TableCell>{["Create", "Update", "Delete", "View"][i % 4]} Prediction</TableCell>
                    <TableCell>/api/predictions/{i + 1}</TableCell>
                    <TableCell>
                      <Badge variant={i % 5 === 0 ? "destructive" : "default"}>
                        {i % 5 === 0 ? "Failed" : "Success"}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}
