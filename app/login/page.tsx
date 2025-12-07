'use client'

import { usePrivy } from '@privy-io/react-auth'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { FiLock } from 'react-icons/fi'

export default function LoginPage() {
  const { login, authenticated, ready } = usePrivy()
  const router = useRouter()

  useEffect(() => {
    // If already authenticated, redirect to dashboard
    if (ready && authenticated) {
      router.push('/dashboard')
    }
  }, [ready, authenticated, router])

  useEffect(() => {
    // Auto-trigger login modal when page loads (if not authenticated)
    if (ready && !authenticated) {
      login()
    }
  }, [ready, authenticated, login])

  if (!ready) {
    return (
      <div className="min-h-screen bg-bg-primary flex items-center justify-center">
        <div className="text-white text-xl" role="status" aria-live="polite">
          Loading...
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-bg-primary flex flex-col items-center justify-center px-4">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="w-16 h-16 mx-auto bg-neon-purple/20 rounded-full flex items-center justify-center">
          <FiLock className="w-8 h-8 text-neon-purple" aria-hidden="true" />
        </div>

        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-text-primary mb-2">
            Sign in to DANZ
          </h1>
          <p className="text-text-secondary">
            Connect your wallet or sign in with email to continue
          </p>
        </div>

        <button
          onClick={() => login()}
          className="w-full py-3 px-6 bg-gradient-to-r from-neon-purple to-neon-pink text-white font-medium rounded-xl hover:opacity-90 transition-opacity min-h-[48px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon-purple focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary"
        >
          Sign In
        </button>

        <p className="text-sm text-text-secondary">
          New to DANZ?{' '}
          <button
            onClick={() => login()}
            className="text-neon-purple hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon-purple"
          >
            Create an account
          </button>
        </p>
      </div>
    </div>
  )
}
