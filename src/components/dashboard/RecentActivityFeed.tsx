'use client'

import { useRouter } from 'next/navigation'
import {
  FiActivity,
  FiAward,
  FiCalendar,
  FiHeart,
  FiMessageCircle,
  FiMusic,
  FiUsers,
} from 'react-icons/fi'

interface Activity {
  id: string
  type: 'post' | 'event' | 'achievement' | 'bond' | 'comment' | 'like'
  title: string
  description: string
  timestamp: string
  icon: any
  color: string
  bgColor: string
}

// Mock data - will be replaced with real GraphQL data
const mockActivities: Activity[] = [
  {
    id: '1',
    type: 'achievement',
    title: 'New Achievement Unlocked!',
    description: 'Earned "Week Warrior" badge for maintaining a 7-day streak',
    timestamp: '2025-01-17T10:30:00',
    icon: FiAward,
    color: 'text-yellow-400',
    bgColor: 'bg-yellow-400/10',
  },
  {
    id: '2',
    type: 'event',
    title: 'Attended Hip Hop Session',
    description: 'Completed freestyle workshop at Downtown Studio',
    timestamp: '2025-01-16T18:00:00',
    icon: FiCalendar,
    color: 'text-neon-purple',
    bgColor: 'bg-neon-purple/10',
  },
  {
    id: '3',
    type: 'bond',
    title: 'New Dance Bond',
    description: 'Connected with @alex_moves - Contemporary specialist',
    timestamp: '2025-01-16T14:22:00',
    icon: FiUsers,
    color: 'text-pink-400',
    bgColor: 'bg-pink-400/10',
  },
  {
    id: '4',
    type: 'post',
    title: 'Posted New Dance Video',
    description: 'Shared "Breaking Basics Tutorial" with the community',
    timestamp: '2025-01-15T20:15:00',
    icon: FiMusic,
    color: 'text-blue-400',
    bgColor: 'bg-blue-400/10',
  },
  {
    id: '5',
    type: 'like',
    title: 'Your Post Got Popular',
    description: '15 dancers liked your recent performance video',
    timestamp: '2025-01-15T16:40:00',
    icon: FiHeart,
    color: 'text-red-400',
    bgColor: 'bg-red-400/10',
  },
  {
    id: '6',
    type: 'comment',
    title: 'New Comments',
    description: '3 new comments on your choreography breakdown',
    timestamp: '2025-01-14T12:10:00',
    icon: FiMessageCircle,
    color: 'text-green-400',
    bgColor: 'bg-green-400/10',
  },
]

export default function RecentActivityFeed() {
  const router = useRouter()

  const getTimeAgo = (timestamp: string) => {
    const now = new Date()
    const past = new Date(timestamp)
    const diffMs = now.getTime() - past.getTime()
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMins / 60)
    const diffDays = Math.floor(diffHours / 24)

    if (diffMins < 60) {
      return `${diffMins}m ago`
    } else if (diffHours < 24) {
      return `${diffHours}h ago`
    } else if (diffDays < 7) {
      return `${diffDays}d ago`
    } else {
      return past.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    }
  }

  return (
    <div className="bg-bg-secondary border border-neon-purple/20 rounded-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-neon-purple to-neon-pink flex items-center justify-center">
            <FiActivity className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-text-primary">Recent Activity</h2>
            <p className="text-sm text-text-secondary">Your latest dance journey moments</p>
          </div>
        </div>
        <button
          onClick={() => router.push('/dashboard/activity')}
          className="text-sm text-neon-purple hover:text-neon-pink font-medium transition-colors"
        >
          View All
        </button>
      </div>

      {mockActivities.length > 0 ? (
        <div className="space-y-3">
          {mockActivities.slice(0, 6).map((activity, index) => (
            <div
              key={activity.id}
              className="group relative flex items-start gap-4 p-4 bg-bg-primary/30 hover:bg-bg-primary/50 border border-white/5 hover:border-neon-purple/30 rounded-xl transition-all cursor-pointer"
              onClick={() => {
                // Navigate based on activity type
                if (activity.type === 'event') {
                  router.push('/dashboard/events')
                } else if (activity.type === 'post') {
                  router.push('/dashboard/feed')
                } else if (activity.type === 'bond') {
                  router.push('/dashboard/connections')
                }
              }}
            >
              {/* Timeline Line */}
              {index !== mockActivities.slice(0, 6).length - 1 && (
                <div className="absolute left-9 top-16 bottom-0 w-px bg-white/5" />
              )}

              {/* Icon */}
              <div
                className={`relative flex-shrink-0 w-10 h-10 rounded-lg ${activity.bgColor} flex items-center justify-center z-10`}
              >
                <activity.icon className={`w-5 h-5 ${activity.color}`} />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h3 className="text-sm font-semibold text-text-primary group-hover:text-neon-purple transition-colors">
                    {activity.title}
                  </h3>
                  <span className="text-xs text-text-muted flex-shrink-0">
                    {getTimeAgo(activity.timestamp)}
                  </span>
                </div>
                <p className="text-sm text-text-secondary leading-relaxed">
                  {activity.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-neon-purple/10 flex items-center justify-center">
            <FiActivity className="w-8 h-8 text-neon-purple" />
          </div>
          <p className="text-text-secondary mb-4">No recent activity</p>
          <p className="text-sm text-text-muted">
            Start dancing, attend events, and connect with others to see your activity here
          </p>
        </div>
      )}

      {/* Load More */}
      {mockActivities.length > 6 && (
        <button
          onClick={() => router.push('/dashboard/activity')}
          className="w-full mt-4 py-3 bg-bg-primary/50 hover:bg-bg-primary border border-white/10 hover:border-neon-purple/30 rounded-xl text-text-secondary hover:text-neon-purple text-sm font-medium transition-all"
        >
          Load More Activity
        </button>
      )}
    </div>
  )
}
