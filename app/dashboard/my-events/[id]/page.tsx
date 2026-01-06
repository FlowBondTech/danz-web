'use client'

import { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { motion } from 'motion/react'
import {
  FiArrowLeft,
  FiCalendar,
  FiMapPin,
  FiUsers,
  FiDollarSign,
  FiClock,
  FiCheck,
  FiX,
  FiShare2,
  FiExternalLink,
  FiEdit2,
  FiHelpCircle,
} from 'react-icons/fi'
import { useQuery, useMutation, gql } from '@apollo/client'
import DashboardLayout from '@/src/components/dashboard/DashboardLayout'
import EventCheckinCode from '@/src/components/events/EventCheckinCode'
import EventCheckinModal from '@/src/components/events/EventCheckinModal'
import {
  useGetMyProfileQuery,
  useRegisterForEventMutation,
  useCancelEventRegistrationMutation,
} from '@/src/generated/graphql'

// Inline query since production schema may not have all fields yet
const GET_EVENT_DETAIL = gql`
  query GetEventDetail($id: ID!) {
    event(id: $id) {
      id
      title
      description
      category
      dance_styles
      skill_level
      location_name
      location_city
      location_address
      location_latitude
      location_longitude
      is_virtual
      virtual_link
      start_date_time
      end_date_time
      price_usd
      max_capacity
      registration_count
      status
      is_featured
      is_recurring
      image_url
      is_registered
      user_registration_status
      facilitator {
        privy_id
        username
        display_name
        avatar_url
      }
    }
  }
`

// Query for checkin_code - only available for organizers
const GET_EVENT_CHECKIN_CODE = gql`
  query GetEventCheckinCode($id: ID!) {
    event(id: $id) {
      id
      checkin_code
    }
  }
`

const CATEGORY_LABELS: Record<string, { label: string; emoji: string }> = {
  class: { label: 'Class', emoji: '💃' },
  social: { label: 'Social', emoji: '🎉' },
  workshop: { label: 'Workshop', emoji: '📚' },
  competition: { label: 'Competition', emoji: '🏆' },
  performance: { label: 'Performance', emoji: '🎭' },
  fitness: { label: 'Fitness', emoji: '💪' },
}

export default function EventDetailPage() {
  const params = useParams()
  const router = useRouter()
  const eventId = params.id as string

  const [showCheckinModal, setShowCheckinModal] = useState(false)
  const [showRegistrationModal, setShowRegistrationModal] = useState(false)
  const [registrationNotes, setRegistrationNotes] = useState('')
  const [selectedRsvpStatus, setSelectedRsvpStatus] = useState<'registered' | 'maybe'>('registered')

  const { data: profileData } = useGetMyProfileQuery()
  const userRole = profileData?.me?.role
  const userPrivyId = profileData?.me?.privy_id

  const { data, loading, error, refetch } = useQuery(GET_EVENT_DETAIL, {
    variables: { id: eventId },
    skip: !eventId,
  })

  // Separate query for checkin code (only organizers/admins can see this)
  const { data: checkinData } = useQuery(GET_EVENT_CHECKIN_CODE, {
    variables: { id: eventId },
    skip: !eventId,
  })

  const [registerForEvent, { loading: registering }] = useRegisterForEventMutation({
    onCompleted: () => {
      setShowRegistrationModal(false)
      setRegistrationNotes('')
      refetch()
    },
  })

  const [cancelRegistration, { loading: cancelling }] = useCancelEventRegistrationMutation({
    onCompleted: () => refetch(),
  })

  const event = data?.event
  const checkinCode = checkinData?.event?.checkin_code

  // Check if current user can manage this event
  const isOrganizer = event?.facilitator?.privy_id === userPrivyId
  const isAdmin = userRole === 'admin' || userRole === 'manager'
  const canManageEvent = isOrganizer || isAdmin

  // Registration status
  const isRegistered = event?.is_registered
  const registrationStatus = event?.user_registration_status
  const isGoing = registrationStatus === 'registered' || registrationStatus === 'attended'
  const isMaybe = registrationStatus === 'maybe'

  // Event timing
  const now = new Date()
  const startTime = event ? new Date(event.start_date_time) : null
  const endTime = event?.end_date_time ? new Date(event.end_date_time) : null
  const twoHoursBefore = startTime ? new Date(startTime.getTime() - 2 * 60 * 60 * 1000) : null
  const isCheckinWindow = twoHoursBefore && endTime && now >= twoHoursBefore && now <= endTime

  const handleRegister = async () => {
    const notesWithStatus = selectedRsvpStatus === 'maybe'
      ? `[RSVP: Maybe] ${registrationNotes || ''}`.trim()
      : registrationNotes || null

    await registerForEvent({
      variables: {
        eventId: event.id,
        notes: notesWithStatus,
      },
    })
  }

  const handleCancel = async () => {
    if (confirm('Are you sure you want to cancel your registration?')) {
      await cancelRegistration({
        variables: { eventId: event.id },
      })
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    })
  }

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
    })
  }

  if (loading) {
    return (
      <DashboardLayout>
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="animate-pulse space-y-6">
            <div className="h-8 w-32 bg-white/10 rounded" />
            <div className="h-64 bg-white/10 rounded-2xl" />
            <div className="h-24 bg-white/10 rounded-xl" />
          </div>
        </div>
      </DashboardLayout>
    )
  }

  if (error || !event) {
    return (
      <DashboardLayout>
        <div className="max-w-4xl mx-auto px-4 py-8">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-text-secondary hover:text-text-primary mb-6"
          >
            <FiArrowLeft />
            Back
          </button>
          <div className="text-center py-12">
            <h2 className="text-xl font-bold text-text-primary mb-2">Event Not Found</h2>
            <p className="text-text-secondary">This event may have been removed or doesn't exist.</p>
          </div>
        </div>
      </DashboardLayout>
    )
  }

  const categoryInfo = CATEGORY_LABELS[event.category || 'class'] || { label: 'Event', emoji: '🎵' }
  const spotsLeft = event.max_capacity ? event.max_capacity - (event.registration_count || 0) : null
  const isFull = spotsLeft === 0

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-text-secondary hover:text-text-primary mb-6 transition-colors"
        >
          <FiArrowLeft />
          Back to Events
        </button>

        {/* Event Header */}
        <div className="relative rounded-2xl overflow-hidden mb-6">
          {event.image_url ? (
            <img
              src={event.image_url}
              alt={event.title}
              className="w-full h-64 object-cover"
            />
          ) : (
            <div className="w-full h-64 bg-gradient-to-br from-neon-purple/30 via-neon-pink/20 to-neon-blue/30 flex items-center justify-center">
              <span className="text-8xl">{categoryInfo.emoji}</span>
            </div>
          )}

          {/* Badges */}
          <div className="absolute top-4 left-4 flex gap-2">
            <span className="px-3 py-1 bg-black/60 backdrop-blur-sm rounded-full text-sm font-medium text-white">
              {categoryInfo.emoji} {categoryInfo.label}
            </span>
            {event.is_featured && (
              <span className="px-3 py-1 bg-yellow-500 rounded-full text-sm font-bold text-black">
                Featured
              </span>
            )}
          </div>

          {/* Edit Button for Organizers */}
          {canManageEvent && (
            <button
              onClick={() => router.push(`/dashboard/my-events/create?edit=${event.id}`)}
              className="absolute top-4 right-4 p-2 bg-black/60 backdrop-blur-sm rounded-full text-white hover:bg-black/80 transition-colors"
            >
              <FiEdit2 size={18} />
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Title & Description */}
            <div className="bg-bg-secondary rounded-2xl border border-white/10 p-6">
              <h1 className="text-2xl sm:text-3xl font-bold text-text-primary mb-4">
                {event.title}
              </h1>

              {event.description && (
                <p className="text-text-secondary whitespace-pre-wrap">
                  {event.description}
                </p>
              )}

              {/* Dance Styles */}
              {event.dance_styles && event.dance_styles.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-4">
                  {event.dance_styles.map((style: string) => (
                    <span
                      key={style}
                      className="px-3 py-1 bg-neon-purple/10 text-neon-purple text-sm rounded-full"
                    >
                      {style}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Event Details */}
            <div className="bg-bg-secondary rounded-2xl border border-white/10 p-6 space-y-4">
              <h2 className="text-lg font-semibold text-text-primary">Event Details</h2>

              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <FiCalendar className="w-5 h-5 text-neon-purple mt-0.5" />
                  <div>
                    <p className="text-text-primary font-medium">
                      {formatDate(event.start_date_time)}
                    </p>
                    <p className="text-text-secondary text-sm">
                      {formatTime(event.start_date_time)}
                      {event.end_date_time && ` - ${formatTime(event.end_date_time)}`}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <FiMapPin className="w-5 h-5 text-neon-purple mt-0.5" />
                  <div>
                    {event.is_virtual ? (
                      <>
                        <p className="text-text-primary font-medium">Virtual Event</p>
                        {event.virtual_link && isRegistered && (
                          <a
                            href={event.virtual_link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-neon-purple hover:underline text-sm flex items-center gap-1"
                          >
                            Join Link <FiExternalLink size={12} />
                          </a>
                        )}
                      </>
                    ) : (
                      <>
                        <p className="text-text-primary font-medium">{event.location_name}</p>
                        {event.location_address && (
                          <p className="text-text-secondary text-sm">{event.location_address}</p>
                        )}
                        {event.location_city && (
                          <p className="text-text-secondary text-sm">{event.location_city}</p>
                        )}
                      </>
                    )}
                  </div>
                </div>

                {event.max_capacity && (
                  <div className="flex items-start gap-3">
                    <FiUsers className="w-5 h-5 text-neon-purple mt-0.5" />
                    <div>
                      <p className="text-text-primary font-medium">
                        {event.registration_count || 0} / {event.max_capacity} attendees
                      </p>
                      {spotsLeft !== null && spotsLeft > 0 && spotsLeft <= 10 && (
                        <p className="text-orange-400 text-sm">Only {spotsLeft} spots left!</p>
                      )}
                      {isFull && <p className="text-red-400 text-sm">Sold out</p>}
                    </div>
                  </div>
                )}

                <div className="flex items-start gap-3">
                  <FiDollarSign className="w-5 h-5 text-neon-purple mt-0.5" />
                  <p className="text-text-primary font-medium">
                    {event.price_usd && event.price_usd > 0
                      ? `$${event.price_usd}`
                      : 'Free'}
                  </p>
                </div>

                {event.skill_level && (
                  <div className="flex items-start gap-3">
                    <FiClock className="w-5 h-5 text-neon-purple mt-0.5" />
                    <p className="text-text-primary font-medium capitalize">
                      {event.skill_level} level
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Organizer Info */}
            {event.facilitator && (
              <div className="bg-bg-secondary rounded-2xl border border-white/10 p-6">
                <h2 className="text-lg font-semibold text-text-primary mb-4">Hosted by</h2>
                <div className="flex items-center gap-4">
                  {event.facilitator.avatar_url ? (
                    <img
                      src={event.facilitator.avatar_url}
                      alt=""
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-neon-purple/20 flex items-center justify-center">
                      <span className="text-neon-purple text-lg font-bold">
                        {(event.facilitator.display_name || event.facilitator.username || '?')[0].toUpperCase()}
                      </span>
                    </div>
                  )}
                  <div>
                    <p className="text-text-primary font-medium">
                      {event.facilitator.display_name || event.facilitator.username}
                    </p>
                    {event.facilitator.username && (
                      <p className="text-text-secondary text-sm">@{event.facilitator.username}</p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Registration Card */}
            <div className="bg-bg-secondary rounded-2xl border border-white/10 p-6">
              {isGoing || isMaybe ? (
                <div className="space-y-4">
                  <div className={`p-4 rounded-xl ${isGoing ? 'bg-green-500/10 border border-green-500/30' : 'bg-yellow-500/10 border border-yellow-500/30'}`}>
                    <div className="flex items-center gap-2 mb-2">
                      {isGoing ? (
                        <FiCheck className="text-green-400" size={20} />
                      ) : (
                        <FiHelpCircle className="text-yellow-400" size={20} />
                      )}
                      <span className={`font-semibold ${isGoing ? 'text-green-400' : 'text-yellow-400'}`}>
                        {isGoing ? "You're Going!" : "Maybe Going"}
                      </span>
                    </div>
                    <p className="text-text-secondary text-sm">
                      {isGoing
                        ? "We'll see you at the event!"
                        : "Update your status when you decide."}
                    </p>
                  </div>

                  {/* Check-in Button (during check-in window) */}
                  {isCheckinWindow && isGoing && (
                    <button
                      onClick={() => setShowCheckinModal(true)}
                      className="w-full py-3 bg-gradient-to-r from-neon-purple to-neon-pink text-white rounded-xl font-medium hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                    >
                      <FiCheck size={18} />
                      Check In Now
                    </button>
                  )}

                  <button
                    onClick={handleCancel}
                    disabled={cancelling}
                    className="w-full py-3 bg-white/5 text-red-400 rounded-xl font-medium hover:bg-red-500/10 transition-colors flex items-center justify-center gap-2"
                  >
                    <FiX size={18} />
                    Cancel Registration
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-text-primary mb-1">
                      {event.price_usd && event.price_usd > 0
                        ? `$${event.price_usd}`
                        : 'Free'}
                    </p>
                    {spotsLeft !== null && (
                      <p className="text-text-secondary text-sm">
                        {spotsLeft > 0 ? `${spotsLeft} spots remaining` : 'No spots remaining'}
                      </p>
                    )}
                  </div>

                  <button
                    onClick={() => setShowRegistrationModal(true)}
                    disabled={isFull}
                    className={`w-full py-3 rounded-xl font-medium transition-all flex items-center justify-center gap-2 ${
                      isFull
                        ? 'bg-gray-500/20 text-gray-400 cursor-not-allowed'
                        : 'bg-gradient-to-r from-neon-purple to-neon-pink text-white hover:opacity-90'
                    }`}
                  >
                    {isFull ? 'Sold Out' : 'Register Now'}
                  </button>
                </div>
              )}

              <button
                className="w-full mt-4 py-2 text-text-secondary hover:text-text-primary transition-colors flex items-center justify-center gap-2"
                onClick={() => {
                  navigator.share?.({
                    title: event.title,
                    url: window.location.href,
                  }).catch(() => {
                    navigator.clipboard.writeText(window.location.href)
                  })
                }}
              >
                <FiShare2 size={16} />
                Share Event
              </button>
            </div>

            {/* Check-in Code Card (for organizers) */}
            {canManageEvent && checkinCode && (
              <EventCheckinCode
                eventId={event.id}
                checkinCode={checkinCode}
                eventTitle={event.title}
                onCodeRegenerated={() => refetch()}
              />
            )}
          </div>
        </div>
      </div>

      {/* Registration Modal */}
      {showRegistrationModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setShowRegistrationModal(false)}
          />
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="relative bg-bg-secondary border border-neon-purple/30 rounded-2xl w-full max-w-md mx-4 p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-text-primary">Join Event</h2>
              <button
                onClick={() => setShowRegistrationModal(false)}
                className="p-2 hover:bg-white/10 rounded-lg"
              >
                <FiX className="text-text-secondary" size={20} />
              </button>
            </div>

            <div className="space-y-4">
              {/* RSVP Status Selection */}
              <div>
                <label className="block text-text-secondary text-sm mb-2">Your Response</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setSelectedRsvpStatus('registered')}
                    className={`flex items-center justify-center gap-2 p-3 rounded-xl border-2 transition-all ${
                      selectedRsvpStatus === 'registered'
                        ? 'border-green-500 bg-green-500/10 text-green-400'
                        : 'border-white/10 text-text-secondary hover:border-white/20'
                    }`}
                  >
                    <FiCheck size={18} />
                    Going
                  </button>
                  <button
                    onClick={() => setSelectedRsvpStatus('maybe')}
                    className={`flex items-center justify-center gap-2 p-3 rounded-xl border-2 transition-all ${
                      selectedRsvpStatus === 'maybe'
                        ? 'border-yellow-500 bg-yellow-500/10 text-yellow-400'
                        : 'border-white/10 text-text-secondary hover:border-white/20'
                    }`}
                  >
                    <FiHelpCircle size={18} />
                    Maybe
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-text-secondary text-sm mb-2">Notes (Optional)</label>
                <textarea
                  value={registrationNotes}
                  onChange={(e) => setRegistrationNotes(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-text-primary focus:outline-none focus:border-neon-purple/50 resize-none"
                  rows={3}
                  placeholder="Any special requirements..."
                />
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowRegistrationModal(false)}
                  className="flex-1 py-3 bg-white/10 text-text-primary rounded-xl hover:bg-white/20"
                >
                  Cancel
                </button>
                <button
                  onClick={handleRegister}
                  disabled={registering}
                  className="flex-1 py-3 bg-gradient-to-r from-neon-purple to-neon-pink text-white rounded-xl hover:opacity-90 disabled:opacity-50"
                >
                  {registering ? 'Registering...' : 'Confirm'}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Check-in Modal */}
      <EventCheckinModal
        isOpen={showCheckinModal}
        onClose={() => setShowCheckinModal(false)}
        onCheckinSuccess={() => refetch()}
      />
    </DashboardLayout>
  )
}
