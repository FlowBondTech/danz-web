'use client'

import { usePrivy } from '@privy-io/react-auth'
import { useRouter } from 'next/navigation'
import type React from 'react'
import {
  type ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import type { User } from '../generated/graphql'
import {
  useGetMyProfileQuery,
  useTrackAppOpenMutation,
  useUpdateProfileMutation,
} from '../generated/graphql'

// Auth context type
interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
  login: () => Promise<void>
  logout: () => Promise<void>
  updateProfile: (updates: any) => Promise<void>
  refreshUser: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Provider Component
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const router = useRouter()
  const {
    login: privyLogin,
    logout: privyLogout,
    authenticated,
    ready,
    getAccessToken,
  } = usePrivy()

  const [hasCheckedProfile, setHasCheckedProfile] = useState(false)
  const [tokenReady, setTokenReady] = useState(false)

  // Wait for access token to be ready before making profile queries
  useEffect(() => {
    const checkToken = async () => {
      if (authenticated && ready) {
        try {
          const token = await getAccessToken()
          if (token) {
            setTokenReady(true)
          }
        } catch (error) {
          console.warn('Error getting access token:', error)
          setTokenReady(false)
        }
      } else {
        setTokenReady(false)
      }
    }
    checkToken()
  }, [authenticated, ready, getAccessToken])

  // Use GraphQL for user profile - only query when token is ready
  const {
    data: profileData,
    loading: profileLoading,
    error: profileError,
    refetch: refetchProfile,
  } = useGetMyProfileQuery({
    skip: !authenticated || !ready || !tokenReady,
    fetchPolicy: 'network-only',
    errorPolicy: 'all', // Continue even if user doesn't exist
  })

  const [updateProfileMutation] = useUpdateProfileMutation({
    onCompleted: data => {
      if (data?.updateProfile) {
        refetchProfile()
      }
    },
    onError: error => {
      console.error('Profile update failed:', error)
    },
  })

  // Track daily app open for points
  const [trackAppOpen] = useTrackAppOpenMutation({
    onError: error => {
      // Silently fail if already awarded today
      if (!error.message.includes('already awarded')) {
        console.error('Failed to track daily login:', error)
      }
    },
  })

  // Compute user object from profile data
  const user = useMemo(() => {
    if (!profileData?.me) {
      return null
    }
    return profileData.me
  }, [profileData])

  // Handle authentication and profile checks
  useEffect(() => {
    const checkProfileAndRedirect = async () => {
      // Wait for token to be ready before checking profile
      if (authenticated && ready && tokenReady && !profileLoading && !hasCheckedProfile) {
        setHasCheckedProfile(true)

        // Refetch to ensure we have latest data
        try {
          const result = await refetchProfile()
          const data = result.data

          // Track daily login for points (if user exists)
          if (data?.me?.privy_id) {
            try {
              await trackAppOpen({
                variables: { user_id: data.me.privy_id },
              })
              console.log('Daily login tracked')
            } catch (error) {
              // Already handled in mutation error callback
            }
          }

          // Get current path
          const currentPath = window.location.pathname
          const isDashboardPath = currentPath.startsWith('/dashboard')
          // Public paths that authenticated users can stay on without redirect
          const isPublicPath =
            currentPath === '/' ||
            currentPath.startsWith('/events') ||
            currentPath === '/danz' ||
            currentPath === '/ethdenver' ||
            currentPath.startsWith('/i/')

          // If no profile or no username, redirect to register (unless already there)
          if ((!data?.me || !data.me.username) && currentPath !== '/register') {
            console.log('User needs onboarding, redirecting to /register')
            router.push('/register')
          }
          // If has username and on login page, redirect to intended page or dashboard
          // Don't redirect if on public paths or already on dashboard
          else if (
            data?.me?.username &&
            !isDashboardPath &&
            !isPublicPath &&
            currentPath === '/login'
          ) {
            const params = new URLSearchParams(window.location.search)
            const redirectTo = params.get('redirectTo') || '/dashboard'
            console.log('User logged in from login page, redirecting to:', redirectTo)
            router.push(redirectTo)
          }
        } catch (error) {
          console.error('Error checking profile:', error)
          // Reset check flag to retry on next render
          setHasCheckedProfile(false)
        }
      }
    }

    checkProfileAndRedirect()
  }, [
    authenticated,
    ready,
    tokenReady,
    profileLoading,
    hasCheckedProfile,
    refetchProfile,
    router,
    trackAppOpen,
  ])

  const login = useCallback(async () => {
    try {
      await privyLogin()
      setHasCheckedProfile(false) // Reset check flag for new login
      setTokenReady(false) // Reset token ready flag to force re-check
    } catch (error) {
      console.error('Login failed:', error)
      throw error
    }
  }, [privyLogin])

  const logout = useCallback(async () => {
    try {
      await privyLogout()
      setHasCheckedProfile(false)
      setTokenReady(false)
      router.push('/')
    } catch (error) {
      console.error('Logout error:', error)
    }
  }, [privyLogout, router])

  const updateProfile = useCallback(
    async (updates: any) => {
      if (!user) return

      try {
        await updateProfileMutation({ variables: { input: updates } })
        await refetchProfile()
      } catch (error) {
        console.error('Error updating profile:', error)
        throw error
      }
    },
    [user, updateProfileMutation, refetchProfile],
  )

  const refreshUser = useCallback(async () => {
    if (!authenticated) return
    await refetchProfile()
  }, [authenticated, refetchProfile])

  const contextValue: AuthContextType = {
    user,
    isAuthenticated: !!authenticated && ready,
    isLoading: profileLoading || !ready || (authenticated && !tokenReady),
    error: profileError ? profileError.message : null,
    login,
    logout,
    updateProfile,
    refreshUser,
  }

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
}

// Hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
