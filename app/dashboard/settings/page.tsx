'use client'

import DashboardLayout from '@/src/components/dashboard/DashboardLayout'
import ExperimentalSettings from '@/src/components/dashboard/ExperimentalSettings'
import ThemeSettings from '@/src/components/dashboard/ThemeSettings'
import { NotificationPreferences } from '@/src/components/notifications'
import { usePrivy } from '@privy-io/react-auth'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { FiEdit3, FiLock, FiMail, FiSettings, FiShield, FiUser } from 'react-icons/fi'

export default function SettingsPage() {
  const { authenticated, ready, user } = usePrivy()
  const router = useRouter()

  const [settings, setSettings] = useState({
    emailNotifications: true,
    danceReminders: true,
    eventUpdates: true,
    marketingEmails: false,
    twoFactorAuth: false,
    publicProfile: true,
  })

  useEffect(() => {
    if (ready && !authenticated) {
      router.push('/')
    }
  }, [ready, authenticated, router])

  const handleToggle = (setting: string) => {
    setSettings(prev => ({
      ...prev,
      [setting]: !prev[setting as keyof typeof settings],
    }))
    // Here you would typically save to backend
  }

  if (!ready) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="w-8 h-8 border-2 border-neon-purple border-t-transparent rounded-full animate-spin" />
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-text-primary flex items-center gap-3">
            <FiSettings className="text-neon-purple" />
            Settings
          </h1>
          <p className="text-text-secondary mt-2">Manage your account settings and preferences</p>
        </div>

        <div className="space-y-6">
          {/* Profile Settings */}
          <div className="bg-bg-secondary rounded-xl border border-neon-purple/20 p-6">
            <h2 className="text-xl font-bold text-text-primary mb-6 flex items-center gap-3">
              <FiUser className="text-neon-purple" />
              Profile Settings
            </h2>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <p className="text-text-primary font-medium">Edit Your Profile</p>
                <p className="text-text-secondary text-sm mt-1">
                  Update your display name, bio, avatar, and other profile information
                </p>
              </div>
              <button
                onClick={() => router.push('/dashboard/profile')}
                className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-neon-purple to-neon-pink text-white rounded-xl hover:shadow-lg hover:shadow-neon-purple/30 transition-all hover:scale-105 font-medium whitespace-nowrap"
              >
                <FiEdit3 size={18} />
                Edit Profile
              </button>
            </div>
          </div>

          {/* Theme & Appearance */}
          <ThemeSettings />

          {/* Notification Preferences */}
          <NotificationPreferences />

          {/* Experimental Features */}
          <ExperimentalSettings />

          {/* Privacy & Security */}
          <div className="bg-bg-secondary rounded-xl border border-neon-purple/20 p-6">
            <h2 className="text-xl font-bold text-text-primary mb-6 flex items-center gap-3">
              <FiShield className="text-neon-purple" />
              Privacy & Security
            </h2>
            <div className="space-y-4">
              <label className="flex items-center justify-between cursor-pointer">
                <div>
                  <p className="text-text-primary">Two-Factor Authentication</p>
                  <p className="text-text-secondary text-sm">
                    Add an extra layer of security to your account
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={settings.twoFactorAuth}
                  onChange={() => handleToggle('twoFactorAuth')}
                  className="w-5 h-5 rounded border-white/20 bg-white/5 text-neon-purple focus:ring-neon-purple"
                />
              </label>

              <label className="flex items-center justify-between cursor-pointer">
                <div>
                  <p className="text-text-primary">Public Profile</p>
                  <p className="text-text-secondary text-sm">Allow others to view your profile</p>
                </div>
                <input
                  type="checkbox"
                  checked={settings.publicProfile}
                  onChange={() => handleToggle('publicProfile')}
                  className="w-5 h-5 rounded border-white/20 bg-white/5 text-neon-purple focus:ring-neon-purple"
                />
              </label>
            </div>
          </div>

          {/* Account Information */}
          <div className="bg-bg-secondary rounded-xl border border-neon-purple/20 p-6">
            <h2 className="text-xl font-bold text-text-primary mb-6 flex items-center gap-3">
              <FiLock className="text-neon-purple" />
              Account Information
            </h2>
            <div className="space-y-4">
              <div>
                <p className="text-text-secondary text-sm mb-1">Email Address</p>
                <div className="flex items-center gap-3">
                  <FiMail className="text-text-secondary" />
                  <p className="text-text-primary">{user?.email?.address || 'Not set'}</p>
                </div>
              </div>

              <div>
                <p className="text-text-secondary text-sm mb-1">Account ID</p>
                <p className="text-text-primary font-mono text-sm">{user?.id}</p>
              </div>

              {user?.wallet?.address && (
                <div>
                  <p className="text-text-secondary text-sm mb-1">Connected Wallet</p>
                  <p className="text-text-primary font-mono text-sm">
                    {user.wallet.address.slice(0, 6)}...{user.wallet.address.slice(-4)}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Danger Zone */}
          <div className="bg-red-900/20 rounded-xl border border-red-500/20 p-6">
            <h2 className="text-xl font-bold text-red-400 mb-4">Danger Zone</h2>
            <p className="text-text-secondary mb-4">
              Once you delete your account, there is no going back. Please be certain.
            </p>
            <button className="btn bg-red-600/20 border border-red-500/30 text-red-400 hover:bg-red-600/30">
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
