'use client'

import { usePrivy } from '@privy-io/react-auth'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useGetMyProfileQuery } from '../generated/graphql'

interface AuthWrapperProps {
  children: React.ReactNode
}

export default function AuthWrapper({ children }: AuthWrapperProps) {
  const { ready, authenticated } = usePrivy()
  const router = useRouter()
  const pathname = usePathname()

  const { data, loading, error } = useGetMyProfileQuery({
    skip: !authenticated || !ready,
    fetchPolicy: 'network-only', // Always fetch fresh data
    errorPolicy: 'all', // Continue even if there's an error (like user not found)
  })

  useEffect(() => {
    // Skip checks for public pages and register page
    const publicPaths = ['/', '/danz', '/register', '/login', '/ethdenver', '/research-box']
    const isInvitePage = pathname?.startsWith('/i/')
    const isPublicEventsPage = pathname?.startsWith('/events')
    if (publicPaths.includes(pathname) || isInvitePage || isPublicEventsPage) {
      return
    }

    // Only proceed with checks if Privy is ready and not loading profile
    if (!ready || loading) {
      return
    }

    // If user is not authenticated and trying to access protected pages
    if (!authenticated) {
      console.log('User not authenticated, redirecting to login with redirect')
      const redirectTo = encodeURIComponent(pathname)
      router.push(`/login?redirectTo=${redirectTo}`)
      return
    }

    // If user is authenticated, check if they have a profile with username
    if (authenticated) {
      // If there's an error (user not found) or no data, redirect to register
      if (error || !data || !data.me) {
        console.log('User authenticated but no profile found, redirecting to /register')
        router.push('/register')
        return
      }

      // If user exists but doesn't have a username, redirect to register
      if (data.me && !data.me.username) {
        console.log('User exists but no username, redirecting to /register')
        router.push('/register')
        return
      }
    }
  }, [ready, authenticated, data, loading, error, router, pathname])

  // Don't block rendering with loading state - let Navbar handle it
  return <>{children}</>
}
