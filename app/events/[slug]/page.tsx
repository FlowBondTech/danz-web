'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useQuery, useMutation } from '@apollo/client'
import { gql } from '@apollo/client'
import { usePrivy } from '@privy-io/react-auth'
import { motion } from 'motion/react'
import {
  FiMapPin,
  FiCalendar,
  FiClock,
  FiUsers,
  FiDollarSign,
  FiVideo,
  FiArrowLeft,
  FiShare2,
  FiCheck,
  FiLoader
} from 'react-icons/fi'
import Link from 'next/link'
import Image from 'next/image'

const GET_PUBLIC_EVENT = gql`
  query GetPublicEvent($slug: String!) {
    publicEvent(slug: $slug) {
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
      slug
      is_public
      facilitator {
        privy_id
        username
        display_name
        avatar_url
        bio
      }
      created_at
      updated_at
    }
  }
`

const REGISTER_FOR_EVENT = gql`
  mutation RegisterForEvent($eventId: ID!, $notes: String) {
    registerForEvent(eventId: $eventId, notes: $notes) {
      id
      status
      registration_date
    }
  }
`

export default function PublicEventPage() {
  const params = useParams()
  const router = useRouter()
  const slug = params?.slug as string
  const { authenticated, login, ready } = usePrivy()
  const [showShareToast, setShowShareToast] = useState(false)
  const [pendingJoin, setPendingJoin] = useState(false)

  const { data, loading, error, refetch } = useQuery(GET_PUBLIC_EVENT, {
    variables: { slug },
    skip: !slug,
  })

  const [registerForEvent, { loading: registering }] = useMutation(REGISTER_FOR_EVENT, {
    onCompleted: () => {
      refetch()
    },
  })

  const event = data?.publicEvent

  // Handle auto-join after login
  useEffect(() => {
    if (pendingJoin && authenticated && event && !event.is_registered) {
      handleJoinEvent()
      setPendingJoin(false)
    }
  }, [authenticated, pendingJoin, event])

  // Check URL for pending join parameter
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search)
      if (urlParams.get('join') === 'true') {
        setPendingJoin(true)
        // Clean up URL
        window.history.replaceState({}, '', window.location.pathname)
      }
    }
  }, [])

  const handleJoinEvent = async () => {
    if (!authenticated) {
      // Store intent to join, then trigger login
      setPendingJoin(true)
      // Store the current URL with join intent in localStorage
      localStorage.setItem('pendingEventJoin', slug)
      login()
      return
    }

    try {
      await registerForEvent({
        variables: { eventId: event.id },
      })
    } catch (err) {
      console.error('Failed to register:', err)
    }
  }

  const handleShare = async () => {
    const url = window.location.href
    if (navigator.share) {
      try {
        await navigator.share({
          title: event?.title,
          text: event?.description || `Check out this event: ${event?.title}`,
          url,
        })
      } catch (err) {
        // User cancelled or error
      }
    } else {
      // Fallback to clipboard
      await navigator.clipboard.writeText(url)
      setShowShareToast(true)
      setTimeout(() => setShowShareToast(false), 2000)
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  const formatTime = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming':
        return 'bg-green-500/20 text-green-400 border-green-500/30'
      case 'ongoing':
        return 'bg-purple-500/20 text-purple-400 border-purple-500/30'
      case 'past':
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30'
      case 'cancelled':
        return 'bg-red-500/20 text-red-400 border-red-500/30'
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30'
    }
  }

  if (loading || !ready) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500" />
      </div>
    )
  }

  if (error || !event) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Event Not Found</h1>
          <p className="text-gray-400 mb-6">This event may be private or no longer available.</p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg text-white transition-colors"
          >
            <FiArrowLeft />
            Go Home
          </Link>
        </div>
      </div>
    )
  }

  const isFull = event.max_capacity && event.registration_count >= event.max_capacity
  const isPast = event.status === 'past'
  const isCancelled = event.status === 'cancelled'
  const canJoin = !event.is_registered && !isFull && !isPast && !isCancelled

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900">
      {/* Toast notification */}
      {showShareToast && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg z-50"
        >
          Link copied to clipboard!
        </motion.div>
      )}

      {/* Header */}
      <header className="border-b border-white/10 bg-black/30 backdrop-blur-lg sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-white hover:text-purple-400 transition-colors">
            <FiArrowLeft />
            <span className="font-semibold">DANZ</span>
          </Link>
          <button
            onClick={handleShare}
            className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-white transition-colors"
          >
            <FiShare2 />
            Share
          </button>
        </div>
      </header>

      {/* Hero Image */}
      {event.image_url && (
        <div className="relative h-64 sm:h-80 lg:h-96 w-full">
          <Image
            src={event.image_url}
            alt={event.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent" />
        </div>
      )}

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 -mt-20 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-800/50 backdrop-blur-lg rounded-2xl border border-white/10 overflow-hidden"
        >
          {/* Event Header */}
          <div className="p-6 sm:p-8 border-b border-white/10">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(event.status)}`}>
                {event.status?.charAt(0).toUpperCase() + event.status?.slice(1)}
              </span>
              {event.category && (
                <span className="px-3 py-1 rounded-full text-sm font-medium bg-purple-500/20 text-purple-400 border border-purple-500/30">
                  {event.category}
                </span>
              )}
              {event.is_virtual && (
                <span className="px-3 py-1 rounded-full text-sm font-medium bg-blue-500/20 text-blue-400 border border-blue-500/30 flex items-center gap-1">
                  <FiVideo className="w-3 h-3" />
                  Virtual
                </span>
              )}
            </div>

            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">{event.title}</h1>

            {/* Organizer */}
            {event.facilitator && (
              <div className="flex items-center gap-3 mb-6">
                {event.facilitator.avatar_url ? (
                  <Image
                    src={event.facilitator.avatar_url}
                    alt={event.facilitator.display_name || event.facilitator.username}
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-purple-500/30 flex items-center justify-center text-purple-400 font-bold">
                    {(event.facilitator.display_name || event.facilitator.username)?.charAt(0).toUpperCase()}
                  </div>
                )}
                <div>
                  <p className="text-sm text-gray-400">Hosted by</p>
                  <p className="text-white font-medium">
                    {event.facilitator.display_name || event.facilitator.username}
                  </p>
                </div>
              </div>
            )}

            {/* Key Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-start gap-3 text-gray-300">
                <FiCalendar className="w-5 h-5 text-purple-400 mt-0.5" />
                <div>
                  <p className="font-medium">{formatDate(event.start_date_time)}</p>
                  <p className="text-sm text-gray-400">
                    {formatTime(event.start_date_time)} - {formatTime(event.end_date_time)}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 text-gray-300">
                <FiMapPin className="w-5 h-5 text-purple-400 mt-0.5" />
                <div>
                  <p className="font-medium">{event.location_name}</p>
                  {event.location_address && (
                    <p className="text-sm text-gray-400">{event.location_address}</p>
                  )}
                  {event.location_city && (
                    <p className="text-sm text-gray-400">{event.location_city}</p>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-3 text-gray-300">
                <FiUsers className="w-5 h-5 text-purple-400" />
                <div>
                  <p className="font-medium">
                    {event.registration_count || 0}
                    {event.max_capacity && ` / ${event.max_capacity}`} attending
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 text-gray-300">
                <FiDollarSign className="w-5 h-5 text-purple-400" />
                <p className="font-medium">
                  {event.price_usd ? `$${event.price_usd.toFixed(2)}` : 'Free'}
                </p>
              </div>
            </div>
          </div>

          {/* Description */}
          {event.description && (
            <div className="p-6 sm:p-8 border-b border-white/10">
              <h2 className="text-xl font-semibold text-white mb-4">About this event</h2>
              <p className="text-gray-300 whitespace-pre-wrap leading-relaxed">{event.description}</p>
            </div>
          )}

          {/* Dance Styles */}
          {event.dance_styles && event.dance_styles.length > 0 && (
            <div className="p-6 sm:p-8 border-b border-white/10">
              <h2 className="text-xl font-semibold text-white mb-4">Dance Styles</h2>
              <div className="flex flex-wrap gap-2">
                {event.dance_styles.map((style: string) => (
                  <span
                    key={style}
                    className="px-3 py-1.5 rounded-full text-sm bg-white/10 text-gray-300 border border-white/10"
                  >
                    {style}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Join Button */}
          <div className="p-6 sm:p-8 bg-black/20">
            {event.is_registered ? (
              <div className="flex items-center justify-center gap-3 py-4 px-6 bg-green-500/20 rounded-xl border border-green-500/30">
                <FiCheck className="w-6 h-6 text-green-400" />
                <span className="text-lg font-semibold text-green-400">You&apos;re registered!</span>
              </div>
            ) : isFull ? (
              <div className="text-center py-4 px-6 bg-gray-700/50 rounded-xl">
                <p className="text-gray-400 font-medium">This event is full</p>
              </div>
            ) : isPast ? (
              <div className="text-center py-4 px-6 bg-gray-700/50 rounded-xl">
                <p className="text-gray-400 font-medium">This event has ended</p>
              </div>
            ) : isCancelled ? (
              <div className="text-center py-4 px-6 bg-red-500/20 rounded-xl border border-red-500/30">
                <p className="text-red-400 font-medium">This event has been cancelled</p>
              </div>
            ) : (
              <button
                onClick={handleJoinEvent}
                disabled={registering}
                className="w-full py-4 px-6 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-xl text-white font-semibold text-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {registering ? (
                  <>
                    <FiLoader className="w-5 h-5 animate-spin" />
                    Joining...
                  </>
                ) : (
                  <>
                    Join Event
                    {event.price_usd ? ` - $${event.price_usd.toFixed(2)}` : ' - Free'}
                  </>
                )}
              </button>
            )}

            {!authenticated && canJoin && (
              <p className="text-center text-sm text-gray-400 mt-3">
                You&apos;ll need to sign in to join this event
              </p>
            )}
          </div>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 mt-16 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-400 text-sm">
          <p>Powered by DANZ - Dance to Earn</p>
        </div>
      </footer>
    </div>
  )
}
