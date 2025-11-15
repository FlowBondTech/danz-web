'use client'

import DashboardLayout from '@/src/components/dashboard/DashboardLayout'
import {
  PointActionCategory,
  useCreatePointActionMutation,
  useGetAllPointActionsQuery,
  useGetMyProfileQuery,
  useTogglePointActionMutation,
  useUpdatePointActionMutation,
} from '@/src/generated/graphql'
import { usePrivy } from '@privy-io/react-auth'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { FiCheck, FiEdit2, FiPlus, FiX } from 'react-icons/fi'

interface PointActionForm {
  action_key: string
  action_name: string
  description: string
  points_value: number
  category: PointActionCategory
  is_active: boolean
  requires_verification: boolean
  max_per_day: number | null
  max_per_week: number | null
  max_per_month: number | null
}

export default function PointActionsPage() {
  const { authenticated, ready } = usePrivy()
  const router = useRouter()

  const [selectedCategory, setSelectedCategory] = useState<PointActionCategory | undefined>()
  const [showForm, setShowForm] = useState(false)
  const [editingAction, setEditingAction] = useState<string | null>(null)
  const [formData, setFormData] = useState<PointActionForm>({
    action_key: '',
    action_name: '',
    description: '',
    points_value: 0,
    category: PointActionCategory.Activity,
    is_active: true,
    requires_verification: false,
    max_per_day: null,
    max_per_week: null,
    max_per_month: null,
  })

  const { data: profileData, loading: profileLoading } = useGetMyProfileQuery({
    skip: !authenticated,
  })

  const { data, loading, refetch } = useGetAllPointActionsQuery({
    variables: {
      category: selectedCategory,
    },
    skip: !authenticated || !profileData?.me?.is_admin,
  })

  const [createPointAction, { loading: creating }] = useCreatePointActionMutation()
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      if (editingAction) {
        await updatePointAction({
          variables: {
            input: {
              action_key: formData.action_key,
              action_name: formData.action_name,
              description: formData.description || null,
              points_value: formData.points_value,
              category: formData.category,
              is_active: formData.is_active,
              requires_verification: formData.requires_verification,
              max_per_day: formData.max_per_day,
              max_per_week: formData.max_per_week,
              max_per_month: formData.max_per_month,
            },
          },
        })
      } else {
        await createPointAction({
          variables: {
            input: {
              action_key: formData.action_key,
              action_name: formData.action_name,
              description: formData.description || null,
              points_value: formData.points_value,
              category: formData.category,
              is_active: formData.is_active,
              requires_verification: formData.requires_verification,
              max_per_day: formData.max_per_day,
              max_per_week: formData.max_per_week,
              max_per_month: formData.max_per_month,
            },
          },
        })
      }

      refetch()
      setShowForm(false)
      setEditingAction(null)
      setFormData({
        action_key: '',
        action_name: '',
        description: '',
        points_value: 0,
        category: PointActionCategory.Activity,
        is_active: true,
        requires_verification: false,
        max_per_day: null,
        max_per_week: null,
        max_per_month: null,
      })
    } catch (error) {
      console.error('Error saving point action:', error)
      alert('Failed to save point action')
    }
  }

  const handleEdit = (action: any) => {
    setEditingAction(action.action_key)
    setFormData({
      action_key: action.action_key,
      action_name: action.action_name,
      description: action.description || '',
      points_value: action.points_value,
      category: action.category,
      is_active: action.is_active,
      requires_verification: action.requires_verification,
      max_per_day: action.max_per_day,
      max_per_week: action.max_per_week,
      max_per_month: action.max_per_month,
    })
    setShowForm(true)
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
            <p className="text-text-secondary mt-1">Manage point values and reward actions</p>
          </div>
          <button
            onClick={() => {
              setEditingAction(null)
              setFormData({
                action_key: '',
                action_name: '',
                description: '',
                points_value: 0,
                category: PointActionCategory.Activity,
                is_active: true,
                requires_verification: false,
                max_per_day: null,
                max_per_week: null,
                max_per_month: null,
              })
              setShowForm(true)
            }}
            className="btn btn-primary flex items-center gap-2"
          >
            <FiPlus size={20} />
            <span className="hidden sm:inline">New Action</span>
          </button>
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

        {/* Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-bg-secondary rounded-xl border border-neon-purple/20 p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-text-primary">
                  {editingAction ? 'Edit Point Action' : 'Create Point Action'}
                </h2>
                <button
                  onClick={() => {
                    setShowForm(false)
                    setEditingAction(null)
                  }}
                  className="text-text-secondary hover:text-text-primary"
                >
                  <FiX size={24} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-2">
                      Action Key *
                    </label>
                    <input
                      type="text"
                      value={formData.action_key}
                      onChange={e => setFormData({ ...formData, action_key: e.target.value })}
                      disabled={!!editingAction}
                      className="w-full px-4 py-2 bg-bg-primary border border-white/10 rounded-lg text-text-primary"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-2">
                      Action Name *
                    </label>
                    <input
                      type="text"
                      value={formData.action_name}
                      onChange={e => setFormData({ ...formData, action_name: e.target.value })}
                      className="w-full px-4 py-2 bg-bg-primary border border-white/10 rounded-lg text-text-primary"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2">
                    Description
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={e => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-4 py-2 bg-bg-primary border border-white/10 rounded-lg text-text-primary"
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-2">
                      Points Value *
                    </label>
                    <input
                      type="number"
                      value={formData.points_value}
                      onChange={e =>
                        setFormData({ ...formData, points_value: parseInt(e.target.value) })
                      }
                      className="w-full px-4 py-2 bg-bg-primary border border-white/10 rounded-lg text-text-primary"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-2">
                      Category *
                    </label>
                    <select
                      value={formData.category}
                      onChange={e =>
                        setFormData({ ...formData, category: e.target.value as PointActionCategory })
                      }
                      className="w-full px-4 py-2 bg-bg-primary border border-white/10 rounded-lg text-text-primary"
                      required
                    >
                      <option value={PointActionCategory.Social}>Social</option>
                      <option value={PointActionCategory.Activity}>Activity</option>
                      <option value={PointActionCategory.Event}>Event</option>
                      <option value={PointActionCategory.Referral}>Referral</option>
                      <option value={PointActionCategory.Achievement}>Achievement</option>
                      <option value={PointActionCategory.Special}>Special</option>
                      <option value={PointActionCategory.Admin}>Admin</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-2">
                      Max Per Day
                    </label>
                    <input
                      type="number"
                      value={formData.max_per_day || ''}
                      onChange={e =>
                        setFormData({
                          ...formData,
                          max_per_day: e.target.value ? parseInt(e.target.value) : null,
                        })
                      }
                      className="w-full px-4 py-2 bg-bg-primary border border-white/10 rounded-lg text-text-primary"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-2">
                      Max Per Week
                    </label>
                    <input
                      type="number"
                      value={formData.max_per_week || ''}
                      onChange={e =>
                        setFormData({
                          ...formData,
                          max_per_week: e.target.value ? parseInt(e.target.value) : null,
                        })
                      }
                      className="w-full px-4 py-2 bg-bg-primary border border-white/10 rounded-lg text-text-primary"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-2">
                      Max Per Month
                    </label>
                    <input
                      type="number"
                      value={formData.max_per_month || ''}
                      onChange={e =>
                        setFormData({
                          ...formData,
                          max_per_month: e.target.value ? parseInt(e.target.value) : null,
                        })
                      }
                      className="w-full px-4 py-2 bg-bg-primary border border-white/10 rounded-lg text-text-primary"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.is_active}
                      onChange={e => setFormData({ ...formData, is_active: e.target.checked })}
                      className="w-4 h-4"
                    />
                    <span className="text-sm text-text-secondary">Active</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.requires_verification}
                      onChange={e =>
                        setFormData({ ...formData, requires_verification: e.target.checked })
                      }
                      className="w-4 h-4"
                    />
                    <span className="text-sm text-text-secondary">Requires Verification</span>
                  </label>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="submit"
                    disabled={creating || updating}
                    className="btn btn-primary flex-1"
                  >
                    {creating || updating ? 'Saving...' : editingAction ? 'Update' : 'Create'}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowForm(false)
                      setEditingAction(null)
                    }}
                    className="btn btn-outline flex-1"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

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
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-text-secondary">Points</p>
                        <p className="text-text-primary font-semibold">{action.points_value}</p>
                      </div>
                      {action.max_per_day && (
                        <div>
                          <p className="text-text-secondary">Max/Day</p>
                          <p className="text-text-primary font-semibold">{action.max_per_day}</p>
                        </div>
                      )}
                      {action.max_per_week && (
                        <div>
                          <p className="text-text-secondary">Max/Week</p>
                          <p className="text-text-primary font-semibold">{action.max_per_week}</p>
                        </div>
                      )}
                      {action.max_per_month && (
                        <div>
                          <p className="text-text-secondary">Max/Month</p>
                          <p className="text-text-primary font-semibold">{action.max_per_month}</p>
                        </div>
                      )}
                      {action.total_transactions !== null && (
                        <div>
                          <p className="text-text-secondary">Total Uses</p>
                          <p className="text-text-primary font-semibold">
                            {action.total_transactions}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(action)}
                      className="p-2 text-text-secondary hover:text-neon-purple transition-colors"
                      title="Edit"
                    >
                      <FiEdit2 size={20} />
                    </button>
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
