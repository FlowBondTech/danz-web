'use client'

import { usePrivy } from '@privy-io/react-auth'
import { useRouter } from 'next/navigation'
import type React from 'react'
import { type ReactNode, createContext, useContext, useEffect, useMemo, useState } from 'react'
import type { User } from '../generated/graphql'
import { useGetMyProfileQuery, useUpdateProfileMutation } from '../generated/graphql'

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
  const { login: privyLogin, logout: privyLogout, authenticated, ready } = usePrivy()

  const [hasCheckedProfile, setHasCheckedProfile] = useState(false)

  // Use GraphQL for user profile
  const {
    data: profileData,
    loading: profileLoading,
    error: profileError,
    refetch: refetchProfile,
  } = useGetMyProfileQuery({
    skip: !authenticated || !ready,
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
      if (authenticated && ready && !profileLoading && !hasCheckedProfile) {
        setHasCheckedProfile(true)

        // Refetch to ensure we have latest data
        const result = await refetchProfile()
        const data = result.data

        // Get current path
        const currentPath = window.location.pathname
        const publicPaths = ['/', '/danz', '/register']

        // If no profile or no username, redirect to register (unless already there)
        if ((!data?.me || !data.me.username) && currentPath !== '/register') {
          console.log('User needs onboarding, redirecting to /register')
          router.push('/register')
        }
        // If has username and on register page, redirect to dashboard
        else if (data?.me?.username && currentPath === '/register') {
          console.log('User already registered, redirecting to dashboard')
          router.push('/dashboard')
        }
        // If has username and on public page after login, redirect to dashboard
        else if (data?.me?.username && publicPaths.includes(currentPath) && currentPath !== '/') {
          router.push('/dashboard')
        }
      }
    }

    checkProfileAndRedirect()
  }, [authenticated, ready, profileLoading, hasCheckedProfile, refetchProfile, router])

  const login = async () => {
    try {
      await privyLogin()
      setHasCheckedProfile(false) // Reset check flag for new login
    } catch (error) {
      console.error('Login failed:', error)
      throw error
    }
  }

  const logout = async () => {
    try {
      await privyLogout()
      setHasCheckedProfile(false)
      router.push('/')
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  const updateProfile = async (updates: any) => {
    if (!user) return

    try {
      await updateProfileMutation({ variables: { input: updates } })
      await refetchProfile()
    } catch (error) {
      console.error('Error updating profile:', error)
      throw error
    }
  }

  const refreshUser = async () => {
    if (!authenticated) return
    await refetchProfile()
  }

  const contextValue: AuthContextType = {
    user,
    isAuthenticated: !!authenticated && ready,
    isLoading: profileLoading || !ready,
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
