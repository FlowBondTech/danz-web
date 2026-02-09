'use client'

import {
  NotificationBell,
  NotificationBellCompact,
  NotificationPanel,
} from '@/src/components/notifications'
import InstallBanner from '@/src/components/ui/InstallBanner'
import { useExperimental } from '@/src/contexts/ExperimentalContext'
import { useInstallPrompt } from '@/src/hooks/useInstallPrompt'
import { usePrivy } from '@privy-io/react-auth'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import type { ReactNode } from 'react'
import { useEffect, useState } from 'react'
import {
  FiAward,
  FiCalendar,
  FiChevronLeft,
  FiChevronRight,
  FiCode,
  FiCreditCard,
  FiGrid,
  FiHeart,
  FiLogOut,
  FiMenu,
  FiSettings,
  FiShield,
  FiSmartphone,
  FiUser,
  FiUserPlus,
  FiX,
  FiZap,
} from 'react-icons/fi'
import { useGetMyProfileQuery } from '../../generated/graphql'

interface DashboardLayoutProps {
  children: ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const { logout, user, authenticated, ready } = usePrivy()
  const { experimentalEnabled } = useExperimental()
  const { isInstallable, isInstalled, isIOS, promptInstall, isMobile } = useInstallPrompt()

  const { data: profileData, loading: profileLoading } = useGetMyProfileQuery({
    skip: !authenticated || !ready,
  })

  useEffect(() => {
    // Redirect to register if no username
    if (ready && authenticated && !profileLoading && !profileData?.me?.username) {
      router.push('/register')
    }
  }, [ready, authenticated, profileData, profileLoading, router])

  const baseMenuItems = [
    {
      name: 'Overview',
      icon: FiGrid,
      href: '/dashboard',
    },
    {
      name: 'Feed',
      icon: FiHeart,
      href: '/dashboard/feed',
    },
    {
      name: 'Profile',
      icon: FiUser,
      href: '/dashboard/profile',
    },
    {
      name: 'Events',
      icon: FiCalendar,
      href: '/dashboard/my-events',
    },
    {
      name: 'Sponsor',
      icon: FiAward,
      href: '/dashboard/sponsor',
    },
    {
      name: 'Wallet',
      icon: FiShield,
      href: '/dashboard/wallet',
    },
    {
      name: 'Referrals',
      icon: FiUserPlus,
      href: '/dashboard/referrals',
    },
    {
      name: 'Subscription',
      icon: FiCreditCard,
      href: '/dashboard/subscription',
    },
    {
      name: 'Settings',
      icon: FiSettings,
      href: '/dashboard/settings',
    },
  ]

  const devMenuItems = [
    {
      name: 'Dev',
      icon: FiCode,
      href: '/dashboard/admin/dev',
    },
  ]

  const adminMenuItems = [
    {
      name: 'Admin',
      icon: FiSettings,
      href: '/dashboard/admin',
    },
  ]

  const experimentalMenuItems = [
    {
      name: 'Experimental',
      icon: FiZap,
      href: '/dashboard/experimental',
    },
  ]

  // Cast to string for comparison since 'dev' role may not be in generated types yet
  const userRole = profileData?.me?.role as string | undefined
  const isDevOrAdmin = userRole === 'dev' || userRole === 'admin'
  const isAdmin = profileData?.me?.is_admin || userRole === 'admin'

  const menuItems = [
    ...baseMenuItems,
    ...(experimentalEnabled ? experimentalMenuItems : []),
    ...(isDevOrAdmin ? devMenuItems : []),
    ...(isAdmin ? adminMenuItems : []),
  ]

  const handleLogout = async () => {
    await logout()
    router.push('/')
  }

  return (
    <div className="h-screen bg-bg-primary flex overflow-hidden">
      {/* Notification Panel (positioned absolutely) */}
      <NotificationPanel />

      {/* Desktop Sidebar */}
      <div
        className={`hidden lg:flex flex-col bg-bg-secondary border-r border-neon-purple/20 transition-all duration-300 ${
          sidebarOpen ? 'w-64' : 'w-20'
        } h-full`}
      >
        {/* Sidebar Header */}
        <div className={`shrink-0 border-b border-white/10 ${sidebarOpen ? 'p-6' : 'p-4 py-3'}`}>
          <div className="flex items-center justify-between">
            <Link href="/" className={`flex items-center ${!sidebarOpen && 'justify-center'}`}>
              {sidebarOpen ? (
                <span className="font-display text-2xl font-bold text-text-primary">
                  DANZ<span className="text-neon-purple text-3xl">.</span>NOW
                </span>
              ) : (
                <span className="font-display text-2xl font-bold text-neon-purple">D</span>
              )}
            </Link>
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-text-secondary hover:text-text-primary transition-colors"
            >
              {sidebarOpen ? <FiChevronLeft size={20} /> : <FiChevronRight size={20} />}
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 overflow-y-auto">
          <ul className="space-y-2">
            {menuItems.map(item => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    pathname === item.href
                      ? 'bg-neon-purple/20 text-neon-purple'
                      : 'text-text-secondary hover:bg-white/5 hover:text-text-primary'
                  }`}
                >
                  <item.icon size={20} />
                  {sidebarOpen && <span>{item.name}</span>}
                </Link>
              </li>
            ))}
          </ul>

          {/* Notifications - Desktop */}
          <div className="mt-4 pt-4 border-t border-white/10">
            <NotificationBell collapsed={!sidebarOpen} />
          </div>
        </nav>

        {/* User Section */}
        <div className={`shrink-0 mt-auto p-4 border-t border-white/10 ${!sidebarOpen && 'pt-6'}`}>
          <div className={`flex items-center gap-3 mb-4 ${!sidebarOpen && 'justify-center'}`}>
            {profileData?.me?.avatar_url ? (
              <div className="relative">
                <img
                  src={profileData.me.avatar_url}
                  alt={profileData.me.display_name || profileData.me.username || 'User'}
                  className="w-10 h-10 rounded-full object-cover border-2 border-neon-purple/30 transition-all duration-200 hover:border-neon-purple/60"
                  onError={e => {
                    // Fallback if image fails to load
                    e.currentTarget.style.display = 'none'
                    e.currentTarget.nextElementSibling?.classList.remove('hidden')
                  }}
                />
                <div className="hidden w-10 h-10 rounded-full bg-gradient-to-r from-neon-purple to-neon-pink flex items-center justify-center text-white font-bold">
                  {profileData?.me?.username?.charAt(0).toUpperCase() ||
                    user?.email?.address?.charAt(0).toUpperCase() ||
                    'U'}
                </div>
              </div>
            ) : (
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-neon-purple to-neon-pink flex items-center justify-center text-white font-bold shadow-lg">
                {profileData?.me?.username?.charAt(0).toUpperCase() ||
                  user?.email?.address?.charAt(0).toUpperCase() ||
                  'U'}
              </div>
            )}
            {sidebarOpen && (
              <div className="flex-1 overflow-hidden">
                <p className="text-text-primary text-sm font-medium truncate">
                  {profileData?.me?.display_name ||
                    profileData?.me?.username ||
                    user?.email?.address?.split('@')[0] ||
                    'User'}
                </p>
                <p className="text-text-secondary text-xs truncate">
                  @{profileData?.me?.username || user?.email?.address || 'user'}
                </p>
              </div>
            )}
          </div>
          <button
            onClick={handleLogout}
            className={`flex items-center gap-3 w-full px-4 py-2 text-text-secondary hover:text-red-400 transition-colors ${
              !sidebarOpen && 'justify-center'
            }`}
          >
            <FiLogOut size={20} />
            {sidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </div>

      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-bg-secondary border-b border-neon-purple/20 px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="font-display text-xl font-bold text-text-primary">
            DANZ<span className="text-neon-purple text-2xl">.</span>NOW
          </Link>
          <div className="flex items-center gap-2">
            <NotificationBellCompact />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-text-primary p-2"
            >
              {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-black/50"
          onClick={() => setMobileMenuOpen(false)}
          onKeyDown={e => e.key === 'Escape' && setMobileMenuOpen(false)}
          role="presentation"
          tabIndex={-1}
          aria-hidden="true"
        >
          <div
            className="absolute left-0 top-0 h-full w-64 bg-bg-secondary"
            onClick={e => e.stopPropagation()}
            onKeyDown={e => e.stopPropagation()}
            role="presentation"
          >
            <div className="pt-20 p-4">
              <nav>
                <ul className="space-y-2">
                  {menuItems.map(item => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                          pathname === item.href
                            ? 'bg-neon-purple/20 text-neon-purple'
                            : 'text-text-secondary hover:bg-white/5 hover:text-text-primary'
                        }`}
                      >
                        <item.icon size={20} />
                        <span>{item.name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>

              <div className="mt-8 pt-8 border-t border-white/10">
                {/* User Info in Mobile Menu */}
                <div className="flex items-center gap-3 mb-4 px-4">
                  {profileData?.me?.avatar_url ? (
                    <div className="relative">
                      <img
                        src={profileData.me.avatar_url}
                        alt={profileData.me.display_name || profileData.me.username || 'User'}
                        className="w-10 h-10 rounded-full object-cover border-2 border-neon-purple/30"
                        onError={e => {
                          // Fallback if image fails to load
                          e.currentTarget.style.display = 'none'
                          e.currentTarget.nextElementSibling?.classList.remove('hidden')
                        }}
                      />
                      <div className="hidden w-10 h-10 rounded-full bg-gradient-to-r from-neon-purple to-neon-pink flex items-center justify-center text-white font-bold">
                        {profileData?.me?.username?.charAt(0).toUpperCase() ||
                          user?.email?.address?.charAt(0).toUpperCase() ||
                          'U'}
                      </div>
                    </div>
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-neon-purple to-neon-pink flex items-center justify-center text-white font-bold shadow-lg">
                      {profileData?.me?.username?.charAt(0).toUpperCase() ||
                        user?.email?.address?.charAt(0).toUpperCase() ||
                        'U'}
                    </div>
                  )}
                  <div className="flex-1 overflow-hidden">
                    <p className="text-text-primary text-sm font-medium truncate">
                      {profileData?.me?.display_name ||
                        profileData?.me?.username ||
                        user?.email?.address?.split('@')[0] ||
                        'User'}
                    </p>
                    <p className="text-text-secondary text-xs truncate">
                      @{profileData?.me?.username || 'user'}
                    </p>
                  </div>
                </div>
                {/* Add to Home Screen - Only show if installable and not already installed */}
                {isMobile && isInstallable && !isInstalled && (
                  <button
                    onClick={() => {
                      if (isIOS) {
                        // Show instructions for iOS
                        alert('To install: Tap the Share button, then "Add to Home Screen"')
                      } else {
                        promptInstall()
                      }
                      setMobileMenuOpen(false)
                    }}
                    className="flex items-center gap-3 w-full px-4 py-2 text-neon-purple hover:text-neon-pink transition-colors mb-2"
                  >
                    <FiSmartphone size={20} />
                    <span>Add to Home Screen</span>
                  </button>
                )}

                <button
                  onClick={handleLogout}
                  className="flex items-center gap-3 w-full px-4 py-2 text-text-secondary hover:text-red-400 transition-colors"
                >
                  <FiLogOut size={20} />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        <main className="flex-1 px-4 pb-4 sm:px-6 sm:pb-6 lg:px-8 lg:pb-8 pt-20 lg:pt-8 overflow-auto">
          {children}
        </main>
      </div>

      {/* Install Banner for Mobile */}
      <InstallBanner />
    </div>
  )
}
