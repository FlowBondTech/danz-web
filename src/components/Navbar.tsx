'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type React from 'react'
import { useEffect, useState } from 'react'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const isHomePage = pathname === '/'

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMobileMenuOpen(false)
  }, [pathname])

  const handleNavClick = (e: React.MouseEvent, hash: string) => {
    if (!isHomePage) {
      e.preventDefault()
      window.location.href = `/${hash}`
    }
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-bg-primary/95 backdrop-blur-xl py-4 border-b border-neon-purple/20'
          : 'bg-bg-primary/80 backdrop-blur-lg py-6'
      }`}
    >
      <div className="container flex justify-between items-center">
        <Link href="/" className="flex items-center">
          <span className="font-display text-2xl font-bold text-text-primary">
            DANZ<span className="text-neon-purple text-3xl">.</span>NOW
          </span>
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden lg:flex items-center gap-8">
          <li>
            <a
              href={isHomePage ? '#dancers' : '/#dancers'}
              onClick={e => handleNavClick(e, '#dancers')}
              className="text-text-secondary hover:text-text-primary transition-colors"
            >
              For Dancers
            </a>
          </li>
          <li>
            <a
              href={isHomePage ? '#hosts' : '/#hosts'}
              onClick={e => handleNavClick(e, '#hosts')}
              className="text-text-secondary hover:text-text-primary transition-colors"
            >
              For Hosts
            </a>
          </li>
          <li>
            <Link
              href="/danz"
              className="text-text-secondary hover:text-text-primary transition-colors"
            >
              Token
            </Link>
          </li>
          <li>
            <a
              href={isHomePage ? '#device' : '/#device'}
              onClick={e => handleNavClick(e, '#device')}
              className="text-text-secondary hover:text-text-primary transition-colors"
            >
              Device
            </a>
          </li>
          <li>
            <a
              href={isHomePage ? '#about' : '/#about'}
              onClick={e => handleNavClick(e, '#about')}
              className="text-text-secondary hover:text-text-primary transition-colors"
            >
              About
            </a>
          </li>
          <li>
            <a
              href={isHomePage ? '#faq' : '/#faq'}
              onClick={e => handleNavClick(e, '#faq')}
              className="text-text-secondary hover:text-text-primary transition-colors"
            >
              FAQ
            </a>
          </li>
        </ul>

        <button type="button" className="hidden lg:block btn btn-primary">
          Notify Me
        </button>

        {/* Mobile Menu Button */}
        <button
          type="button"
          className="lg:hidden relative w-8 h-8 flex items-center justify-center"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle mobile menu"
        >
          <span
            className={`absolute w-6 flex flex-col gap-1.5 transition-all ${mobileMenuOpen ? 'rotate-45' : ''}`}
          >
            <span
              className={`h-0.5 bg-text-primary transition-all ${mobileMenuOpen ? 'rotate-90 translate-y-2' : ''}`}
            />
            <span
              className={`h-0.5 bg-text-primary transition-all ${mobileMenuOpen ? 'opacity-0' : ''}`}
            />
            <span
              className={`h-0.5 bg-text-primary transition-all ${mobileMenuOpen ? '-rotate-90 -translate-y-2' : ''}`}
            />
          </span>
        </button>

        {/* Mobile Menu */}
        <div
          className={`fixed top-0 right-0 h-screen w-full sm:w-80 bg-bg-secondary transform transition-transform duration-300 lg:hidden ${
            mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="p-8 pt-24">
            <ul className="flex flex-col gap-6">
              <li>
                <a
                  href={isHomePage ? '#dancers' : '/#dancers'}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-lg text-text-secondary hover:text-text-primary transition-colors"
                >
                  For Dancers
                </a>
              </li>
              <li>
                <a
                  href={isHomePage ? '#hosts' : '/#hosts'}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-lg text-text-secondary hover:text-text-primary transition-colors"
                >
                  For Hosts
                </a>
              </li>
              <li>
                <Link
                  href="/danz"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-lg text-text-secondary hover:text-text-primary transition-colors"
                >
                  Token
                </Link>
              </li>
              <li>
                <a
                  href={isHomePage ? '#device' : '/#device'}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-lg text-text-secondary hover:text-text-primary transition-colors"
                >
                  Device
                </a>
              </li>
              <li>
                <a
                  href={isHomePage ? '#about' : '/#about'}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-lg text-text-secondary hover:text-text-primary transition-colors"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href={isHomePage ? '#faq' : '/#faq'}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-lg text-text-secondary hover:text-text-primary transition-colors"
                >
                  FAQ
                </a>
              </li>
              <li className="mt-8">
                <button type="button" className="btn btn-primary w-full">
                  Notify Me
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  )
}
