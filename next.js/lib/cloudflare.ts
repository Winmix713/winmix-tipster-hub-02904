// Cloudflare Web Analytics utilities

export function initCloudflareBeacon(token?: string): void {
  if (!isCloudflareBeaconEnabled()) {
    console.log("[Cloudflare] Beacon initialization skipped - disabled")
    return
  }

  if (typeof window !== "undefined") {
    console.log("[Cloudflare] Beacon initialized", token)
  }
}

export function isCloudflareBeaconEnabled(): boolean {
  return process.env.NEXT_PUBLIC_CLOUDFLARE_BEACON_ENABLED === "true" || false
}
