'use client'

import { useRouter } from 'next/navigation'
import {
  FiAward,
  FiBell,
  FiCalendar,
  FiHeart,
  FiMessageCircle,
  FiUsers,
} from 'react-icons/fi'

interface Notification {
  id: string
  type: 'like' | 'comment' | 'event' | 'bond' | 'achievement' | 'system'
  title: string
  message: string
  timestamp: string
  read: boolean
  icon: any
  color: string
}

// Mock data
const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'achievement',
    title: 'New Achievement',
    message: 'You unlocked "Week Warrior"!',
    timestamp: '2025-01-17T10:30:00',
    read: false,
    icon: FiAward,
    color: 'text-yellow-400',
  },
  {
    id: '2',
    type: 'like',
    title: 'New Likes',
    message: '5 people liked your video',
    timestamp: '2025-01-17T09:15:00',
    read: false,
    icon: FiHeart,
    color: 'text-pink-400',
  },
  {
    id: '3',
    type: 'event',
    title: 'Event Reminder',
    message: 'Hip Hop Session starts in 2 hours',
    timestamp: '2025-01-17T08:00:00',
    read: true,
    icon: FiCalendar,
    color: 'text-neon-purple',
  },
  {
    id: '4',
    type: 'comment',
    title: 'New Comment',
    message: '@alex_moves commented on your post',
    timestamp: '2025-01-16T20:45:00',
    read: true,
    icon: FiMessageCircle,
    color: 'text-blue-400',
  },
  {
    id: '5',
    type: 'bond',
    title: 'New Connection',
    message: '@rhythm_king wants to connect',
    timestamp: '2025-01-16T15:30:00',
    read: true,
    icon: FiUsers,
    color: 'text-green-400',
  },
]

export default function NotificationsCenterWidget() {
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
    } else {
      return `${diffDays}d ago`
    }
  }

  const unreadCount = mockNotifications.filter(n => !n.read).length

  return (
    <div className="bg-bg-secondary border border-neon-purple/20 rounded-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="relative w-10 h-10 rounded-lg bg-gradient-to-br from-neon-purple to-neon-pink flex items-center justify-center">
            <FiBell className="w-5 h-5 text-white" />
            {unreadCount > 0 && (
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 border-2 border-bg-secondary rounded-full flex items-center justify-center">
                <span className="text-xs font-bold text-white">{unreadCount}</span>
              </div>
            )}
          </div>
          <div>
            <h2 className="text-xl font-bold text-text-primary">Notifications</h2>
            <p className="text-sm text-text-secondary">
              {unreadCount > 0 ? `${unreadCount} unread` : 'All caught up!'}
            </p>
          </div>
        </div>
        <button
          onClick={() => router.push('/dashboard/notifications')}
          className="text-sm text-neon-purple hover:text-neon-pink font-medium transition-colors"
        >
          View All
        </button>
      </div>

      {mockNotifications.length > 0 ? (
        <div className="space-y-2">
          {mockNotifications.slice(0, 5).map(notification => (
            <div
              key={notification.id}
              onClick={() => {
                // Navigate based on notification type
                if (notification.type === 'event') {
                  router.push('/dashboard/events')
                } else if (notification.type === 'comment' || notification.type === 'like') {
                  router.push('/dashboard/feed')
                }
              }}
              className={`flex items-start gap-3 p-3 rounded-xl transition-all cursor-pointer ${
                notification.read
                  ? 'bg-bg-primary/20 border border-white/5 hover:border-white/10'
                  : 'bg-neon-purple/10 border border-neon-purple/30 hover:border-neon-purple/50'
              }`}
            >
              {/* Icon */}
              <div className={`flex-shrink-0 w-8 h-8 rounded-lg bg-bg-secondary flex items-center justify-center`}>
                <notification.icon className={`w-4 h-4 ${notification.color}`} />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-0.5">
                  <h3 className="text-sm font-semibold text-text-primary">{notification.title}</h3>
                  <span className="text-xs text-text-muted flex-shrink-0">
                    {getTimeAgo(notification.timestamp)}
                  </span>
                </div>
                <p className="text-sm text-text-secondary">{notification.message}</p>
              </div>

              {/* Unread Indicator */}
              {!notification.read && (
                <div className="flex-shrink-0 w-2 h-2 bg-neon-purple rounded-full mt-2" />
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-neon-purple/10 flex items-center justify-center">
            <FiBell className="w-8 h-8 text-neon-purple" />
          </div>
          <p className="text-text-secondary mb-2">No notifications</p>
          <p className="text-sm text-text-muted">You're all caught up!</p>
        </div>
      )}

      {/* Mark All as Read */}
      {unreadCount > 0 && (
        <button className="w-full mt-4 py-2.5 bg-bg-primary/50 hover:bg-bg-primary border border-white/10 hover:border-neon-purple/30 rounded-xl text-text-secondary hover:text-neon-purple text-sm font-medium transition-all">
          Mark All as Read
        </button>
      )}
    </div>
  )
}
