import type { Metadata } from "next"
import AdminLayout from "@/components/admin/AdminLayout"
import SliderSetting from "@/components/admin/SliderSetting"
import ToggleSetting from "@/components/admin/ToggleSetting"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "System Settings | Admin",
  description: "Configure system parameters",
}

export default function AdminSettingsPage() {
  return (
    <AdminLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">System Settings</h1>
          <p className="text-muted-foreground mt-2">Configure system-wide parameters and features</p>
        </div>

        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Prediction Settings</CardTitle>
              <CardDescription>Configure prediction model parameters</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <SliderSetting
                label="Confidence Threshold"
                description="Minimum confidence level for predictions"
                min={0}
                max={100}
                defaultValue={75}
              />
              <SliderSetting
                label="Historical Data Window"
                description="Number of past matches to consider"
                min={5}
                max={50}
                defaultValue={20}
              />
              <ToggleSetting label="Enable Live Predictions" description="Allow predictions during live matches" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>System Features</CardTitle>
              <CardDescription>Enable or disable system features</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <ToggleSetting label="Phase 9 Features" description="Enable experimental Phase 9 features" />
              <ToggleSetting label="Cross-League Analysis" description="Enable cross-league comparison tools" />
              <ToggleSetting label="Pattern Recognition" description="Enable advanced pattern detection" />
            </CardContent>
          </Card>

          <div className="flex justify-end gap-4">
            <Button variant="outline">Reset to Defaults</Button>
            <Button>Save Changes</Button>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
