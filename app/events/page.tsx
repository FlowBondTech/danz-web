'use client'

import { useState } from 'react'
import { useQuery } from '@apollo/client'
import { gql } from '@apollo/client'
import { motion } from 'motion/react'
import Link from 'next/link'
import Image from 'next/image'
import {
  FiMapPin,
  FiCalendar,
  FiUsers,
  FiDollarSign,
  FiSearch,
  FiFilter,
  FiVideo,
  FiArrowRight,
} from 'react-icons/fi'

const GET_PUBLIC_EVENTS = gql`
  query GetPublicEvents($filter: EventFilterInput, $pagination: PaginationInput, $sortBy: EventSortBy) {
    events(filter: $filter, pagination: $pagination, sortBy: $sortBy) {
      events {
        id
        title
        description
        category
        dance_styles
        skill_level
        location_name
        location_city
        is_virtual
        start_date_time
        end_date_time
        price_usd
        max_capacity
        registration_count
        status
        image_url
        slug
        is_public
        facilitator {
          display_name
          username
          avatar_url
        }
      }
      totalCount
      pageInfo {
        hasNextPage
      }
    }
  }
`

const CATEGORIES = [
  { value: '', label: 'All Categories' },
  { value: 'class', label: 'Dance Class' },
  { value: 'social', label: 'Social Dance' },
  { value: 'workshop', label: 'Workshop' },
  { value: 'competition', label: 'Competition' },
  { value: 'performance', label: 'Performance' },
  { value: 'fitness', label: 'Dance Fitness' },
]

export default function PublicEventsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [showFilters, setShowFilters] = useState(false)

  const { data, loading, error } = useQuery(GET_PUBLIC_EVENTS, {
    variables: {
      filter: {
        category: selectedCategory || undefined,
        status: 'upcoming',
      },
      pagination: { limit: 50 },
      sortBy: 'date_asc',
    },
  })

  const events = data?.events?.events?.filter((event: any) => {
    // Only show public events
    if (!event.is_public) return false
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      return (
        event.title?.toLowerCase().includes(query) ||
        event.description?.toLowerCase().includes(query) ||
        event.location_city?.toLowerCase().includes(query) ||
        event.dance_styles?.some((style: string) => style.toLowerCase().includes(query))
      )
    }
    return true
  }) || []

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
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
        return 'bg-green-500/20 text-green-400'
      case 'ongoing':
        return 'bg-purple-500/20 text-purple-400'
      default:
        return 'bg-gray-500/20 text-gray-400'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900">
      {/* Header */}
      <header className="border-b border-white/10 bg-black/30 backdrop-blur-lg sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-white hover:text-purple-400 transition-colors">
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              DANZ
            </span>
          </Link>
          <Link
            href="/login"
            className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-white font-medium transition-colors"
          >
            Sign In
          </Link>
        </div>
      </header>

      {/* Hero */}
      <div className="bg-gradient-to-b from-purple-900/30 to-transparent py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Discover Dance Events
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Find and join amazing dance events near you. From salsa socials to hip-hop workshops.
          </p>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search events, locations, dance styles..."
              className="w-full bg-white/5 text-white rounded-xl pl-12 pr-4 py-3 border border-white/10 focus:border-purple-500/50 focus:outline-none placeholder-gray-500"
            />
          </div>

          {/* Category Filter */}
          <div className="flex gap-3">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-white/5 text-white rounded-xl px-4 py-3 border border-white/10 focus:border-purple-500/50 focus:outline-none"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat.value} value={cat.value} className="bg-gray-900">
                  {cat.label}
                </option>
              ))}
            </select>

            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-4 py-3 rounded-xl border transition-colors ${
                showFilters
                  ? 'bg-purple-500/20 border-purple-500/50 text-purple-400'
                  : 'bg-white/5 border-white/10 text-gray-400 hover:text-white'
              }`}
            >
              <FiFilter className="w-5 h-5" />
              <span className="hidden sm:inline">Filters</span>
            </button>
          </div>
        </div>
      </div>

      {/* Events Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500" />
          </div>
        ) : error ? (
          <div className="text-center py-20">
            <p className="text-red-400">Failed to load events. Please try again.</p>
          </div>
        ) : events.length === 0 ? (
          <div className="text-center py-20">
            <h2 className="text-2xl font-bold text-white mb-4">No events found</h2>
            <p className="text-gray-400 mb-8">
              {searchQuery || selectedCategory
                ? 'Try adjusting your filters'
                : 'Check back soon for upcoming dance events!'}
            </p>
          </div>
        ) : (
          <>
            <p className="text-gray-400 mb-6">{events.length} events found</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.map((event: any, index: number) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    href={`/events/${event.slug}`}
                    className="block bg-gray-800/50 backdrop-blur-lg rounded-2xl border border-white/10 overflow-hidden hover:border-purple-500/50 transition-all duration-300 group"
                  >
                    {/* Image */}
                    {event.image_url ? (
                      <div className="relative h-48 overflow-hidden">
                        <Image
                          src={event.image_url}
                          alt={event.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent" />
                        <div className="absolute top-3 right-3">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(event.status)}`}>
                            {event.status}
                          </span>
                        </div>
                      </div>
                    ) : (
                      <div className="relative h-48 bg-gradient-to-br from-purple-600/30 to-pink-600/30 flex items-center justify-center">
                        <span className="text-6xl">💃</span>
                        <div className="absolute top-3 right-3">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(event.status)}`}>
                            {event.status}
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Content */}
                    <div className="p-5">
                      <div className="flex flex-wrap gap-2 mb-3">
                        {event.category && (
                          <span className="px-2 py-1 rounded-full text-xs font-medium bg-purple-500/20 text-purple-400">
                            {event.category}
                          </span>
                        )}
                        {event.is_virtual && (
                          <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-500/20 text-blue-400 flex items-center gap-1">
                            <FiVideo className="w-3 h-3" />
                            Virtual
                          </span>
                        )}
                      </div>

                      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-400 transition-colors">
                        {event.title}
                      </h3>

                      <div className="space-y-2 text-sm text-gray-400 mb-4">
                        <div className="flex items-center gap-2">
                          <FiCalendar className="w-4 h-4 text-purple-400" />
                          <span>{formatDate(event.start_date_time)} at {formatTime(event.start_date_time)}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <FiMapPin className="w-4 h-4 text-purple-400" />
                          <span>{event.location_name}{event.location_city ? `, ${event.location_city}` : ''}</span>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1">
                            <FiUsers className="w-4 h-4 text-purple-400" />
                            <span>
                              {event.registration_count || 0}
                              {event.max_capacity ? `/${event.max_capacity}` : ''} going
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <FiDollarSign className="w-4 h-4 text-purple-400" />
                            <span>{event.price_usd ? `$${event.price_usd}` : 'Free'}</span>
                          </div>
                        </div>
                      </div>

                      {/* Organizer */}
                      {event.facilitator && (
                        <div className="flex items-center gap-2 pt-4 border-t border-white/10">
                          {event.facilitator.avatar_url ? (
                            <Image
                              src={event.facilitator.avatar_url}
                              alt={event.facilitator.display_name || event.facilitator.username}
                              width={24}
                              height={24}
                              className="rounded-full"
                            />
                          ) : (
                            <div className="w-6 h-6 rounded-full bg-purple-500/30 flex items-center justify-center text-purple-400 text-xs font-bold">
                              {(event.facilitator.display_name || event.facilitator.username)?.charAt(0).toUpperCase()}
                            </div>
                          )}
                          <span className="text-sm text-gray-400">
                            by {event.facilitator.display_name || event.facilitator.username}
                          </span>
                        </div>
                      )}

                      <div className="flex items-center justify-end mt-4 text-purple-400 text-sm font-medium group-hover:gap-2 transition-all">
                        View Details <FiArrowRight className="w-4 h-4 ml-1" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-400 text-sm">
          <p>Powered by DANZ - Dance to Earn</p>
        </div>
      </footer>
    </div>
  )
}
