import type { LucideIcon } from "lucide-react";
import type { UserRole, UserProfile } from "@/providers/AuthProvider";
import type { JobSummary } from "@/types/jobs";

export interface AdminBreadcrumbItem {
  label: string;
  href?: string;
}

export interface AdminNavItem {
  label: string;
  description?: string;
  href: string;
  icon: LucideIcon;
  roles?: UserRole[];
}

export interface AdminCategoryCard {
  id: string;
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
  accentColorClass: string;
  allowedRoles?: UserRole[];
  value?: number | string | null;
  loading?: boolean;
  pill?: string;
}

export type AdminAuditAction =
  | "user_created"
  | "role_changed"
  | "user_deleted"
  | "job_started"
  | "job_stopped"
  | "phase9_updated";

export interface AdminAuditLogEntry {
  id: string;
  user_id: string;
  action: AdminAuditAction;
  details: Record<string, unknown>;
  created_at: string;
  ip_address: string | null;
}

export interface AdminPhase9Settings {
  id: number;
  collaborative_intelligence_enabled: boolean;
  temporal_decay_enabled: boolean;
  temporal_decay_rate: number;
  freshness_check_seconds: number;
  staleness_threshold_days: number;
  market_integration_mode: "off" | "test" | "prod";
  market_api_key: string | null;
  cross_league_enabled: boolean;
  cross_league_league_count: number;
  cross_league_depth: "low" | "medium" | "high";
  updated_at: string;
}

export interface AdminPhase9SettingsInput
  extends Omit<AdminPhase9Settings, "id" | "updated_at"> {}

export interface AdminJobsManagerResult {
  job?: JobSummary;
  jobId?: string;
  message?: string;
  status?: string;
}

export interface AdminInvite {
  id: string;
  email: string;
  role: UserRole;
  token: string;
  status: "pending" | "accepted" | "expired" | "cancelled";
  created_at: string;
}

export interface AdminUsersResponse {
  users: AdminUser[];
  total: number;
}

export interface AdminUser extends Pick<UserProfile, "id" | "email" | "role" | "created_at"> {
  full_name?: string | null;
}

export interface UseJobsOptions {
  refetchInterval?: number | false;
  enabled?: boolean;
}
