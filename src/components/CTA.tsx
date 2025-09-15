'use client'
import { motion } from 'framer-motion'

export default function CTA() {
  const handleJoinWaitlist = (e: React.MouseEvent) => {
    e.preventDefault()
    // Trigger waitlist modal
    const event = new CustomEvent('openWaitlist')
    window.dispatchEvent(event)
  }

  return (
    <section className="section relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-neon-purple/20 via-transparent to-neon-pink/20" />

      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6">
            <span className="gradient-text">Ready to revolutionize movement?</span>
          </h2>
          <p className="text-xl text-text-secondary mb-8">
            Join thousands of dancers earning rewards for doing what they love.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <button onClick={handleJoinWaitlist} className="btn btn-primary text-lg px-8 py-4">
              Join Waitlist
            </button>
            <button className="btn btn-secondary text-lg px-8 py-4">Partner With Us</button>
          </div>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center text-text-secondary">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🔥</span>
              <span>2,847 joined this week</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">⚡</span>
              <span>Limited spots remaining</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
