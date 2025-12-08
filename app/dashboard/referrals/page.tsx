'use client'

import DashboardLayout from '@/src/components/dashboard/DashboardLayout'
import { useAuth } from '@/src/contexts/AuthContext'
import { useReferralData } from '@/src/hooks/useReferralData'
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
  FiAward,
  FiStar,
} from 'react-icons/fi'
import { FaWhatsapp } from 'react-icons/fa'

function ReferralsContent() {
  const { authenticated, ready } = usePrivy()
  const { user } = useAuth()
  const router = useRouter()
  const [copiedShareUrl, setCopiedShareUrl] = useState(false)
  const [copiedCode, setCopiedCode] = useState(false)

  // Fetch real referral data from Supabase
  const { referrals, pointsData, stats, loading: dataLoading } = useReferralData(user?.username)

  // Use username as referral code (simple approach)
  const referralCode = user?.username || 'loading...'
  const shareUrl = `https://danz.now/i/${referralCode}`

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
      `Join me on DANZ! Dance your way to fitness and earn rewards.\n\nUse my referral link: ${shareUrl}`
    )
    window.open(`https://wa.me/?text=${message}`, '_blank')
  }

  const shareViaSMS = () => {
    const message = encodeURIComponent(
      `Hey! Join me on DANZ and earn rewards by dancing. Use my link: ${shareUrl}`
    )
    window.location.href = `sms:?&body=${message}`
  }

  if (!ready || dataLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[60vh]" role="status" aria-live="polite">
          <div className="text-white text-2xl">Loading...</div>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with Points Balance */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 sm:mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-text-primary">
              Referral Program
            </h1>
            <p className="text-text-secondary mt-2">
              Earn 20 points for every friend who joins and completes their first dance session!
            </p>
          </div>

          {/* Points Balance Card */}
          <div className="bg-gradient-to-r from-neon-purple to-neon-pink p-[1px] rounded-2xl">
            <div className="bg-bg-secondary rounded-2xl px-6 py-4 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-neon-purple/20 flex items-center justify-center">
                <FiStar className="text-yellow-400" size={24} aria-hidden="true" />
              </div>
              <div>
                <p className="text-sm text-text-secondary">Your Points</p>
                <p className="text-2xl font-bold text-white">
                  {pointsData?.current_points_balance?.toLocaleString() || 0}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <section aria-label="Referral statistics">
          <div className="grid gap-4 sm:gap-6 grid-cols-2 lg:grid-cols-4 mb-6 sm:mb-8">
            <div className="bg-bg-secondary rounded-xl border border-neon-purple/20 p-4 sm:p-6">
              <div className="flex items-center justify-between mb-4">
                <FiUsers className="text-neon-purple" size={24} aria-hidden="true" />
                <span className="text-xs text-text-secondary uppercase tracking-wider">
                  Signups
                </span>
              </div>
              <p className="text-2xl font-bold text-text-primary">{stats.totalSignups}</p>
              <p className="text-sm text-text-secondary mt-1">People Joined</p>
            </div>

            <div className="bg-bg-secondary rounded-xl border border-neon-purple/20 p-4 sm:p-6">
              <div className="flex items-center justify-between mb-4">
                <FiCheck className="text-green-400" size={24} aria-hidden="true" />
                <span className="text-xs text-text-secondary uppercase tracking-wider">
                  Completed
                </span>
              </div>
              <p className="text-2xl font-bold text-text-primary">{stats.totalCompleted}</p>
              <p className="text-sm text-text-secondary mt-1">First Sessions</p>
            </div>

            <div className="bg-bg-secondary rounded-xl border border-neon-purple/20 p-4 sm:p-6">
              <div className="flex items-center justify-between mb-4">
                <FiTrendingUp className="text-blue-400" size={24} aria-hidden="true" />
                <span className="text-xs text-text-secondary uppercase tracking-wider">
                  Rate
                </span>
              </div>
              <p className="text-2xl font-bold text-text-primary">{stats.conversionRate}%</p>
              <p className="text-sm text-text-secondary mt-1">Completion Rate</p>
            </div>

            <div className="bg-bg-secondary rounded-xl border border-neon-purple/20 p-4 sm:p-6">
              <div className="flex items-center justify-between mb-4">
                <FiAward className="text-yellow-400" size={24} aria-hidden="true" />
                <span className="text-xs text-text-secondary uppercase tracking-wider">
                  Earned
                </span>
              </div>
              <p className="text-2xl font-bold text-text-primary">
                {stats.totalPointsEarned}
              </p>
              <p className="text-sm text-text-secondary mt-1">Referral Points</p>
            </div>
          </div>
        </section>

        {/* Referral Code Section */}
        <div className="grid gap-6 lg:grid-cols-2 mb-6 sm:mb-8">
          <div className="bg-bg-secondary rounded-xl border border-neon-purple/20 p-6">
            <h2 className="text-xl font-bold text-text-primary mb-4 flex items-center gap-2">
              <FiShare2 className="text-neon-purple" aria-hidden="true" />
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
                    className="btn btn-outline px-4 py-2 flex items-center gap-2 min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon-purple"
                    aria-label={copiedCode ? 'Code copied' : 'Copy referral code'}
                  >
                    {copiedCode ? (
                      <>
                        <FiCheck size={16} aria-hidden="true" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <FiCopy size={16} aria-hidden="true" />
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
                    className="btn btn-outline px-4 py-2 flex items-center gap-2 shrink-0 min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon-purple"
                    aria-label={copiedShareUrl ? 'Link copied' : 'Copy referral link'}
                  >
                    {copiedShareUrl ? (
                      <>
                        <FiCheck size={16} aria-hidden="true" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <FiCopy size={16} aria-hidden="true" />
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
                className="flex items-center gap-3 bg-[#25D366] hover:bg-[#1da851] text-white font-medium py-3 px-4 rounded-lg transition-colors min-h-[48px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2 focus-visible:ring-offset-bg-secondary"
              >
                <FaWhatsapp size={24} aria-hidden="true" />
                <span>Share on WhatsApp</span>
              </button>

              <button
                onClick={shareViaSMS}
                className="flex items-center gap-3 bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-4 rounded-lg transition-colors min-h-[48px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-bg-secondary"
              >
                <FiMessageCircle size={20} aria-hidden="true" />
                <span>Share via SMS</span>
              </button>

              <button
                onClick={() => copyToClipboard(shareUrl, 'url')}
                className="btn btn-outline flex items-center gap-3 justify-center min-h-[48px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
              >
                <FiShare2 size={20} aria-hidden="true" />
                <span>Copy Link</span>
              </button>
            </div>
          </div>
        </div>

        {/* Points System Explanation */}
        <div className="bg-gradient-to-r from-neon-purple/10 to-neon-pink/10 border border-neon-purple/20 rounded-xl p-6 mb-6 sm:mb-8">
          <h2 className="text-xl font-bold text-text-primary mb-4 flex items-center gap-2">
            <FiDollarSign className="text-yellow-400" aria-hidden="true" />
            How Points Work
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-3">
              <h3 className="font-semibold text-text-primary">Earning Points</h3>
              <ul className="space-y-2 text-sm text-text-secondary">
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-400" aria-hidden="true" />
                  <span><strong className="text-green-400">+20 pts</strong> - Each completed referral</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-400" aria-hidden="true" />
                  <span><strong className="text-blue-400">+5 pts</strong> - Daily login bonus</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-purple-400" aria-hidden="true" />
                  <span><strong className="text-purple-400">+10 pts</strong> - Completing a dance session</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-yellow-400" aria-hidden="true" />
                  <span><strong className="text-yellow-400">+50 pts</strong> - Attending an event</span>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h3 className="font-semibold text-text-primary">Your Balance</h3>
              <div className="bg-bg-secondary rounded-lg p-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-text-secondary">Total Earned</span>
                  <span className="text-white font-medium">{pointsData?.total_points_earned?.toLocaleString() || 0} pts</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-text-secondary">From Referrals</span>
                  <span className="text-green-400 font-medium">{pointsData?.referral_points_earned?.toLocaleString() || stats.totalPointsEarned} pts</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-text-secondary">Spent</span>
                  <span className="text-red-400 font-medium">{pointsData?.total_points_spent?.toLocaleString() || 0} pts</span>
                </div>
                <div className="border-t border-white/10 pt-2 mt-2">
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Current Balance</span>
                    <span className="text-neon-purple font-bold text-lg">{pointsData?.current_points_balance?.toLocaleString() || 0} pts</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* How It Works */}
        <div className="bg-bg-secondary rounded-xl border border-neon-purple/20 p-6 mb-6 sm:mb-8">
          <h2 className="text-xl font-bold text-text-primary mb-4">How Referrals Work</h2>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="flex gap-3">
              <div className="shrink-0 w-10 h-10 rounded-full bg-gradient-to-r from-neon-purple to-neon-pink flex items-center justify-center text-white font-bold" aria-hidden="true">
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
              <div className="shrink-0 w-10 h-10 rounded-full bg-gradient-to-r from-neon-purple to-neon-pink flex items-center justify-center text-white font-bold" aria-hidden="true">
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
              <div className="shrink-0 w-10 h-10 rounded-full bg-gradient-to-r from-neon-purple to-neon-pink flex items-center justify-center text-white font-bold" aria-hidden="true">
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
        <section aria-label="Recent referrals">
          <div className="bg-bg-secondary rounded-xl border border-neon-purple/20 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-text-primary">Recent Referrals</h2>
              {referrals.length > 0 && (
                <span className="text-sm text-text-secondary">
                  {referrals.length} {referrals.length === 1 ? 'person' : 'people'} joined
                </span>
              )}
            </div>

            {referrals.length > 0 ? (
              <ul className="space-y-3" role="list">
                {referrals.map((referral) => (
                  <li
                    key={referral.privy_id}
                    className="bg-bg-primary rounded-lg p-4 border border-white/10 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      {referral.avatar_url ? (
                        <img
                          src={referral.avatar_url}
                          alt=""
                          className="w-10 h-10 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-neon-purple to-neon-pink flex items-center justify-center text-white font-bold" aria-hidden="true">
                          {referral.display_name?.charAt(0).toUpperCase() || referral.username?.charAt(0).toUpperCase() || '?'}
                        </div>
                      )}
                      <div>
                        <p className="font-medium text-text-primary">
                          {referral.display_name || referral.username}
                        </p>
                        <p className="text-sm text-text-secondary">
                          @{referral.username} &bull; Joined {new Date(referral.created_at).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          referral.status === 'completed'
                            ? 'bg-green-500/20 text-green-400'
                            : 'bg-blue-500/20 text-blue-400'
                        }`}
                      >
                        {referral.status === 'completed' ? (
                          <>
                            <FiCheck className="inline mr-1" aria-hidden="true" />
                            Completed
                          </>
                        ) : (
                          'Signed Up'
                        )}
                      </span>
                      {referral.status === 'completed' && (
                        <span className="text-yellow-400 font-bold">+{referral.points_awarded}</span>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="text-center py-12">
                <FiUsers className="mx-auto text-text-secondary mb-4" size={48} aria-hidden="true" />
                <p className="text-text-secondary mb-2">No referrals yet</p>
                <p className="text-sm text-text-secondary">
                  Share your link to start earning points!
                </p>
              </div>
            )}
          </div>
        </section>
      </div>
    </DashboardLayout>
  )
}

export default function ReferralsPage() {
  return (
    <Suspense
      fallback={
        <DashboardLayout>
          <div className="flex items-center justify-center min-h-[60vh]" role="status" aria-live="polite">
            <div className="text-white text-2xl">Loading...</div>
          </div>
        </DashboardLayout>
      }
    >
      <ReferralsContent />
    </Suspense>
  )
}
