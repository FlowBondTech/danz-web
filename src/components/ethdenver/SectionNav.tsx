'use client'

import { navSections } from '@/src/components/ethdenver/data'
import { motion } from 'motion/react'
import { useEffect, useState } from 'react'

export default function SectionNav() {
  const [activeSection, setActiveSection] = useState('hero')
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        }
      },
      { rootMargin: '-40% 0px -40% 0px', threshold: 0 },
    )

    for (const section of navSections) {
      const el = document.getElementById(section.id)
      if (el) observer.observe(el)
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <motion.nav
      initial={false}
      animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : -10 }}
      transition={{ duration: 0.3 }}
      className="fixed top-16 left-0 right-0 z-40 bg-bg-primary/80 backdrop-blur-xl border-b border-white/5 hidden lg:block pointer-events-auto"
      style={{ pointerEvents: visible ? 'auto' : 'none' }}
    >
      <div className="container">
        <div className="flex items-center gap-1 py-2 overflow-x-auto scrollbar-hide">
          {navSections.map(section => (
            <button
              key={section.id}
              type="button"
              onClick={() => scrollTo(section.id)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
                activeSection === section.id
                  ? 'bg-gradient-to-r from-neon-purple/20 to-neon-pink/20 text-white border border-neon-purple/30'
                  : 'text-text-muted hover:text-text-secondary'
              }`}
            >
              {section.label}
            </button>
          ))}
        </div>
      </div>
    </motion.nav>
  )
}
