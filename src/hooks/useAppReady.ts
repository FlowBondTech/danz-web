'use client'

import { useState, useEffect, useCallback } from 'react'
import { usePrivy } from '@privy-io/react-auth'

interface UseAppReadyOptions {
  minSplashDuration?: number
}

interface UseAppReadyResult {
  isReady: boolean
  showSplash: boolean
  isAuthenticated: boolean
  isLoading: boolean
  hideSplash: () => void
}

/**
 * Hook to manage app initialization and splash screen timing.
 * Ensures splash shows for minimum duration while checking auth state.
 */
export function useAppReady({
  minSplashDuration = 1500
}: UseAppReadyOptions = {}): UseAppReadyResult {
  const { ready, authenticated } = usePrivy()
  const [showSplash, setShowSplash] = useState(true)
  const [minTimeElapsed, setMinTimeElapsed] = useState(false)

  // Minimum splash timer
  useEffect(() => {
    const timer = setTimeout(() => {
      setMinTimeElapsed(true)
    }, minSplashDuration)

    return () => clearTimeout(timer)
  }, [minSplashDuration])

  // Hide splash when both Privy is ready and min time elapsed
  useEffect(() => {
    if (ready && minTimeElapsed) {
      setShowSplash(false)
    }
  }, [ready, minTimeElapsed])

  const hideSplash = useCallback(() => {
    setShowSplash(false)
  }, [])

  return {
    isReady: ready && !showSplash,
    showSplash,
    isAuthenticated: authenticated,
    isLoading: !ready,
    hideSplash
  }
}
