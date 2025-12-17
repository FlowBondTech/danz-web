'use client'

import DashboardLayout from '@/src/components/dashboard/DashboardLayout'
import ProfileEditForm from '@/src/components/dashboard/ProfileEditForm'
import { useGetMyProfileQuery } from '@/src/generated/graphql'
import { usePrivy } from '@privy-io/react-auth'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useEffect } from 'react'
import { FiCamera, FiEdit3, FiGift, FiZap, FiAward, FiChevronRight } from 'react-icons/fi'
import { motion } from 'motion/react'

export default function ProfilePage() {
  const { authenticated, ready } = usePrivy()
  const router = useRouter()

  const { data, loading, error, refetch } = useGetMyProfileQuery({
    skip: !authenticated,
  })

  useEffect(() => {
    if (ready && !authenticated) {
      router.push('/')
    }
  }, [ready, authenticated, router])

  const handleSave = async () => {
    await refetch()
    // Optionally show a success message
  }

  const handleCancel = () => {
    router.push('/dashboard')
  }

  if (!ready || loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="w-8 h-8 border-2 border-neon-purple border-t-transparent rounded-full animate-spin" />
        </div>
      </DashboardLayout>
    )
  }

  if (error) {
    return (
      <DashboardLayout>
        <div className="text-center py-12">
          <p className="text-red-400">Error loading profile</p>
        </div>
      </DashboardLayout>
    )
  }

  const profile = data?.me

  if (!profile) {
    return (
      <DashboardLayout>
        <div className="bg-bg-secondary rounded-xl border border-neon-purple/20 p-12 text-center">
          <p className="text-text-secondary mb-4">
            Profile not found. Please complete your registration.
          </p>
          <button onClick={() => router.push('/register')} className="btn btn-primary">
            Complete Registration
          </button>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto">
        {/* Cover Image Section */}
        <div className="relative mb-8">
          <div className="relative h-48 rounded-xl overflow-hidden bg-gradient-to-r from-neon-purple/20 to-neon-pink/20">
            {profile?.cover_image_url ? (
              <img
                src={profile.cover_image_url}
                alt="Cover"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <p className="text-text-secondary">No cover image</p>
              </div>
            )}

            {/* Cover Edit Button */}
            <button
              onClick={() => {
                const form = document.querySelector('[data-profile-form]')
                form?.scrollIntoView({ behavior: 'smooth', block: 'start' })
              }}
              className="absolute top-4 right-4 p-3 bg-bg-primary/90 hover:bg-bg-primary border border-white/20 hover:border-neon-purple/50 rounded-xl text-text-primary hover:text-neon-purple transition-all backdrop-blur-sm z-10"
              aria-label="Edit cover image"
            >
              <FiEdit3 size={20} />
            </button>
          </div>

          {/* Avatar overlay */}
          <div className="absolute -bottom-12 left-8">
            <div className="relative">
              {profile?.avatar_url ? (
                <img
                  src={profile.avatar_url}
                  alt={profile.display_name || profile.username || 'User'}
                  className="w-24 h-24 rounded-full object-cover border-4 border-bg-secondary"
                />
              ) : (
                <div className="w-24 h-24 rounded-full bg-gradient-to-r from-neon-purple to-neon-pink flex items-center justify-center text-white text-3xl font-bold border-4 border-bg-secondary">
                  {profile?.username?.charAt(0).toUpperCase() || 'U'}
                </div>
              )}

              {/* Avatar Edit Button */}
              <button
                onClick={() => {
                  const form = document.querySelector('[data-profile-form]')
                  form?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                }}
                className="absolute bottom-0 right-0 p-2.5 bg-gradient-to-br from-neon-purple to-neon-pink hover:from-neon-purple/90 hover:to-neon-pink/90 rounded-full text-white transition-all shadow-lg hover:shadow-neon-purple/50 z-10"
                aria-label="Edit profile picture"
              >
                <FiCamera size={16} />
              </button>
            </div>
          </div>
        </div>

        <div className="mb-8 pt-12">
          <h1 className="text-3xl font-bold text-text-primary flex items-center gap-3">
            <FiEdit3 className="text-neon-purple" />
            Edit Profile
          </h1>
          <p className="text-text-secondary mt-2">
            Update your profile information and preferences
          </p>
        </div>

        {/* Claim Rewards Card - Hidden until backend support is added */}
        {/* TODO: Add unclaimed_rewards to User type in backend schema */}

        <div className="bg-bg-secondary rounded-xl border border-neon-purple/20 p-8" data-profile-form>
          <ProfileEditForm user={profile} onSave={handleSave} onCancel={handleCancel} />
        </div>
      </div>
    </DashboardLayout>
  )
}
