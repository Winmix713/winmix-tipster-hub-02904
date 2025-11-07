// Sentry error tracking utilities

export function captureExceptionSafe(error: Error | unknown, context?: Record<string, unknown>): void {
  if (!isSentryEnabled()) {
    console.error("[Sentry Disabled]", error, context)
    return
  }

  try {
    // In a real implementation, this would send to Sentry
    console.error("[Sentry]", error, context)
  } catch (e) {
    console.error("[Sentry Error]", e)
  }
}

export function initSentry(config?: { dsn?: string; environment?: string }): void {
  if (!isSentryEnabled()) {
    console.log("[Sentry] Initialization skipped - disabled")
    return
  }

  console.log("[Sentry] Initialized", config)
}

export function isSentryEnabled(): boolean {
  return process.env.NEXT_PUBLIC_SENTRY_ENABLED === "true" || false
}
