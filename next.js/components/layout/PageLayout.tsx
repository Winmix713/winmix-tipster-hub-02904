import type React from "react"
interface PageLayoutProps {
  children: React.ReactNode
}

export default function PageLayout({ children }: PageLayoutProps) {
  return <div className="min-h-screen bg-background">{children}</div>
}
