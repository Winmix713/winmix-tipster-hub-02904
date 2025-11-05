// Environment Variables Types
export interface EnvironmentVariable {
  id: string;
  key: string;
  value: string;
  description?: string;
  is_secret: boolean;
  category: string;
  created_by?: string;
  created_at: string;
  updated_at: string;
}

export interface EnvironmentVariableSafe {
  id: string;
  key: string;
  value: string; // Masked if secret
  description?: string;
  is_secret: boolean;
  category: string;
  created_by?: string;
  created_at: string;
  updated_at: string;
}

export interface EnvironmentVariableFormData {
  key: string;
  value: string;
  description?: string;
  is_secret: boolean;
  category: string;
}

export interface EnvImportResult {
  imported: number;
  skipped: number;
  errors: string[];
}

// Audit Log Types
export interface AuditLog {
  id: string;
  user_id?: string;
  action: string;
  table_name?: string;
  record_id?: string;
  old_values?: Record<string, unknown>;
  new_values?: Record<string, unknown>;
  ip_address?: string;
  user_agent?: string;
  created_at: string;
}

export interface AuditLogFilters {
  action?: string;
  table_name?: string;
  user_id?: string;
  date_from?: string;
  date_to?: string;
}

// Enhanced Admin Types
export interface AdminAction {
  id: string;
  name: string;
  description: string;
  icon?: string;
  requiresRole?: 'admin' | 'analyst' | 'user';
  path?: string;
  action?: () => void;
}

export interface AdminStats {
  totalModels: number;
  activeModels: number;
  totalJobs: number;
  activeJobs: number;
  totalEnvVars: number;
  secretEnvVars: number;
  recentAudits: number;
  systemHealth: 'healthy' | 'warning' | 'error';
}

// Enhanced Model Types
export interface ModelAction {
  type: 'activate' | 'deactivate' | 'promote' | 'retire' | 'duplicate';
  label: string;
  icon: string;
  requiresRole?: 'admin' | 'analyst';
}

// Enhanced Job Types
export interface JobFormData {
  job_name: string;
  job_type: string;
  cron_schedule: string;
  enabled: boolean;
  config: Record<string, unknown>;
}

export interface CronValidation {
  valid: boolean;
  description?: string;
  next_runs?: string[];
}

// Enhanced Match Types
export interface MatchFormData {
  league_id: string;
  home_team_id: string;
  away_team_id: string;
  match_date: string;
  venue?: string;
  status?: 'scheduled' | 'live' | 'completed' | 'cancelled';
}

export interface CSVImportResult {
  total: number;
  imported: number;
  skipped: number;
  errors: Array<{
    row: number;
    error: string;
  }>;
}

// System Health Types
export interface SystemWarning {
  id: string;
  type: 'error' | 'warning' | 'info';
  title: string;
  description: string;
  link?: string;
  linkText?: string;
  timestamp: string;
}

export interface AdminQuickLink {
  id: string;
  title: string;
  description: string;
  url: string;
  icon: string;
  category: 'system' | 'data' | 'security' | 'monitoring';
}

// API Response Types
export interface AdminApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  hasNext: boolean;
  hasPrev: boolean;
}

// Form Validation Types
export interface ValidationError {
  field: string;
  message: string;
}

export interface FormState<T> {
  data: T;
  errors: ValidationError[];
  isSubmitting: boolean;
  isDirty: boolean;
}

// Utility Types
export type AdminRole = 'admin' | 'analyst' | 'user';
export type EnvironmentCategory = 'general' | 'database' | 'api' | 'email' | 'security' | 'cache' | 'ai' | 'logging' | 'limits';
export type JobType = 'data_import' | 'prediction' | 'aggregation' | 'maintenance' | 'monitoring';