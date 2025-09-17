'use client'

import { OnboardingFlow } from '@/src/components/auth/OnboardingFlow'
import { useGetMyProfileQuery } from '@/src/generated/graphql'
import { usePrivy } from '@privy-io/react-auth'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function RegisterPage() {
  const { authenticated, ready } = usePrivy()
  const router = useRouter()

  // Check if user already has a profile
  const { data, loading } = useGetMyProfileQuery({
    skip: !authenticated || !ready,
    errorPolicy: 'ignore',
  })

  useEffect(() => {
    // If user already has a username, redirect to dashboard
    if (authenticated && !loading && data?.me?.username) {
      console.log('User already registered, redirecting to dashboard')
      router.push('/dashboard')
    }
  }, [authenticated, data, loading, router])

  // Show loading while checking profile
  if (authenticated && loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-purple-900/20 to-black flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return <OnboardingFlow initialStep="welcome" />
}