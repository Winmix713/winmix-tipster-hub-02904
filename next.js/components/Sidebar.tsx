"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Home, Target, BarChart3, Cpu, TrendingUp, Globe, Layers, Settings, Shield, Activity } from "lucide-react"

export default function Sidebar() {
  const pathname = usePathname()

  const mainLinks = [
    { href: "/", label: "Home", icon: Home },
    { href: "/dashboard", label: "Dashboard", icon: BarChart3 },
    { href: "/predictions", label: "Predictions", icon: Target },
  ]

  const analyticsLinks = [
    { href: "/models", label: "AI Models", icon: Cpu },
    { href: "/patterns", label: "Patterns", icon: TrendingUp },
    { href: "/crossleague", label: "Cross-League", icon: Globe },
    { href: "/monitoring", label: "Monitoring", icon: Activity },
    { href: "/phase9", label: "Phase 9", icon: Layers },
  ]

  const adminLinks = [
    { href: "/admin", label: "Admin", icon: Shield },
    { href: "/admin/settings", label: "Settings", icon: Settings },
  ]

  return (
    <aside className="w-64 border-r h-screen flex flex-col bg-card">
      <div className="p-6 border-b">
        <h2 className="text-lg font-bold">WinMix TipsterHub</h2>
        <p className="text-xs text-muted-foreground mt-1">AI-Powered Predictions</p>
      </div>

      <nav className="flex-1 overflow-y-auto p-4 space-y-6">
        <div>
          <p className="text-xs font-semibold text-muted-foreground mb-2 px-3">MAIN</p>
          <div className="space-y-1">
            {mainLinks.map((link) => {
              const Icon = link.icon
              const isActive = pathname === link.href
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-lg transition-colors text-sm",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-muted text-muted-foreground hover:text-foreground",
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {link.label}
                </Link>
              )
            })}
          </div>
        </div>

        <div>
          <p className="text-xs font-semibold text-muted-foreground mb-2 px-3">ANALYTICS</p>
          <div className="space-y-1">
            {analyticsLinks.map((link) => {
              const Icon = link.icon
              const isActive = pathname === link.href
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-lg transition-colors text-sm",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-muted text-muted-foreground hover:text-foreground",
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {link.label}
                </Link>
              )
            })}
          </div>
        </div>

        <div>
          <p className="text-xs font-semibold text-muted-foreground mb-2 px-3">SYSTEM</p>
          <div className="space-y-1">
            {adminLinks.map((link) => {
              const Icon = link.icon
              const isActive = pathname.startsWith(link.href)
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-lg transition-colors text-sm",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-muted text-muted-foreground hover:text-foreground",
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {link.label}
                </Link>
              )
            })}
          </div>
        </div>
      </nav>

      <div className="p-4 border-t">
        <div className="bg-muted rounded-lg p-3">
          <p className="text-xs font-semibold mb-1">System Status</p>
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-green-500" />
            <p className="text-xs text-muted-foreground">All Systems Operational</p>
          </div>
        </div>
      </div>
    </aside>
  )
}
