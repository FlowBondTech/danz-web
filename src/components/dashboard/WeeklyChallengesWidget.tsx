'use client'

import { FiAward, FiTarget, FiTrendingUp, FiZap } from 'react-icons/fi'

interface Challenge {
  id: string
  title: string
  description: string
  progress: number
  goal: number
  reward: string
  difficulty: 'easy' | 'medium' | 'hard'
  expiresIn: string
  icon: string
}

// Mock data
const mockChallenges: Challenge[] = [
  {
    id: '1',
    title: 'Weekly Warrior',
    description: 'Dance for 7 consecutive days',
    progress: 4,
    goal: 7,
    reward: '500 XP',
    difficulty: 'medium',
    expiresIn: '3 days',
    icon: '🔥',
  },
  {
    id: '2',
    title: 'Social Star',
    description: 'Make 5 new dance bonds',
    progress: 2,
    goal: 5,
    reward: '300 XP',
    difficulty: 'easy',
    expiresIn: '5 days',
    icon: '⭐',
  },
  {
    id: '3',
    title: 'Event Explorer',
    description: 'Attend 3 different events',
    progress: 1,
    goal: 3,
    reward: '750 XP',
    difficulty: 'hard',
    expiresIn: '6 days',
    icon: '🎪',
  },
]

export default function WeeklyChallengesWidget() {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'hard':
        return 'bg-red-500/20 text-red-400 border-red-500/30'
      case 'medium':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
      default:
        return 'bg-green-500/20 text-green-400 border-green-500/30'
    }
  }

  return (
    <div className="bg-bg-secondary border border-neon-purple/20 rounded-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
            <FiTarget className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-text-primary">Weekly Challenges</h2>
            <p className="text-sm text-text-secondary">{mockChallenges.length} active</p>
          </div>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 bg-green-500/10 border border-green-500/30 rounded-lg">
          <FiZap size={14} className="text-green-400" />
          <span className="text-xs font-medium text-green-400">1.55K XP</span>
        </div>
      </div>

      <div className="space-y-3">
        {mockChallenges.map(challenge => {
          const progressPercent = (challenge.progress / challenge.goal) * 100

          return (
            <div
              key={challenge.id}
              className="p-4 bg-bg-primary/30 border border-white/5 hover:border-neon-purple/30 rounded-xl transition-all group cursor-pointer"
            >
              <div className="flex items-start gap-3 mb-3">
                <div className="text-2xl">{challenge.icon}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h3 className="text-sm font-semibold text-text-primary group-hover:text-neon-purple transition-colors">
                      {challenge.title}
                    </h3>
                    <span
                      className={`px-2 py-0.5 ${getDifficultyColor(
                        challenge.difficulty
                      )} border rounded-full text-xs font-medium capitalize flex-shrink-0`}
                    >
                      {challenge.difficulty}
                    </span>
                  </div>
                  <p className="text-xs text-text-secondary mb-2">{challenge.description}</p>

                  {/* Progress Bar */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-text-muted">
                        {challenge.progress}/{challenge.goal}
                      </span>
                      <span className="text-neon-purple font-medium">{challenge.reward}</span>
                    </div>
                    <div className="h-2 bg-bg-secondary rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-neon-purple to-neon-pink rounded-full transition-all duration-500"
                        style={{ width: `${progressPercent}%` }}
                      />
                    </div>
                  </div>

                  {/* Expires */}
                  <div className="flex items-center gap-1 mt-2 text-xs text-text-muted">
                    <FiTrendingUp size={12} />
                    <span>Expires in {challenge.expiresIn}</span>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* All Challenges Button */}
      <button className="w-full mt-4 py-2.5 bg-bg-primary/50 hover:bg-bg-primary border border-white/10 hover:border-green-500/30 rounded-xl text-text-secondary hover:text-green-400 text-sm font-medium transition-all inline-flex items-center justify-center gap-2">
        <FiAward size={16} />
        View All Challenges
      </button>
    </div>
  )
}
