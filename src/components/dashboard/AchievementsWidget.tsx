'use client'

import { useState } from 'react'
import { FiAward, FiLock, FiTrendingUp, FiZap } from 'react-icons/fi'

interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  earned: boolean
  progress?: number
  maxProgress?: number
  rarity: 'common' | 'rare' | 'epic' | 'legendary'
  earnedDate?: string
}

// Mock data - will be replaced with real GraphQL data
const mockAchievements: Achievement[] = [
  {
    id: '1',
    title: 'First Steps',
    description: 'Complete your first dance session',
    icon: '🎯',
    earned: true,
    rarity: 'common',
    earnedDate: '2025-01-10',
  },
  {
    id: '2',
    title: 'Week Warrior',
    description: 'Maintain a 7-day streak',
    icon: '🔥',
    earned: true,
    rarity: 'rare',
    earnedDate: '2025-01-17',
  },
  {
    id: '3',
    title: 'Social Butterfly',
    description: 'Make 10 dance bonds',
    icon: '🦋',
    earned: true,
    progress: 10,
    maxProgress: 10,
    rarity: 'rare',
    earnedDate: '2025-01-15',
  },
  {
    id: '4',
    title: 'Event Master',
    description: 'Attend 25 events',
    icon: '🎪',
    earned: false,
    progress: 12,
    maxProgress: 25,
    rarity: 'epic',
  },
  {
    id: '5',
    title: 'Century Club',
    description: 'Reach level 100',
    icon: '💯',
    earned: false,
    progress: 23,
    maxProgress: 100,
    rarity: 'legendary',
  },
  {
    id: '6',
    title: 'Influencer',
    description: 'Get 1000 total likes',
    icon: '⭐',
    earned: false,
    progress: 342,
    maxProgress: 1000,
    rarity: 'epic',
  },
]

export default function AchievementsWidget() {
  const [showAll, setShowAll] = useState(false)

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'legendary':
        return 'from-yellow-500/20 to-orange-500/20 border-yellow-500/40'
      case 'epic':
        return 'from-purple-500/20 to-pink-500/20 border-purple-500/40'
      case 'rare':
        return 'from-blue-500/20 to-cyan-500/20 border-blue-500/40'
      default:
        return 'from-gray-500/20 to-gray-400/20 border-gray-500/40'
    }
  }

  const getRarityBadgeColor = (rarity: string) => {
    switch (rarity) {
      case 'legendary':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
      case 'epic':
        return 'bg-purple-500/20 text-purple-400 border-purple-500/30'
      case 'rare':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30'
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30'
    }
  }

  const earnedAchievements = mockAchievements.filter(a => a.earned)
  const lockedAchievements = mockAchievements.filter(a => !a.earned)
  const displayAchievements = showAll
    ? mockAchievements
    : [...earnedAchievements.slice(0, 2), ...lockedAchievements.slice(0, 2)]

  return (
    <div className="bg-bg-secondary border border-neon-purple/20 rounded-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center">
            <FiAward className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-text-primary">Achievements</h2>
            <p className="text-sm text-text-secondary">
              {earnedAchievements.length} of {mockAchievements.length} unlocked
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
          <FiTrendingUp size={14} className="text-yellow-400" />
          <span className="text-xs font-medium text-yellow-400">
            {Math.round((earnedAchievements.length / mockAchievements.length) * 100)}%
          </span>
        </div>
      </div>

      {/* Achievements Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
        {displayAchievements.map(achievement => (
          <div
            key={achievement.id}
            className={`relative overflow-hidden bg-gradient-to-br ${
              achievement.earned
                ? getRarityColor(achievement.rarity)
                : 'from-white/5 to-white/5 border-white/10'
            } border rounded-xl p-4 transition-all ${
              achievement.earned
                ? 'hover:shadow-lg cursor-pointer'
                : 'opacity-60 cursor-not-allowed'
            }`}
          >
            {/* Rarity Badge */}
            <div className="flex items-start justify-between mb-3">
              <div
                className={`text-3xl ${
                  achievement.earned ? 'grayscale-0' : 'grayscale opacity-50'
                }`}
              >
                {achievement.earned ? achievement.icon : <FiLock className="w-6 h-6" />}
              </div>
              <span
                className={`px-2 py-0.5 ${getRarityBadgeColor(
                  achievement.rarity,
                )} border rounded-full text-xs font-medium capitalize`}
              >
                {achievement.rarity}
              </span>
            </div>

            {/* Title & Description */}
            <h3
              className={`text-sm font-semibold mb-1 ${
                achievement.earned ? 'text-text-primary' : 'text-text-muted'
              }`}
            >
              {achievement.title}
            </h3>
            <p className="text-xs text-text-secondary mb-3">{achievement.description}</p>

            {/* Progress Bar (for locked achievements) */}
            {!achievement.earned &&
              achievement.progress !== undefined &&
              achievement.maxProgress && (
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-text-muted">Progress</span>
                    <span className="text-text-secondary font-medium">
                      {achievement.progress}/{achievement.maxProgress}
                    </span>
                  </div>
                  <div className="h-1.5 bg-bg-primary rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-neon-purple to-neon-pink rounded-full transition-all duration-500"
                      style={{
                        width: `${(achievement.progress / achievement.maxProgress) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              )}

            {/* Earned Date */}
            {achievement.earned && achievement.earnedDate && (
              <div className="flex items-center gap-1 text-xs text-text-muted mt-2">
                <FiZap size={12} className="text-yellow-400" />
                <span>
                  Unlocked{' '}
                  {new Date(achievement.earnedDate).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                  })}
                </span>
              </div>
            )}

            {/* Shine effect for earned achievements */}
            {achievement.earned && (
              <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-white/10 to-transparent rounded-bl-full" />
            )}
          </div>
        ))}
      </div>

      {/* Show More/Less Button */}
      {mockAchievements.length > 4 && (
        <button
          onClick={() => setShowAll(!showAll)}
          className="w-full py-2.5 bg-bg-primary/50 hover:bg-bg-primary border border-white/10 hover:border-neon-purple/30 rounded-xl text-text-secondary hover:text-neon-purple text-sm font-medium transition-all"
        >
          {showAll ? 'Show Less' : `View All ${mockAchievements.length} Achievements`}
        </button>
      )}
    </div>
  )
}
