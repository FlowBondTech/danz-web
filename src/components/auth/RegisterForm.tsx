'use client'

import { useMutation, useQuery } from '@apollo/client'
import { usePrivy } from '@privy-io/react-auth'
import { gql } from 'graphql-tag'
import { motion } from 'motion/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

// GraphQL mutations
const CHECK_USERNAME = gql`
  query CheckUsername($username: String!) {
    checkUsername(username: $username)
  }
`

const REGISTER_USER = gql`
  mutation RegisterUser($input: RegisterUserInput!) {
    registerUser(input: $input) {
      privy_id
      username
      display_name
      role
    }
  }
`

export const RegisterForm = () => {
  const { login, ready, authenticated, user } = usePrivy()
  const router = useRouter()
  // Start with profile step if already authenticated
  const [step, setStep] = useState<'auth' | 'profile'>(authenticated ? 'profile' : 'auth')
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    username: '',
    displayName: '',
    bio: '',
    danceStyles: [] as string[],
    skillLevel: 'beginner',
  })
  const [usernameError, setUsernameError] = useState('')

  const [registerUser] = useMutation(REGISTER_USER)
  const { refetch: checkUsername } = useQuery(CHECK_USERNAME, {
    skip: true,
  })

  useEffect(() => {
    if (authenticated && user) {
      setStep('profile')
    }
  }, [authenticated, user])

  const handleAuthStep = async () => {
    try {
      setIsLoading(true)
      await login()
      setStep('profile')
    } catch (error) {
      console.error('Auth failed:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const validateUsername = async (username: string) => {
    if (username.length < 3) {
      setUsernameError('Username must be at least 3 characters')
      return false
    }

    if (!/^[a-zA-Z0-9_]+$/.test(username)) {
      setUsernameError('Username can only contain letters, numbers, and underscores')
      return false
    }

    try {
      const { data } = await checkUsername({ username })
      if (!data.checkUsername) {
        setUsernameError('Username is already taken')
        return false
      }
    } catch (error) {
      console.error('Username check failed:', error)
      return false
    }

    setUsernameError('')
    return true
  }

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!(await validateUsername(formData.username))) {
      return
    }

    try {
      setIsLoading(true)
      await registerUser({
        variables: {
          input: {
            privy_id: user?.id,
            username: formData.username,
            display_name: formData.displayName || formData.username,
            bio: formData.bio,
            dance_styles: formData.danceStyles,
            skill_level: formData.skillLevel,
          },
        },
      })

      router.push('/dashboard')
    } catch (error) {
      console.error('Registration failed:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const danceStyleOptions = [
    'Hip Hop',
    'Contemporary',
    'Jazz',
    'Ballet',
    'Breaking',
    'Popping',
    'Locking',
    'House',
    'Salsa',
    'Bachata',
    'Ballroom',
    'Tap',
  ]

  if (step === 'auth') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md mx-auto p-8 bg-black/50 backdrop-blur-md rounded-2xl border border-purple-500/20"
      >
        <h2 className="text-3xl font-bold text-center mb-2 bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
          Join DANZ
        </h2>
        <p className="text-gray-400 text-center mb-8">Start your dance journey today</p>

        <button
          onClick={handleAuthStep}
          disabled={!ready || isLoading}
          className="w-full py-3 px-6 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold rounded-lg hover:from-pink-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          {isLoading ? 'Connecting...' : 'Sign Up with Email or Wallet'}
        </button>

        <div className="mt-6 text-center">
          <p className="text-gray-400">
            Already have an account?{' '}
            <button
              type="button"
              onClick={() => login()}
              className="text-purple-400 hover:text-purple-300 transition-colors"
            >
              Login
            </button>
          </p>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-2xl mx-auto p-8 bg-black/50 backdrop-blur-md rounded-2xl border border-purple-500/20"
    >
      <h2 className="text-3xl font-bold text-center mb-2 bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
        Complete Your Profile
      </h2>
      <p className="text-gray-400 text-center mb-8">Tell us about yourself</p>

      <form onSubmit={handleProfileSubmit} className="space-y-6">
        <div>
          <label className="block text-white mb-2">Username *</label>
          <input
            type="text"
            value={formData.username}
            onChange={e => {
              setFormData({ ...formData, username: e.target.value })
              setUsernameError('')
            }}
            onBlur={() => validateUsername(formData.username)}
            className="w-full px-4 py-3 bg-black/50 border border-purple-500/30 rounded-lg text-white focus:border-purple-500 focus:outline-none"
            required
          />
          {usernameError && <p className="mt-1 text-sm text-red-400">{usernameError}</p>}
        </div>

        <div>
          <label className="block text-white mb-2">Display Name</label>
          <input
            type="text"
            value={formData.displayName}
            onChange={e => setFormData({ ...formData, displayName: e.target.value })}
            className="w-full px-4 py-3 bg-black/50 border border-purple-500/30 rounded-lg text-white focus:border-purple-500 focus:outline-none"
            placeholder="How should we display your name?"
          />
        </div>

        <div>
          <label className="block text-white mb-2">Bio</label>
          <textarea
            value={formData.bio}
            onChange={e => setFormData({ ...formData, bio: e.target.value })}
            className="w-full px-4 py-3 bg-black/50 border border-purple-500/30 rounded-lg text-white focus:border-purple-500 focus:outline-none"
            rows={3}
            placeholder="Tell us about yourself..."
          />
        </div>

        <div>
          <label className="block text-white mb-2">Dance Styles</label>
          <div className="grid grid-cols-3 gap-2">
            {danceStyleOptions.map(style => (
              <label key={style} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={formData.danceStyles.includes(style)}
                  onChange={e => {
                    if (e.target.checked) {
                      setFormData({
                        ...formData,
                        danceStyles: [...formData.danceStyles, style],
                      })
                    } else {
                      setFormData({
                        ...formData,
                        danceStyles: formData.danceStyles.filter(s => s !== style),
                      })
                    }
                  }}
                  className="text-purple-500"
                />
                <span className="text-sm text-gray-300">{style}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-white mb-2">Skill Level</label>
          <select
            value={formData.skillLevel}
            onChange={e => setFormData({ ...formData, skillLevel: e.target.value })}
            className="w-full px-4 py-3 bg-black/50 border border-purple-500/30 rounded-lg text-white focus:border-purple-500 focus:outline-none"
          >
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
            <option value="professional">Professional</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={isLoading || !formData.username}
          className="w-full py-3 px-6 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold rounded-lg hover:from-pink-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          {isLoading ? 'Creating Account...' : 'Complete Registration'}
        </button>
      </form>
    </motion.div>
  )
}
