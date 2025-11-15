'use client'

import DashboardLayout from '@/src/components/dashboard/DashboardLayout'
import { useGetMyProfileQuery, useGetPointsOverviewQuery } from '@/src/generated/graphql'
import { usePrivy } from '@privy-io/react-auth'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import {
  FiActivity,
  FiAward,
  FiCalendar,
  FiDollarSign,
  FiSettings,
  FiTrendingUp,
  FiUsers,
} from 'react-icons/fi'

export default function AdminDashboardPage() {
  const { authenticated, ready } = usePrivy()
  const router = useRouter()

  const { data: profileData, loading: profileLoading } = useGetMyProfileQuery({
    skip: !authenticated,
  })

  const { data: overviewData, loading: overviewLoading } = useGetPointsOverviewQuery({
    skip: !authenticated || !profileData?.me?.is_admin,
  })

  useEffect(() => {
    if (ready && !authenticated) {
      router.push('/')
    }
  }, [ready, authenticated, router])

  useEffect(() => {
    // Redirect non-admins
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

  const overview = overviewData?.getPointsOverview

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6 sm:mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-text-primary">Admin Dashboard</h1>
            <p className="text-text-secondary mt-1">Manage points system and analytics</p>
          </div>
          <div className="bg-gradient-neon px-4 py-2 rounded-full">
            <span className="text-white font-medium text-sm">⚡ Admin</span>
          </div>
        </div>

        {/* Overview Stats */}
        {!overviewLoading && overview && (
          <div className="grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mb-6 sm:mb-8">
            <div className="bg-bg-secondary rounded-xl border border-neon-purple/20 p-4 sm:p-6">
              <div className="flex items-center justify-between mb-4">
                <FiDollarSign className="text-neon-purple" size={24} />
                <span className="text-xs text-text-secondary uppercase tracking-wider">
                  Total Issued
                </span>
              </div>
              <p className="text-2xl font-bold text-text-primary">
                {overview.total_points_issued.toLocaleString()}
              </p>
              <p className="text-sm text-text-secondary mt-1">Points Awarded</p>
            </div>

            <div className="bg-bg-secondary rounded-xl border border-neon-purple/20 p-4 sm:p-6">
              <div className="flex items-center justify-between mb-4">
                <FiUsers className="text-neon-pink" size={24} />
                <span className="text-xs text-text-secondary uppercase tracking-wider">
                  Active Users
                </span>
              </div>
              <p className="text-2xl font-bold text-text-primary">
                {overview.total_active_users.toLocaleString()}
              </p>
              <p className="text-sm text-text-secondary mt-1">Earning Points</p>
            </div>

            <div className="bg-bg-secondary rounded-xl border border-neon-purple/20 p-4 sm:p-6">
              <div className="flex items-center justify-between mb-4">
                <FiActivity className="text-blue-400" size={24} />
                <span className="text-xs text-text-secondary uppercase tracking-wider">Average</span>
              </div>
              <p className="text-2xl font-bold text-text-primary">
                {Math.round(overview.avg_points_per_user).toLocaleString()}
              </p>
              <p className="text-sm text-text-secondary mt-1">Per User</p>
            </div>

            <div className="bg-bg-secondary rounded-xl border border-neon-purple/20 p-4 sm:p-6">
              <div className="flex items-center justify-between mb-4">
                <FiTrendingUp className="text-green-400" size={24} />
                <span className="text-xs text-text-secondary uppercase tracking-wider">Today</span>
              </div>
              <p className="text-2xl font-bold text-text-primary">
                {overview.points_issued_today.toLocaleString()}
              </p>
              <p className="text-sm text-text-secondary mt-1">Points Issued</p>
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <div className="grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-6 sm:mb-8">
          <button
            onClick={() => router.push('/dashboard/admin/points')}
            className="bg-bg-secondary rounded-xl border border-neon-purple/20 p-6 hover:border-neon-purple/40 transition-colors text-left group"
          >
            <div className="flex items-center gap-4 mb-3">
              <div className="p-3 bg-neon-purple/20 rounded-lg group-hover:bg-neon-purple/30 transition-colors">
                <FiSettings className="text-neon-purple" size={24} />
              </div>
              <h3 className="text-lg font-semibold text-text-primary">Point Actions</h3>
            </div>
            <p className="text-text-secondary text-sm">
              Configure point values, limits, and reward actions
            </p>
          </button>

          <button
            onClick={() => router.push('/dashboard/admin/analytics')}
            className="bg-bg-secondary rounded-xl border border-neon-purple/20 p-6 hover:border-neon-purple/40 transition-colors text-left group"
          >
            <div className="flex items-center gap-4 mb-3">
              <div className="p-3 bg-neon-pink/20 rounded-lg group-hover:bg-neon-pink/30 transition-colors">
                <FiTrendingUp className="text-neon-pink" size={24} />
              </div>
              <h3 className="text-lg font-semibold text-text-primary">Analytics</h3>
            </div>
            <p className="text-text-secondary text-sm">
              View user points summaries and earning patterns
            </p>
          </button>

          <button
            onClick={() => router.push('/dashboard/admin/transactions')}
            className="bg-bg-secondary rounded-xl border border-neon-purple/20 p-6 hover:border-neon-purple/40 transition-colors text-left group"
          >
            <div className="flex items-center gap-4 mb-3">
              <div className="p-3 bg-blue-400/20 rounded-lg group-hover:bg-blue-400/30 transition-colors">
                <FiActivity className="text-blue-400" size={24} />
              </div>
              <h3 className="text-lg font-semibold text-text-primary">Transactions</h3>
            </div>
            <p className="text-text-secondary text-sm">
              View and manage all point transactions
            </p>
          </button>

          <button
            onClick={() => router.push('/dashboard/admin/events')}
            className="bg-bg-secondary rounded-xl border border-neon-purple/20 p-6 hover:border-neon-purple/40 transition-colors text-left group"
          >
            <div className="flex items-center gap-4 mb-3">
              <div className="p-3 bg-green-400/20 rounded-lg group-hover:bg-green-400/30 transition-colors">
                <FiCalendar className="text-green-400" size={24} />
              </div>
              <h3 className="text-lg font-semibold text-text-primary">Event Attendance</h3>
            </div>
            <p className="text-text-secondary text-sm">
              Track event attendance and verify point rewards
            </p>
          </button>

          <button
            onClick={() => router.push('/dashboard/admin/users')}
            className="bg-bg-secondary rounded-xl border border-neon-purple/20 p-6 hover:border-neon-purple/40 transition-colors text-left group"
          >
            <div className="flex items-center gap-4 mb-3">
              <div className="p-3 bg-yellow-400/20 rounded-lg group-hover:bg-yellow-400/30 transition-colors">
                <FiUsers className="text-yellow-400" size={24} />
              </div>
              <h3 className="text-lg font-semibold text-text-primary">User Management</h3>
            </div>
            <p className="text-text-secondary text-sm">
              View user points and award manual adjustments
            </p>
          </button>

          <button
            onClick={() => router.push('/dashboard/admin/referrals')}
            className="bg-bg-secondary rounded-xl border border-neon-purple/20 p-6 hover:border-neon-purple/40 transition-colors text-left group"
          >
            <div className="flex items-center gap-4 mb-3">
              <div className="p-3 bg-purple-400/20 rounded-lg group-hover:bg-purple-400/30 transition-colors">
                <FiAward className="text-purple-400" size={24} />
              </div>
              <h3 className="text-lg font-semibold text-text-primary">Referral Tracking</h3>
            </div>
            <p className="text-text-secondary text-sm">
              Monitor referral performance and bonus rewards
            </p>
          </button>
        </div>

        {/* Top Earning Action */}
        {overview?.top_earning_action && (
          <div className="bg-bg-secondary rounded-xl border border-neon-purple/20 p-6">
            <h2 className="text-xl font-bold text-text-primary mb-4">Top Earning Action</h2>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-lg font-semibold text-text-primary">
                  {overview.top_earning_action.action_name}
                </p>
                <p className="text-text-secondary text-sm">
                  {overview.top_earning_action.points_value} points per action
                </p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-neon-purple">
                  {overview.top_earning_action?.total_points_awarded?.toLocaleString() || '0'}
                </p>
                <p className="text-text-secondary text-sm">Total Awarded</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
