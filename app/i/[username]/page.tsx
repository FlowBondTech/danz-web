'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { FiDownload, FiSmartphone, FiCheck } from 'react-icons/fi'

export default function ReferralLandingPage() {
  const params = useParams()
  const router = useRouter()
  const username = params.username as string

  const [loading, setLoading] = useState(true)
  const [referrerInfo, setReferrerInfo] = useState<{
    username: string
    displayName: string
    avatarUrl?: string
  } | null>(null)
  const [deviceType, setDeviceType] = useState<'ios' | 'android' | 'desktop'>('desktop')

  useEffect(() => {
    // Detect device type
    const userAgent = navigator.userAgent.toLowerCase()
    const isIOS = /iphone|ipad|ipod/.test(userAgent)
    const isAndroid = /android/.test(userAgent)

    if (isIOS) {
      setDeviceType('ios')
    } else if (isAndroid) {
      setDeviceType('android')
    } else {
      setDeviceType('desktop')
    }

    // Fetch referrer information
    fetchReferrerInfo()

    // Track referral click
    trackReferralClick()
  }, [username])

  const fetchReferrerInfo = async () => {
    try {
      // TODO: Replace with GraphQL query when backend is ready
      // For now, use the username exactly as provided (case-sensitive)
      setReferrerInfo({
        username: username,
        displayName: username, // Keep exact case from URL
        avatarUrl: undefined
      })
      setLoading(false)
    } catch (error) {
      console.error('Failed to fetch referrer info:', error)
      setLoading(false)
    }
  }

  const trackReferralClick = async () => {
    try {
      // Get device fingerprint
      const fingerprint = {
        userAgent: navigator.userAgent,
        language: navigator.language,
        screenResolution: `${window.screen.width}x${window.screen.height}`,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      }

      // TODO: Send to backend when GraphQL mutation is ready
      console.log('Tracking referral click:', {
        referralCode: username,
        fingerprint,
        timestamp: new Date().toISOString()
      })
    } catch (error) {
      console.error('Failed to track click:', error)
    }
  }

  const handleSignUp = () => {
    // Store referral code in localStorage for registration
    if (typeof window !== 'undefined') {
      localStorage.setItem('referral_code', username)
    }

    // Redirect to registration page
    router.push('/register')
  }

  const handleDownload = () => {
    // Try deep link first
    const deepLink = `danz://i/${username}`
    const appStoreLink = 'https://apps.apple.com/app/danz'  // TODO: Replace with actual App Store ID
    const playStoreLink = 'https://play.google.com/store/apps/details?id=com.flowbondtech.danz'  // TODO: Replace with actual package name

    if (deviceType === 'ios') {
      // Try to open deep link
      window.location.href = deepLink

      // Fallback to App Store after 2 seconds
      setTimeout(() => {
        window.location.href = appStoreLink
      }, 2000)
    } else if (deviceType === 'android') {
      // Try to open deep link
      window.location.href = deepLink

      // Fallback to Play Store after 2 seconds
      setTimeout(() => {
        window.location.href = playStoreLink
      }, 2000)
    } else {
      // Desktop - show download options
      alert('Visit on your phone to download the app, or scan the QR code!')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-900 to-purple-900 flex items-center justify-center">
        <div className="animate-pulse text-white text-xl">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-900 to-purple-900 text-white">
      {/* Header */}
      <header className="p-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-purple-400">
            DANZ
          </h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-12">
        <div className="text-center space-y-8">
          {/* Referrer Info */}
          <div className="space-y-4">
            {referrerInfo?.avatarUrl ? (
              <img
                src={referrerInfo.avatarUrl}
                alt={referrerInfo.displayName}
                className="w-24 h-24 rounded-full mx-auto border-4 border-pink-400"
              />
            ) : (
              <div className="w-24 h-24 rounded-full mx-auto border-4 border-pink-400 bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center text-4xl font-bold">
                {referrerInfo?.displayName.charAt(0)}
              </div>
            )}

            <div>
              <h2 className="text-4xl font-bold mb-2">
                {referrerInfo?.displayName} invited you to DANZ!
              </h2>
              <p className="text-xl text-pink-200">
                Join the movement. Earn rewards. Dance your way to fitness.
              </p>
            </div>
          </div>

          {/* Benefits */}
          <div className="grid md:grid-cols-3 gap-6 py-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="text-4xl mb-4">💃</div>
              <h3 className="text-xl font-bold mb-2">Track Your Moves</h3>
              <p className="text-pink-200">Real-time motion tracking and BPM detection</p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-xl font-bold mb-2">Earn Points</h3>
              <p className="text-pink-200">Get rewarded for every dance session</p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="text-4xl mb-4">🤝</div>
              <h3 className="text-xl font-bold mb-2">Join Events</h3>
              <p className="text-pink-200">Connect with dancers worldwide</p>
            </div>
          </div>

          {/* Bonus Banner */}
          <div className="bg-gradient-to-r from-pink-500 to-purple-500 rounded-2xl p-6 border-2 border-pink-400">
            <div className="flex items-center justify-center gap-3 mb-2">
              <FiCheck className="text-3xl" />
              <h3 className="text-2xl font-bold">Special Bonus!</h3>
            </div>
            <p className="text-lg">
              Sign up through this link and {referrerInfo?.displayName} gets <span className="font-bold text-yellow-300">20 bonus points</span>
            </p>
            <p className="text-sm text-pink-100 mt-2">
              You'll also receive a welcome bonus when you complete your first dance session!
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="space-y-4 pt-6">
            {/* Primary CTA - Web Signup */}
            <button
              onClick={handleSignUp}
              className="w-full max-w-md mx-auto flex items-center justify-center gap-3 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-bold py-4 px-8 rounded-full text-xl transition-all transform hover:scale-105 shadow-lg"
            >
              <FiCheck className="text-2xl" />
              Sign Up Now
            </button>

            {/* Secondary CTA - Mobile App Download */}
            <div className="pt-4 space-y-2">
              <button
                onClick={handleDownload}
                className="w-full max-w-md mx-auto flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white font-semibold py-3 px-6 rounded-full text-sm transition-all border border-white/20"
              >
                <FiDownload className="text-lg" />
                {deviceType === 'ios' ? 'Download on App Store' :
                 deviceType === 'android' ? 'Get it on Play Store' :
                 'Download Mobile App'}
              </button>
              <div className="flex items-center justify-center gap-2 animate-pulse">
                <FiSmartphone className="text-pink-300" />
                <p className="text-sm font-medium text-pink-300">
                  Mobile app coming soon
                </p>
              </div>
            </div>
          </div>

          {/* Social Proof */}
          <div className="pt-12 border-t border-white/20">
            <p className="text-pink-200 mb-4">Join thousands of dancers already earning rewards</p>
            <div className="flex justify-center gap-8 text-center">
              <div>
                <div className="text-3xl font-bold">50K+</div>
                <div className="text-sm text-pink-200">Active Dancers</div>
              </div>
              <div>
                <div className="text-3xl font-bold">1M+</div>
                <div className="text-sm text-pink-200">Dance Sessions</div>
              </div>
              <div>
                <div className="text-3xl font-bold">100K+</div>
                <div className="text-sm text-pink-200">Points Earned</div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="max-w-4xl mx-auto px-6 py-8 text-center text-pink-200 text-sm">
        <p>© 2025 DANZ. Move. Earn. Repeat.</p>
      </footer>
    </div>
  )
}
