'use client'

import { usePrivy } from '@privy-io/react-auth'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useGetMyProfileQuery } from '../generated/graphql'

interface AuthWrapperProps {
  children: React.ReactNode
}

const PUBLIC_PATHS = [
  '/',
  '/danz',
  '/register',
  '/login',
  '/research-box',
  '/depth-anything',
  '/miniapps',
  '/link',
  '/mapp',
]

function isPublicPath(pathname: string): boolean {
  return (
    PUBLIC_PATHS.includes(pathname) ||
    pathname.startsWith('/i/') ||
    pathname.startsWith('/events') ||
    pathname.startsWith('/ethdenver')
  )
}

function AuthLoadingScreen() {
  return (
    <div className="min-h-screen bg-bg-primary flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-neon-purple/20 rounded-full" />
          <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-neon-purple rounded-full animate-spin" />
        </div>
        <p className="text-text-secondary animate-pulse">Loading...</p>
      </div>
    </div>
  )
}

export default function AuthWrapper({ children }: AuthWrapperProps) {
  const { ready, authenticated } = usePrivy()
  const router = useRouter()
  const pathname = usePathname()

  const isPublic = isPublicPath(pathname)

  const { data, loading, error } = useGetMyProfileQuery({
    skip: !authenticated || !ready,
    fetchPolicy: 'network-only',
    errorPolicy: 'all',
  })

  // Handle redirects for protected routes
  useEffect(() => {
    if (isPublic || !ready || loading) return

    if (!authenticated) {
      const redirectTo = encodeURIComponent(pathname)
      router.push(`/login?redirectTo=${redirectTo}`)
      return
    }

    if (error || !data || !data.me) {
      router.push('/register')
      return
    }

    if (data.me && !data.me.username) {
      router.push('/register')
      return
    }
  }, [ready, authenticated, data, loading, error, router, pathname, isPublic])

  // Public pages render immediately, no auth gate
  if (isPublic) {
    return <>{children}</>
  }

  // Protected pages: block rendering until auth state is fully resolved
  if (!ready || loading) {
    return <AuthLoadingScreen />
  }

  // Redirect in progress — show loading instead of page flash
  if (!authenticated) {
    return <AuthLoadingScreen />
  }

  // Authenticated but missing profile/username — redirect to register in progress
  if (error || !data || !data.me || !data.me.username) {
    return <AuthLoadingScreen />
  }

  // Fully authenticated with complete profile — render the page
  return <>{children}</>
}
