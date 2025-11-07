import type { Metadata } from "next"
import AdminLayout from "@/components/admin/AdminLayout"
import CategoryCard from "@/components/admin/CategoryCard"

export const metadata: Metadata = {
  title: "Admin Panel | WinMix TipsterHub",
  description: "Administrative controls and settings",
}

export default function AdminPage() {
  return (
    <AdminLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Admin Panel</h1>
          <p className="text-muted-foreground mt-2">Manage system settings and configurations</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <CategoryCard
            title="User Management"
            description="Manage users and permissions"
            icon="users"
            href="/admin/users"
          />
          <CategoryCard
            title="System Settings"
            description="Configure system parameters"
            icon="settings"
            href="/admin/settings"
          />
          <CategoryCard
            title="Phase 9 Settings"
            description="Advanced feature configuration"
            icon="layers"
            href="/admin/phase9"
          />
          <CategoryCard
            title="Job Management"
            description="Monitor background jobs"
            icon="briefcase"
            href="/admin/jobs"
          />
          <CategoryCard
            title="Audit Logs"
            description="View system activity logs"
            icon="file-text"
            href="/admin/audit"
          />
          <CategoryCard title="Model Registry" description="Manage AI models" icon="cpu" href="/admin/models" />
        </div>
      </div>
    </AdminLayout>
  )
}
