'use client'

import { usePrivy } from '@privy-io/react-auth'
import { motion } from 'motion/react'
import { useRouter } from 'next/navigation'
import { FiCheck } from 'react-icons/fi'

const plans = [
  {
    name: 'Monthly Flow',
    price: '$9.99',
    period: '/month',
    features: [
      'Unlimited event matching',
      'Priority access to popular events',
      'Double $DANZ token rewards',
      'Advanced movement analytics',
      'Community chat and messaging',
      'Exclusive facilitator workshops',
    ],
    highlighted: false,
  },
  {
    name: 'Annual Flow',
    price: '$99',
    period: '/year',
    features: [
      'Unlimited event matching',
      'Priority access to popular events',
      'Double $DANZ token rewards',
      'Advanced movement analytics',
      'Community chat and messaging',
      'Exclusive facilitator workshops',
    ],
    highlighted: true,
    badge: 'Most Popular',
  },
]

export default function SubscriptionSection() {
  const { authenticated, login } = usePrivy()
  const router = useRouter()

  const handleSelectPlan = () => {
    if (authenticated) {
      router.push('/dashboard')
    } else {
      login()
    }
  }
  return (
    <section className="section bg-gradient-to-b from-bg-primary via-bg-secondary/30 to-bg-primary relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-br from-neon-purple/5 to-neon-pink/5 rounded-full blur-3xl" />
      </div>

      <div className="container relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              {/* Tag */}
              <span className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-neon-purple/20 to-neon-pink/20 backdrop-blur-sm border border-white/10 rounded-full text-white text-sm font-medium uppercase tracking-wider mb-8">
                Premium Access
              </span>

              <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">
                Find Your Flow
              </h2>

              <p className="text-xl text-text-secondary max-w-3xl mx-auto">
                Connect with your vibe through our premium matching system
              </p>
            </motion.div>
          </div>

          {/* Pricing Cards */}
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12">
            {plans.map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`relative ${plan.highlighted ? '' : ''}`}
              >
                {/* Badge */}
                {plan.badge && (
                  <div className="absolute -top-3 right-6 z-10">
                    <span className="bg-gradient-neon text-white px-4 py-1.5 rounded-full text-sm font-medium">
                      {plan.badge}
                    </span>
                  </div>
                )}

                <div
                  className={`bg-bg-card/30 backdrop-blur-sm border rounded-3xl p-8 h-full relative overflow-hidden transition-all duration-300 ${
                    plan.highlighted
                      ? 'border-neon-purple/50 shadow-xl shadow-neon-purple/10'
                      : 'border-white/10 hover:border-white/20'
                  }`}
                >
                  {/* Plan Name */}
                  <h3 className="text-2xl font-bold text-center mb-8">{plan.name}</h3>

                  {/* Features List */}
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full bg-gradient-to-br from-neon-purple/30 to-neon-pink/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <FiCheck className="w-3 h-3 text-white" />
                        </div>
                        <span className="text-text-primary">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Price Section */}
                  <div className="text-center mb-6">
                    <div className="flex items-baseline justify-center gap-1">
                      <span className="text-3xl font-bold gradient-text">{plan.price}</span>
                      <span className="text-text-muted">{plan.period}</span>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleSelectPlan}
                    className={`w-full py-3 px-6 rounded-xl font-medium transition-all ${
                      plan.highlighted
                        ? 'bg-gradient-neon text-white shadow-lg hover:shadow-neon-purple/50'
                        : 'bg-gradient-to-r from-neon-purple/20 to-neon-pink/20 text-white border border-white/10 hover:border-white/20'
                    }`}
                  >
                    {authenticated ? 'Select Plan' : 'Join to Select'}
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bottom Text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center"
          >
            <p className="text-text-secondary text-lg">
              Start with a free account to explore basic features, then upgrade when you're ready to
              unlock the full FlowBond experience.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
