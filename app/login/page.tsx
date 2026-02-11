'use client'

import { usePrivy } from '@privy-io/react-auth'
import { useRouter, useSearchParams } from 'next/navigation'
import { Suspense, useEffect } from 'react'
import { FiLock } from 'react-icons/fi'

function LoginContent() {
  const { login, authenticated, ready } = usePrivy()
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    // If already authenticated, redirect to intended page or dashboard
    if (ready && authenticated) {
      const redirectTo = searchParams.get('redirectTo') || '/dashboard'
      router.push(redirectTo)
    }
  }, [ready, authenticated, router, searchParams])

  useEffect(() => {
    // Auto-trigger login modal when page loads (if not authenticated)
    if (ready && !authenticated) {
      login()
    }
  }, [ready, authenticated, login])

  if (!ready) {
    return (
      <div className="min-h-screen bg-bg-primary flex items-center justify-center">
        <div className="text-text-primary text-xl" role="status" aria-live="polite">
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
          <h1 className="text-2xl sm:text-3xl font-bold text-text-primary mb-2">Sign in to DANZ</h1>
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

      {/* Footer */}
      <footer className="absolute bottom-0 left-0 right-0 py-6 text-center text-text-muted text-sm">
        <p>
          Powered by{' '}
          <a
            href="https://flowbond.tech"
            target="_blank"
            rel="noopener noreferrer"
            className="text-neon-purple hover:text-neon-pink transition-colors"
          >
            FlowBond.Tech
          </a>
        </p>
      </footer>
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-bg-primary flex items-center justify-center">
          <div className="text-text-primary text-xl">Loading...</div>
        </div>
      }
    >
      <LoginContent />
    </Suspense>
  )
}
