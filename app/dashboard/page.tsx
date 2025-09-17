'use client'

import { useQuery } from '@apollo/client'
import { usePrivy } from '@privy-io/react-auth'
import { gql } from 'graphql-tag'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

const GET_MY_PROFILE = gql`
  query GetMyProfile {
    me {
      privy_id
      username
      display_name
      avatar_url
      bio
      role
      total_xp
      lifetime_danz_earned
      dance_styles
      skill_level
    }
  }
`

export default function DashboardPage() {
  const { authenticated, ready, logout, user } = usePrivy()
  const router = useRouter()

  const { data, loading, error } = useQuery(GET_MY_PROFILE, {
    skip: !authenticated,
  })

  useEffect(() => {
    if (ready && !authenticated) {
      router.push('/login')
    }
  }, [ready, authenticated, router])

  if (!ready || loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-purple-900/20 to-black flex items-center justify-center">
        <div className="text-white text-2xl">Loading...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-purple-900/20 to-black flex items-center justify-center">
        <div className="text-red-400 text-xl">Error loading profile</div>
      </div>
    )
  }

  const profile = data?.me

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-900/20 to-black p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
            Dashboard
          </h1>
          <button
            onClick={() => logout()}
            className="px-4 py-2 bg-red-600/20 border border-red-500/30 text-red-400 rounded-lg hover:bg-red-600/30 transition-colors"
          >
            Logout
          </button>
        </div>

        {profile ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="bg-black/50 backdrop-blur-md rounded-2xl border border-purple-500/20 p-6">
              <h2 className="text-xl font-semibold text-white mb-4">Profile</h2>
              <div className="space-y-2">
                <p className="text-gray-300">
                  <span className="text-gray-500">Username:</span> @{profile.username}
                </p>
                <p className="text-gray-300">
                  <span className="text-gray-500">Display Name:</span> {profile.display_name}
                </p>
                <p className="text-gray-300">
                  <span className="text-gray-500">Role:</span> {profile.role}
                </p>
                <p className="text-gray-300">
                  <span className="text-gray-500">Skill Level:</span> {profile.skill_level}
                </p>
              </div>
            </div>

            <div className="bg-black/50 backdrop-blur-md rounded-2xl border border-purple-500/20 p-6">
              <h2 className="text-xl font-semibold text-white mb-4">Stats</h2>
              <div className="space-y-2">
                <p className="text-gray-300">
                  <span className="text-gray-500">Total XP:</span> {profile.total_xp || 0}
                </p>
                <p className="text-gray-300">
                  <span className="text-gray-500">$DANZ Earned:</span>{' '}
                  {profile.lifetime_danz_earned || 0}
                </p>
              </div>
            </div>

            <div className="bg-black/50 backdrop-blur-md rounded-2xl border border-purple-500/20 p-6">
              <h2 className="text-xl font-semibold text-white mb-4">Dance Styles</h2>
              <div className="flex flex-wrap gap-2">
                {profile.dance_styles?.map((style: string) => (
                  <span
                    key={style}
                    className="px-3 py-1 bg-purple-600/20 border border-purple-500/30 text-purple-300 rounded-full text-sm"
                  >
                    {style}
                  </span>
                )) || <span className="text-gray-500">No dance styles selected</span>}
              </div>
            </div>

            {profile.bio && (
              <div className="bg-black/50 backdrop-blur-md rounded-2xl border border-purple-500/20 p-6 md:col-span-2 lg:col-span-3">
                <h2 className="text-xl font-semibold text-white mb-4">Bio</h2>
                <p className="text-gray-300">{profile.bio}</p>
              </div>
            )}
          </div>
        ) : (
          <div className="bg-black/50 backdrop-blur-md rounded-2xl border border-purple-500/20 p-12 text-center">
            <p className="text-gray-400 mb-4">
              Profile not found. Please complete your registration.
            </p>
            <button
              onClick={() => router.push('/register')}
              className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold rounded-lg hover:from-pink-600 hover:to-purple-700 transition-all duration-300"
            >
              Complete Registration
            </button>
          </div>
        )}

        <div className="mt-8 p-4 bg-yellow-600/10 border border-yellow-500/30 rounded-lg">
          <p className="text-yellow-400 text-sm">
            <strong>Privy User ID:</strong> {user?.id}
          </p>
          <p className="text-yellow-400 text-sm mt-1">
            <strong>Email:</strong> {user?.email?.address || 'No email linked'}
          </p>
          <p className="text-yellow-400 text-sm mt-1">
            <strong>Wallet:</strong> {user?.wallet?.address || 'No wallet connected'}
          </p>
        </div>
      </div>
    </div>
  )
}
