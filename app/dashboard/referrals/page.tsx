'use client'

import DashboardLayout from '@/src/components/dashboard/DashboardLayout'
import { usePrivy } from '@privy-io/react-auth'
import { useRouter } from 'next/navigation'
import { Suspense, useEffect, useState } from 'react'
import {
  FiCopy,
  FiShare2,
  FiUsers,
  FiCheck,
  FiTrendingUp,
  FiDollarSign,
  FiMessageCircle,
} from 'react-icons/fi'
import { FaWhatsapp } from 'react-icons/fa'

function ReferralsContent() {
  const { authenticated, ready } = usePrivy()
  const router = useRouter()
  const [copiedShareUrl, setCopiedShareUrl] = useState(false)
  const [copiedCode, setCopiedCode] = useState(false)

  // Mock data - will be replaced with actual GraphQL queries after migrations
  const referralCode = 'username123'
  const shareUrl = `https://danz.now/i/${referralCode}`
  const stats = {
    totalClicks: 0,
    totalSignups: 0,
    totalCompleted: 0,
    totalPointsEarned: 0,
    conversionRate: 0,
    pendingReferrals: 0,
    completedReferrals: 0,
  }
  const recentReferrals: any[] = []

  useEffect(() => {
    if (ready && !authenticated) {
      router.push('/')
    }
  }, [ready, authenticated, router])

  const copyToClipboard = (text: string, type: 'url' | 'code') => {
    navigator.clipboard.writeText(text)
    if (type === 'url') {
      setCopiedShareUrl(true)
      setTimeout(() => setCopiedShareUrl(false), 2000)
    } else {
      setCopiedCode(true)
      setTimeout(() => setCopiedCode(false), 2000)
    }
  }

  const shareViaWhatsApp = () => {
    const message = encodeURIComponent(
      `🕺 Join me on DANZ! Dance your way to fitness and earn rewards.\n\nUse my referral link: ${shareUrl}`
    )
    window.open(`https://wa.me/?text=${message}`, '_blank')
  }

  const shareViaSMS = () => {
    const message = encodeURIComponent(
      `Hey! Join me on DANZ and earn rewards by dancing. Use my link: ${shareUrl}`
    )
    window.location.href = `sms:?&body=${message}`
  }

  if (!ready) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-white text-2xl">Loading...</div>
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
              Referral Program
            </h1>
            <p className="text-text-secondary mt-2">
              Earn 20 points for every friend who joins and completes their first dance
              session!
            </p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 sm:gap-6 grid-cols-2 lg:grid-cols-4 mb-6 sm:mb-8">
          <div className="bg-bg-secondary rounded-xl border border-neon-purple/20 p-4 sm:p-6">
            <div className="flex items-center justify-between mb-4">
              <FiUsers className="text-neon-purple" size={24} />
              <span className="text-xs text-text-secondary uppercase tracking-wider">
                Clicks
              </span>
            </div>
            <p className="text-2xl font-bold text-text-primary">{stats.totalClicks}</p>
            <p className="text-sm text-text-secondary mt-1">Link Clicks</p>
          </div>

          <div className="bg-bg-secondary rounded-xl border border-neon-purple/20 p-4 sm:p-6">
            <div className="flex items-center justify-between mb-4">
              <FiCheck className="text-green-400" size={24} />
              <span className="text-xs text-text-secondary uppercase tracking-wider">
                Signups
              </span>
            </div>
            <p className="text-2xl font-bold text-text-primary">{stats.totalSignups}</p>
            <p className="text-sm text-text-secondary mt-1">New Users</p>
          </div>

          <div className="bg-bg-secondary rounded-xl border border-neon-purple/20 p-4 sm:p-6">
            <div className="flex items-center justify-between mb-4">
              <FiTrendingUp className="text-blue-400" size={24} />
              <span className="text-xs text-text-secondary uppercase tracking-wider">
                Completed
              </span>
            </div>
            <p className="text-2xl font-bold text-text-primary">{stats.totalCompleted}</p>
            <p className="text-sm text-text-secondary mt-1">First Sessions</p>
          </div>

          <div className="bg-bg-secondary rounded-xl border border-neon-purple/20 p-4 sm:p-6">
            <div className="flex items-center justify-between mb-4">
              <FiDollarSign className="text-yellow-400" size={24} />
              <span className="text-xs text-text-secondary uppercase tracking-wider">
                Points
              </span>
            </div>
            <p className="text-2xl font-bold text-text-primary">
              {stats.totalPointsEarned}
            </p>
            <p className="text-sm text-text-secondary mt-1">Total Earned</p>
          </div>
        </div>

        {/* Referral Code Section */}
        <div className="grid gap-6 lg:grid-cols-2 mb-6 sm:mb-8">
          <div className="bg-bg-secondary rounded-xl border border-neon-purple/20 p-6">
            <h2 className="text-xl font-bold text-text-primary mb-4 flex items-center gap-2">
              <FiShare2 className="text-neon-purple" />
              Your Referral Code
            </h2>
            <div className="space-y-4">
              <div className="bg-bg-primary rounded-lg p-4 border border-white/10">
                <div className="flex items-center justify-between">
                  <code className="text-2xl font-mono text-neon-purple font-bold">
                    {referralCode}
                  </code>
                  <button
                    onClick={() => copyToClipboard(referralCode, 'code')}
                    className="btn btn-outline px-4 py-2 flex items-center gap-2"
                  >
                    {copiedCode ? (
                      <>
                        <FiCheck size={16} />
                        Copied!
                      </>
                    ) : (
                      <>
                        <FiCopy size={16} />
                        Copy
                      </>
                    )}
                  </button>
                </div>
              </div>

              <div className="bg-bg-primary rounded-lg p-4 border border-white/10">
                <p className="text-xs text-text-secondary mb-2">REFERRAL LINK</p>
                <div className="flex items-center justify-between gap-2">
                  <p className="text-sm text-text-primary truncate font-mono">{shareUrl}</p>
                  <button
                    onClick={() => copyToClipboard(shareUrl, 'url')}
                    className="btn btn-outline px-4 py-2 flex items-center gap-2 shrink-0"
                  >
                    {copiedShareUrl ? (
                      <>
                        <FiCheck size={16} />
                        Copied!
                      </>
                    ) : (
                      <>
                        <FiCopy size={16} />
                        Copy
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-bg-secondary rounded-xl border border-neon-purple/20 p-6">
            <h2 className="text-xl font-bold text-text-primary mb-4">Share Via</h2>
            <div className="grid gap-3">
              <button
                onClick={shareViaWhatsApp}
                className="flex items-center gap-3 bg-[#25D366] hover:bg-[#1da851] text-white font-medium py-3 px-4 rounded-lg transition-colors"
              >
                <FaWhatsapp size={24} />
                <span>Share on WhatsApp</span>
              </button>

              <button
                onClick={shareViaSMS}
                className="flex items-center gap-3 bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-4 rounded-lg transition-colors"
              >
                <FiMessageCircle size={20} />
                <span>Share via SMS</span>
              </button>

              <button
                onClick={() => copyToClipboard(shareUrl, 'url')}
                className="btn btn-outline flex items-center gap-3 justify-center"
              >
                <FiShare2 size={20} />
                <span>Copy Link</span>
              </button>
            </div>
          </div>
        </div>

        {/* How It Works */}
        <div className="bg-bg-secondary rounded-xl border border-neon-purple/20 p-6 mb-6 sm:mb-8">
          <h2 className="text-xl font-bold text-text-primary mb-4">How It Works</h2>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="flex gap-3">
              <div className="shrink-0 w-10 h-10 rounded-full bg-gradient-to-r from-neon-purple to-neon-pink flex items-center justify-center text-white font-bold">
                1
              </div>
              <div>
                <h3 className="font-semibold text-text-primary mb-1">Share Your Link</h3>
                <p className="text-sm text-text-secondary">
                  Send your unique referral link to friends via WhatsApp, SMS, or social media
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="shrink-0 w-10 h-10 rounded-full bg-gradient-to-r from-neon-purple to-neon-pink flex items-center justify-center text-white font-bold">
                2
              </div>
              <div>
                <h3 className="font-semibold text-text-primary mb-1">Friend Joins</h3>
                <p className="text-sm text-text-secondary">
                  Your friend clicks your link, downloads DANZ, and signs up for an account
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="shrink-0 w-10 h-10 rounded-full bg-gradient-to-r from-neon-purple to-neon-pink flex items-center justify-center text-white font-bold">
                3
              </div>
              <div>
                <h3 className="font-semibold text-text-primary mb-1">Earn Points</h3>
                <p className="text-sm text-text-secondary">
                  You earn 20 points when they complete their first dance session!
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Referrals */}
        <div className="bg-bg-secondary rounded-xl border border-neon-purple/20 p-6">
          <h2 className="text-xl font-bold text-text-primary mb-4">Recent Referrals</h2>
          {recentReferrals.length > 0 ? (
            <div className="space-y-3">
              {recentReferrals.map((referral: any) => (
                <div
                  key={referral.id}
                  className="bg-bg-primary rounded-lg p-4 border border-white/10 flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    {referral.referee?.avatar_url ? (
                      <img
                        src={referral.referee.avatar_url}
                        alt={referral.referee.username}
                        className="w-10 h-10 rounded-full"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-neon-purple to-neon-pink flex items-center justify-center text-white font-bold">
                        {referral.referee?.username?.charAt(0).toUpperCase() || '?'}
                      </div>
                    )}
                    <div>
                      <p className="font-medium text-text-primary">
                        @{referral.referee?.username || 'Unknown'}
                      </p>
                      <p className="text-sm text-text-secondary">
                        {new Date(referral.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        referral.status === 'completed'
                          ? 'bg-green-500/20 text-green-400'
                          : referral.status === 'signed_up'
                            ? 'bg-blue-500/20 text-blue-400'
                            : 'bg-gray-500/20 text-gray-400'
                      }`}
                    >
                      {referral.status === 'completed'
                        ? '✓ Completed'
                        : referral.status === 'signed_up'
                          ? 'Signed Up'
                          : 'Clicked'}
                    </span>
                    {referral.status === 'completed' && (
                      <span className="text-yellow-400 font-bold">+{referral.points_awarded}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <FiUsers className="mx-auto text-text-secondary mb-4" size={48} />
              <p className="text-text-secondary mb-2">No referrals yet</p>
              <p className="text-sm text-text-secondary">
                Share your link to start earning points!
              </p>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  )
}

export default function ReferralsPage() {
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
      <ReferralsContent />
    </Suspense>
  )
}
