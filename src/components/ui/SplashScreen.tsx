'use client'

import { useEffect, useState } from 'react'

interface SplashScreenProps {
  title?: string
  subtitle?: string
  onComplete?: () => void
  duration?: number
}

export function SplashScreen({
  title = 'DANZ',
  subtitle = 'Move. Connect. Earn.',
  onComplete,
  duration = 1500
}: SplashScreenProps) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    // Animate progress bar
    const interval = setInterval(() => {
      setProgress(p => Math.min(p + 5, 100))
    }, duration / 20)

    // Call onComplete after duration
    const timer = setTimeout(() => {
      onComplete?.()
    }, duration)

    return () => {
      clearInterval(interval)
      clearTimeout(timer)
    }
  }, [duration, onComplete])

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-bg-primary">
      {/* Logo Container */}
      <div className="relative w-32 h-32 mb-8">
        {/* Outer glow ring */}
        <div className="absolute inset-0 bg-gradient-to-r from-neon-pink to-neon-purple rounded-full opacity-20 animate-pulse" />

        {/* Inner circle with logo */}
        <div className="absolute inset-2 bg-bg-primary rounded-full flex items-center justify-center">
          <svg
            width="64"
            height="64"
            viewBox="0 0 64 64"
            fill="none"
            style={{ animation: 'float 3s ease-in-out infinite' }}
          >
            <circle
              cx="32"
              cy="32"
              r="28"
              stroke="url(#splash-gradient)"
              strokeWidth="3"
              fill="none"
            />
            <path
              d="M24 20 L32 44 L40 20"
              stroke="url(#splash-gradient)"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
            <defs>
              <linearGradient id="splash-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="rgb(var(--color-neon-pink-rgb))" />
                <stop offset="100%" stopColor="rgb(var(--color-neon-purple-rgb))" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>

      {/* Brand Text */}
      <h1 className="text-3xl font-bold bg-gradient-to-r from-neon-pink to-neon-purple bg-clip-text text-transparent mb-2">
        {title}
      </h1>
      <p className="text-white/50 text-sm mb-8">{subtitle}</p>

      {/* Progress Bar */}
      <div className="w-48 h-1 bg-white/10 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-neon-pink to-neon-purple transition-all duration-100 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Loading Dots */}
      <div className="flex gap-1.5 mt-4">
        {[0, 1, 2].map(i => (
          <div
            key={i}
            className="w-2 h-2 rounded-full bg-neon-pink/50 animate-pulse"
            style={{
              animationDelay: `${i * 200}ms`,
            }}
          />
        ))}
      </div>

    </div>
  )
}
