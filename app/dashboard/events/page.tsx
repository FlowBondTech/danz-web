'use client'

import DashboardLayout from '@/src/components/dashboard/DashboardLayout'
import { useGetEventsQuery, useCreateEventMutation, useRegisterForEventMutation, useGetMyProfileQuery, EventStatus, RecurrenceType } from '@/src/generated/graphql'
import { usePrivy } from '@privy-io/react-auth'
import { useState } from 'react'
import { FiCalendar, FiMapPin, FiUsers, FiDollarSign, FiClock, FiPlus, FiX, FiCheck, FiMusic, FiStar, FiAlertCircle, FiRepeat } from 'react-icons/fi'
import { motion, AnimatePresence } from 'motion/react'

interface DateValidationError {
  field: 'start_date_time' | 'end_date_time'
  message: string
}

const WEEKDAYS = [
  { value: 'monday', label: 'Mon' },
  { value: 'tuesday', label: 'Tue' },
  { value: 'wednesday', label: 'Wed' },
  { value: 'thursday', label: 'Thu' },
  { value: 'friday', label: 'Fri' },
  { value: 'saturday', label: 'Sat' },
  { value: 'sunday', label: 'Sun' },
]

export default function EventsPage() {
  const { authenticated } = usePrivy()
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState<any>(null)
  const [registrationNotes, setRegistrationNotes] = useState('')
  const [dateErrors, setDateErrors] = useState<DateValidationError[]>([])
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Recurring event state
  const [isRecurring, setIsRecurring] = useState(false)
  const [recurrenceType, setRecurrenceType] = useState<RecurrenceType>(RecurrenceType.Weekly)
  const [recurrenceEndDate, setRecurrenceEndDate] = useState('')
  const [recurrenceDays, setRecurrenceDays] = useState<string[]>([])
  const [recurrenceCount, setRecurrenceCount] = useState<number | null>(null)

  const { data: profileData } = useGetMyProfileQuery({
    skip: !authenticated,
  })

  const { data: eventsData, loading, refetch } = useGetEventsQuery({
    variables: {
      filter: {
        status: EventStatus.Upcoming
      },
      pagination: {
        limit: 20
      }
    }
  })

  const [createEvent] = useCreateEventMutation({
    onCompleted: () => {
      setShowCreateForm(false)
      refetch()
    }
  })

  const [registerForEvent] = useRegisterForEventMutation({
    onCompleted: () => {
      setSelectedEvent(null)
      setRegistrationNotes('')
      refetch()
    }
  })

  const canCreateEvents = profileData?.me?.role === 'admin' || profileData?.me?.role === 'organizer'

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  // Validate dates client-side
  const validateDates = (startDateStr: string, endDateStr: string): DateValidationError[] => {
    const errors: DateValidationError[] = []
    const now = new Date()
    const startDate = new Date(startDateStr)
    const endDate = new Date(endDateStr)

    // Check if start date is in the past
    if (startDate < now) {
      errors.push({
        field: 'start_date_time',
        message: 'Event start date must be in the future'
      })
    }

    // Check if end date is after start date
    if (endDate <= startDate) {
      errors.push({
        field: 'end_date_time',
        message: 'End date must be after start date'
      })
    }

    return errors
  }

  const handleCreateEvent = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setDateErrors([])
    setSubmitError(null)

    const formData = new FormData(e.currentTarget)
    const startDateStr = formData.get('start_date_time') as string
    const endDateStr = formData.get('end_date_time') as string

    // Client-side validation
    const validationErrors = validateDates(startDateStr, endDateStr)
    if (validationErrors.length > 0) {
      setDateErrors(validationErrors)
      return
    }

    setIsSubmitting(true)

    try {
      await createEvent({
        variables: {
          input: {
            title: formData.get('title') as string,
            description: formData.get('description') as string,
            category: formData.get('category') as any || 'class',
            location_name: formData.get('location_name') as string,
            location_address: formData.get('location_address') as string,
            location_city: formData.get('location_city') as string,
            max_capacity: parseInt(formData.get('max_capacity') as string) || null,
            price_usd: parseFloat(formData.get('price_usd') as string) || 0,
            skill_level: formData.get('skill_level') as any || 'all',
            is_virtual: formData.get('is_virtual') === 'true',
            virtual_link: formData.get('virtual_link') as string || null,
            requirements: formData.get('requirements') as string || null,
            tags: (formData.get('tags') as string)?.split(',').map(t => t.trim()).filter(Boolean) || [],
            dance_styles: (formData.get('dance_styles') as string)?.split(',').map(t => t.trim()).filter(Boolean) || [],
            start_date_time: new Date(startDateStr).toISOString(),
            end_date_time: new Date(endDateStr).toISOString(),
            // Recurring event fields
            is_recurring: isRecurring,
            recurrence_type: isRecurring ? recurrenceType : RecurrenceType.None,
            recurrence_end_date: isRecurring && recurrenceEndDate ? new Date(recurrenceEndDate).toISOString() : null,
            recurrence_days: isRecurring && recurrenceType === RecurrenceType.Weekly ? recurrenceDays : null,
            recurrence_count: isRecurring && recurrenceCount ? recurrenceCount : null,
          }
        }
      })

      // Reset recurring event state after successful creation
      setIsRecurring(false)
      setRecurrenceType(RecurrenceType.Weekly)
      setRecurrenceEndDate('')
      setRecurrenceDays([])
      setRecurrenceCount(null)
    } catch (error: any) {
      // Handle GraphQL errors
      const graphqlError = error?.graphQLErrors?.[0]
      if (graphqlError) {
        const validationType = graphqlError.extensions?.validationType
        const field = graphqlError.extensions?.field

        if (validationType === 'PAST_DATE' && field === 'start_date_time') {
          setDateErrors([{ field: 'start_date_time', message: graphqlError.message }])
        } else if (validationType === 'END_BEFORE_START' && field === 'end_date_time') {
          setDateErrors([{ field: 'end_date_time', message: graphqlError.message }])
        } else {
          setSubmitError(graphqlError.message || 'Failed to create event')
        }
      } else {
        setSubmitError('An unexpected error occurred. Please try again.')
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleRegister = async () => {
    if (selectedEvent) {
      await registerForEvent({
        variables: {
          eventId: selectedEvent.id,
          notes: registrationNotes || null
        }
      })
    }
  }

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-white text-2xl">Loading events...</div>
        </div>
      </DashboardLayout>
    )
  }

  const events = eventsData?.events?.events || []

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-display font-bold text-text-primary mb-2">
              Upcoming Events
            </h1>
            <p className="text-text-secondary">
              Join us at our upcoming events and connect with the DANZ community
            </p>
          </div>
          {canCreateEvents && (
            <button
              onClick={() => setShowCreateForm(!showCreateForm)}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-neon-purple to-neon-blue rounded-lg hover:opacity-90 transition-opacity"
            >
              {showCreateForm ? (
                <>
                  <FiX size={20} />
                  Cancel
                </>
              ) : (
                <>
                  <FiPlus size={20} />
                  Create Event
                </>
              )}
            </button>
          )}
        </div>

        {/* Create Event Form */}
        <AnimatePresence>
          {showCreateForm && canCreateEvents && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-8 bg-bg-secondary rounded-xl border border-neon-purple/20 p-6"
            >
              <h2 className="text-xl font-bold text-text-primary mb-4">Create New Event</h2>
              <form onSubmit={handleCreateEvent} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-1">
                      Event Title *
                    </label>
                    <input
                      type="text"
                      name="title"
                      required
                      className="w-full bg-bg-primary text-text-primary rounded-lg px-4 py-3 border border-neon-purple/20 focus:border-neon-purple/50 focus:outline-none"
                      placeholder="Dance Workshop"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-1">
                      Category
                    </label>
                    <select
                      name="category"
                      className="w-full bg-bg-primary text-text-primary rounded-lg px-4 py-3 border border-neon-purple/20 focus:border-neon-purple/50 focus:outline-none"
                    >
                      <option value="class">Class</option>
                      <option value="salsa">Salsa</option>
                      <option value="hip_hop">Hip Hop</option>
                      <option value="contemporary">Contemporary</option>
                      <option value="ballet">Ballet</option>
                      <option value="jazz">Jazz</option>
                      <option value="ballroom">Ballroom</option>
                      <option value="street">Street</option>
                      <option value="cultural">Cultural</option>
                      <option value="fitness">Fitness</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-1">
                    Description
                  </label>
                  <textarea
                    name="description"
                    rows={3}
                    className="w-full bg-bg-primary text-text-primary rounded-lg px-4 py-3 border border-neon-purple/20 focus:border-neon-purple/50 focus:outline-none"
                    placeholder="Describe your event..."
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-1">
                      Location Name *
                    </label>
                    <input
                      type="text"
                      name="location_name"
                      required
                      className="w-full bg-bg-primary text-text-primary rounded-lg px-4 py-3 border border-neon-purple/20 focus:border-neon-purple/50 focus:outline-none"
                      placeholder="Dance Studio"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-1">
                      Address
                    </label>
                    <input
                      type="text"
                      name="location_address"
                      className="w-full bg-bg-primary text-text-primary rounded-lg px-4 py-3 border border-neon-purple/20 focus:border-neon-purple/50 focus:outline-none"
                      placeholder="123 Main St"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-1">
                      City
                    </label>
                    <input
                      type="text"
                      name="location_city"
                      className="w-full bg-bg-primary text-text-primary rounded-lg px-4 py-3 border border-neon-purple/20 focus:border-neon-purple/50 focus:outline-none"
                      placeholder="New York"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-1">
                      Start Date & Time *
                    </label>
                    <input
                      type="datetime-local"
                      name="start_date_time"
                      required
                      min={new Date().toISOString().slice(0, 16)}
                      onChange={() => setDateErrors(prev => prev.filter(e => e.field !== 'start_date_time'))}
                      className={`w-full bg-bg-primary text-text-primary rounded-lg px-4 py-3 border focus:outline-none ${
                        dateErrors.some(e => e.field === 'start_date_time')
                          ? 'border-red-500 focus:border-red-500'
                          : 'border-neon-purple/20 focus:border-neon-purple/50'
                      }`}
                    />
                    {dateErrors.find(e => e.field === 'start_date_time') && (
                      <div className="flex items-center gap-1 mt-1 text-red-500 text-sm">
                        <FiAlertCircle className="w-4 h-4" />
                        <span>{dateErrors.find(e => e.field === 'start_date_time')?.message}</span>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-1">
                      End Date & Time *
                    </label>
                    <input
                      type="datetime-local"
                      name="end_date_time"
                      required
                      onChange={() => setDateErrors(prev => prev.filter(e => e.field !== 'end_date_time'))}
                      className={`w-full bg-bg-primary text-text-primary rounded-lg px-4 py-3 border focus:outline-none ${
                        dateErrors.some(e => e.field === 'end_date_time')
                          ? 'border-red-500 focus:border-red-500'
                          : 'border-neon-purple/20 focus:border-neon-purple/50'
                      }`}
                    />
                    {dateErrors.find(e => e.field === 'end_date_time') && (
                      <div className="flex items-center gap-1 mt-1 text-red-500 text-sm">
                        <FiAlertCircle className="w-4 h-4" />
                        <span>{dateErrors.find(e => e.field === 'end_date_time')?.message}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-1">
                      Max Capacity
                    </label>
                    <input
                      type="number"
                      name="max_capacity"
                      className="w-full bg-bg-primary text-text-primary rounded-lg px-4 py-3 border border-neon-purple/20 focus:border-neon-purple/50 focus:outline-none"
                      placeholder="50"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-1">
                      Price (USD)
                    </label>
                    <input
                      type="number"
                      name="price_usd"
                      step="0.01"
                      className="w-full bg-bg-primary text-text-primary rounded-lg px-4 py-3 border border-neon-purple/20 focus:border-neon-purple/50 focus:outline-none"
                      placeholder="0.00"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-1">
                      Skill Level
                    </label>
                    <select
                      name="skill_level"
                      className="w-full bg-bg-primary text-text-primary rounded-lg px-4 py-3 border border-neon-purple/20 focus:border-neon-purple/50 focus:outline-none"
                    >
                      <option value="all">All Levels</option>
                      <option value="beginner">Beginner</option>
                      <option value="intermediate">Intermediate</option>
                      <option value="advanced">Advanced</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-1">
                      Dance Styles (comma separated)
                    </label>
                    <input
                      type="text"
                      name="dance_styles"
                      className="w-full bg-bg-primary text-text-primary rounded-lg px-4 py-3 border border-neon-purple/20 focus:border-neon-purple/50 focus:outline-none"
                      placeholder="Hip Hop, Contemporary, Jazz"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-1">
                      Tags (comma separated)
                    </label>
                    <input
                      type="text"
                      name="tags"
                      className="w-full bg-bg-primary text-text-primary rounded-lg px-4 py-3 border border-neon-purple/20 focus:border-neon-purple/50 focus:outline-none"
                      placeholder="workshop, community, beginner-friendly"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      name="is_virtual"
                      value="true"
                      className="w-4 h-4 text-purple-600 bg-black/50 border-purple-500/30 rounded focus:ring-purple-500"
                    />
                    <span className="text-text-secondary">Virtual Event</span>
                  </label>
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-1">
                    Virtual Link (if virtual)
                  </label>
                  <input
                    type="url"
                    name="virtual_link"
                    className="w-full bg-bg-primary text-text-primary rounded-lg px-4 py-3 border border-neon-purple/20 focus:border-neon-purple/50 focus:outline-none"
                    placeholder="https://zoom.us/..."
                  />
                </div>

                {/* Recurring Event Section */}
                <div className="border border-neon-purple/20 rounded-lg p-4 space-y-4">
                  <div className="flex items-center gap-2">
                    <FiRepeat className="text-neon-purple" size={18} />
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={isRecurring}
                        onChange={(e) => setIsRecurring(e.target.checked)}
                        className="w-4 h-4 text-purple-600 bg-black/50 border-purple-500/30 rounded focus:ring-purple-500"
                      />
                      <span className="text-text-primary font-medium">Make this a recurring event</span>
                    </label>
                  </div>

                  {isRecurring && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="space-y-4 pl-6"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-text-secondary mb-1">
                            Repeat Frequency *
                          </label>
                          <select
                            value={recurrenceType}
                            onChange={(e) => setRecurrenceType(e.target.value as RecurrenceType)}
                            className="w-full bg-bg-primary text-text-primary rounded-lg px-4 py-3 border border-neon-purple/20 focus:border-neon-purple/50 focus:outline-none"
                          >
                            <option value={RecurrenceType.Daily}>Daily</option>
                            <option value={RecurrenceType.Weekly}>Weekly</option>
                            <option value={RecurrenceType.Biweekly}>Bi-weekly</option>
                            <option value={RecurrenceType.Monthly}>Monthly</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-text-secondary mb-1">
                            Series End Date *
                          </label>
                          <input
                            type="date"
                            value={recurrenceEndDate}
                            onChange={(e) => setRecurrenceEndDate(e.target.value)}
                            min={new Date().toISOString().split('T')[0]}
                            className="w-full bg-bg-primary text-text-primary rounded-lg px-4 py-3 border border-neon-purple/20 focus:border-neon-purple/50 focus:outline-none"
                          />
                        </div>
                      </div>

                      {recurrenceType === RecurrenceType.Weekly && (
                        <div>
                          <label className="block text-sm font-medium text-text-secondary mb-2">
                            Repeat on Days *
                          </label>
                          <div className="flex flex-wrap gap-2">
                            {WEEKDAYS.map((day) => (
                              <button
                                key={day.value}
                                type="button"
                                onClick={() => {
                                  setRecurrenceDays(prev =>
                                    prev.includes(day.value)
                                      ? prev.filter(d => d !== day.value)
                                      : [...prev, day.value]
                                  )
                                }}
                                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                                  recurrenceDays.includes(day.value)
                                    ? 'bg-neon-purple text-white'
                                    : 'bg-bg-primary text-text-secondary border border-neon-purple/20 hover:border-neon-purple/50'
                                }`}
                              >
                                {day.label}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="text-sm text-text-secondary">
                        <span className="text-neon-purple">Note:</span> Recurring events will automatically create instances based on your schedule.
                      </div>
                    </motion.div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-1">
                    Requirements
                  </label>
                  <textarea
                    name="requirements"
                    rows={2}
                    className="w-full bg-bg-primary text-text-primary rounded-lg px-4 py-3 border border-neon-purple/20 focus:border-neon-purple/50 focus:outline-none"
                    placeholder="What participants should bring or know..."
                  />
                </div>

                {/* General error message */}
                {submitError && (
                  <div className="flex items-center gap-2 p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-500">
                    <FiAlertCircle className="w-5 h-5 flex-shrink-0" />
                    <span>{submitError}</span>
                  </div>
                )}

                <div className="flex justify-end gap-4">
                  <button
                    type="button"
                    onClick={() => {
                      setShowCreateForm(false)
                      setDateErrors([])
                      setSubmitError(null)
                      setIsRecurring(false)
                      setRecurrenceType(RecurrenceType.Weekly)
                      setRecurrenceEndDate('')
                      setRecurrenceDays([])
                      setRecurrenceCount(null)
                    }}
                    className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                    disabled={isSubmitting}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-6 py-3 bg-gradient-to-r from-neon-purple to-neon-blue text-white rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Creating...
                      </>
                    ) : (
                      'Create Event'
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Events Grid */}
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-bg-secondary rounded-xl border border-neon-purple/20 overflow-hidden hover:border-neon-purple/40 transition-all"
            >
              {event.image_url && (
                <div className="h-48 overflow-hidden">
                  <img
                    src={event.image_url}
                    alt={event.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-xl font-bold text-text-primary flex-1">
                    {event.title}
                  </h3>
                  <div className="flex items-center gap-2">
                    {event.is_recurring && (
                      <FiRepeat className="text-neon-purple" size={18} title="Recurring Event" />
                    )}
                    {event.is_featured && (
                      <FiStar className="text-yellow-400" size={20} />
                    )}
                  </div>
                </div>

                {event.description && (
                  <p className="text-text-secondary text-sm mb-4 line-clamp-2">
                    {event.description}
                  </p>
                )}

                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-text-secondary">
                    <FiCalendar className="text-neon-purple" size={14} />
                    <span>{formatDate(event.start_date_time)}</span>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-text-secondary">
                    <FiMapPin className="text-neon-purple" size={14} />
                    <span>{event.location_name}</span>
                    {event.location_city && <span>• {event.location_city}</span>}
                  </div>

                  {event.facilitator && (
                    <div className="flex items-center gap-2 text-sm text-text-secondary">
                      <FiUsers className="text-neon-purple" size={14} />
                      <span>by {event.facilitator.display_name || event.facilitator.username}</span>
                    </div>
                  )}

                  <div className="flex items-center gap-4 text-sm">
                    {event.price_usd && event.price_usd > 0 ? (
                      <div className="flex items-center gap-1">
                        <FiDollarSign className="text-green-400" size={14} />
                        <span className="text-green-400">${event.price_usd}</span>
                      </div>
                    ) : (
                      <span className="text-green-400 font-medium">Free</span>
                    )}

                    {event.max_capacity && (
                      <div className="flex items-center gap-1">
                        <FiUsers className="text-text-secondary" size={14} />
                        <span className="text-text-secondary">
                          {event.registration_count || 0}/{event.max_capacity}
                        </span>
                      </div>
                    )}
                  </div>

                  {event.dance_styles && event.dance_styles.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {event.dance_styles.map((style) => (
                        <span
                          key={style}
                          className="px-2 py-1 bg-neon-purple/20 text-neon-purple text-xs rounded-full"
                        >
                          {style}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {authenticated && (
                  <button
                    onClick={() => setSelectedEvent(event)}
                    disabled={event.is_registered ?? false}
                    className={`w-full py-3 rounded-lg font-medium transition-all ${
                      event.is_registered
                        ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                        : 'bg-gradient-to-r from-neon-purple to-neon-blue text-white hover:opacity-90'
                    }`}
                  >
                    {event.is_registered ? (
                      <span className="flex items-center justify-center gap-2">
                        <FiCheck size={16} />
                        Registered
                      </span>
                    ) : (
                      'Register Now'
                    )}
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {events.length === 0 && (
          <div className="text-center py-12">
            <FiCalendar className="mx-auto text-gray-400 mb-4" size={48} />
            <p className="text-text-secondary text-lg">No upcoming events at the moment</p>
            {canCreateEvents && (
              <p className="text-text-secondary text-sm mt-2">
                Create your first event using the button above
              </p>
            )}
          </div>
        )}

        {/* Registration Modal */}
        <AnimatePresence>
          {selectedEvent && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedEvent(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-bg-secondary rounded-xl border border-neon-purple/20 p-6 max-w-md w-full"
                onClick={(e) => e.stopPropagation()}
              >
                <h3 className="text-xl font-bold text-text-primary mb-4">
                  Register for {selectedEvent.title}
                </h3>

                <div className="space-y-3 mb-4">
                  <div className="flex items-center gap-2 text-sm text-text-secondary">
                    <FiCalendar className="text-neon-purple" size={14} />
                    <span>{formatDate(selectedEvent.start_date_time)}</span>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-text-secondary">
                    <FiMapPin className="text-neon-purple" size={14} />
                    <span>{selectedEvent.location_name}</span>
                  </div>

                  {selectedEvent.price_usd > 0 && (
                    <div className="flex items-center gap-2 text-sm">
                      <FiDollarSign className="text-green-400" size={14} />
                      <span className="text-green-400">${selectedEvent.price_usd}</span>
                    </div>
                  )}
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-text-secondary mb-1">
                    Additional Information (Optional)
                  </label>
                  <textarea
                    value={registrationNotes}
                    onChange={(e) => setRegistrationNotes(e.target.value)}
                    className="w-full bg-bg-primary text-text-primary rounded-lg px-4 py-3 border border-neon-purple/20 focus:border-neon-purple/50 focus:outline-none"
                    rows={3}
                    placeholder="Any special requirements or notes..."
                  />
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setSelectedEvent(null)}
                    className="flex-1 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleRegister}
                    className="flex-1 py-3 bg-gradient-to-r from-neon-purple to-neon-blue text-white rounded-lg hover:opacity-90 transition-opacity"
                  >
                    Confirm Registration
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </DashboardLayout>
  )
}