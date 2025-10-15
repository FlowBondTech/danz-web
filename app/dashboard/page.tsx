'use client'

import DashboardLayout from '@/src/components/dashboard/DashboardLayout'
import { useGetMyProfileQuery } from '@/src/generated/graphql'
import { usePrivy } from '@privy-io/react-auth'
import { useRouter, useSearchParams } from 'next/navigation'
import { Suspense, useEffect } from 'react'
import { FaTiktok } from 'react-icons/fa'
import { FiAward, FiInstagram, FiMusic, FiTarget, FiTwitter, FiYoutube } from 'react-icons/fi'

function DashboardContent() {
  const { authenticated, ready, user } = usePrivy()
  const router = useRouter()
  const searchParams = useSearchParams()

  const { data, loading, error, refetch } = useGetMyProfileQuery({
    skip: !authenticated,
  })

  useEffect(() => {
    if (ready && !authenticated) {
      router.push('/')
    }
  }, [ready, authenticated, router])

  useEffect(() => {
    // Refetch user data if coming back from Stripe checkout
    if (
      searchParams.get('session_id') ||
      searchParams.get('success') ||
      searchParams.get('session')
    ) {
      refetch()
    }
  }, [searchParams, refetch])

  if (!ready || loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-white text-2xl">Loading...</div>
        </div>
      </DashboardLayout>
    )
  }

  if (error) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-red-400 text-xl">Error loading profile</div>
        </div>
      </DashboardLayout>
    )
  }

  const profile = data?.me

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-text-primary">Dashboard Overview</h1>
          {profile?.is_premium === 'active' && (
            <div className="bg-gradient-neon px-4 py-2 rounded-full">
              <span className="text-white font-medium text-sm">✨ Premium Member</span>
            </div>
          )}
        </div>

        {profile ? (
          <>
            {/* Primary Stats Grid */}
            <div className="grid gap-4 sm:gap-6 grid-cols-2 lg:grid-cols-4 mb-6 sm:mb-8">
              <div className="bg-bg-secondary rounded-xl border border-neon-purple/20 p-4 sm:p-6">
                <div className="flex items-center justify-between mb-4">
                  <FiAward className="text-neon-purple" size={24} />
                  <span className="text-xs text-text-secondary uppercase tracking-wider">
                    Level
                  </span>
                </div>
                <p className="text-2xl font-bold text-text-primary">{profile.level || 1}</p>
                <p className="text-sm text-text-secondary mt-1">Dance Level</p>
              </div>

              <div className="bg-bg-secondary rounded-xl border border-neon-purple/20 p-4 sm:p-6">
                <div className="flex items-center justify-between mb-4">
                  <FiTarget className="text-neon-pink" size={24} />
                  <span className="text-xs text-text-secondary uppercase tracking-wider">XP</span>
                </div>
                <p className="text-2xl font-bold text-text-primary">{profile.xp || 0}</p>
                <p className="text-sm text-text-secondary mt-1">Experience Points</p>
              </div>

              <div className="bg-bg-secondary rounded-xl border border-neon-purple/20 p-4 sm:p-6">
                <div className="flex items-center justify-between mb-4">
                  <FiMusic className="text-blue-400" size={24} />
                  <span className="text-xs text-text-secondary uppercase tracking-wider">
                    Events
                  </span>
                </div>
                <p className="text-2xl font-bold text-text-primary">
                  {profile.total_events_attended || 0}
                </p>
                <p className="text-sm text-text-secondary mt-1">Events Attended</p>
              </div>

              <div className="bg-bg-secondary rounded-xl border border-neon-purple/20 p-4 sm:p-6">
                <div className="flex items-center justify-between mb-4">
                  <FiAward className="text-yellow-400" size={24} />
                  <span className="text-xs text-text-secondary uppercase tracking-wider">
                    Streak
                  </span>
                </div>
                <p className="text-2xl font-bold text-text-primary">
                  {profile.longest_streak || 0}
                </p>
                <p className="text-sm text-text-secondary mt-1">Best Streak</p>
              </div>
            </div>

            {/* Secondary Stats Grid */}
            <div className="grid gap-4 sm:gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-5 mb-6 sm:mb-8">
              <div className="bg-bg-secondary rounded-xl border border-neon-purple/20 p-3 sm:p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-text-secondary uppercase tracking-wider">
                    Sessions
                  </span>
                </div>
                <p className="text-xl font-bold text-text-primary">{profile.total_sessions || 0}</p>
                <p className="text-xs text-text-secondary">Total Sessions</p>
              </div>

              <div className="bg-bg-secondary rounded-xl border border-neon-purple/20 p-3 sm:p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-text-secondary uppercase tracking-wider">
                    Created
                  </span>
                </div>
                <p className="text-xl font-bold text-text-primary">
                  {profile.total_events_created || 0}
                </p>
                <p className="text-xs text-text-secondary">Events Created</p>
              </div>

              <div className="bg-bg-secondary rounded-xl border border-neon-purple/20 p-3 sm:p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-text-secondary uppercase tracking-wider">
                    Upcoming
                  </span>
                </div>
                <p className="text-xl font-bold text-text-primary">
                  {profile.upcoming_events_count || 0}
                </p>
                <p className="text-xs text-text-secondary">Future Events</p>
              </div>

              <div className="bg-bg-secondary rounded-xl border border-neon-purple/20 p-3 sm:p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-text-secondary uppercase tracking-wider">
                    Achievements
                  </span>
                </div>
                <p className="text-xl font-bold text-text-primary">
                  {profile.total_achievements || 0}
                </p>
                <p className="text-xs text-text-secondary">Unlocked</p>
              </div>

              <div className="bg-bg-secondary rounded-xl border border-neon-purple/20 p-3 sm:p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-text-secondary uppercase tracking-wider">
                    Bonds
                  </span>
                </div>
                <p className="text-xl font-bold text-text-primary">
                  {profile.dance_bonds_count || 0}
                </p>
                <p className="text-xs text-text-secondary">Dance Bonds</p>
              </div>
            </div>

            {/* Profile Info */}
            <div className="grid gap-4 sm:gap-6 lg:grid-cols-3">
              <div className="lg:col-span-2 space-y-4 sm:space-y-6">
                <div className="bg-bg-secondary rounded-xl border border-neon-purple/20 p-4 sm:p-6">
                  <h2 className="text-xl font-bold text-text-primary mb-4">Profile Information</h2>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      {profile.avatar_url ? (
                        <img
                          src={profile.avatar_url}
                          alt={profile.display_name || profile.username || 'User avatar'}
                          className="w-20 h-20 rounded-full object-cover border-2 border-neon-purple/50"
                        />
                      ) : (
                        <div className="w-20 h-20 rounded-full bg-gradient-to-r from-neon-purple to-neon-pink flex items-center justify-center text-white text-2xl font-bold">
                          {profile.username?.charAt(0).toUpperCase() || 'U'}
                        </div>
                      )}
                      <div>
                        <p className="text-lg font-semibold text-text-primary">
                          {profile.display_name || profile.username}
                        </p>
                        <p className="text-text-secondary">@{profile.username}</p>
                        {profile.city && (
                          <p className="text-sm text-text-secondary mt-1">
                            📍 {profile.city}
                            {profile.location && `, ${profile.location}`}
                          </p>
                        )}
                      </div>
                    </div>

                    {profile.bio && (
                      <div className="pt-4 border-t border-white/10">
                        <h3 className="text-sm font-medium text-text-secondary mb-2">Bio</h3>
                        <p className="text-text-primary">{profile.bio}</p>
                      </div>
                    )}

                    <div className="pt-4 border-t border-white/10">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-text-secondary">Role</p>
                          <p className="text-text-primary capitalize">{profile.role || 'Dancer'}</p>
                        </div>
                        <div>
                          <p className="text-sm text-text-secondary">Skill Level</p>
                          <p className="text-text-primary capitalize">
                            {profile.skill_level || 'Not set'}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {profile.dance_styles && profile.dance_styles.length > 0 && (
                  <div className="bg-bg-secondary rounded-xl border border-neon-purple/20 p-4 sm:p-6">
                    <h2 className="text-xl font-bold text-text-primary mb-4">Dance Styles</h2>
                    <div className="flex flex-wrap gap-2">
                      {profile.dance_styles.map((style: string) => (
                        <span
                          key={style}
                          className="px-4 py-2 bg-neon-purple/20 border border-neon-purple/40 text-neon-purple rounded-full text-sm font-medium"
                        >
                          {style}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Social Media & Additional Info */}
                <div className="bg-bg-secondary rounded-xl border border-neon-purple/20 p-4 sm:p-6">
                  <h2 className="text-xl font-bold text-text-primary mb-4">Additional Info</h2>
                  <div className="space-y-3">
                    {profile.age && (
                      <div className="flex justify-between">
                        <span className="text-text-secondary">Age</span>
                        <span className="text-text-primary">{profile.age}</span>
                      </div>
                    )}
                    {profile.pronouns && (
                      <div className="flex justify-between">
                        <span className="text-text-secondary">Pronouns</span>
                        <span className="text-text-primary">{profile.pronouns}</span>
                      </div>
                    )}
                    {profile.subscription_tier && (
                      <div className="flex justify-between">
                        <span className="text-text-secondary">Subscription</span>
                        <span className="text-text-primary capitalize">
                          {profile.subscription_tier}
                        </span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-text-secondary">Profile Visibility</span>
                      <span className="text-text-primary">
                        {profile.is_public ? 'Public' : 'Private'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-secondary">Messages</span>
                      <span className="text-text-primary">
                        {profile.allow_messages ? 'Enabled' : 'Disabled'}
                      </span>
                    </div>
                    {profile.total_dance_time !== null &&
                      profile.total_dance_time !== undefined && (
                        <div className="flex justify-between">
                          <span className="text-text-secondary">Total Dance Time</span>
                          <span className="text-text-primary">
                            {Math.floor(profile.total_dance_time / 60)} hours
                          </span>
                        </div>
                      )}
                  </div>

                  {(profile.instagram || profile.twitter || profile.tiktok || profile.youtube) && (
                    <div className="mt-4 pt-4 border-t border-white/10">
                      <p className="text-sm text-text-secondary mb-2">Social Media</p>
                      <div className="flex gap-3">
                        {profile.instagram && (
                          <a
                            href={`https://instagram.com/${profile.instagram}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-text-secondary hover:text-neon-pink"
                          >
                            <FiInstagram size={20} />
                          </a>
                        )}
                        {profile.twitter && (
                          <a
                            href={`https://twitter.com/${profile.twitter}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-text-secondary hover:text-neon-purple"
                          >
                            <FiTwitter size={20} />
                          </a>
                        )}
                        {profile.tiktok && (
                          <a
                            href={`https://tiktok.com/@${profile.tiktok}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-text-secondary hover:text-neon-pink"
                          >
                            <FaTiktok size={20} />
                          </a>
                        )}
                        {profile.youtube && (
                          <a
                            href={`https://youtube.com/${profile.youtube}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-text-secondary hover:text-red-500"
                          >
                            <FiYoutube size={20} />
                          </a>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-4 sm:space-y-6">
                <div className="bg-bg-secondary rounded-xl border border-neon-purple/20 p-4 sm:p-6">
                  <h2 className="text-xl font-bold text-text-primary mb-4">Quick Actions</h2>
                  <div className="space-y-3">
                    <button
                      onClick={() => router.push('/dashboard/profile')}
                      className="w-full btn btn-primary"
                    >
                      Edit Profile
                    </button>
                    <button className="w-full btn btn-outline">View Public Profile</button>
                  </div>
                </div>

                <div className="bg-bg-secondary rounded-xl border border-neon-purple/20 p-4 sm:p-6">
                  <h2 className="text-xl font-bold text-text-primary mb-4">Account Info</h2>
                  <div className="space-y-3 text-sm">
                    <div>
                      <p className="text-text-secondary">Email</p>
                      <p className="text-text-primary truncate">
                        {user?.email?.address || 'Not set'}
                      </p>
                    </div>
                    {user?.wallet?.address && (
                      <div>
                        <p className="text-text-secondary">Wallet</p>
                        <p className="text-text-primary font-mono text-xs">
                          {user.wallet.address.slice(0, 6)}...{user.wallet.address.slice(-4)}
                        </p>
                      </div>
                    )}
                    <div>
                      <p className="text-text-secondary">Member Since</p>
                      <p className="text-text-primary">
                        {profile.created_at
                          ? new Date(profile.created_at).toLocaleDateString()
                          : 'Unknown'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="bg-bg-secondary rounded-xl border border-neon-purple/20 p-12 text-center">
            <p className="text-text-secondary mb-4">
              Profile not found. Please complete your registration.
            </p>
            <button onClick={() => router.push('/register')} className="btn btn-primary">
              Complete Registration
            </button>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}

export default function DashboardPage() {
  return (
    <Suspense
      fallback={
        <DashboardLayout>
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="text-white text-2xl">Loading...</div>
          </div>
        </DashboardLayout>
      }
    >
      <DashboardContent />
    </Suspense>
  )
}
