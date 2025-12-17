'use client'

import Footer from '@/src/components/Footer'
import Layout from '@/src/components/Layout'
import Navbar from '@/src/components/Navbar'
import { motion } from 'motion/react'
import {
  FiActivity,
  FiAward,
  FiBarChart2,
  FiBox,
  FiCalendar,
  FiCode,
  FiCpu,
  FiGift,
  FiGlobe,
  FiHeart,
  FiLayers,
  FiMap,
  FiMessageCircle,
  FiMusic,
  FiRadio,
  FiShield,
  FiStar,
  FiTarget,
  FiTrendingUp,
  FiUsers,
  FiVideo,
  FiZap,
} from 'react-icons/fi'

// Platform capabilities from backend analysis
const platformCapabilities = [
  {
    category: 'User & Social',
    status: 'ready',
    items: ['User Profiles', 'Dance Bonds', 'Social Feed', 'Comments & Likes', 'Referral System'],
  },
  {
    category: 'Events',
    status: 'ready',
    items: ['Event CRUD', 'Registration', 'Check-in', 'Discovery', 'Recurring Events'],
  },
  {
    category: 'Gamification',
    status: 'partial',
    items: ['Challenges', 'Leaderboards', 'Points System', 'Achievements'],
  },
  {
    category: 'Data & Analytics',
    status: 'partial',
    items: ['User Analytics', 'Event Metrics', 'Wearable Sync', 'Activity Tracking'],
  },
]

// Mini-app ideas organized by category
const miniAppIdeas = [
  {
    category: 'Dance & Movement',
    icon: FiActivity,
    gradient: 'from-purple-500 to-pink-500',
    apps: [
      {
        name: 'Battle Arena',
        description: 'Real-time dance battles with live voting and bracket tournaments',
        icon: FiZap,
        status: 'concept',
        features: ['Live streaming', 'Audience voting', 'Tournament brackets', 'Prize pools'],
        apis: ['Events', 'Leaderboards', 'Points', 'Social Feed'],
      },
      {
        name: 'Rhythm Trainer',
        description: 'AI-powered rhythm analysis and personalized training exercises',
        icon: FiMusic,
        status: 'concept',
        features: ['BPM detection', 'Movement scoring', 'Progress tracking', 'Daily drills'],
        apis: ['Wearables', 'Challenges', 'Achievements', 'Analytics'],
      },
      {
        name: 'Style Lab',
        description: 'Learn and master different dance styles with community tutorials',
        icon: FiVideo,
        status: 'concept',
        features: ['Video tutorials', 'Style progression', 'Community submissions', 'Certification'],
        apis: ['User Profiles', 'Challenges', 'Social Feed', 'Points'],
      },
      {
        name: 'Freestyle Mode',
        description: 'Free dance sessions with movement tracking and personal records',
        icon: FiRadio,
        status: 'partial',
        features: ['Session tracking', 'Movement analysis', 'Personal bests', 'Share highlights'],
        apis: ['Freestyle Sessions', 'Wearables', 'Social Feed', 'Achievements'],
      },
    ],
  },
  {
    category: 'Social & Community',
    icon: FiUsers,
    gradient: 'from-pink-500 to-red-500',
    apps: [
      {
        name: 'Crew Finder',
        description: 'Match with dancers by style, skill level, and location to form crews',
        icon: FiTarget,
        status: 'concept',
        features: ['Smart matching', 'Crew management', 'Practice scheduling', 'Crew battles'],
        apis: ['User Profiles', 'Dance Bonds', 'Events', 'Notifications'],
      },
      {
        name: 'Dance Map',
        description: 'Discover dancers, events, and practice spots near you',
        icon: FiMap,
        status: 'concept',
        features: ['Live dancer map', 'Venue discovery', 'Heat maps', 'Check-in rewards'],
        apis: ['Events', 'User Profiles', 'Points', 'Analytics'],
      },
      {
        name: 'Mentorship Hub',
        description: 'Connect beginners with experienced dancers for 1-on-1 guidance',
        icon: FiHeart,
        status: 'concept',
        features: ['Mentor matching', 'Session booking', 'Progress tracking', 'Reviews'],
        apis: ['User Profiles', 'Events', 'Dance Bonds', 'Referrals'],
      },
      {
        name: 'Vibe Check',
        description: 'Daily mood check-ins and community wellness tracking',
        icon: FiMessageCircle,
        status: 'concept',
        features: ['Mood logging', 'Community vibes', 'Streak rewards', 'Support circles'],
        apis: ['User Profiles', 'Points', 'Notifications', 'Analytics'],
      },
    ],
  },
  {
    category: 'Events & Competitions',
    icon: FiCalendar,
    gradient: 'from-red-500 to-orange-500',
    apps: [
      {
        name: 'Cipher Circle',
        description: 'Organize and join spontaneous street ciphers in your area',
        icon: FiGlobe,
        status: 'concept',
        features: ['Quick events', 'Location sharing', 'Live attendance', 'Replay highlights'],
        apis: ['Events', 'Notifications', 'Social Feed', 'Points'],
      },
      {
        name: 'Workshop Wizard',
        description: 'Host and discover dance workshops with booking and payments',
        icon: FiAward,
        status: 'partial',
        features: ['Workshop creation', 'Ticket sales', 'Capacity management', 'Reviews'],
        apis: ['Events', 'Payments', 'User Profiles', 'Notifications'],
      },
      {
        name: 'Competition Central',
        description: 'Full competition management with judging, brackets, and scoring',
        icon: FiTrendingUp,
        status: 'concept',
        features: ['Judge panels', 'Score tracking', 'Live brackets', 'Prize distribution'],
        apis: ['Events', 'Leaderboards', 'Points', 'Payments'],
      },
      {
        name: 'Pop-Up Parties',
        description: 'Secret location reveals for exclusive dance events',
        icon: FiStar,
        status: 'concept',
        features: ['Timed reveals', 'Invite codes', 'Exclusive access', 'FOMO alerts'],
        apis: ['Events', 'Notifications', 'Referrals', 'Points'],
      },
    ],
  },
  {
    category: 'Fitness & Health',
    icon: FiHeart,
    gradient: 'from-orange-500 to-yellow-500',
    apps: [
      {
        name: 'Dance Fit',
        description: 'Track calories, heart rate, and fitness goals through dance',
        icon: FiActivity,
        status: 'partial',
        features: ['Calorie tracking', 'Heart zones', 'Weekly goals', 'Health insights'],
        apis: ['Wearables', 'Analytics', 'Challenges', 'Achievements'],
      },
      {
        name: 'Recovery Room',
        description: 'Stretching routines and recovery tracking for dancers',
        icon: FiShield,
        status: 'concept',
        features: ['Stretch guides', 'Recovery logging', 'Injury prevention', 'Rest reminders'],
        apis: ['User Profiles', 'Wearables', 'Notifications', 'Challenges'],
      },
      {
        name: 'Move Streak',
        description: 'Daily movement challenges with streak rewards',
        icon: FiZap,
        status: 'partial',
        features: ['Daily goals', 'Streak tracking', 'Multiplier rewards', 'Friend challenges'],
        apis: ['Challenges', 'Points', 'Leaderboards', 'Notifications'],
      },
    ],
  },
  {
    category: 'Creator & Economy',
    icon: FiGift,
    gradient: 'from-yellow-500 to-green-500',
    apps: [
      {
        name: 'Tip Jar',
        description: 'Support your favorite dancers with direct tips and subscriptions',
        icon: FiGift,
        status: 'concept',
        features: ['Direct tips', 'Subscriptions', 'Exclusive content', 'Supporter badges'],
        apis: ['Payments', 'User Profiles', 'Notifications', 'Social Feed'],
      },
      {
        name: 'Merch Drop',
        description: 'Create and sell dance crew merchandise with token rewards',
        icon: FiBox,
        status: 'concept',
        features: ['Design tools', 'Print-on-demand', 'Token payments', 'Crew stores'],
        apis: ['User Profiles', 'Payments', 'Points', 'Analytics'],
      },
      {
        name: 'Gig Board',
        description: 'Find and post paid dance opportunities',
        icon: FiBarChart2,
        status: 'concept',
        features: ['Job listings', 'Applications', 'Reviews', 'Secure payments'],
        apis: ['User Profiles', 'Events', 'Payments', 'Notifications'],
      },
    ],
  },
]

// Architecture diagram data
const architectureLayers = [
  {
    name: 'Mini-Apps Layer',
    description: 'Third-party & first-party mini-applications',
    color: 'bg-purple-500/20 border-purple-500',
    items: ['Battle Arena', 'Crew Finder', 'Dance Fit', 'Style Lab', '+ More'],
  },
  {
    name: 'SDK & APIs',
    description: 'JavaScript SDK with GraphQL access',
    color: 'bg-pink-500/20 border-pink-500',
    items: ['Auth API', 'User API', 'Events API', 'Social API', 'Payments API'],
  },
  {
    name: 'Core Platform',
    description: 'DANZ backend services',
    color: 'bg-red-500/20 border-red-500',
    items: ['Users', 'Events', 'Social', 'Points', 'Analytics'],
  },
  {
    name: 'Data Layer',
    description: 'Persistent storage & real-time sync',
    color: 'bg-orange-500/20 border-orange-500',
    items: ['Supabase', 'S3 Storage', 'Wearable Sync', 'Webhooks'],
  },
]

function StatusBadge({ status }: { status: string }) {
  const config = {
    ready: { bg: 'bg-green-500/20', text: 'text-green-400', label: 'API Ready' },
    partial: { bg: 'bg-yellow-500/20', text: 'text-yellow-400', label: 'In Progress' },
    concept: { bg: 'bg-purple-500/20', text: 'text-purple-400', label: 'Concept' },
  }[status] || { bg: 'bg-gray-500/20', text: 'text-gray-400', label: status }

  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
      {config.label}
    </span>
  )
}

function MiniAppCard({ app, index }: { app: (typeof miniAppIdeas)[0]['apps'][0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className="group"
    >
      <div className="bg-bg-card border border-white/5 rounded-xl p-6 h-full relative overflow-hidden hover:border-neon-purple/30 transition-colors">
        <div className="absolute inset-0 bg-gradient-to-br from-neon-purple/5 to-neon-pink/5 opacity-0 group-hover:opacity-100 transition-opacity" />

        <div className="relative z-10">
          <div className="flex items-start justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-neon-purple to-neon-pink rounded-xl flex items-center justify-center">
              <app.icon className="w-6 h-6 text-text-primary" />
            </div>
            <StatusBadge status={app.status} />
          </div>

          <h3 className="text-xl font-bold text-text-primary mb-2">{app.name}</h3>
          <p className="text-text-secondary text-sm mb-4">{app.description}</p>

          <div className="mb-4">
            <p className="text-xs text-text-muted mb-2">Key Features:</p>
            <div className="flex flex-wrap gap-1">
              {app.features.map((feature, i) => (
                <span
                  key={i}
                  className="px-2 py-0.5 bg-white/5 rounded text-xs text-text-secondary"
                >
                  {feature}
                </span>
              ))}
            </div>
          </div>

          <div>
            <p className="text-xs text-text-muted mb-2">Uses APIs:</p>
            <div className="flex flex-wrap gap-1">
              {app.apis.map((api, i) => (
                <span
                  key={i}
                  className="px-2 py-0.5 bg-neon-purple/10 rounded text-xs text-neon-purple"
                >
                  {api}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function MiniAppsPage() {
  return (
    <Layout>
      <Navbar />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="section relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-neon-purple/10 via-transparent to-transparent" />
          <div className="container relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-4xl mx-auto"
            >
              <span className="text-neon-purple text-sm font-medium uppercase tracking-wider mb-4 block">
                DANZ Ecosystem
              </span>
              <h1 className="text-5xl md:text-6xl font-display font-bold mb-6">
                Mini-Apps <span className="gradient-text">Ideas Lab</span>
              </h1>
              <p className="text-xl text-text-secondary mb-8">
                Explore the possibilities of building on the DANZ platform. From dance battles to
                fitness tracking, see what&apos;s possible with our APIs.
              </p>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
                <div className="bg-bg-card/50 rounded-xl p-4 border border-white/5">
                  <div className="text-3xl font-bold gradient-text">15+</div>
                  <div className="text-sm text-text-muted">App Ideas</div>
                </div>
                <div className="bg-bg-card/50 rounded-xl p-4 border border-white/5">
                  <div className="text-3xl font-bold gradient-text">20+</div>
                  <div className="text-sm text-text-muted">APIs Available</div>
                </div>
                <div className="bg-bg-card/50 rounded-xl p-4 border border-white/5">
                  <div className="text-3xl font-bold gradient-text">65%</div>
                  <div className="text-sm text-text-muted">Platform Ready</div>
                </div>
                <div className="bg-bg-card/50 rounded-xl p-4 border border-white/5">
                  <div className="text-3xl font-bold gradient-text">5</div>
                  <div className="text-sm text-text-muted">Categories</div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Platform Architecture */}
        <section className="section bg-bg-secondary/50">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <span className="text-neon-pink text-sm font-medium uppercase tracking-wider mb-4 block">
                Architecture
              </span>
              <h2 className="text-4xl font-display font-bold mb-4">
                Platform <span className="gradient-text">Stack</span>
              </h2>
              <p className="text-text-secondary max-w-2xl mx-auto">
                Mini-apps integrate seamlessly with the DANZ platform through our SDK
              </p>
            </motion.div>

            <div className="max-w-4xl mx-auto space-y-4">
              {architectureLayers.map((layer, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`rounded-xl border ${layer.color} p-6`}
                >
                  <div className="flex flex-col md:flex-row md:items-center gap-4">
                    <div className="md:w-1/3">
                      <h3 className="text-lg font-bold text-text-primary">{layer.name}</h3>
                      <p className="text-sm text-text-muted">{layer.description}</p>
                    </div>
                    <div className="md:w-2/3 flex flex-wrap gap-2">
                      {layer.items.map((item, i) => (
                        <span
                          key={i}
                          className="px-3 py-1.5 bg-white/5 rounded-lg text-sm text-text-secondary"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* API Capabilities */}
        <section className="section">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <span className="text-neon-purple text-sm font-medium uppercase tracking-wider mb-4 block">
                Current State
              </span>
              <h2 className="text-4xl font-display font-bold mb-4">
                Platform <span className="gradient-text">Capabilities</span>
              </h2>
              <p className="text-text-secondary max-w-2xl mx-auto">
                What&apos;s ready today vs what&apos;s in development
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {platformCapabilities.map((cap, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-bg-card border border-white/5 rounded-xl p-6"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <h3 className="font-bold text-text-primary">{cap.category}</h3>
                    <StatusBadge status={cap.status} />
                  </div>
                  <ul className="space-y-2">
                    {cap.items.map((item, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-text-secondary">
                        <div className="w-1.5 h-1.5 rounded-full bg-neon-purple" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Mini-App Ideas by Category */}
        {miniAppIdeas.map((category, categoryIndex) => (
          <section
            key={categoryIndex}
            className={`section ${categoryIndex % 2 === 0 ? 'bg-bg-secondary/50' : ''}`}
          >
            <div className="container">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="flex items-center gap-4 mb-8"
              >
                <div
                  className={`w-14 h-14 bg-gradient-to-br ${category.gradient} rounded-xl flex items-center justify-center`}
                >
                  <category.icon className="w-7 h-7 text-text-primary" />
                </div>
                <div>
                  <h2 className="text-3xl font-display font-bold">{category.category}</h2>
                  <p className="text-text-muted">{category.apps.length} mini-app ideas</p>
                </div>
              </motion.div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {category.apps.map((app, appIndex) => (
                  <MiniAppCard key={appIndex} app={app} index={appIndex} />
                ))}
              </div>
            </div>
          </section>
        ))}

        {/* Developer CTA */}
        <section className="section">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-4xl mx-auto text-center"
            >
              <div className="bg-gradient-to-br from-neon-purple/20 to-neon-pink/20 rounded-2xl p-12 border border-neon-purple/30">
                <FiCode className="w-16 h-16 text-neon-purple mx-auto mb-6" />
                <h2 className="text-4xl font-display font-bold mb-4">
                  Want to Build a <span className="gradient-text">Mini-App</span>?
                </h2>
                <p className="text-xl text-text-secondary mb-8">
                  Our SDK and APIs are being built with developers in mind. Join our community to
                  get early access and shape the platform.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href="https://discord.gg/danz"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary"
                  >
                    Join Discord
                  </a>
                  <a href="/register" className="btn btn-secondary">
                    Create Account
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* SDK Preview */}
        <section className="section bg-bg-secondary/50">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <span className="text-neon-pink text-sm font-medium uppercase tracking-wider mb-4 block">
                Coming Soon
              </span>
              <h2 className="text-4xl font-display font-bold mb-4">
                Developer <span className="gradient-text">SDK Preview</span>
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-3xl mx-auto"
            >
              <div className="bg-bg-card rounded-xl border border-white/10 overflow-hidden">
                <div className="flex items-center gap-2 px-4 py-3 bg-white/5 border-b border-white/5">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                  <span className="ml-2 text-sm text-text-muted">mini-app.ts</span>
                </div>
                <pre className="p-6 text-sm overflow-x-auto">
                  <code className="text-text-secondary">
                    {`import { DanzSDK } from '@danz/sdk'

// Initialize the SDK
const danz = new DanzSDK({
  appId: 'your-mini-app-id',
  permissions: ['user.profile', 'events.read', 'points.earn']
})

// Get current user
const user = await danz.user.getMe()
console.log('Welcome', user.displayName)

// Award points for activity
await danz.points.award({
  action: 'completed_challenge',
  amount: 50,
  metadata: { challengeId: 'daily-moves' }
})

// Create a mini-app event
const cipher = await danz.events.create({
  title: 'Street Cipher',
  type: 'mini-app-event',
  maxParticipants: 20,
  startsAt: new Date()
})

// Listen for real-time updates
danz.on('user.joined', (participant) => {
  console.log(participant.username, 'joined the cipher!')
})`}
                  </code>
                </pre>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </Layout>
  )
}
