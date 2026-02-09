'use client'

import DashboardLayout from '@/src/components/dashboard/DashboardLayout'
import { useGetMyProfileQuery } from '@/src/generated/graphql'
import { usePrivy } from '@privy-io/react-auth'
import { motion } from 'motion/react'
import Link from 'next/link'
import { useState } from 'react'
import {
  FiArrowLeft,
  FiAward,
  FiCalendar,
  FiStar,
  FiTarget,
  FiTrendingUp,
  FiUsers,
  FiZap,
} from 'react-icons/fi'

// TODO: Fetch from API
const MOCK_LEADERBOARD = [
  {
    id: '1',
    username: 'dancequeen',
    display_name: 'Sarah M.',
    xp: 4250,
    level: 8,
    events_created: 12,
    events_attended: 45,
    streak: 14,
  },
  {
    id: '2',
    username: 'groovyking',
    display_name: 'Marcus J.',
    xp: 3890,
    level: 7,
    events_created: 8,
    events_attended: 52,
    streak: 21,
  },
  {
    id: '3',
    username: 'salsafire',
    display_name: 'Elena R.',
    xp: 3450,
    level: 7,
    events_created: 15,
    events_attended: 38,
    streak: 7,
  },
  {
    id: '4',
    username: 'hiphopdreams',
    display_name: 'Tyler W.',
    xp: 2980,
    level: 6,
    events_created: 5,
    events_attended: 42,
    streak: 0,
  },
  {
    id: '5',
    username: 'balletrose',
    display_name: 'Lily C.',
    xp: 2650,
    level: 5,
    events_created: 3,
    events_attended: 35,
    streak: 5,
  },
  {
    id: '6',
    username: 'jazzyhands',
    display_name: 'Mike D.',
    xp: 2340,
    level: 5,
    events_created: 7,
    events_attended: 28,
    streak: 3,
  },
  {
    id: '7',
    username: 'breakdancer',
    display_name: 'Carlos G.',
    xp: 1980,
    level: 4,
    events_created: 2,
    events_attended: 31,
    streak: 0,
  },
  {
    id: '8',
    username: 'tapmaster',
    display_name: 'Jessica T.',
    xp: 1750,
    level: 4,
    events_created: 4,
    events_attended: 25,
    streak: 2,
  },
  {
    id: '9',
    username: 'swingking',
    display_name: 'David S.',
    xp: 1520,
    level: 3,
    events_created: 1,
    events_attended: 22,
    streak: 0,
  },
  {
    id: '10',
    username: 'moonwalker',
    display_name: 'Chris M.',
    xp: 1280,
    level: 3,
    events_created: 0,
    events_attended: 18,
    streak: 1,
  },
]

const RANK_BADGES: Record<number, { emoji: string; color: string; bg: string; glow: string }> = {
  1: {
    emoji: '👑',
    color: 'text-yellow-400',
    bg: 'bg-yellow-500/20',
    glow: 'shadow-yellow-500/30',
  },
  2: { emoji: '🥈', color: 'text-gray-300', bg: 'bg-gray-500/20', glow: 'shadow-gray-500/20' },
  3: {
    emoji: '🥉',
    color: 'text-orange-400',
    bg: 'bg-orange-500/20',
    glow: 'shadow-orange-500/20',
  },
}

type TimeFilter = 'weekly' | 'monthly' | 'allTime'
type SortBy = 'xp' | 'events_created' | 'events_attended' | 'streak'

export default function LeaderboardPage() {
  const { authenticated } = usePrivy()
  const [timeFilter, setTimeFilter] = useState<TimeFilter>('allTime')
  const [sortBy, setSortBy] = useState<SortBy>('xp')

  const { data: profileData } = useGetMyProfileQuery({
    skip: !authenticated,
  })

  const currentUserId = profileData?.me?.privy_id

  // Sort users based on criteria
  const sortedUsers = [...MOCK_LEADERBOARD].sort((a, b) => {
    switch (sortBy) {
      case 'xp':
        return b.xp - a.xp
      case 'events_created':
        return b.events_created - a.events_created
      case 'events_attended':
        return b.events_attended - a.events_attended
      case 'streak':
        return (b.streak || 0) - (a.streak || 0)
      default:
        return b.xp - a.xp
    }
  })

  // Find current user's rank
  const currentUserRank = currentUserId
    ? sortedUsers.findIndex(u => u.id === currentUserId) + 1
    : null

  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        {/* Back Navigation */}
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 text-text-secondary hover:text-text-primary transition-colors mb-6"
        >
          <FiArrowLeft size={20} />
          <span>Back to Events</span>
        </Link>

        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8">
          <div className="flex items-center gap-4">
            <motion.div
              animate={{
                rotate: [0, -10, 10, -10, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 0.6,
                repeat: Number.POSITIVE_INFINITY,
                repeatDelay: 3,
                ease: 'easeInOut',
              }}
              className="text-5xl"
            >
              🏆
            </motion.div>
            <div>
              <h1 className="text-3xl md:text-4xl font-display font-bold text-text-primary">
                Dance Leaderboard
              </h1>
              <p className="text-text-secondary mt-1">Top dancers in the community</p>
            </div>
          </div>

          {currentUserRank && currentUserRank > 0 && (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="flex items-center gap-4 px-6 py-4 bg-gradient-to-r from-neon-purple/20 to-neon-pink/20 rounded-2xl border border-neon-purple/30"
            >
              <FiZap className="w-8 h-8 text-yellow-500" />
              <div>
                <p className="text-sm text-text-secondary">Your Rank</p>
                <p className="text-3xl font-bold text-text-primary">#{currentUserRank}</p>
              </div>
            </motion.div>
          )}
        </div>

        {/* Filters */}
        <div className="flex flex-col gap-4 mb-8">
          {/* Time Filter */}
          <div className="flex items-center gap-2 bg-bg-secondary rounded-xl p-1.5 border border-white/10 overflow-x-auto">
            {(['weekly', 'monthly', 'allTime'] as TimeFilter[]).map(filter => (
              <button
                key={filter}
                onClick={() => setTimeFilter(filter)}
                className={`px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                  timeFilter === filter
                    ? 'bg-neon-purple text-text-primary shadow-lg shadow-neon-purple/30'
                    : 'text-text-secondary hover:text-text-primary hover:bg-white/5'
                }`}
              >
                {filter === 'weekly' ? 'Week' : filter === 'monthly' ? 'Month' : 'All Time'}
              </button>
            ))}
          </div>

          {/* Sort By */}
          <div className="flex items-center gap-1 sm:gap-2 bg-bg-secondary rounded-xl p-1.5 border border-white/10 overflow-x-auto">
            {(
              [
                { key: 'xp', icon: FiZap, label: 'XP' },
                { key: 'events_created', icon: FiCalendar, label: 'Created' },
                { key: 'events_attended', icon: FiUsers, label: 'Attended' },
                { key: 'streak', icon: FiTrendingUp, label: 'Streak' },
              ] as { key: SortBy; icon: typeof FiZap; label: string }[]
            ).map(({ key, icon: Icon, label }) => (
              <button
                key={key}
                onClick={() => setSortBy(key)}
                className={`flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-4 py-2 sm:py-2.5 rounded-lg text-xs sm:text-sm font-medium transition-all whitespace-nowrap ${
                  sortBy === key
                    ? 'bg-neon-purple text-text-primary shadow-lg shadow-neon-purple/30'
                    : 'text-text-secondary hover:text-text-primary hover:bg-white/5'
                }`}
              >
                <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span className="hidden xs:inline">{label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Top 3 Podium */}
        <div className="bg-bg-secondary rounded-2xl border border-white/10 p-8 mb-8 overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-b from-neon-purple/10 via-transparent to-transparent" />

          <div className="relative flex items-end justify-center gap-4 sm:gap-8">
            {/* 2nd Place */}
            {sortedUsers[1] && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="text-center"
              >
                <div className="relative">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-gray-400 to-gray-600 mx-auto mb-3 overflow-hidden border-4 border-gray-400 shadow-xl shadow-gray-500/30">
                    {sortedUsers[1].display_name?.[0] || sortedUsers[1].username[0]}
                  </div>
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 text-3xl">🥈</span>
                </div>
                <p className="font-bold text-text-primary mt-3 truncate max-w-[120px]">
                  {sortedUsers[1].display_name || sortedUsers[1].username}
                </p>
                <p className="text-lg text-yellow-400 font-medium">
                  {sortedUsers[1].xp.toLocaleString()} XP
                </p>
                <p className="text-sm text-text-secondary">Level {sortedUsers[1].level}</p>
                <div className="h-24 w-28 bg-gray-500/20 rounded-t-xl mt-4 flex items-center justify-center border-t border-l border-r border-gray-500/30">
                  <span className="text-4xl font-bold text-gray-400">2</span>
                </div>
              </motion.div>
            )}

            {/* 1st Place */}
            {sortedUsers[0] && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center"
              >
                <div className="relative">
                  <motion.div
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                    className="w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 mx-auto mb-3 overflow-hidden border-4 border-yellow-400 shadow-2xl shadow-yellow-500/40 flex items-center justify-center text-white text-3xl font-bold"
                  >
                    {sortedUsers[0].display_name?.[0] || sortedUsers[0].username[0]}
                  </motion.div>
                  <motion.span
                    animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                    className="absolute -bottom-2 left-1/2 -translate-x-1/2 text-4xl"
                  >
                    👑
                  </motion.span>
                </div>
                <p className="font-bold text-text-primary text-lg mt-3 truncate max-w-[140px]">
                  {sortedUsers[0].display_name || sortedUsers[0].username}
                </p>
                <p className="text-xl text-yellow-400 font-bold">
                  {sortedUsers[0].xp.toLocaleString()} XP
                </p>
                <p className="text-sm text-text-secondary">Level {sortedUsers[0].level}</p>
                <div className="h-32 w-32 bg-yellow-500/20 rounded-t-xl mt-4 flex items-center justify-center border-t border-l border-r border-yellow-500/30">
                  <span className="text-5xl font-bold text-yellow-400">1</span>
                </div>
              </motion.div>
            )}

            {/* 3rd Place */}
            {sortedUsers[2] && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-center"
              >
                <div className="relative">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 mx-auto mb-3 overflow-hidden border-4 border-orange-400 shadow-xl shadow-orange-500/30 flex items-center justify-center text-white text-xl font-bold">
                    {sortedUsers[2].display_name?.[0] || sortedUsers[2].username[0]}
                  </div>
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 text-3xl">🥉</span>
                </div>
                <p className="font-bold text-text-primary mt-3 truncate max-w-[120px]">
                  {sortedUsers[2].display_name || sortedUsers[2].username}
                </p>
                <p className="text-lg text-yellow-400 font-medium">
                  {sortedUsers[2].xp.toLocaleString()} XP
                </p>
                <p className="text-sm text-text-secondary">Level {sortedUsers[2].level}</p>
                <div className="h-20 w-28 bg-orange-500/20 rounded-t-xl mt-4 flex items-center justify-center border-t border-l border-r border-orange-500/30">
                  <span className="text-4xl font-bold text-orange-400">3</span>
                </div>
              </motion.div>
            )}
          </div>
        </div>

        {/* Full Rankings List */}
        <div className="bg-bg-secondary rounded-2xl border border-white/10 overflow-hidden">
          <div className="px-6 py-4 border-b border-white/10">
            <h2 className="text-lg font-bold text-text-primary flex items-center gap-2">
              <FiAward className="w-5 h-5 text-neon-purple" />
              All Rankings
            </h2>
          </div>

          <div className="divide-y divide-white/5">
            {sortedUsers.slice(3).map((user, index) => {
              const rank = index + 4
              const isCurrentUser = user.id === currentUserId

              return (
                <motion.div
                  key={user.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.03 }}
                  className={`flex items-center gap-4 p-4 sm:p-5 transition-colors ${
                    isCurrentUser
                      ? 'bg-gradient-to-r from-neon-purple/20 to-transparent'
                      : 'hover:bg-white/5'
                  }`}
                >
                  <div className="w-10 text-center">
                    <span className="text-lg font-bold text-text-secondary">{rank}</span>
                  </div>

                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-neon-purple to-neon-pink overflow-hidden flex items-center justify-center text-white font-bold text-lg">
                    {user.display_name?.[0] || user.username[0]}
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-text-primary truncate">
                      {user.display_name || user.username}
                      {isCurrentUser && <span className="text-neon-purple ml-2">(You)</span>}
                    </p>
                    <div className="flex flex-wrap items-center gap-3 text-xs text-text-secondary mt-1">
                      <span className="flex items-center gap-1">
                        <FiStar className="w-3 h-3 text-yellow-500" />
                        Level {user.level}
                      </span>
                      <span className="flex items-center gap-1">
                        <FiCalendar className="w-3 h-3" />
                        {user.events_created} created
                      </span>
                      <span className="flex items-center gap-1">
                        <FiUsers className="w-3 h-3" />
                        {user.events_attended} attended
                      </span>
                      {user.streak > 0 && (
                        <span className="flex items-center gap-1 text-orange-400">
                          <FiTrendingUp className="w-3 h-3" />
                          {user.streak} day streak
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="text-lg font-bold text-yellow-400">{user.xp.toLocaleString()}</p>
                    <p className="text-xs text-text-secondary">XP</p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* How to Climb Section */}
        <div className="mt-8 bg-bg-secondary rounded-2xl border border-white/10 p-6">
          <h2 className="text-lg font-bold text-text-primary flex items-center gap-2 mb-4">
            <FiTarget className="w-5 h-5 text-neon-purple" />
            How to Climb the Leaderboard
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                icon: FiCalendar,
                label: 'Create Events',
                xp: '+100 XP',
                desc: 'Host dance events',
              },
              {
                icon: FiUsers,
                label: 'Attend Events',
                xp: '+25 XP',
                desc: 'Join community events',
              },
              { icon: FiTrendingUp, label: 'Build Streaks', xp: '+10 XP/day', desc: 'Dance daily' },
              { icon: FiStar, label: 'Level Up', xp: 'Bonus XP', desc: 'Unlock achievements' },
            ].map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                className="p-4 bg-white/5 rounded-xl border border-white/10 hover:border-neon-purple/30 transition-colors"
              >
                <item.icon className="w-6 h-6 text-neon-purple mb-2" />
                <p className="font-medium text-text-primary">{item.label}</p>
                <p className="text-sm text-yellow-400">{item.xp}</p>
                <p className="text-xs text-text-secondary mt-1">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
