'use client'

import DashboardLayout from '@/src/components/dashboard/DashboardLayout'
import {
  PointActionCategory,
  useGetAllPointActionsQuery,
  useGetMyProfileQuery,
  useCreatePointActionMutation,
  useTogglePointActionMutation,
  useUpdatePointActionMutation,
} from '@/src/generated/graphql'
import { usePrivy } from '@privy-io/react-auth'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { FiCheck, FiX, FiPlus, FiZap, FiAward, FiUsers, FiActivity, FiWatch, FiLink, FiStar, FiTarget, FiTrendingUp, FiDollarSign, FiLock, FiUnlock } from 'react-icons/fi'
import { motion, AnimatePresence } from 'motion/react'

// Point System Templates
const POINT_TEMPLATES = {
  engagement: {
    name: 'Community Engagement',
    description: 'Reward active participation and social interactions',
    icon: FiUsers,
    color: 'text-blue-400',
    bgColor: 'bg-blue-400/10',
    actions: [
      { action_key: 'daily_check_in', action_name: 'Daily Check-in', points_value: 10, category: 'social' as PointActionCategory, description: 'Login to the app daily' },
      { action_key: 'share_event', action_name: 'Share Event', points_value: 20, category: 'social' as PointActionCategory, description: 'Share an event on social media' },
      { action_key: 'comment_on_post', action_name: 'Comment on Post', points_value: 5, category: 'social' as PointActionCategory, description: 'Engage with community posts' },
      { action_key: 'create_post', action_name: 'Create Post', points_value: 15, category: 'social' as PointActionCategory, description: 'Share content with the community' },
    ]
  },
  dance_activity: {
    name: 'Dance Activity Rewards',
    description: 'Points for dancing, attending events, and skill progression',
    icon: FiActivity,
    color: 'text-purple-400',
    bgColor: 'bg-purple-400/10',
    actions: [
      { action_key: 'complete_dance_session', action_name: 'Complete Dance Session', points_value: 50, category: 'activity' as PointActionCategory, description: 'Finish a full dance session' },
      { action_key: 'attend_event', action_name: 'Attend Event', points_value: 100, category: 'event' as PointActionCategory, description: 'Check in at a dance event' },
      { action_key: 'host_event', action_name: 'Host Event', points_value: 500, category: 'event' as PointActionCategory, description: 'Organize a dance event' },
      { action_key: 'learn_new_move', action_name: 'Learn New Move', points_value: 25, category: 'achievement' as PointActionCategory, description: 'Master a new dance move' },
    ]
  },
  achievement_based: {
    name: 'Achievement System',
    description: 'Milestone-based rewards for reaching goals',
    icon: FiAward,
    color: 'text-yellow-400',
    bgColor: 'bg-yellow-400/10',
    actions: [
      { action_key: 'first_event', action_name: 'First Event', points_value: 200, category: 'achievement' as PointActionCategory, description: 'Attend your first event' },
      { action_key: 'streak_7_days', action_name: '7 Day Streak', points_value: 100, category: 'achievement' as PointActionCategory, description: 'Dance 7 days in a row' },
      { action_key: 'referral_success', action_name: 'Successful Referral', points_value: 150, category: 'referral' as PointActionCategory, description: 'Refer a friend who joins' },
      { action_key: 'level_up', action_name: 'Level Up', points_value: 300, category: 'achievement' as PointActionCategory, description: 'Advance to the next skill level' },
    ]
  },
  wearable_integration: {
    name: 'Wearable & IoT Rewards',
    description: 'Points for activity tracked by wearables and smart devices',
    icon: FiWatch,
    color: 'text-green-400',
    bgColor: 'bg-green-400/10',
    actions: [
      { action_key: 'wearable_steps_10k', action_name: '10K Steps', points_value: 30, category: 'activity' as PointActionCategory, description: 'Walk 10,000 steps (via wearable)' },
      { action_key: 'wearable_heart_zone', action_name: 'Heart Rate Zone', points_value: 40, category: 'activity' as PointActionCategory, description: 'Maintain target heart rate during dance' },
      { action_key: 'wearable_calories_500', action_name: 'Burn 500 Calories', points_value: 50, category: 'activity' as PointActionCategory, description: 'Burn 500+ calories in a session' },
      { action_key: 'wearable_sync', action_name: 'Daily Sync', points_value: 5, category: 'activity' as PointActionCategory, description: 'Sync your wearable device' },
    ]
  }
}

// Bonding Tiers
const BONDING_TIERS = [
  { level: 1, name: 'Bronze', requiredBond: 100, multiplier: 1.1, color: 'text-orange-600', bgColor: 'bg-orange-600/10' },
  { level: 2, name: 'Silver', requiredBond: 500, multiplier: 1.25, color: 'text-gray-400', bgColor: 'bg-gray-400/10' },
  { level: 3, name: 'Gold', requiredBond: 1000, multiplier: 1.5, color: 'text-yellow-400', bgColor: 'bg-yellow-400/10' },
  { level: 4, name: 'Platinum', requiredBond: 5000, multiplier: 2.0, color: 'text-purple-400', bgColor: 'bg-purple-400/10' },
  { level: 5, name: 'Diamond', requiredBond: 10000, multiplier: 3.0, color: 'text-blue-400', bgColor: 'bg-blue-400/10' },
]

export default function EnhancedPointsPage() {
  const { authenticated, ready } = usePrivy()
  const router = useRouter()

  const [showSetupWizard, setShowSetupWizard] = useState(false)
  const [selectedTemplate, setSelectedTemplate] = useState<keyof typeof POINT_TEMPLATES | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<PointActionCategory | undefined>()
  const [showBondingSection, setShowBondingSection] = useState(false)
  const [showWearableSection, setShowWearableSection] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const [editingPoints, setEditingPoints] = useState<{ [key: string]: number }>({})
  const [editingLimits, setEditingLimits] = useState<{ [key: string]: { max_per_day: number | null; max_per_week: number | null; max_per_month: number | null } }>({})

  const { data: profileData, loading: profileLoading } = useGetMyProfileQuery({
    skip: !authenticated,
  })

  const { data, loading, refetch } = useGetAllPointActionsQuery({
    variables: {
      category: selectedCategory,
    },
    skip: !authenticated || profileData?.me?.role !== 'admin',
  })

  const [createPointAction] = useCreatePointActionMutation()
  const [updatePointAction, { loading: updating }] = useUpdatePointActionMutation()
  const [togglePointAction] = useTogglePointActionMutation()

  // Custom action form state
  const [showCustomForm, setShowCustomForm] = useState(false)
  const [customAction, setCustomAction] = useState({
    action_key: '',
    action_name: '',
    description: '',
    points_value: 10,
    category: 'activity' as PointActionCategory,
    is_active: true,
    requires_verification: false,
    max_per_day: null as number | null,
    max_per_week: null as number | null,
    max_per_month: null as number | null,
  })

  useEffect(() => {
    if (ready && !authenticated) {
      router.push('/')
    }
  }, [ready, authenticated, router])

  useEffect(() => {
    if (ready && authenticated && !profileLoading && profileData?.me?.role !== 'admin') {
      router.push('/dashboard')
    }
  }, [ready, authenticated, profileData, profileLoading, router])

  const handleApplyTemplate = async () => {
    if (selectedTemplate) {
      const template = POINT_TEMPLATES[selectedTemplate]

      try {
        // Create all actions from the template
        for (const action of template.actions) {
          await createPointAction({
            variables: {
              input: {
                action_key: action.action_key,
                action_name: action.action_name,
                description: action.description,
                points_value: action.points_value,
                category: action.category,
                is_active: true,
                requires_verification: false,
              }
            }
          })
        }

        setShowSetupWizard(false)
        setSelectedTemplate(null)
        refetch()
      } catch (error) {
        console.error('Error applying template:', error)
        alert('Some actions may already exist or there was an error creating them')
      }
    }
  }

  const handleCreateCustomAction = async () => {
    try {
      await createPointAction({
        variables: {
          input: {
            action_key: customAction.action_key,
            action_name: customAction.action_name,
            description: customAction.description,
            points_value: customAction.points_value,
            category: customAction.category,
            is_active: customAction.is_active,
            requires_verification: customAction.requires_verification,
            max_per_day: customAction.max_per_day,
            max_per_week: customAction.max_per_week,
            max_per_month: customAction.max_per_month,
          }
        }
      })

      setShowCustomForm(false)
      setCustomAction({
        action_key: '',
        action_name: '',
        description: '',
        points_value: 10,
        category: 'activity' as PointActionCategory,
        is_active: true,
        requires_verification: false,
        max_per_day: null,
        max_per_week: null,
        max_per_month: null,
      })
      refetch()
    } catch (error) {
      console.error('Error creating action:', error)
      alert('Failed to create action. The action key may already exist.')
    }
  }

  const handlePointsChange = async (action_key: string, newPoints: number) => {
    try {
      await updatePointAction({
        variables: {
          input: {
            action_key,
            points_value: newPoints,
          },
        },
      })
      refetch()
      const newEditingPoints = { ...editingPoints }
      delete newEditingPoints[action_key]
      setEditingPoints(newEditingPoints)
    } catch (error) {
      console.error('Error updating points:', error)
      alert('Failed to update points')
    }
  }

  const handleLimitsChange = async (action_key: string, limits: { max_per_day: number | null; max_per_week: number | null; max_per_month: number | null }) => {
    try {
      await updatePointAction({
        variables: {
          input: {
            action_key,
            max_per_day: limits.max_per_day,
            max_per_week: limits.max_per_week,
            max_per_month: limits.max_per_month,
          },
        },
      })
      refetch()
      const newEditingLimits = { ...editingLimits }
      delete newEditingLimits[action_key]
      setEditingLimits(newEditingLimits)
    } catch (error) {
      console.error('Error updating limits:', error)
      alert('Failed to update limits')
    }
  }

  const handleToggle = async (action_key: string) => {
    try {
      await togglePointAction({
        variables: {
          action_key,
        },
      })
      refetch()
    } catch (error) {
      console.error('Error toggling action:', error)
    }
  }

  if (!ready || profileLoading || loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-white text-2xl">Loading...</div>
        </div>
      </DashboardLayout>
    )
  }

  if (profileData?.me?.role !== 'admin') {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-red-400 text-xl">Access Denied - Admin Only</div>
        </div>
      </DashboardLayout>
    )
  }

  const pointActions = data?.getAllPointActions || []

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6 sm:mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-text-primary">
              Special Points System
            </h1>
            <p className="text-text-secondary mt-1">
              Configure rewards, bonding mechanisms, and wearable integration
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setEditMode(!editMode)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-opacity ${
                editMode ? 'bg-green-500' : 'bg-gray-600'
              } hover:opacity-90`}
            >
              {editMode ? <FiCheck size={20} /> : <FiActivity size={20} />}
              {editMode ? 'View Mode' : 'Edit Mode'}
            </button>
            <button
              onClick={() => setShowCustomForm(!showCustomForm)}
              className="flex items-center gap-2 px-4 py-2 bg-purple-600 rounded-lg hover:opacity-90 transition-opacity"
            >
              <FiPlus size={20} />
              Create Action
            </button>
            <button
              onClick={() => setShowSetupWizard(!showSetupWizard)}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-neon-purple to-neon-blue rounded-lg hover:opacity-90 transition-opacity"
            >
              <FiZap size={20} />
              Templates
            </button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-4 mb-6 sm:mb-8">
          <div className="bg-bg-secondary rounded-xl border border-neon-purple/20 p-4 sm:p-6">
            <div className="flex items-center justify-between mb-2">
              <FiStar className="text-yellow-400" size={24} />
            </div>
            <p className="text-2xl font-bold text-text-primary">{pointActions.length}</p>
            <p className="text-sm text-text-secondary">Active Actions</p>
          </div>

          <div className="bg-bg-secondary rounded-xl border border-neon-purple/20 p-4 sm:p-6 cursor-pointer hover:border-neon-purple/40"
               onClick={() => setShowBondingSection(!showBondingSection)}>
            <div className="flex items-center justify-between mb-2">
              <FiLock className="text-purple-400" size={24} />
            </div>
            <p className="text-2xl font-bold text-text-primary">Bonding</p>
            <p className="text-sm text-text-secondary">Token Staking</p>
          </div>

          <div className="bg-bg-secondary rounded-xl border border-neon-purple/20 p-4 sm:p-6 cursor-pointer hover:border-neon-purple/40"
               onClick={() => setShowWearableSection(!showWearableSection)}>
            <div className="flex items-center justify-between mb-2">
              <FiWatch className="text-green-400" size={24} />
            </div>
            <p className="text-2xl font-bold text-text-primary">Wearables</p>
            <p className="text-sm text-text-secondary">Coming Soon</p>
          </div>

          <div className="bg-bg-secondary rounded-xl border border-neon-purple/20 p-4 sm:p-6">
            <div className="flex items-center justify-between mb-2">
              <FiTrendingUp className="text-blue-400" size={24} />
            </div>
            <p className="text-2xl font-bold text-text-primary">2.5M</p>
            <p className="text-sm text-text-secondary">Points Issued</p>
          </div>
        </div>

        {/* Guided Setup Wizard */}
        <AnimatePresence>
          {showSetupWizard && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-8 bg-bg-secondary rounded-xl border border-neon-purple/20 p-6"
            >
              <h2 className="text-xl font-bold text-text-primary mb-4">
                🎯 Choose a Point System Template
              </h2>
              <p className="text-text-secondary mb-6">
                Select a pre-configured template to quickly set up your point system
              </p>

              <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                {Object.entries(POINT_TEMPLATES).map(([key, template]) => {
                  const Icon = template.icon
                  return (
                    <div
                      key={key}
                      onClick={() => setSelectedTemplate(key as keyof typeof POINT_TEMPLATES)}
                      className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                        selectedTemplate === key
                          ? 'border-neon-purple bg-neon-purple/10'
                          : 'border-gray-700 hover:border-gray-600'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`p-2 rounded-lg ${template.bgColor}`}>
                          <Icon className={template.color} size={24} />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold text-text-primary mb-1">{template.name}</h3>
                          <p className="text-sm text-text-secondary mb-3">{template.description}</p>
                          <div className="space-y-1">
                            {template.actions.slice(0, 3).map((action, idx) => (
                              <div key={idx} className="text-xs text-text-secondary">
                                • {action.action_name} (+{action.points_value} pts)
                              </div>
                            ))}
                            {template.actions.length > 3 && (
                              <div className="text-xs text-text-secondary">
                                • And {template.actions.length - 3} more...
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>

              <div className="flex justify-end gap-4 mt-6">
                <button
                  onClick={() => {
                    setShowSetupWizard(false)
                    setSelectedTemplate(null)
                  }}
                  className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleApplyTemplate}
                  disabled={!selectedTemplate}
                  className={`px-6 py-3 rounded-lg transition-all ${
                    selectedTemplate
                      ? 'bg-gradient-to-r from-neon-purple to-neon-blue text-white hover:opacity-90'
                      : 'bg-gray-700 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  Apply Template
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Custom Action Form */}
        <AnimatePresence>
          {showCustomForm && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-8 bg-bg-secondary rounded-xl border border-neon-purple/20 p-6"
            >
              <h2 className="text-xl font-bold text-text-primary mb-4">
                ✨ Create Custom Point Action
              </h2>

              <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-1">Action Key (unique ID)</label>
                  <input
                    type="text"
                    value={customAction.action_key}
                    onChange={(e) => setCustomAction({ ...customAction, action_key: e.target.value.toLowerCase().replace(/\s+/g, '_') })}
                    placeholder="e.g., daily_login"
                    className="w-full px-3 py-2 bg-bg-primary border border-white/10 rounded-lg text-text-primary focus:border-neon-purple focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-1">Action Name</label>
                  <input
                    type="text"
                    value={customAction.action_name}
                    onChange={(e) => setCustomAction({ ...customAction, action_name: e.target.value })}
                    placeholder="e.g., Daily Login"
                    className="w-full px-3 py-2 bg-bg-primary border border-white/10 rounded-lg text-text-primary focus:border-neon-purple focus:outline-none"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-text-secondary mb-1">Description</label>
                  <input
                    type="text"
                    value={customAction.description}
                    onChange={(e) => setCustomAction({ ...customAction, description: e.target.value })}
                    placeholder="e.g., Reward users for logging in daily"
                    className="w-full px-3 py-2 bg-bg-primary border border-white/10 rounded-lg text-text-primary focus:border-neon-purple focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-1">Points Value</label>
                  <input
                    type="number"
                    value={customAction.points_value}
                    onChange={(e) => setCustomAction({ ...customAction, points_value: parseInt(e.target.value) || 0 })}
                    className="w-full px-3 py-2 bg-bg-primary border border-white/10 rounded-lg text-text-primary focus:border-neon-purple focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-1">Category</label>
                  <select
                    value={customAction.category}
                    onChange={(e) => setCustomAction({ ...customAction, category: e.target.value as PointActionCategory })}
                    className="w-full px-3 py-2 bg-bg-primary border border-white/10 rounded-lg text-text-primary focus:border-neon-purple focus:outline-none"
                  >
                    <option value="social">Social</option>
                    <option value="activity">Activity</option>
                    <option value="event">Event</option>
                    <option value="referral">Referral</option>
                    <option value="achievement">Achievement</option>
                    <option value="special">Special</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-1">Max Per Day</label>
                  <input
                    type="number"
                    value={customAction.max_per_day || ''}
                    onChange={(e) => setCustomAction({ ...customAction, max_per_day: e.target.value ? parseInt(e.target.value) : null })}
                    placeholder="No limit"
                    className="w-full px-3 py-2 bg-bg-primary border border-white/10 rounded-lg text-text-primary focus:border-neon-purple focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-1">Max Per Week</label>
                  <input
                    type="number"
                    value={customAction.max_per_week || ''}
                    onChange={(e) => setCustomAction({ ...customAction, max_per_week: e.target.value ? parseInt(e.target.value) : null })}
                    placeholder="No limit"
                    className="w-full px-3 py-2 bg-bg-primary border border-white/10 rounded-lg text-text-primary focus:border-neon-purple focus:outline-none"
                  />
                </div>

                <div className="md:col-span-2 flex items-center gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={customAction.is_active}
                      onChange={(e) => setCustomAction({ ...customAction, is_active: e.target.checked })}
                      className="rounded border-gray-600"
                    />
                    <span className="text-sm text-text-secondary">Active</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={customAction.requires_verification}
                      onChange={(e) => setCustomAction({ ...customAction, requires_verification: e.target.checked })}
                      className="rounded border-gray-600"
                    />
                    <span className="text-sm text-text-secondary">Requires Verification</span>
                  </label>
                </div>
              </div>

              <div className="flex justify-end gap-4 mt-6">
                <button
                  onClick={() => {
                    setShowCustomForm(false)
                    setCustomAction({
                      action_key: '',
                      action_name: '',
                      description: '',
                      points_value: 10,
                      category: 'activity' as PointActionCategory,
                      is_active: true,
                      requires_verification: false,
                      max_per_day: null,
                      max_per_week: null,
                      max_per_month: null,
                    })
                  }}
                  className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateCustomAction}
                  disabled={!customAction.action_key || !customAction.action_name}
                  className={`px-6 py-3 rounded-lg transition-all ${
                    customAction.action_key && customAction.action_name
                      ? 'bg-gradient-to-r from-neon-purple to-neon-blue text-white hover:opacity-90'
                      : 'bg-gray-700 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  Create Action
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bonding Mechanism Section */}
        <AnimatePresence>
          {showBondingSection && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-8 bg-bg-secondary rounded-xl border border-neon-purple/20 p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-text-primary flex items-center gap-2">
                  <FiLock className="text-purple-400" />
                  Token Bonding Mechanism
                </h2>
                <button
                  onClick={() => setShowBondingSection(false)}
                  className="text-gray-400 hover:text-white"
                >
                  <FiX size={20} />
                </button>
              </div>

              <p className="text-text-secondary mb-6">
                Users can stake DANZ tokens to earn point multipliers and unlock exclusive features
              </p>

              <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {BONDING_TIERS.map((tier) => (
                  <div
                    key={tier.level}
                    className={`p-4 rounded-lg border border-gray-700 ${tier.bgColor}`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h3 className={`font-bold text-lg ${tier.color}`}>
                        {tier.name}
                      </h3>
                      <span className="text-2xl font-bold text-text-primary">
                        {tier.multiplier}x
                      </span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-text-secondary">Required Bond:</span>
                        <span className="text-text-primary">{tier.requiredBond.toLocaleString()} DANZ</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-text-secondary">Point Multiplier:</span>
                        <span className="text-green-400">+{((tier.multiplier - 1) * 100).toFixed(0)}%</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-purple-400/10 rounded-lg border border-purple-400/30">
                <div className="flex items-start gap-3">
                  <FiDollarSign className="text-purple-400 mt-1" size={20} />
                  <div>
                    <h4 className="font-medium text-text-primary mb-1">How Bonding Works</h4>
                    <ul className="text-sm text-text-secondary space-y-1">
                      <li>• Stake DANZ tokens to unlock tier benefits</li>
                      <li>• Earn point multipliers on all activities</li>
                      <li>• Unlock exclusive events and features</li>
                      <li>• Unstake anytime with a 7-day cooldown</li>
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Wearable Integration Section */}
        <AnimatePresence>
          {showWearableSection && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-8 bg-bg-secondary rounded-xl border border-neon-purple/20 p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-text-primary flex items-center gap-2">
                  <FiWatch className="text-green-400" />
                  Wearable Integration (Coming Soon)
                </h2>
                <button
                  onClick={() => setShowWearableSection(false)}
                  className="text-gray-400 hover:text-white"
                >
                  <FiX size={20} />
                </button>
              </div>

              <p className="text-text-secondary mb-6">
                Connect fitness trackers and smart wearables to earn points for real-world dance activity
              </p>

              <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                <div className="p-4 rounded-lg border border-gray-700 bg-green-400/5">
                  <div className="flex items-center gap-3 mb-3">
                    <FiActivity className="text-green-400" size={24} />
                    <h3 className="font-bold text-text-primary">Supported Devices</h3>
                  </div>
                  <ul className="text-sm text-text-secondary space-y-2">
                    <li className="flex items-center gap-2">
                      <FiCheck className="text-green-400" size={14} />
                      Apple Watch & Health Kit
                    </li>
                    <li className="flex items-center gap-2">
                      <FiCheck className="text-green-400" size={14} />
                      Fitbit & Google Fit
                    </li>
                    <li className="flex items-center gap-2">
                      <FiCheck className="text-green-400" size={14} />
                      Garmin Connect
                    </li>
                    <li className="flex items-center gap-2">
                      <FiCheck className="text-green-400" size={14} />
                      Samsung Galaxy Watch
                    </li>
                    <li className="flex items-center gap-2">
                      <FiCheck className="text-green-400" size={14} />
                      WHOOP Strap
                    </li>
                  </ul>
                </div>

                <div className="p-4 rounded-lg border border-gray-700 bg-blue-400/5">
                  <div className="flex items-center gap-3 mb-3">
                    <FiTarget className="text-blue-400" size={24} />
                    <h3 className="font-bold text-text-primary">Tracked Metrics</h3>
                  </div>
                  <ul className="text-sm text-text-secondary space-y-2">
                    <li className="flex items-center gap-2">
                      <FiTrendingUp className="text-blue-400" size={14} />
                      Heart Rate & Zones
                    </li>
                    <li className="flex items-center gap-2">
                      <FiTrendingUp className="text-blue-400" size={14} />
                      Calories Burned
                    </li>
                    <li className="flex items-center gap-2">
                      <FiTrendingUp className="text-blue-400" size={14} />
                      Movement & Steps
                    </li>
                    <li className="flex items-center gap-2">
                      <FiTrendingUp className="text-blue-400" size={14} />
                      Dance Duration
                    </li>
                    <li className="flex items-center gap-2">
                      <FiTrendingUp className="text-blue-400" size={14} />
                      Recovery & Sleep
                    </li>
                  </ul>
                </div>
              </div>

              <div className="mt-6 p-4 bg-gradient-to-r from-purple-400/10 to-blue-400/10 rounded-lg border border-purple-400/30">
                <div className="flex items-start gap-3">
                  <FiLink className="text-purple-400 mt-1" size={20} />
                  <div>
                    <h4 className="font-medium text-text-primary mb-1">Early Access Program</h4>
                    <p className="text-sm text-text-secondary mb-3">
                      Join our beta program to be the first to test wearable integration and earn bonus points!
                    </p>
                    <button className="px-4 py-2 bg-gradient-to-r from-neon-purple to-neon-blue text-white text-sm rounded-lg hover:opacity-90 transition-opacity">
                      Join Waitlist
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Existing Point Actions */}
        <div className="bg-bg-secondary rounded-xl border border-neon-purple/20 p-6">
          <h2 className="text-xl font-bold text-text-primary mb-4">Current Point Actions</h2>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 mb-6">
            <button
              onClick={() => setSelectedCategory(undefined)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                !selectedCategory ? 'bg-neon-purple text-white' : 'bg-gray-700 text-gray-300'
              }`}
            >
              All
            </button>
            {['social', 'activity', 'event', 'referral', 'achievement', 'special'].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat as PointActionCategory)}
                className={`px-4 py-2 rounded-lg transition-colors capitalize ${
                  selectedCategory === cat ? 'bg-neon-purple text-white' : 'bg-gray-700 text-gray-300'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Actions Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="border-b border-neon-purple/20">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                    Action
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                    Points
                  </th>
                  {editMode && (
                    <>
                      <th className="px-4 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                        Max/Day
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                        Max/Week
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                        Max/Month
                      </th>
                    </>
                  )}
                  <th className="px-4 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {pointActions.map((action) => (
                  <tr key={action.id} className="hover:bg-bg-primary/50 transition-colors">
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-text-primary">
                          {action.action_name}
                        </div>
                        <div className="text-xs text-text-secondary">
                          {action.description}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 text-xs rounded-full bg-purple-400/20 text-purple-400">
                        {action.category}
                      </span>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      {editMode ? (
                        <input
                          type="number"
                          value={editingPoints[action.action_key] ?? action.points_value}
                          onChange={e => setEditingPoints({ ...editingPoints, [action.action_key]: parseInt(e.target.value) || 0 })}
                          onBlur={() => {
                            if (editingPoints[action.action_key] !== undefined && editingPoints[action.action_key] !== action.points_value) {
                              handlePointsChange(action.action_key, editingPoints[action.action_key])
                            }
                          }}
                          className="w-20 px-2 py-1 bg-bg-primary border border-white/10 rounded text-text-primary font-semibold focus:border-neon-purple focus:outline-none"
                        />
                      ) : (
                        <span className="text-sm font-bold text-green-400">
                          +{action.points_value}
                        </span>
                      )}
                    </td>
                    {editMode && (
                      <>
                        <td className="px-4 py-4 whitespace-nowrap">
                          <input
                            type="number"
                            value={editingLimits[action.action_key]?.max_per_day ?? action.max_per_day ?? ''}
                            onChange={e => {
                              const currentLimits = editingLimits[action.action_key] ?? {
                                max_per_day: action.max_per_day,
                                max_per_week: action.max_per_week,
                                max_per_month: action.max_per_month,
                              }
                              setEditingLimits({
                                ...editingLimits,
                                [action.action_key]: {
                                  ...currentLimits,
                                  max_per_day: e.target.value ? parseInt(e.target.value) : null,
                                }
                              })
                            }}
                            onBlur={() => {
                              if (editingLimits[action.action_key]) {
                                handleLimitsChange(action.action_key, editingLimits[action.action_key])
                              }
                            }}
                            placeholder="∞"
                            className="w-16 px-2 py-1 bg-bg-primary border border-white/10 rounded text-text-primary text-sm focus:border-neon-purple focus:outline-none"
                          />
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          <input
                            type="number"
                            value={editingLimits[action.action_key]?.max_per_week ?? action.max_per_week ?? ''}
                            onChange={e => {
                              const currentLimits = editingLimits[action.action_key] ?? {
                                max_per_day: action.max_per_day,
                                max_per_week: action.max_per_week,
                                max_per_month: action.max_per_month,
                              }
                              setEditingLimits({
                                ...editingLimits,
                                [action.action_key]: {
                                  ...currentLimits,
                                  max_per_week: e.target.value ? parseInt(e.target.value) : null,
                                }
                              })
                            }}
                            onBlur={() => {
                              if (editingLimits[action.action_key]) {
                                handleLimitsChange(action.action_key, editingLimits[action.action_key])
                              }
                            }}
                            placeholder="∞"
                            className="w-16 px-2 py-1 bg-bg-primary border border-white/10 rounded text-text-primary text-sm focus:border-neon-purple focus:outline-none"
                          />
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          <input
                            type="number"
                            value={editingLimits[action.action_key]?.max_per_month ?? action.max_per_month ?? ''}
                            onChange={e => {
                              const currentLimits = editingLimits[action.action_key] ?? {
                                max_per_day: action.max_per_day,
                                max_per_week: action.max_per_week,
                                max_per_month: action.max_per_month,
                              }
                              setEditingLimits({
                                ...editingLimits,
                                [action.action_key]: {
                                  ...currentLimits,
                                  max_per_month: e.target.value ? parseInt(e.target.value) : null,
                                }
                              })
                            }}
                            onBlur={() => {
                              if (editingLimits[action.action_key]) {
                                handleLimitsChange(action.action_key, editingLimits[action.action_key])
                              }
                            }}
                            placeholder="∞"
                            className="w-16 px-2 py-1 bg-bg-primary border border-white/10 rounded text-text-primary text-sm focus:border-neon-purple focus:outline-none"
                          />
                        </td>
                      </>
                    )}
                    <td className="px-4 py-4 whitespace-nowrap">
                      <span className={`flex items-center gap-1 text-sm ${
                        action.is_active ? 'text-green-400' : 'text-gray-400'
                      }`}>
                        {action.is_active ? (
                          <>
                            <FiCheck size={14} />
                            Active
                          </>
                        ) : (
                          <>
                            <FiX size={14} />
                            Inactive
                          </>
                        )}
                      </span>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <button
                        onClick={() => handleToggle(action.action_key)}
                        className={`px-3 py-1 text-xs rounded-lg transition-colors ${
                          action.is_active
                            ? 'bg-red-400/20 text-red-400 hover:bg-red-400/30'
                            : 'bg-green-400/20 text-green-400 hover:bg-green-400/30'
                        }`}
                      >
                        {action.is_active ? 'Disable' : 'Enable'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {pointActions.length === 0 && (
              <div className="text-center py-12">
                <FiAward className="mx-auto text-gray-400 mb-4" size={48} />
                <p className="text-text-secondary text-lg">
                  No point actions configured yet
                </p>
                <p className="text-text-secondary text-sm mt-2">
                  Use the Guided Setup above to get started quickly
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}