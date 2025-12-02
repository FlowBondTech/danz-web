'use client'

import DashboardLayout from '@/src/components/dashboard/DashboardLayout'
import { useGetMyProfileQuery } from '@/src/generated/graphql'
import { gql, useQuery } from '@apollo/client'
import { usePrivy } from '@privy-io/react-auth'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import {
  FiActivity,
  FiAlertTriangle,
  FiCheckCircle,
  FiClock,
  FiCode,
  FiDatabase,
  FiGitBranch,
  FiGitPullRequest,
  FiList,
  FiMessageSquare,
  FiRefreshCw,
  FiServer,
  FiSettings,
  FiTag,
  FiTrendingUp,
  FiZap,
} from 'react-icons/fi'

// Manual GraphQL queries until codegen is updated with backend deployment
const GET_DEV_DASHBOARD_STATS = gql`
  query GetDevDashboardStats {
    devDashboardStats {
      total_feature_requests
      pending_requests
      in_progress_requests
      completed_requests
      total_tasks
      todo_tasks
      in_progress_tasks
      blocked_tasks
      total_changelog_entries
      latest_version
      github_open_prs
      github_open_issues
      github_rate_limit {
        limit
        remaining
        reset_at
        used
      }
    }
  }
`

const GET_SYSTEM_HEALTH = gql`
  query GetSystemHealth {
    systemHealth {
      service
      status
      response_time_ms
      last_checked
      error_message
    }
  }
`

interface SystemHealth {
  service: string
  status: string
  response_time_ms: number | null
  last_checked: string
  error_message: string | null
}

interface DevStats {
  total_feature_requests: number
  pending_requests: number
  in_progress_requests: number
  completed_requests: number
  total_tasks: number
  todo_tasks: number
  in_progress_tasks: number
  blocked_tasks: number
  total_changelog_entries: number
  latest_version: string | null
  github_open_prs: number | null
  github_open_issues: number | null
  github_rate_limit: {
    limit: number
    remaining: number
    reset_at: string
    used: number
  } | null
}

export default function DevPanelPage() {
  const { authenticated, ready } = usePrivy()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<'overview' | 'features' | 'tasks' | 'github' | 'system'>('overview')

  const { data: profileData, loading: profileLoading } = useGetMyProfileQuery({
    skip: !authenticated,
  })

  // Cast role to string since 'dev' may not be in generated types yet
  const userRole = (profileData?.me?.role as string) || ''

  const { data: statsData, loading: statsLoading, refetch: refetchStats } = useQuery<{ devDashboardStats: DevStats }>(
    GET_DEV_DASHBOARD_STATS,
    {
      skip: !authenticated || !['dev', 'admin'].includes(userRole),
    }
  )

  const { data: healthData, loading: healthLoading, refetch: refetchHealth } = useQuery<{ systemHealth: SystemHealth[] }>(
    GET_SYSTEM_HEALTH,
    {
      skip: !authenticated || !['dev', 'admin'].includes(userRole),
    }
  )

  useEffect(() => {
    if (ready && !authenticated) {
      router.push('/')
    }
  }, [ready, authenticated, router])

  useEffect(() => {
    // Redirect non-dev/admin users
    if (
      ready &&
      authenticated &&
      !profileLoading &&
      !['dev', 'admin'].includes(userRole)
    ) {
      router.push('/dashboard')
    }
  }, [ready, authenticated, userRole, profileLoading, router])

  const handleRefresh = () => {
    refetchStats()
    refetchHealth()
  }

  if (!ready || profileLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-white text-2xl">Loading...</div>
        </div>
      </DashboardLayout>
    )
  }

  if (!['dev', 'admin'].includes(userRole)) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-red-400 text-xl">Access Denied - Dev/Admin Only</div>
        </div>
      </DashboardLayout>
    )
  }

  const stats = statsData?.devDashboardStats
  const health = healthData?.systemHealth || []

  const getHealthStatusColor = (status: string) => {
    switch (status) {
      case 'healthy':
        return 'text-green-400 bg-green-400/20'
      case 'degraded':
        return 'text-yellow-400 bg-yellow-400/20'
      case 'down':
        return 'text-red-400 bg-red-400/20'
      default:
        return 'text-gray-400 bg-gray-400/20'
    }
  }

  const getHealthIcon = (status: string) => {
    switch (status) {
      case 'healthy':
        return <FiCheckCircle className="text-green-400" size={16} />
      case 'degraded':
        return <FiAlertTriangle className="text-yellow-400" size={16} />
      case 'down':
        return <FiAlertTriangle className="text-red-400" size={16} />
      default:
        return <FiClock className="text-gray-400" size={16} />
    }
  }

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 sm:mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-text-primary">Dev Panel</h1>
            <p className="text-text-secondary mt-1">Development tools and feature management</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleRefresh}
              className="p-2 text-text-secondary hover:text-text-primary transition-colors"
              title="Refresh data"
            >
              <FiRefreshCw size={20} />
            </button>
            <div className="bg-gradient-to-r from-blue-500 to-cyan-500 px-4 py-2 rounded-full">
              <span className="text-white font-medium text-sm flex items-center gap-2">
                <FiCode size={16} />
                {userRole === 'admin' ? 'Admin' : 'Dev'}
              </span>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {[
            { id: 'overview', label: 'Overview', icon: FiTrendingUp },
            { id: 'features', label: 'Features', icon: FiMessageSquare },
            { id: 'tasks', label: 'Tasks', icon: FiList },
            { id: 'github', label: 'GitHub', icon: FiGitBranch },
            { id: 'system', label: 'System', icon: FiServer },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-neon-purple/20 text-neon-purple border border-neon-purple/40'
                  : 'bg-bg-secondary text-text-secondary hover:text-text-primary border border-transparent'
              }`}
            >
              <tab.icon size={16} />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Stats Grid */}
            {statsLoading ? (
              <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="bg-bg-secondary rounded-xl border border-neon-purple/20 p-6 animate-pulse">
                    <div className="h-4 bg-white/10 rounded w-1/2 mb-4" />
                    <div className="h-8 bg-white/10 rounded w-3/4" />
                  </div>
                ))}
              </div>
            ) : stats ? (
              <>
                {/* Feature Request Stats */}
                <div>
                  <h2 className="text-lg font-semibold text-text-primary mb-4 flex items-center gap-2">
                    <FiMessageSquare className="text-neon-purple" />
                    Feature Requests
                  </h2>
                  <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
                    <div className="bg-bg-secondary rounded-xl border border-neon-purple/20 p-6">
                      <div className="flex items-center justify-between mb-4">
                        <FiMessageSquare className="text-neon-purple" size={24} />
                        <span className="text-xs text-text-secondary uppercase tracking-wider">Total</span>
                      </div>
                      <p className="text-2xl font-bold text-text-primary">{stats.total_feature_requests}</p>
                      <p className="text-sm text-text-secondary mt-1">Requests</p>
                    </div>

                    <div className="bg-bg-secondary rounded-xl border border-yellow-400/20 p-6">
                      <div className="flex items-center justify-between mb-4">
                        <FiClock className="text-yellow-400" size={24} />
                        <span className="text-xs text-text-secondary uppercase tracking-wider">Pending</span>
                      </div>
                      <p className="text-2xl font-bold text-text-primary">{stats.pending_requests}</p>
                      <p className="text-sm text-text-secondary mt-1">Awaiting Review</p>
                    </div>

                    <div className="bg-bg-secondary rounded-xl border border-blue-400/20 p-6">
                      <div className="flex items-center justify-between mb-4">
                        <FiActivity className="text-blue-400" size={24} />
                        <span className="text-xs text-text-secondary uppercase tracking-wider">In Progress</span>
                      </div>
                      <p className="text-2xl font-bold text-text-primary">{stats.in_progress_requests}</p>
                      <p className="text-sm text-text-secondary mt-1">Being Worked On</p>
                    </div>

                    <div className="bg-bg-secondary rounded-xl border border-green-400/20 p-6">
                      <div className="flex items-center justify-between mb-4">
                        <FiCheckCircle className="text-green-400" size={24} />
                        <span className="text-xs text-text-secondary uppercase tracking-wider">Completed</span>
                      </div>
                      <p className="text-2xl font-bold text-text-primary">{stats.completed_requests}</p>
                      <p className="text-sm text-text-secondary mt-1">Shipped</p>
                    </div>
                  </div>
                </div>

                {/* Dev Task Stats */}
                <div>
                  <h2 className="text-lg font-semibold text-text-primary mb-4 flex items-center gap-2">
                    <FiList className="text-neon-pink" />
                    Dev Tasks
                  </h2>
                  <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
                    <div className="bg-bg-secondary rounded-xl border border-neon-pink/20 p-6">
                      <div className="flex items-center justify-between mb-4">
                        <FiList className="text-neon-pink" size={24} />
                        <span className="text-xs text-text-secondary uppercase tracking-wider">Total</span>
                      </div>
                      <p className="text-2xl font-bold text-text-primary">{stats.total_tasks}</p>
                      <p className="text-sm text-text-secondary mt-1">Tasks</p>
                    </div>

                    <div className="bg-bg-secondary rounded-xl border border-gray-400/20 p-6">
                      <div className="flex items-center justify-between mb-4">
                        <FiClock className="text-gray-400" size={24} />
                        <span className="text-xs text-text-secondary uppercase tracking-wider">To Do</span>
                      </div>
                      <p className="text-2xl font-bold text-text-primary">{stats.todo_tasks}</p>
                      <p className="text-sm text-text-secondary mt-1">Not Started</p>
                    </div>

                    <div className="bg-bg-secondary rounded-xl border border-blue-400/20 p-6">
                      <div className="flex items-center justify-between mb-4">
                        <FiZap className="text-blue-400" size={24} />
                        <span className="text-xs text-text-secondary uppercase tracking-wider">Active</span>
                      </div>
                      <p className="text-2xl font-bold text-text-primary">{stats.in_progress_tasks}</p>
                      <p className="text-sm text-text-secondary mt-1">In Progress</p>
                    </div>

                    <div className="bg-bg-secondary rounded-xl border border-red-400/20 p-6">
                      <div className="flex items-center justify-between mb-4">
                        <FiAlertTriangle className="text-red-400" size={24} />
                        <span className="text-xs text-text-secondary uppercase tracking-wider">Blocked</span>
                      </div>
                      <p className="text-2xl font-bold text-text-primary">{stats.blocked_tasks}</p>
                      <p className="text-sm text-text-secondary mt-1">Need Attention</p>
                    </div>
                  </div>
                </div>

                {/* Quick Stats Row */}
                <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
                  {/* Changelog */}
                  <div className="bg-bg-secondary rounded-xl border border-neon-purple/20 p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-3 bg-neon-purple/20 rounded-lg">
                        <FiTag className="text-neon-purple" size={24} />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-text-primary">Changelog</h3>
                        <p className="text-text-secondary text-sm">{stats.total_changelog_entries} entries</p>
                      </div>
                    </div>
                    {stats.latest_version && (
                      <div className="bg-bg-primary rounded-lg p-3">
                        <p className="text-xs text-text-secondary">Latest Version</p>
                        <p className="text-xl font-bold text-neon-purple">{stats.latest_version}</p>
                      </div>
                    )}
                  </div>

                  {/* GitHub */}
                  <div className="bg-bg-secondary rounded-xl border border-neon-purple/20 p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-3 bg-neon-pink/20 rounded-lg">
                        <FiGitBranch className="text-neon-pink" size={24} />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-text-primary">GitHub</h3>
                        <p className="text-text-secondary text-sm">Repository Status</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-bg-primary rounded-lg p-3">
                        <p className="text-xs text-text-secondary">Open PRs</p>
                        <p className="text-xl font-bold text-green-400">{stats.github_open_prs ?? '-'}</p>
                      </div>
                      <div className="bg-bg-primary rounded-lg p-3">
                        <p className="text-xs text-text-secondary">Open Issues</p>
                        <p className="text-xl font-bold text-yellow-400">{stats.github_open_issues ?? '-'}</p>
                      </div>
                    </div>
                  </div>

                  {/* API Rate Limit */}
                  {stats.github_rate_limit && (
                    <div className="bg-bg-secondary rounded-xl border border-neon-purple/20 p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-3 bg-blue-400/20 rounded-lg">
                          <FiDatabase className="text-blue-400" size={24} />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-text-primary">API Rate Limit</h3>
                          <p className="text-text-secondary text-sm">GitHub API</p>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-text-secondary">Remaining</span>
                          <span className="text-text-primary font-medium">
                            {stats.github_rate_limit.remaining} / {stats.github_rate_limit.limit}
                          </span>
                        </div>
                        <div className="w-full bg-bg-primary rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-neon-purple to-neon-pink h-2 rounded-full transition-all"
                            style={{
                              width: `${(stats.github_rate_limit.remaining / stats.github_rate_limit.limit) * 100}%`,
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="bg-bg-secondary rounded-xl border border-neon-purple/20 p-8 text-center">
                <FiAlertTriangle className="text-yellow-400 mx-auto mb-4" size={48} />
                <h3 className="text-lg font-semibold text-text-primary mb-2">Unable to Load Stats</h3>
                <p className="text-text-secondary">The dev panel API may not be deployed yet.</p>
              </div>
            )}

            {/* System Health */}
            <div>
              <h2 className="text-lg font-semibold text-text-primary mb-4 flex items-center gap-2">
                <FiServer className="text-green-400" />
                System Health
              </h2>
              {healthLoading ? (
                <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="bg-bg-secondary rounded-xl border border-neon-purple/20 p-4 animate-pulse">
                      <div className="h-4 bg-white/10 rounded w-3/4 mb-2" />
                      <div className="h-6 bg-white/10 rounded w-1/2" />
                    </div>
                  ))}
                </div>
              ) : health.length > 0 ? (
                <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
                  {health.map(service => (
                    <div
                      key={service.service}
                      className="bg-bg-secondary rounded-xl border border-neon-purple/20 p-4"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-text-primary font-medium capitalize">{service.service}</span>
                        {getHealthIcon(service.status)}
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${getHealthStatusColor(service.status)}`}>
                          {service.status}
                        </span>
                        {service.response_time_ms !== null && (
                          <span className="text-text-secondary text-xs">{service.response_time_ms}ms</span>
                        )}
                      </div>
                      {service.error_message && (
                        <p className="text-red-400 text-xs mt-2 truncate" title={service.error_message}>
                          {service.error_message}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-bg-secondary rounded-xl border border-neon-purple/20 p-6 text-center">
                  <p className="text-text-secondary">No health data available</p>
                </div>
              )}
            </div>

            {/* Quick Actions */}
            <div>
              <h2 className="text-lg font-semibold text-text-primary mb-4 flex items-center gap-2">
                <FiSettings className="text-blue-400" />
                Quick Actions
              </h2>
              <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                <button
                  onClick={() => setActiveTab('features')}
                  className="bg-bg-secondary rounded-xl border border-neon-purple/20 p-6 hover:border-neon-purple/40 transition-colors text-left group"
                >
                  <div className="flex items-center gap-4 mb-3">
                    <div className="p-3 bg-neon-purple/20 rounded-lg group-hover:bg-neon-purple/30 transition-colors">
                      <FiMessageSquare className="text-neon-purple" size={24} />
                    </div>
                    <h3 className="text-lg font-semibold text-text-primary">Feature Requests</h3>
                  </div>
                  <p className="text-text-secondary text-sm">View and manage feature requests from users</p>
                </button>

                <button
                  onClick={() => setActiveTab('tasks')}
                  className="bg-bg-secondary rounded-xl border border-neon-purple/20 p-6 hover:border-neon-purple/40 transition-colors text-left group"
                >
                  <div className="flex items-center gap-4 mb-3">
                    <div className="p-3 bg-neon-pink/20 rounded-lg group-hover:bg-neon-pink/30 transition-colors">
                      <FiList className="text-neon-pink" size={24} />
                    </div>
                    <h3 className="text-lg font-semibold text-text-primary">Dev Tasks</h3>
                  </div>
                  <p className="text-text-secondary text-sm">Track development tasks and sprints</p>
                </button>

                <button
                  onClick={() => setActiveTab('github')}
                  className="bg-bg-secondary rounded-xl border border-neon-purple/20 p-6 hover:border-neon-purple/40 transition-colors text-left group"
                >
                  <div className="flex items-center gap-4 mb-3">
                    <div className="p-3 bg-blue-400/20 rounded-lg group-hover:bg-blue-400/30 transition-colors">
                      <FiGitPullRequest className="text-blue-400" size={24} />
                    </div>
                    <h3 className="text-lg font-semibold text-text-primary">GitHub Activity</h3>
                  </div>
                  <p className="text-text-secondary text-sm">View commits, PRs, and CI/CD status</p>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Features Tab */}
        {activeTab === 'features' && (
          <div className="bg-bg-secondary rounded-xl border border-neon-purple/20 p-8 text-center">
            <FiMessageSquare className="text-neon-purple mx-auto mb-4" size={48} />
            <h3 className="text-lg font-semibold text-text-primary mb-2">Feature Requests</h3>
            <p className="text-text-secondary mb-4">
              This section will display all feature requests with voting, filtering, and management capabilities.
            </p>
            <p className="text-text-secondary text-sm">
              Backend deployment required. Coming soon!
            </p>
          </div>
        )}

        {/* Tasks Tab */}
        {activeTab === 'tasks' && (
          <div className="bg-bg-secondary rounded-xl border border-neon-purple/20 p-8 text-center">
            <FiList className="text-neon-pink mx-auto mb-4" size={48} />
            <h3 className="text-lg font-semibold text-text-primary mb-2">Dev Tasks</h3>
            <p className="text-text-secondary mb-4">
              This section will display development tasks with sprint management and progress tracking.
            </p>
            <p className="text-text-secondary text-sm">
              Backend deployment required. Coming soon!
            </p>
          </div>
        )}

        {/* GitHub Tab */}
        {activeTab === 'github' && (
          <div className="bg-bg-secondary rounded-xl border border-neon-purple/20 p-8 text-center">
            <FiGitBranch className="text-blue-400 mx-auto mb-4" size={48} />
            <h3 className="text-lg font-semibold text-text-primary mb-2">GitHub Integration</h3>
            <p className="text-text-secondary mb-4">
              This section will show commits, pull requests, actions, and releases from GitHub.
            </p>
            <p className="text-text-secondary text-sm">
              Requires GITHUB_TOKEN environment variable. Backend deployment required.
            </p>
          </div>
        )}

        {/* System Tab */}
        {activeTab === 'system' && (
          <div className="space-y-6">
            <div className="bg-bg-secondary rounded-xl border border-neon-purple/20 p-6">
              <h3 className="text-lg font-semibold text-text-primary mb-4 flex items-center gap-2">
                <FiServer className="text-green-400" />
                Service Health
              </h3>
              {healthLoading ? (
                <div className="space-y-3">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="bg-bg-primary rounded-lg p-4 animate-pulse">
                      <div className="h-4 bg-white/10 rounded w-1/3" />
                    </div>
                  ))}
                </div>
              ) : health.length > 0 ? (
                <div className="space-y-3">
                  {health.map(service => (
                    <div key={service.service} className="bg-bg-primary rounded-lg p-4 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {getHealthIcon(service.status)}
                        <span className="text-text-primary font-medium capitalize">{service.service}</span>
                      </div>
                      <div className="flex items-center gap-4">
                        {service.response_time_ms !== null && (
                          <span className="text-text-secondary text-sm">{service.response_time_ms}ms</span>
                        )}
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getHealthStatusColor(service.status)}`}>
                          {service.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-text-secondary text-center py-4">No health data available</p>
              )}
            </div>

            <div className="bg-bg-secondary rounded-xl border border-neon-purple/20 p-6">
              <h3 className="text-lg font-semibold text-text-primary mb-4 flex items-center gap-2">
                <FiDatabase className="text-blue-400" />
                Cache Management
              </h3>
              <p className="text-text-secondary mb-4">Manage GitHub API cache and system caches.</p>
              <button
                className="px-4 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors"
                onClick={() => alert('Cache clearing will be available after backend deployment')}
              >
                Clear GitHub Cache
              </button>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
