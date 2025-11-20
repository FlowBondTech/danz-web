'use client'

import DashboardLayout from '@/src/components/dashboard/DashboardLayout'
import { useGetMyProfileQuery } from '@/src/generated/graphql'
import { usePrivy } from '@privy-io/react-auth'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { FiUsers, FiDollarSign, FiTrendingUp } from 'react-icons/fi'

export default function AdminUsersPage() {
  const { authenticated, ready } = usePrivy()
  const router = useRouter()

  const { data: profileData, loading: profileLoading } = useGetMyProfileQuery({
    skip: !authenticated,
  })

  useEffect(() => {
    if (ready && !authenticated) {
      router.push('/')
    }
  }, [ready, authenticated, router])

  useEffect(() => {
    if (ready && authenticated && !profileLoading && !profileData?.me?.is_admin) {
      router.push('/dashboard')
    }
  }, [ready, authenticated, profileData, profileLoading, router])

  if (!ready || profileLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-white text-2xl">Loading...</div>
        </div>
      </DashboardLayout>
    )
  }

  if (!profileData?.me?.is_admin) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-red-400 text-xl">Access Denied - Admin Only</div>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6 sm:mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-text-primary">
              User Management
            </h1>
            <p className="text-text-secondary mt-1">
              View user points and award manual adjustments
            </p>
          </div>
        </div>

        {/* Overview Stats */}
        <div className="grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-3 mb-6 sm:mb-8">
          <div className="bg-bg-secondary rounded-xl border border-neon-purple/20 p-4 sm:p-6">
            <div className="flex items-center justify-between mb-4">
              <FiUsers className="text-neon-purple" size={24} />
              <span className="text-xs text-text-secondary uppercase tracking-wider">
                Total
              </span>
            </div>
            <p className="text-2xl font-bold text-text-primary">0</p>
            <p className="text-sm text-text-secondary mt-1">Users</p>
          </div>

          <div className="bg-bg-secondary rounded-xl border border-neon-purple/20 p-4 sm:p-6">
            <div className="flex items-center justify-between mb-4">
              <FiDollarSign className="text-yellow-400" size={24} />
              <span className="text-xs text-text-secondary uppercase tracking-wider">
                Average
              </span>
            </div>
            <p className="text-2xl font-bold text-text-primary">0</p>
            <p className="text-sm text-text-secondary mt-1">Points Per User</p>
          </div>

          <div className="bg-bg-secondary rounded-xl border border-neon-purple/20 p-4 sm:p-6">
            <div className="flex items-center justify-between mb-4">
              <FiTrendingUp className="text-green-400" size={24} />
              <span className="text-xs text-text-secondary uppercase tracking-wider">
                Active
              </span>
            </div>
            <p className="text-2xl font-bold text-text-primary">0</p>
            <p className="text-sm text-text-secondary mt-1">This Week</p>
          </div>
        </div>

        {/* Coming Soon Notice */}
        <div className="bg-bg-secondary rounded-xl border border-neon-purple/20 p-12 text-center">
          <div className="max-w-md mx-auto">
            <FiUsers className="mx-auto text-neon-purple mb-4" size={48} />
            <h3 className="text-xl font-bold text-text-primary mb-2">
              User Management Coming Soon
            </h3>
            <p className="text-text-secondary mb-6">
              Advanced user management tools and point adjustment features will be available
              here soon.
            </p>
            <div className="flex flex-col gap-2 text-sm text-text-secondary text-left bg-bg-primary rounded-lg p-4">
              <p>• Search and filter users by activity</p>
              <p>• View detailed user point history</p>
              <p>• Award manual point adjustments</p>
              <p>• Export user data and reports</p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
