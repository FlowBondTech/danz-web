'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { FiAward, FiTrendingUp, FiZap } from 'react-icons/fi'

interface LeaderboardEntry {
  rank: number
  username: string
  displayName: string
  avatar: string | null
  score: number
  change: number
  isCurrentUser?: boolean
}

// Mock data
const mockLeaderboard: LeaderboardEntry[] = [
  {
    rank: 1,
    username: 'dance_legend',
    displayName: 'Emma Rodriguez',
    avatar: null,
    score: 9850,
    change: 2,
  },
  {
    rank: 2,
    username: 'rhythm_master',
    displayName: 'Jason Park',
    avatar: null,
    score: 8920,
    change: -1,
  },
  {
    rank: 3,
    username: 'groove_pro',
    displayName: 'Maya Singh',
    avatar: null,
    score: 8540,
    change: 1,
  },
  {
    rank: 23,
    username: 'current_user',
    displayName: 'You',
    avatar: null,
    score: 2340,
    change: 5,
    isCurrentUser: true,
  },
]

export default function LeaderboardWidget() {
  const router = useRouter()
  const [category, setCategory] = useState<'xp' | 'streak' | 'events'>('xp')

  const getRankMedal = (rank: number) => {
    switch (rank) {
      case 1:
        return '🥇'
      case 2:
        return '🥈'
      case 3:
        return '🥉'
      default:
        return null
    }
  }

  const getChangeIndicator = (change: number) => {
    if (change > 0) {
      return (
        <div className="flex items-center gap-0.5 text-green-400">
          <FiTrendingUp size={12} />
          <span className="text-xs font-medium">+{change}</span>
        </div>
      )
    } else if (change < 0) {
      return (
        <div className="flex items-center gap-0.5 text-red-400">
          <FiTrendingUp size={12} className="rotate-180" />
          <span className="text-xs font-medium">{change}</span>
        </div>
      )
    }
    return <span className="text-xs text-text-muted">-</span>
  }

  return (
    <div className="bg-bg-secondary border border-neon-purple/20 rounded-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center">
            <FiAward className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-text-primary">Leaderboard</h2>
            <p className="text-sm text-text-secondary">Top dancers this week</p>
          </div>
        </div>
        <button
          onClick={() => router.push('/dashboard/leaderboard')}
          className="text-sm text-neon-purple hover:text-neon-pink font-medium transition-colors"
        >
          View All
        </button>
      </div>

      {/* Category Tabs */}
      <div className="flex gap-2 mb-4">
        {[
          { key: 'xp', label: 'XP' },
          { key: 'streak', label: 'Streak' },
          { key: 'events', label: 'Events' },
        ].map(tab => (
          <button
            key={tab.key}
            onClick={() => setCategory(tab.key as any)}
            className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
              category === tab.key
                ? 'bg-neon-purple/20 text-neon-purple border border-neon-purple/30'
                : 'bg-bg-primary/30 text-text-secondary border border-white/5 hover:border-white/10'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Leaderboard List */}
      <div className="space-y-2">
        {mockLeaderboard.map(entry => (
          <div
            key={entry.rank}
            onClick={() => !entry.isCurrentUser && router.push(`/profile/${entry.username}`)}
            className={`flex items-center gap-3 p-3 rounded-xl transition-all ${
              entry.isCurrentUser
                ? 'bg-gradient-to-r from-neon-purple/20 to-neon-pink/20 border-2 border-neon-purple/50'
                : 'bg-bg-primary/30 border border-white/5 hover:border-neon-purple/30 cursor-pointer'
            }`}
          >
            {/* Rank */}
            <div className="flex-shrink-0 w-8 text-center">
              {getRankMedal(entry.rank) || (
                <span
                  className={`text-sm font-bold ${
                    entry.isCurrentUser ? 'text-neon-purple' : 'text-text-secondary'
                  }`}
                >
                  #{entry.rank}
                </span>
              )}
            </div>

            {/* Avatar */}
            <div className="flex-shrink-0">
              {entry.avatar ? (
                <img
                  src={entry.avatar}
                  alt={entry.displayName}
                  className="w-10 h-10 rounded-full object-cover border-2 border-bg-secondary"
                />
              ) : (
                <div className={`w-10 h-10 rounded-full ${
                  entry.isCurrentUser
                    ? 'bg-gradient-to-br from-neon-purple to-neon-pink'
                    : 'bg-gradient-to-br from-gray-500 to-gray-600'
                } flex items-center justify-center text-white font-bold text-sm border-2 border-bg-secondary`}>
                  {entry.displayName.charAt(0).toUpperCase()}
                </div>
              )}
            </div>

            {/* Name & Score */}
            <div className="flex-1 min-w-0">
              <h3
                className={`text-sm font-semibold truncate ${
                  entry.isCurrentUser ? 'text-neon-purple' : 'text-text-primary'
                }`}
              >
                {entry.displayName}
              </h3>
              <p className="text-xs text-text-muted">@{entry.username}</p>
            </div>

            {/* Score & Change */}
            <div className="flex-shrink-0 text-right">
              <div className="flex items-center gap-1.5 text-text-primary font-bold text-sm mb-0.5">
                <FiZap size={14} className="text-yellow-400" />
                <span>{entry.score.toLocaleString()}</span>
              </div>
              {getChangeIndicator(entry.change)}
            </div>
          </div>
        ))}
      </div>

      {/* Full Leaderboard Button */}
      <button
        onClick={() => router.push('/dashboard/leaderboard')}
        className="w-full mt-4 py-2.5 bg-bg-primary/50 hover:bg-bg-primary border border-white/10 hover:border-orange-500/30 rounded-xl text-text-secondary hover:text-orange-400 text-sm font-medium transition-all"
      >
        View Full Leaderboard
      </button>
    </div>
  )
}
