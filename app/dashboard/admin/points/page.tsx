'use client'

import DashboardLayout from '@/src/components/dashboard/DashboardLayout'
import {
  PointActionCategory,
  useGetAllPointActionsQuery,
  useGetMyProfileQuery,
  useTogglePointActionMutation,
  useUpdatePointActionMutation,
} from '@/src/generated/graphql'
import { usePrivy } from '@privy-io/react-auth'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { FiCheck, FiX } from 'react-icons/fi'

export default function PointActionsPage() {
  const { authenticated, ready } = usePrivy()
  const router = useRouter()

  const [selectedCategory, setSelectedCategory] = useState<PointActionCategory | undefined>()
  const [editingPoints, setEditingPoints] = useState<{ [key: string]: number }>({})
  const [editingLimits, setEditingLimits] = useState<{ [key: string]: { max_per_day: number | null; max_per_week: number | null; max_per_month: number | null } }>({})

  const { data: profileData, loading: profileLoading } = useGetMyProfileQuery({
    skip: !authenticated,
  })

  const { data, loading, refetch } = useGetAllPointActionsQuery({
    variables: {
      category: selectedCategory,
    },
    skip: !authenticated || !profileData?.me?.is_admin,
  })

  const [updatePointAction, { loading: updating }] = useUpdatePointActionMutation()
  const [togglePointAction] = useTogglePointActionMutation()

  useEffect(() => {
    if (ready && !authenticated) {
      router.push('/')
    }
  }, [ready, authenticated, router])

  useEffect(() => {
    if (ready && authenticated && !profileLoading && !profileData?.me?.is_admin) {
      router.push('/dashboard')
    }
  }, [ready, authenticated, profileData, profileLoading, router])

  if (!ready || profileLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-white text-2xl">Loading...</div>
        </div>
      </DashboardLayout>
    )
  }

  if (!profileData?.me?.is_admin) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-red-400 text-xl">Access Denied - Admin Only</div>
        </div>
      </DashboardLayout>
    )
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
      setEditingPoints({ ...editingPoints, [action_key]: undefined })
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
      setEditingLimits({ ...editingLimits, [action_key]: undefined })
    } catch (error) {
      console.error('Error updating limits:', error)
      alert('Failed to update limits')
    }
  }

  const handleToggle = async (action_key: string) => {
    try {
      await togglePointAction({
        variables: { action_key },
      })
      refetch()
    } catch (error) {
      console.error('Error toggling point action:', error)
    }
  }

  const categories = [
    { value: undefined, label: 'All Categories' },
    { value: PointActionCategory.Social, label: 'Social' },
    { value: PointActionCategory.Activity, label: 'Activity' },
    { value: PointActionCategory.Event, label: 'Event' },
    { value: PointActionCategory.Referral, label: 'Referral' },
    { value: PointActionCategory.Achievement, label: 'Achievement' },
    { value: PointActionCategory.Special, label: 'Special' },
    { value: PointActionCategory.Admin, label: 'Admin' },
  ]

  const actions = data?.getAllPointActions || []

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6 sm:mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-text-primary">
              Point Actions Configuration
            </h1>
            <p className="text-text-secondary mt-1">Adjust point values and rate limits for each action</p>
          </div>
        </div>

        {/* Category Filter */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <button
                key={cat.label}
                onClick={() => setSelectedCategory(cat.value)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedCategory === cat.value
                    ? 'bg-neon-purple text-white'
                    : 'bg-bg-secondary text-text-secondary hover:bg-white/5'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Actions List */}
        {loading ? (
          <div className="text-center py-12">
            <div className="text-text-secondary">Loading actions...</div>
          </div>
        ) : (
          <div className="space-y-4">
            {actions.map(action => (
              <div
                key={action.id}
                className="bg-bg-secondary rounded-xl border border-neon-purple/20 p-4 sm:p-6"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-text-primary">
                        {action.action_name}
                      </h3>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          action.is_active
                            ? 'bg-green-400/20 text-green-400'
                            : 'bg-gray-400/20 text-gray-400'
                        }`}
                      >
                        {action.is_active ? 'Active' : 'Inactive'}
                      </span>
                      <span className="px-3 py-1 bg-neon-purple/20 text-neon-purple rounded-full text-xs font-medium capitalize">
                        {action.category}
                      </span>
                    </div>
                    <p className="text-text-secondary text-sm mb-3">{action.description}</p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div>
                        <p className="text-text-secondary text-xs mb-1">Points Value</p>
                        <input
                          type="number"
                          value={editingPoints[action.action_key] ?? action.points_value}
                          onChange={e => setEditingPoints({ ...editingPoints, [action.action_key]: parseInt(e.target.value) || 0 })}
                          onBlur={() => {
                            if (editingPoints[action.action_key] !== undefined && editingPoints[action.action_key] !== action.points_value) {
                              handlePointsChange(action.action_key, editingPoints[action.action_key])
                            }
                          }}
                          className="w-full px-3 py-1.5 bg-bg-primary border border-white/10 rounded text-text-primary font-semibold focus:border-neon-purple focus:outline-none"
                        />
                      </div>
                      <div>
                        <p className="text-text-secondary text-xs mb-1">Max/Day</p>
                        <input
                          type="number"
                          value={editingLimits[action.action_key]?.max_per_day ?? action.max_per_day ?? ''}
                          onChange={e => setEditingLimits({
                            ...editingLimits,
                            [action.action_key]: {
                              ...editingLimits[action.action_key],
                              max_per_day: e.target.value ? parseInt(e.target.value) : null,
                              max_per_week: editingLimits[action.action_key]?.max_per_week ?? action.max_per_week,
                              max_per_month: editingLimits[action.action_key]?.max_per_month ?? action.max_per_month,
                            }
                          })}
                          onBlur={() => {
                            if (editingLimits[action.action_key]) {
                              handleLimitsChange(action.action_key, editingLimits[action.action_key])
                            }
                          }}
                          placeholder="No limit"
                          className="w-full px-3 py-1.5 bg-bg-primary border border-white/10 rounded text-text-primary font-semibold focus:border-neon-purple focus:outline-none"
                        />
                      </div>
                      <div>
                        <p className="text-text-secondary text-xs mb-1">Max/Week</p>
                        <input
                          type="number"
                          value={editingLimits[action.action_key]?.max_per_week ?? action.max_per_week ?? ''}
                          onChange={e => setEditingLimits({
                            ...editingLimits,
                            [action.action_key]: {
                              ...editingLimits[action.action_key],
                              max_per_day: editingLimits[action.action_key]?.max_per_day ?? action.max_per_day,
                              max_per_week: e.target.value ? parseInt(e.target.value) : null,
                              max_per_month: editingLimits[action.action_key]?.max_per_month ?? action.max_per_month,
                            }
                          })}
                          onBlur={() => {
                            if (editingLimits[action.action_key]) {
                              handleLimitsChange(action.action_key, editingLimits[action.action_key])
                            }
                          }}
                          placeholder="No limit"
                          className="w-full px-3 py-1.5 bg-bg-primary border border-white/10 rounded text-text-primary font-semibold focus:border-neon-purple focus:outline-none"
                        />
                      </div>
                      <div>
                        <p className="text-text-secondary text-xs mb-1">Max/Month</p>
                        <input
                          type="number"
                          value={editingLimits[action.action_key]?.max_per_month ?? action.max_per_month ?? ''}
                          onChange={e => setEditingLimits({
                            ...editingLimits,
                            [action.action_key]: {
                              ...editingLimits[action.action_key],
                              max_per_day: editingLimits[action.action_key]?.max_per_day ?? action.max_per_day,
                              max_per_week: editingLimits[action.action_key]?.max_per_week ?? action.max_per_week,
                              max_per_month: e.target.value ? parseInt(e.target.value) : null,
                            }
                          })}
                          onBlur={() => {
                            if (editingLimits[action.action_key]) {
                              handleLimitsChange(action.action_key, editingLimits[action.action_key])
                            }
                          }}
                          placeholder="No limit"
                          className="w-full px-3 py-1.5 bg-bg-primary border border-white/10 rounded text-text-primary font-semibold focus:border-neon-purple focus:outline-none"
                        />
                      </div>
                    </div>
                    {action.total_transactions !== null && (
                      <div className="mt-3 text-sm">
                        <span className="text-text-secondary">Total Uses: </span>
                        <span className="text-text-primary font-semibold">{action.total_transactions}</span>
                      </div>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleToggle(action.action_key)}
                      className={`p-2 transition-colors ${
                        action.is_active
                          ? 'text-green-400 hover:text-green-300'
                          : 'text-gray-400 hover:text-gray-300'
                      }`}
                      title={action.is_active ? 'Deactivate' : 'Activate'}
                    >
                      {action.is_active ? <FiCheck size={20} /> : <FiX size={20} />}
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {actions.length === 0 && (
              <div className="text-center py-12">
                <p className="text-text-secondary">No point actions found for this category</p>
              </div>
            )}
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
