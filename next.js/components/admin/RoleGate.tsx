"use client"

import type React from "react"

import { useAuth } from "@/hooks/useAuth"

interface RoleGateProps {
  children: React.ReactNode
  allowedRoles: string[]
  fallback?: React.ReactNode
}

export default function RoleGate({ children, allowedRoles, fallback }: RoleGateProps) {
  const { user, isLoading } = useAuth()

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (!user || !allowedRoles.includes(user.role || "")) {
    return fallback ? <>{fallback}</> : <div>Access Denied</div>
  }

  return <>{children}</>
}
