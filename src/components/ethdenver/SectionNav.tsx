'use client'

import { motion } from 'motion/react'
import { useEffect, useState } from 'react'
import { navSections } from '@/src/components/ethdenver/data'

export default function SectionNav() {
  const [activeSection, setActiveSection] = useState('hero')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        }
      },
      { rootMargin: '-40% 0px -40% 0px', threshold: 0 }
    )

    for (const section of navSections) {
      const el = document.getElementById(section.id)
      if (el) observer.observe(el)
    }

    return () => observer.disconnect()
  }, [])

  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <motion.nav
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 1 }}
      className="fixed top-[72px] left-0 right-0 z-40 bg-bg-primary/80 backdrop-blur-xl border-b border-white/5 hidden lg:block"
    >
      <div className="container">
        <div className="flex items-center gap-1 py-2 overflow-x-auto scrollbar-hide">
          {navSections.map((section) => (
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
