'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import {
  FiGrid,
  FiCalendar,
  FiMap,
  FiPlus,
  FiFileText,
  FiClock,
  FiTrendingUp,
  FiFilter,
  FiSearch,
  FiX,
  FiDollarSign,
  FiMapPin,
  FiCheck,
} from 'react-icons/fi'
import { usePrivy } from '@privy-io/react-auth'
import DashboardLayout from '@/src/components/dashboard/DashboardLayout'
import OrganizerApplicationForm from '@/src/components/dashboard/OrganizerApplicationForm'
import GamificationBar from '@/src/components/events/GamificationBar'
import EventCreationWizard from '@/src/components/events/EventCreationWizard'
import EventsGridView from '@/src/components/events/EventsGridView'
import EventsCalendarView from '@/src/components/events/EventsCalendarView'
import EventsMapView from '@/src/components/events/EventsMapView'
import Leaderboard from '@/src/components/events/Leaderboard'
import {
  useGetEventsQuery,
  useRegisterForEventMutation,
  useGetMyProfileQuery,
  EventStatus,
} from '@/src/generated/graphql'

type ViewMode = 'grid' | 'calendar' | 'map'

// Mock leaderboard data (in production, fetch from API)
const MOCK_LEADERBOARD = [
  { id: '1', username: 'dancequeen', display_name: 'Sarah M.', xp: 4250, level: 8, events_created: 12, events_attended: 45, streak: 14 },
  { id: '2', username: 'groovyking', display_name: 'Marcus J.', xp: 3890, level: 7, events_created: 8, events_attended: 52, streak: 21 },
  { id: '3', username: 'salsafire', display_name: 'Elena R.', xp: 3450, level: 7, events_created: 15, events_attended: 38, streak: 7 },
  { id: '4', username: 'hiphopdreams', display_name: 'Tyler W.', xp: 2980, level: 6, events_created: 5, events_attended: 42, streak: 0 },
  { id: '5', username: 'balletrose', display_name: 'Lily C.', xp: 2650, level: 5, events_created: 3, events_attended: 35, streak: 5 },
  { id: '6', username: 'jazzyhands', display_name: 'Mike D.', xp: 2340, level: 5, events_created: 7, events_attended: 28, streak: 3 },
  { id: '7', username: 'breakdancer', display_name: 'Carlos G.', xp: 1980, level: 4, events_created: 2, events_attended: 31, streak: 0 },
]

export default function EventsPage() {
  const { authenticated } = usePrivy()
  const [viewMode, setViewMode] = useState<ViewMode>('grid')
  const [showCreateWizard, setShowCreateWizard] = useState(false)
  const [showApplicationForm, setShowApplicationForm] = useState(false)
  const [showLeaderboard, setShowLeaderboard] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState<any>(null)
  const [registrationNotes, setRegistrationNotes] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const { data: profileData, refetch: refetchProfile } = useGetMyProfileQuery({
    skip: !authenticated,
  })

  const { data: eventsData, loading, refetch } = useGetEventsQuery({
    variables: {
      filter: {
        status: EventStatus.Upcoming,
      },
      pagination: {
        limit: 50,
      },
    },
  })

  const [registerForEvent] = useRegisterForEventMutation({
    onCompleted: () => {
      setSelectedEvent(null)
      setRegistrationNotes('')
      refetch()
    },
  })

  // Check permissions
  const userRole = profileData?.me?.role
  const isApprovedOrganizer = profileData?.me?.is_organizer_approved
  const canCreateEvents =
    userRole === 'admin' || userRole === 'manager' || (userRole === 'organizer' && isApprovedOrganizer)
  const needsApproval = userRole === 'organizer' && !isApprovedOrganizer
  const canApplyToOrganize = !canCreateEvents && authenticated

  // Gamification stats (TODO: Add these fields to GraphQL schema)
  // For now using mock data, in production fetch from profile API
  const gamificationStats = {
    xp: 850,
    level: 3,
    eventsCreated: 2,
    eventsAttended: 8,
    streak: 5,
  }

  const events = eventsData?.events?.events || []

  // Filter events
  const filteredEvents = events.filter(event => {
    const matchesSearch =
      !searchQuery ||
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.location_city?.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = !selectedCategory || event.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const handleRegister = async (event: any) => {
    setSelectedEvent(event)
  }

  const handleConfirmRegistration = async () => {
    if (selectedEvent) {
      await registerForEvent({
        variables: {
          eventId: selectedEvent.id,
          notes: registrationNotes || null,
        },
      })
    }
  }

  const handleEventCreated = () => {
    setShowCreateWizard(false)
    refetch()
    refetchProfile()
  }

  const CATEGORIES = [
    { value: 'class', label: 'Class', emoji: '💃' },
    { value: 'social', label: 'Social', emoji: '🎉' },
    { value: 'workshop', label: 'Workshop', emoji: '📚' },
    { value: 'competition', label: 'Competition', emoji: '🏆' },
    { value: 'performance', label: 'Performance', emoji: '🎭' },
    { value: 'fitness', label: 'Fitness', emoji: '💪' },
  ]

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        {/* Gamification Bar */}
        {authenticated && (
          <GamificationBar
            xp={gamificationStats.xp}
            level={gamificationStats.level}
            eventsCreated={gamificationStats.eventsCreated}
            eventsAttended={gamificationStats.eventsAttended}
            streak={gamificationStats.streak}
          />
        )}

        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-display font-bold text-text-primary mb-2">
              Dance Events
            </h1>
            <p className="text-text-secondary">
              Discover, join, and create amazing dance experiences
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Leaderboard Toggle */}
            <button
              onClick={() => setShowLeaderboard(!showLeaderboard)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                showLeaderboard
                  ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                  : 'bg-white/5 text-text-secondary hover:bg-white/10'
              }`}
            >
              <FiTrendingUp className="w-5 h-5" />
              <span className="hidden sm:inline">Leaderboard</span>
            </button>

            {/* Create Event Button */}
            {canCreateEvents ? (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowCreateWizard(true)}
                className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-neon-purple to-neon-pink text-white rounded-xl font-medium shadow-lg shadow-neon-purple/30 hover:shadow-neon-purple/40 transition-shadow"
              >
                <FiPlus className="w-5 h-5" />
                Create Event
                <span className="hidden sm:inline text-xs bg-white/20 px-2 py-0.5 rounded-full">
                  +100 XP
                </span>
              </motion.button>
            ) : needsApproval ? (
              <button
                onClick={() => setShowApplicationForm(true)}
                className="flex items-center gap-2 px-4 py-2 bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 rounded-lg hover:bg-yellow-500/30 transition-colors"
              >
                <FiClock className="w-5 h-5" />
                Approval Pending
              </button>
            ) : canApplyToOrganize ? (
              <button
                onClick={() => setShowApplicationForm(true)}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-neon-purple to-neon-blue text-white rounded-lg hover:opacity-90 transition-opacity"
              >
                <FiFileText className="w-5 h-5" />
                Apply to Organize
              </button>
            ) : null}
          </div>
        </div>

        {/* Filters and View Modes */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          {/* Search and Category Filter */}
          <div className="flex flex-1 items-center gap-3 w-full sm:w-auto">
            <div className="relative flex-1 sm:flex-initial sm:w-64">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search events..."
                className="w-full pl-10 pr-4 py-2.5 bg-bg-secondary rounded-xl border border-white/10 focus:border-neon-purple/50 focus:outline-none text-white"
              />
            </div>

            <div className="relative">
              <select
                value={selectedCategory || ''}
                onChange={e => setSelectedCategory(e.target.value || null)}
                className="appearance-none pl-4 pr-10 py-2.5 bg-bg-secondary rounded-xl border border-white/10 focus:border-neon-purple/50 focus:outline-none text-white cursor-pointer"
              >
                <option value="">All Categories</option>
                {CATEGORIES.map(cat => (
                  <option key={cat.value} value={cat.value}>
                    {cat.emoji} {cat.label}
                  </option>
                ))}
              </select>
              <FiFilter className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary pointer-events-none" />
            </div>
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center gap-1 p-1 bg-bg-secondary rounded-xl border border-white/10">
            {[
              { mode: 'grid' as ViewMode, icon: FiGrid, label: 'Grid' },
              { mode: 'calendar' as ViewMode, icon: FiCalendar, label: 'Calendar' },
              { mode: 'map' as ViewMode, icon: FiMap, label: 'Map' },
            ].map(({ mode, icon: Icon, label }) => (
              <button
                key={mode}
                onClick={() => setViewMode(mode)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  viewMode === mode
                    ? 'bg-neon-purple text-white'
                    : 'text-text-secondary hover:text-white hover:bg-white/10'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="hidden sm:inline text-sm">{label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Main Content Grid */}
        <div className={`grid gap-6 ${showLeaderboard ? 'lg:grid-cols-4' : 'lg:grid-cols-1'}`}>
          {/* Events Section */}
          <div className={showLeaderboard ? 'lg:col-span-3' : ''}>
            {viewMode === 'grid' && (
              <EventsGridView
                events={filteredEvents as any}
                onRegister={handleRegister}
                isLoading={loading}
              />
            )}

            {viewMode === 'calendar' && (
              <EventsCalendarView
                events={filteredEvents as any}
                onRegister={handleRegister}
                onEventClick={setSelectedEvent}
              />
            )}

            {viewMode === 'map' && (
              <EventsMapView events={filteredEvents as any} onRegister={handleRegister} />
            )}
          </div>

          {/* Leaderboard Sidebar */}
          <AnimatePresence>
            {showLeaderboard && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="lg:col-span-1"
              >
                <Leaderboard
                  users={MOCK_LEADERBOARD}
                  currentUserId={profileData?.me?.privy_id}
                  variant="compact"
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Event Creation Wizard Modal */}
        <EventCreationWizard
          isOpen={showCreateWizard}
          onClose={() => setShowCreateWizard(false)}
          onSuccess={handleEventCreated}
        />

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
                className="bg-bg-secondary rounded-2xl border border-neon-purple/20 p-6 max-w-md w-full"
                onClick={e => e.stopPropagation()}
              >
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-xl font-bold text-text-primary">Join Event</h3>
                  <button
                    onClick={() => setSelectedEvent(null)}
                    className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                  >
                    <FiX className="w-5 h-5" />
                  </button>
                </div>

                <div className="bg-bg-primary rounded-xl p-4 mb-4">
                  <h4 className="font-bold text-white mb-2">{selectedEvent.title}</h4>
                  <div className="space-y-2 text-sm text-text-secondary">
                    <div className="flex items-center gap-2">
                      <FiCalendar className="w-4 h-4 text-neon-purple" />
                      {new Date(selectedEvent.start_date_time).toLocaleDateString('en-US', {
                        weekday: 'long',
                        month: 'long',
                        day: 'numeric',
                        hour: 'numeric',
                        minute: '2-digit',
                      })}
                    </div>
                    <div className="flex items-center gap-2">
                      <FiMapPin className="w-4 h-4 text-neon-purple" />
                      {selectedEvent.is_virtual
                        ? 'Virtual Event'
                        : selectedEvent.location_name || selectedEvent.location_city}
                    </div>
                    {selectedEvent.price_usd > 0 && (
                      <div className="flex items-center gap-2">
                        <FiDollarSign className="w-4 h-4 text-green-400" />
                        <span className="text-green-400">${selectedEvent.price_usd}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* XP Reward Preview */}
                <div className="flex items-center justify-center gap-2 p-3 bg-neon-purple/10 border border-neon-purple/20 rounded-xl mb-4">
                  <span className="text-yellow-500">+25 XP</span>
                  <span className="text-text-secondary">for joining this event!</span>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-text-secondary mb-2">
                    Additional Notes (Optional)
                  </label>
                  <textarea
                    value={registrationNotes}
                    onChange={e => setRegistrationNotes(e.target.value)}
                    className="w-full bg-bg-primary text-text-primary rounded-xl px-4 py-3 border border-white/10 focus:border-neon-purple/50 focus:outline-none resize-none"
                    rows={3}
                    placeholder="Any dietary restrictions, special requirements..."
                  />
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setSelectedEvent(null)}
                    className="flex-1 py-3 bg-white/10 text-white rounded-xl hover:bg-white/20 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleConfirmRegistration}
                    className="flex-1 py-3 bg-gradient-to-r from-neon-purple to-neon-pink text-white rounded-xl hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                  >
                    <FiCheck className="w-5 h-5" />
                    Confirm
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Organizer Application Modal */}
        <OrganizerApplicationForm
          isOpen={showApplicationForm}
          onClose={() => setShowApplicationForm(false)}
          onSuccess={() => {
            refetchProfile()
          }}
        />
      </div>
    </DashboardLayout>
  )
}
