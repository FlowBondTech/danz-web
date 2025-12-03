'use client'

import { motion } from 'motion/react'
import { FiCalendar, FiMapPin, FiCheck, FiArrowRight } from 'react-icons/fi'

interface DanzEvent {
  id: string
  title: string
  date: string
  location: string
  description: string
  status: 'past' | 'upcoming' | 'tbd'
  lumaUrl?: string
}

const PAST_EVENTS: DanzEvent[] = [
  {
    id: '1',
    title: 'DanzConnect at DevConnect',
    date: 'November 21, 2025',
    location: 'Buenos Aires, Argentina',
    description: 'Our inaugural community event at DevConnect Buenos Aires. Thank you to everyone who joined us for this amazing launch!',
    status: 'past',
    lumaUrl: 'https://lu.ma/evt-AnQDBwnz36mhqSN',
  },
]

const UPCOMING_EVENTS: DanzEvent[] = [
  {
    id: '2',
    title: 'DANZ Austin',
    date: 'TBD',
    location: 'Austin, TX',
    description: 'Join us in Austin for our next community gathering. Details coming soon!',
    status: 'tbd',
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
            Community <span className="gradient-text">Events</span>
          </h2>
          <p className="text-xl text-text-secondary max-w-2xl mx-auto">
            Connect with the DANZ community at our events and workshops
          </p>
        </motion.div>
      )}

      <div className="max-w-4xl mx-auto space-y-12">
        {/* Upcoming Events */}
        <div>
          <motion.h3
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-2xl font-bold text-text-primary mb-6 flex items-center gap-3"
          >
            <span className="w-2 h-2 rounded-full bg-neon-purple animate-pulse" />
            Upcoming Events
          </motion.h3>

          <div className="space-y-4">
            {UPCOMING_EVENTS.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative bg-gradient-to-br from-neon-purple/10 via-bg-card/80 to-neon-pink/10 backdrop-blur-sm border border-neon-purple/30 rounded-2xl p-6 md:p-8 overflow-hidden hover:border-neon-purple/50 transition-all"
              >
                {/* Animated background glow */}
                <div className="absolute inset-0 bg-gradient-to-r from-neon-purple/5 to-neon-pink/5 opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="relative z-10">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="px-3 py-1 bg-neon-purple/20 text-neon-purple text-xs font-medium rounded-full border border-neon-purple/30">
                          Coming Soon
                        </span>
                      </div>

                      <h4 className="text-2xl md:text-3xl font-bold text-text-primary mb-2 group-hover:text-neon-purple transition-colors">
                        {event.title}
                      </h4>

                      <p className="text-text-secondary mb-4">
                        {event.description}
                      </p>

                      <div className="flex flex-wrap items-center gap-4 text-sm">
                        <div className="flex items-center gap-2 text-text-secondary">
                          <FiCalendar className="text-neon-purple" />
                          <span>{event.date}</span>
                        </div>
                        <div className="flex items-center gap-2 text-text-secondary">
                          <FiMapPin className="text-neon-pink" />
                          <span>{event.location}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-neon-purple font-medium group-hover:gap-3 transition-all">
                      <span className="text-sm">Stay Tuned</span>
                      <FiArrowRight className="animate-pulse" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Past Events */}
        <div>
          <motion.h3
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-2xl font-bold text-text-primary mb-6 flex items-center gap-3"
          >
            <FiCheck className="text-green-400" />
            Past Events
          </motion.h3>

          <div className="space-y-4">
            {PAST_EVENTS.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative bg-bg-card/50 backdrop-blur-sm border border-white/10 rounded-2xl p-6 md:p-8 overflow-hidden"
              >
                {/* Success overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent pointer-events-none" />

                <div className="relative z-10">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="px-3 py-1 bg-green-500/20 text-green-400 text-xs font-medium rounded-full border border-green-500/30 flex items-center gap-1.5">
                          <FiCheck size={12} />
                          Launch Success!
                        </span>
                      </div>

                      <h4 className="text-xl md:text-2xl font-bold text-text-primary mb-2">
                        {event.title}
                      </h4>

                      <p className="text-text-secondary mb-4">
                        {event.description}
                      </p>

                      <div className="flex flex-wrap items-center gap-4 text-sm">
                        <div className="flex items-center gap-2 text-text-secondary">
                          <FiCalendar className="text-green-400" />
                          <span>{event.date}</span>
                        </div>
                        <div className="flex items-center gap-2 text-text-secondary">
                          <FiMapPin className="text-green-400" />
                          <span>{event.location}</span>
                        </div>
                      </div>
                    </div>

                    {event.lumaUrl && (
                      <a
                        href={event.lumaUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-text-secondary hover:text-text-primary transition-all text-sm"
                      >
                        <span>View Event</span>
                        <FiArrowRight size={14} />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
