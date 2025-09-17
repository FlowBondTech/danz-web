'use client'

import DashboardLayout from '@/src/components/dashboard/DashboardLayout'
import ProfileEditForm from '@/src/components/dashboard/ProfileEditForm'
import { useGetMyProfileQuery } from '@/src/generated/graphql'
import { usePrivy } from '@privy-io/react-auth'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { FiEdit3 } from 'react-icons/fi'

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
          <div className="h-48 rounded-xl overflow-hidden bg-gradient-to-r from-neon-purple/20 to-neon-pink/20">
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
          </div>

          {/* Avatar overlay */}
          <div className="absolute -bottom-12 left-8">
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

        <div className="bg-bg-secondary rounded-xl border border-neon-purple/20 p-8">
          <ProfileEditForm user={profile} onSave={handleSave} onCancel={handleCancel} />
        </div>
      </div>
    </DashboardLayout>
  )
}
