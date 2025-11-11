'use client'

import { motion } from 'motion/react'

interface LumaEvent {
  id: string
  eventId: string
  title: string
}

const UPCOMING_EVENTS: LumaEvent[] = [
  {
    id: '1',
    eventId: 'evt-AnQDBwnz36mhqSN',
    title: 'DANZ Community Event',
  },
]

interface UpcomingEventsGridProps {
  showTitle?: boolean
}

export default function UpcomingEventsGrid({ showTitle = false }: UpcomingEventsGridProps) {
  return (
    <div>
      {showTitle && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-neon-purple text-sm font-medium uppercase tracking-wider mb-4 block">
            Join Us
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-4">
            Upcoming <span className="gradient-text">Events</span>
          </h2>
          <p className="text-xl text-text-secondary max-w-2xl mx-auto">
            Connect with the DANZ community at our upcoming events and workshops
          </p>
        </motion.div>
      )}

      <div className="max-w-4xl mx-auto space-y-6">
        {UPCOMING_EVENTS.map((event, index) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: index * 0.1 }}
            className="bg-bg-card/50 backdrop-blur-sm border border-white/10 rounded-3xl p-4 md:p-6 overflow-hidden"
          >
            <iframe
              src={`https://lu.ma/embed/event/${event.eventId}/simple`}
              width="100%"
              height="600"
              frameBorder="0"
              style={{
                border: '1px solid rgba(191, 203, 218, 0.53)',
                borderRadius: '12px',
              }}
              allow="fullscreen; payment"
              aria-hidden="false"
              title={event.title}
            />
          </motion.div>
        ))}
      </div>
    </div>
  )
}
