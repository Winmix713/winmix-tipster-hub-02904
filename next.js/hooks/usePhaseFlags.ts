"use client"

import { useState, useEffect } from "react"

export interface PhaseFlags {
  phase1: boolean
  phase2: boolean
  phase3: boolean
  phase4: boolean
  phase5: boolean
  phase6: boolean
  phase7: boolean
  phase8: boolean
  phase9: boolean
}

export function usePhaseFlags() {
  const [flags, setFlags] = useState<PhaseFlags>({
    phase1: true,
    phase2: true,
    phase3: true,
    phase4: true,
    phase5: false,
    phase6: false,
    phase7: false,
    phase8: false,
    phase9: false,
  })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchFlags = async () => {
      try {
        setIsLoading(true)
        // In a real implementation, fetch from API
        setFlags({
          phase1: true,
          phase2: true,
          phase3: true,
          phase4: true,
          phase5: false,
          phase6: false,
          phase7: false,
          phase8: false,
          phase9: false,
        })
      } catch (error) {
        console.error("Error fetching phase flags:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchFlags()
  }, [])

  return {
    flags,
    isLoading,
  }
}
