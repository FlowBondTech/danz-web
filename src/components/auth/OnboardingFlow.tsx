'use client'

import { useMutation, useQuery } from '@apollo/client'
import { usePrivy } from '@privy-io/react-auth'
import { gql } from 'graphql-tag'
import { AnimatePresence, motion } from 'motion/react'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import {
  FiBell,
  FiCalendar,
  FiCamera,
  FiCheck,
  FiChevronRight,
  FiImage,
  FiLoader,
  FiMail,
  FiMusic,
  FiShield,
  FiStar,
  FiUpload,
  FiUser,
  FiUsers,
  FiX
} from 'react-icons/fi'
import { useAuth } from '../../contexts/AuthContext'
import {
  DANCE_STYLES,
  DANCE_STYLE_EMOJIS,
  EVENT_TYPES,
  SKILL_LEVELS,
  SKILL_LEVEL_DISPLAY
} from '../../constants/onboardingConstants'

// GraphQL queries and mutations
const ME_QUERY = gql`
  query Me {
    me {
      privy_id
      username
      display_name
      avatar_url
      bio
      city
      skill_level
      dance_styles
      role
      company_name
      event_types
      organizer_bio
    }
  }
`

const CHECK_USERNAME = gql`
  query CheckUsername($username: String!) {
    checkUsername(username: $username)
  }
`

const GET_UPLOAD_URL = gql`
  query GetUploadUrl($fileName: String!, $mimeType: MimeType!, $uploadType: UploadType!) {
    getUploadUrl(fileName: $fileName, mimeType: $mimeType, uploadType: $uploadType) {
      success
      uploadUrl
      fields
      publicUrl
      expires
      maxSize
    }
  }
`

const UPDATE_PROFILE = gql`
  mutation UpdateProfile($input: UpdateProfileInput!) {
    updateProfile(input: $input) {
      privy_id
      username
      display_name
      avatar_url
      bio
      city
      skill_level
      dance_styles
      role
      company_name
      event_types
      organizer_bio
    }
  }
`

type OnboardingStep = 'welcome' | 'role' | 'username' | 'photo' | 'about' | 'styles' | 'social' | 'organization'

interface OnboardingFlowProps {
  initialStep?: OnboardingStep
}

export const OnboardingFlow = ({ initialStep = 'welcome' }: OnboardingFlowProps) => {
  const { isAuthenticated, login } = useAuth()
  const { user: privyUser } = usePrivy()
  const router = useRouter()

  // Check if user profile already exists
  const { data: meData, loading: meLoading } = useQuery(ME_QUERY, {
    skip: !isAuthenticated,
  })
  const [currentStep, setCurrentStep] = useState<OnboardingStep>(initialStep)
  const [isLoading, setIsLoading] = useState(false)
  const [isCheckingUsername, setIsCheckingUsername] = useState(false)
  const [completedSteps, setCompletedSteps] = useState<string[]>([])
  const [userRole, setUserRole] = useState<'attendee' | 'organizer' | null>(null)
  const [agreedToTerms, setAgreedToTerms] = useState(false)
  const [emailNotifications, setEmailNotifications] = useState(true)

  const [formData, setFormData] = useState({
    username: '',
    displayName: '',
    bio: '',
    avatarUrl: '',
    coverUrl: '',
    location: '',
    city: '',
    pronouns: '',
    danceStyles: [] as string[],
    skillLevel: 'beginner' as 'beginner' | 'intermediate' | 'advanced',
    instagram: '',
    tiktok: '',
    youtube: '',
    twitter: '',
    companyName: '',
    eventTypes: [] as string[],
    organizerBio: '',
    invitedBy: '',
    websiteUrl: '',
  })

  const [localAvatarFile, setLocalAvatarFile] = useState<File | null>(null)
  const [localAvatarPreview, setLocalAvatarPreview] = useState<string | null>(null)
  const [uploadingAvatar, setUploadingAvatar] = useState(false)

  const [usernameError, setUsernameError] = useState('')
  const [usernameAvailable, setUsernameAvailable] = useState(false)
  const [usernameChecked, setUsernameChecked] = useState(false)
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null)

  const [updateProfile] = useMutation(UPDATE_PROFILE)
  const { refetch: checkUsername } = useQuery(CHECK_USERNAME, {
    skip: true,
  })
  const { refetch: getUploadUrl } = useQuery(GET_UPLOAD_URL, {
    skip: true,
  })

  useEffect(() => {
    // If user already has a complete profile, redirect to dashboard
    if (meData?.me?.username) {
      console.log('User already has username, redirecting to dashboard')
      router.push('/dashboard')
      return
    }
  }, [meData, router])

  // Determine which steps to show based on role
  const getSteps = () => {
    if (userRole === 'organizer') {
      return [
        { id: 'welcome', label: 'Welcome', icon: <FiStar /> },
        { id: 'role', label: 'Role', icon: <FiUsers /> },
        { id: 'username', label: 'Username', icon: <FiUser /> },
        { id: 'photo', label: 'Photo', icon: <FiCamera /> },
        { id: 'about', label: 'About', icon: <FiUser /> },
        { id: 'styles', label: 'Styles', icon: <FiMusic /> },
        { id: 'organization', label: 'Organization', icon: <FiCalendar /> },
      ]
    }

    // Attendee flow
    return [
      { id: 'welcome', label: 'Welcome', icon: <FiStar /> },
      { id: 'role', label: 'Role', icon: <FiUsers /> },
      { id: 'username', label: 'Username', icon: <FiUser /> },
      { id: 'photo', label: 'Photo', icon: <FiCamera /> },
      { id: 'about', label: 'About', icon: <FiUser /> },
      { id: 'styles', label: 'Styles', icon: <FiMusic /> },
      { id: 'social', label: 'Social', icon: <FiCheck /> },
    ]
  }

  const steps = getSteps()

  const validateUsernameFormat = (username: string) => {
    if (!username) {
      setUsernameError('')
      setUsernameAvailable(false)
      return false
    }

    if (username.length < 3) {
      setUsernameError('Username must be at least 3 characters')
      setUsernameAvailable(false)
      return false
    }

    if (/\s/.test(username)) {
      setUsernameError('Username cannot contain spaces')
      setUsernameAvailable(false)
      return false
    }

    if (!/^[a-z0-9_]+$/.test(username)) {
      setUsernameError('Only lowercase letters, numbers, and underscores allowed')
      setUsernameAvailable(false)
      return false
    }

    setUsernameError('')
    return true
  }

  const checkUsernameAvailability = async (username: string) => {
    if (!validateUsernameFormat(username)) {
      setUsernameChecked(true)
      return false
    }

    try {
      setIsCheckingUsername(true)
      setUsernameError('')
      const { data } = await checkUsername({ username })

      if (!data.checkUsername) {
        setUsernameError('Username is already taken')
        setUsernameAvailable(false)
        setUsernameChecked(true)
        return false
      }

      setUsernameError('')
      setUsernameAvailable(true)
      setUsernameChecked(true)
      return true
    } catch (error) {
      console.error('Username check failed:', error)
      setUsernameError('Error checking username availability')
      setUsernameAvailable(false)
      setUsernameChecked(true)
      return false
    } finally {
      setIsCheckingUsername(false)
    }
  }

  const handleUsernameChange = (value: string) => {
    // Force lowercase and remove spaces
    const formattedUsername = value.toLowerCase().replace(/\s/g, '')
    setFormData({ ...formData, username: formattedUsername })
    setUsernameError('')
    setUsernameAvailable(false)
    setUsernameChecked(false)

    // Clear existing timer
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current)
    }

    // Don't check if empty or too short
    if (!formattedUsername || formattedUsername.length < 3) {
      validateUsernameFormat(formattedUsername)
      setUsernameChecked(true)
      return
    }

    // Set new timer for debounced check
    debounceTimerRef.current = setTimeout(() => {
      checkUsernameAvailability(formattedUsername)
    }, 800) // Check after 800ms of no typing
  }

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file')
      return
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('Image must be less than 5MB')
      return
    }

    setLocalAvatarFile(file)

    // Create preview
    const reader = new FileReader()
    reader.onloadend = () => {
      setLocalAvatarPreview(reader.result as string)
    }
    reader.readAsDataURL(file)
  }

  const uploadAvatar = async () => {
    if (!localAvatarFile) return null

    try {
      setUploadingAvatar(true)

      // Get presigned URL from GraphQL
      const { data } = await getUploadUrl({
        fileName: localAvatarFile.name,
        mimeType: 'IMAGE_JPEG', // Enum value from GraphQL schema
        uploadType: 'avatar', // Lowercase enum value from GraphQL schema
      })

      if (!data?.getUploadUrl?.success) {
        throw new Error('Failed to get upload URL')
      }

      const presignedData = data.getUploadUrl

      // Upload to S3
      const formData = new FormData()

      // Add all fields first (order matters for S3)
      if (typeof presignedData.fields === 'object') {
        Object.entries(presignedData.fields).forEach(([key, value]) => {
          formData.append(key, value as string)
        })
      }

      // Add file last
      formData.append('file', localAvatarFile)

      const uploadResponse = await fetch(presignedData.uploadUrl, {
        method: 'POST',
        body: formData,
      })

      if (!uploadResponse.ok) {
        throw new Error('Upload to storage failed')
      }

      return presignedData.publicUrl
    } catch (error) {
      console.error('Avatar upload failed:', error)
      return null
    } finally {
      setUploadingAvatar(false)
    }
  }

  const validateCurrentStep = () => {
    switch (currentStep) {
      case 'username':
        return formData.username && usernameAvailable && !usernameError

      case 'about':
        return formData.displayName && formData.bio && formData.city

      case 'styles':
        return formData.danceStyles.length > 0 && formData.skillLevel

      case 'organization':
        return formData.companyName && formData.eventTypes.length > 0 && formData.organizerBio

      default:
        return true
    }
  }

  const handleNext = async () => {
    const attendeeSteps: OnboardingStep[] = ['welcome', 'role', 'username', 'photo', 'about', 'styles', 'social']
    const organizerSteps: OnboardingStep[] = ['welcome', 'role', 'username', 'photo', 'about', 'styles', 'organization']

    const stepOrder = userRole === 'organizer' ? organizerSteps : attendeeSteps
    const currentIndex = stepOrder.indexOf(currentStep)

    if (currentStep === 'welcome') {
      if (!agreedToTerms) {
        return
      }

      // If already authenticated, just move to next step
      if (isAuthenticated) {
        setCompletedSteps(['welcome'])
        setCurrentStep('role')
        return
      }

      // If not authenticated, trigger login
      try {
        setIsLoading(true)
        await login()
        // Don't automatically advance - let user click continue after login
      } catch (error) {
        console.error('Auth failed:', error)
      } finally {
        setIsLoading(false)
      }
      return
    }

    if (currentStep === 'role') {
      if (!userRole) return
      setCompletedSteps([...completedSteps, currentStep])
      setCurrentStep('username')
      return
    }

    if (currentStep === 'username') {
      const isValid = await checkUsernameAvailability(formData.username)
      if (!isValid) return
    }

    const isFinalStep =
      (userRole === 'attendee' && currentStep === 'social') ||
      (userRole === 'organizer' && currentStep === 'organization')

    if (isFinalStep) {
      // Final step - upload avatar if exists and submit registration
      try {
        setIsLoading(true)

        // Upload avatar if selected
        let avatarUrl = formData.avatarUrl
        if (localAvatarFile) {
          const uploadedUrl = await uploadAvatar()
          if (uploadedUrl) {
            avatarUrl = uploadedUrl
          }
        }

        // Prepare registration input
        const registrationInput: any = {
          username: formData.username,
          display_name: formData.displayName || formData.username,
          bio: formData.bio,
          avatar_url: avatarUrl,
          city: formData.city,
          location: formData.city, // Using city as location
          pronouns: formData.pronouns,
          dance_styles: formData.danceStyles,
          skill_level: formData.skillLevel, // Keep lowercase
        }

        // Add organizer fields if applicable (these are in UpdateProfileInput)
        if (userRole === 'organizer') {
          // These fields will trigger the backend to set role as 'organizer'
          registrationInput.company_name = formData.companyName
          registrationInput.event_types = formData.eventTypes
          registrationInput.organizer_bio = formData.organizerBio
          registrationInput.invited_by = formData.invitedBy
          registrationInput.website_url = formData.websiteUrl
        }

        // Add social links if provided
        if (formData.instagram) registrationInput.instagram = formData.instagram
        if (formData.tiktok) registrationInput.tiktok = formData.tiktok
        if (formData.youtube) registrationInput.youtube = formData.youtube
        if (formData.twitter) registrationInput.twitter = formData.twitter

        await updateProfile({
          variables: {
            input: registrationInput,
          },
        })

        router.push('/dashboard')
      } catch (error) {
        console.error('Registration failed:', error)
        alert('Registration failed. Please try again.')
      } finally {
        setIsLoading(false)
      }
      return
    }

    setCompletedSteps([...completedSteps, currentStep])
    const nextStep = stepOrder[currentIndex + 1]
    if (nextStep) {
      setCurrentStep(nextStep)
    }
  }

  const handleBack = () => {
    const attendeeSteps: OnboardingStep[] = ['welcome', 'role', 'username', 'photo', 'about', 'styles', 'social']
    const organizerSteps: OnboardingStep[] = ['welcome', 'role', 'username', 'photo', 'about', 'styles', 'organization']

    const actualFlow = userRole === 'organizer' ? organizerSteps : attendeeSteps
    const currentIndex = actualFlow.indexOf(currentStep)

    if (currentIndex > 0) {
      const prevStep = actualFlow[currentIndex - 1]
      if (prevStep) {
        // If going back to role, clear the selected role
        if (prevStep === 'role') {
          setUserRole(null)
        }
        setCurrentStep(prevStep)
        // Remove the current step from completed steps
        setCompletedSteps(completedSteps.filter(s => s !== currentStep))
      }
    }
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 'welcome':
        return (
          <motion.div
            key="welcome"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <div className="text-center space-y-4">
              <div className="w-24 h-24 mx-auto bg-gradient-to-br from-pink-500 to-purple-600 rounded-full flex items-center justify-center">
                <span className="text-4xl">💃</span>
              </div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
                Welcome to DANZ
              </h2>
              <p className="text-gray-300 text-base max-w-md mx-auto">
                Your journey to discovering amazing dance events and connecting with the dance
                community starts here!
              </p>
            </div>

            {privyUser && (
              <div className="bg-purple-900/20 rounded-xl p-4 border border-purple-500/20">
                <div className="flex items-center space-x-3">
                  <FiMail className="text-purple-400" />
                  <div>
                    <p className="text-sm text-gray-400">Signing up with</p>
                    <p className="text-white font-medium">
                      {privyUser.email?.address || privyUser.wallet?.address || 'Connected Account'}
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-4">
              <label className="flex items-start space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={agreedToTerms}
                  onChange={e => setAgreedToTerms(e.target.checked)}
                  className="mt-1 w-4 h-4 text-purple-600 bg-black/50 border-purple-500/30 rounded focus:ring-purple-500"
                />
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <FiShield className="text-purple-400 text-sm" />
                    <span className="text-white text-sm">I agree to the Terms & Privacy Policy</span>
                  </div>
                </div>
              </label>

              <label className="flex items-start space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={emailNotifications}
                  onChange={e => setEmailNotifications(e.target.checked)}
                  className="mt-1 w-4 h-4 text-purple-600 bg-black/50 border-purple-500/30 rounded focus:ring-purple-500"
                />
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <FiBell className="text-purple-400 text-sm" />
                    <span className="text-white text-sm">Email me when the app launches</span>
                  </div>
                </div>
              </label>
            </div>
          </motion.div>
        )

      case 'role':
        return (
          <motion.div
            key="role"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <div className="text-center">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
                How will you use DANZ?
              </h2>
              <p className="text-gray-400 mt-2">Choose your role to get started</p>
            </div>

            <div className="space-y-4">
              <button
                type="button"
                onClick={() => setUserRole('attendee')}
                className={`w-full p-6 rounded-xl border-2 transition-all ${
                  userRole === 'attendee'
                    ? 'bg-purple-600/20 border-purple-500'
                    : 'bg-black/30 border-purple-500/30 hover:border-purple-500/50'
                }`}
              >
                <FiUsers className="w-8 h-8 mx-auto mb-3 text-purple-400" />
                <h3 className="text-lg font-semibold text-white mb-2">I'm a Dancer</h3>
                <p className="text-sm text-gray-400">
                  Join events, connect with dancers, and share your journey
                </p>
              </button>

              <button
                type="button"
                onClick={() => setUserRole('organizer')}
                className={`w-full p-6 rounded-xl border-2 transition-all ${
                  userRole === 'organizer'
                    ? 'bg-purple-600/20 border-purple-500'
                    : 'bg-black/30 border-purple-500/30 hover:border-purple-500/50'
                }`}
              >
                <FiCalendar className="w-8 h-8 mx-auto mb-3 text-purple-400" />
                <h3 className="text-lg font-semibold text-white mb-2">I'm an Organizer</h3>
                <p className="text-sm text-gray-400">
                  Create events, manage registrations, and grow your community
                </p>
              </button>
            </div>
          </motion.div>
        )

      case 'username':
        return (
          <motion.div
            key="username"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <div className="text-center">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
                Choose your username
              </h2>
              <p className="text-gray-400 mt-2">This can only be set once, choose wisely!</p>
            </div>

            <div className="space-y-4">
              <div>
                <div className={`relative rounded-xl border-2 transition-all ${
                  usernameError
                    ? 'border-red-500 bg-red-500/10'
                    : usernameAvailable
                      ? 'border-green-500 bg-green-500/10'
                      : 'border-purple-500/30 bg-black/50'
                }`}>
                  <span className="absolute left-4 top-3.5 text-gray-400">@</span>
                  <input
                    type="text"
                    value={formData.username}
                    onChange={e => handleUsernameChange(e.target.value)}
                    className="w-full px-10 py-3 bg-transparent text-white focus:outline-none pr-12"
                    placeholder="username"
                    autoComplete="off"
                    autoCorrect="off"
                    autoCapitalize="off"
                  />

                  <div className="absolute right-3 top-3.5">
                    {isCheckingUsername && (
                      <FiLoader className="w-5 h-5 text-purple-400 animate-spin" />
                    )}
                    {!isCheckingUsername && usernameAvailable && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center"
                      >
                        <FiCheck className="text-white text-sm" />
                      </motion.div>
                    )}
                    {!isCheckingUsername && usernameChecked && !usernameAvailable && formData.username && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center"
                      >
                        <FiX className="text-white text-sm" />
                      </motion.div>
                    )}
                  </div>
                </div>

                {/* Username feedback */}
                <AnimatePresence mode="wait">
                  {usernameError && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="flex items-center space-x-2 mt-2"
                    >
                      <FiX className="text-red-400 text-sm" />
                      <span className="text-sm text-red-400">{usernameError}</span>
                    </motion.div>
                  )}
                  {!isCheckingUsername && usernameAvailable && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="flex items-center space-x-2 mt-2"
                    >
                      <FiCheck className="text-green-400 text-sm" />
                      <span className="text-sm text-green-400">Great! This username is available</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div>
                <label className="block text-white mb-2 text-sm">
                  Display Name <span className="text-purple-400">*</span>
                </label>
                <input
                  type="text"
                  value={formData.displayName}
                  onChange={e => setFormData({ ...formData, displayName: e.target.value })}
                  className="w-full px-4 py-3 bg-black/50 border border-purple-500/30 rounded-xl text-white focus:border-purple-500 focus:outline-none"
                  placeholder="How should we call you?"
                />
              </div>
            </div>
          </motion.div>
        )

      case 'photo':
        return (
          <motion.div
            key="photo"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <div className="text-center">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
                Add your photo
              </h2>
              <p className="text-gray-400 mt-2">Let the community see your amazing moves</p>
            </div>

            <div className="flex justify-center">
              <div className="relative">
                <div className="w-32 h-32 rounded-full overflow-hidden bg-black/30 border-2 border-purple-500/30">
                  {localAvatarPreview ? (
                    <img src={localAvatarPreview} alt="Avatar" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <FiCamera className="w-12 h-12 text-purple-400" />
                    </div>
                  )}
                </div>

                <label className="absolute bottom-0 right-0 bg-purple-600 rounded-full p-2 cursor-pointer hover:bg-purple-700 transition-colors">
                  <FiUpload className="w-5 h-5 text-white" />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageSelect}
                    className="hidden"
                    disabled={uploadingAvatar}
                  />
                </label>
              </div>
            </div>

            {localAvatarFile && (
              <div className="text-center">
                <p className="text-sm text-gray-400">
                  Selected: {localAvatarFile.name}
                </p>
              </div>
            )}

            <p className="text-center text-sm text-gray-400">
              You can skip this for now and add a photo later
            </p>
          </motion.div>
        )

      case 'about':
        return (
          <motion.div
            key="about"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <div className="text-center">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
                Tell us about yourself
              </h2>
              <p className="text-gray-400 mt-2">Help the community get to know you</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-white mb-2 text-sm">
                  Bio <span className="text-purple-400">*</span>
                </label>
                <textarea
                  value={formData.bio}
                  onChange={e => setFormData({ ...formData, bio: e.target.value.slice(0, 200) })}
                  className="w-full px-4 py-3 bg-black/50 border border-purple-500/30 rounded-xl text-white focus:border-purple-500 focus:outline-none resize-none"
                  rows={4}
                  placeholder="Share your dance journey..."
                />
                <p className="text-xs text-gray-400 mt-1">{formData.bio.length}/200 characters</p>
              </div>

              <div>
                <label className="block text-white mb-2 text-sm">
                  Location <span className="text-purple-400">*</span>
                </label>
                <input
                  type="text"
                  value={formData.city}
                  onChange={e => setFormData({ ...formData, city: e.target.value })}
                  className="w-full px-4 py-3 bg-black/50 border border-purple-500/30 rounded-xl text-white focus:border-purple-500 focus:outline-none"
                  placeholder="City, Country"
                />
              </div>

              <div>
                <label className="block text-white mb-2 text-sm">Pronouns</label>
                <input
                  type="text"
                  value={formData.pronouns}
                  onChange={e => setFormData({ ...formData, pronouns: e.target.value.toLowerCase() })}
                  className="w-full px-4 py-3 bg-black/50 border border-purple-500/30 rounded-xl text-white focus:border-purple-500 focus:outline-none"
                  placeholder="he/him, she/her, they/them"
                  autoCapitalize="none"
                  autoCorrect="off"
                />
              </div>
            </div>
          </motion.div>
        )

      case 'styles':
        return (
          <motion.div
            key="styles"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <div className="text-center">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
                Your dance styles
              </h2>
              <p className="text-gray-400 mt-2">Select all that apply</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-white mb-3 text-sm">
                  Dance Styles <span className="text-purple-400">*</span>
                </label>
                <div className="grid grid-cols-2 gap-2 max-h-64 overflow-y-auto">
                  {DANCE_STYLES.map(style => (
                    <button
                      key={style}
                      type="button"
                      onClick={() => {
                        if (formData.danceStyles.includes(style)) {
                          setFormData({
                            ...formData,
                            danceStyles: formData.danceStyles.filter(s => s !== style),
                          })
                        } else {
                          setFormData({
                            ...formData,
                            danceStyles: [...formData.danceStyles, style],
                          })
                        }
                      }}
                      className={`py-2 px-3 rounded-xl border transition-all flex items-center space-x-2 text-sm ${
                        formData.danceStyles.includes(style)
                          ? 'bg-purple-600 border-purple-500 text-white'
                          : 'bg-black/30 border-purple-500/30 text-gray-300 hover:border-purple-500/50'
                      }`}
                    >
                      <span>{DANCE_STYLE_EMOJIS[style] || '🕺'}</span>
                      <span>{style}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-white mb-3 text-sm">
                  Skill Level <span className="text-purple-400">*</span>
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {SKILL_LEVELS.map(level => (
                    <button
                      key={level}
                      type="button"
                      onClick={() => setFormData({ ...formData, skillLevel: level })}
                      className={`py-3 px-4 rounded-xl border transition-all ${
                        formData.skillLevel === level
                          ? 'bg-purple-600 border-purple-500 text-white'
                          : 'bg-black/30 border-purple-500/30 text-gray-300 hover:border-purple-500/50'
                      }`}
                    >
                      {SKILL_LEVEL_DISPLAY[level]}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )

      case 'social':
        return (
          <motion.div
            key="social"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <div className="text-center">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
                Connect your socials
              </h2>
              <p className="text-gray-400 mt-2">Optional - share your other platforms</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-white mb-2 text-sm">Instagram</label>
                <input
                  type="text"
                  value={formData.instagram}
                  onChange={e => setFormData({ ...formData, instagram: e.target.value })}
                  className="w-full px-4 py-3 bg-black/50 border border-purple-500/30 rounded-xl text-white focus:border-purple-500 focus:outline-none"
                  placeholder="@username"
                  autoCapitalize="none"
                />
              </div>

              <div>
                <label className="block text-white mb-2 text-sm">TikTok</label>
                <input
                  type="text"
                  value={formData.tiktok}
                  onChange={e => setFormData({ ...formData, tiktok: e.target.value })}
                  className="w-full px-4 py-3 bg-black/50 border border-purple-500/30 rounded-xl text-white focus:border-purple-500 focus:outline-none"
                  placeholder="@username"
                  autoCapitalize="none"
                />
              </div>

              <div>
                <label className="block text-white mb-2 text-sm">YouTube</label>
                <input
                  type="text"
                  value={formData.youtube}
                  onChange={e => setFormData({ ...formData, youtube: e.target.value })}
                  className="w-full px-4 py-3 bg-black/50 border border-purple-500/30 rounded-xl text-white focus:border-purple-500 focus:outline-none"
                  placeholder="Channel name or @handle"
                  autoCapitalize="none"
                />
              </div>

              <div>
                <label className="block text-white mb-2 text-sm">Twitter</label>
                <input
                  type="text"
                  value={formData.twitter}
                  onChange={e => setFormData({ ...formData, twitter: e.target.value })}
                  className="w-full px-4 py-3 bg-black/50 border border-purple-500/30 rounded-xl text-white focus:border-purple-500 focus:outline-none"
                  placeholder="@username"
                  autoCapitalize="none"
                />
              </div>
            </div>
          </motion.div>
        )

      case 'organization':
        return (
          <motion.div
            key="organization"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <div className="text-center">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
                Organizer Information
              </h2>
              <p className="text-gray-400 mt-2">Tell us about your events and organization</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-white mb-2 text-sm">
                  Company/Organization Name <span className="text-purple-400">*</span>
                </label>
                <input
                  type="text"
                  value={formData.companyName}
                  onChange={e => setFormData({ ...formData, companyName: e.target.value })}
                  className="w-full px-4 py-3 bg-black/50 border border-purple-500/30 rounded-xl text-white focus:border-purple-500 focus:outline-none"
                  placeholder="Enter your company or organization name"
                />
              </div>

              <div>
                <label className="block text-white mb-2 text-sm">
                  Event Types <span className="text-purple-400">*</span>
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {EVENT_TYPES.map(type => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => {
                        if (formData.eventTypes.includes(type)) {
                          setFormData({
                            ...formData,
                            eventTypes: formData.eventTypes.filter(t => t !== type),
                          })
                        } else {
                          setFormData({
                            ...formData,
                            eventTypes: [...formData.eventTypes, type],
                          })
                        }
                      }}
                      className={`py-2 px-3 rounded-xl border transition-all text-sm ${
                        formData.eventTypes.includes(type)
                          ? 'bg-purple-600 border-purple-500 text-white'
                          : 'bg-black/30 border-purple-500/30 text-gray-300 hover:border-purple-500/50'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-white mb-2 text-sm">
                  Tell us about your events <span className="text-purple-400">*</span>
                </label>
                <textarea
                  value={formData.organizerBio}
                  onChange={e => setFormData({ ...formData, organizerBio: e.target.value.slice(0, 500) })}
                  className="w-full px-4 py-3 bg-black/50 border border-purple-500/30 rounded-xl text-white focus:border-purple-500 focus:outline-none resize-none"
                  rows={4}
                  placeholder="Describe your events, experience, and what makes them special..."
                />
                <p className="text-xs text-gray-400 mt-1">{formData.organizerBio.length}/500 characters</p>
              </div>

              <div>
                <label className="block text-white mb-2 text-sm">Who invited you? (optional)</label>
                <input
                  type="text"
                  value={formData.invitedBy}
                  onChange={e => setFormData({ ...formData, invitedBy: e.target.value })}
                  className="w-full px-4 py-3 bg-black/50 border border-purple-500/30 rounded-xl text-white focus:border-purple-500 focus:outline-none"
                  placeholder="Name of person or organization"
                />
              </div>

              <div>
                <label className="block text-white mb-2 text-sm">Website (optional)</label>
                <input
                  type="text"
                  value={formData.websiteUrl}
                  onChange={e => setFormData({ ...formData, websiteUrl: e.target.value })}
                  className="w-full px-4 py-3 bg-black/50 border border-purple-500/30 rounded-xl text-white focus:border-purple-500 focus:outline-none"
                  placeholder="https://www.example.com"
                  autoCapitalize="none"
                />
              </div>
            </div>

            <div className="bg-purple-900/20 rounded-xl p-4 border border-purple-500/20">
              <p className="text-sm text-purple-300">
                <strong>Note:</strong> Your organizer application will be reviewed within 24-48 hours.
                You'll receive a notification once approved.
              </p>
            </div>
          </motion.div>
        )

      default:
        return null
    }
  }

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current)
      }
    }
  }, [])

  // Show loading state while checking user profile
  if (meLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-purple-900/20 to-black flex items-center justify-center p-4">
        <div className="text-center">
          <FiLoader className="w-8 h-8 text-purple-400 animate-spin mx-auto mb-4" />
          <p className="text-gray-400">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-900/20 to-black flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-2xl"
      >
        {/* Content Card with Progress Bar */}
        <motion.div
          layout
          className="bg-black/50 backdrop-blur-md rounded-2xl border border-purple-500/20 overflow-hidden"
        >
          {/* Progress Bar */}
          <div className="p-8 pb-4">
            <div className="flex items-center justify-between mb-6">
              {steps.map((step, index) => {
                const isCompleted = completedSteps.includes(step.id)
                const isCurrent = step.id === currentStep
                const stepNumber = index + 1

                return (
                  <div key={step.id} className="flex items-center flex-1 last:flex-none">
                    <div className="relative">
                      <motion.div
                        initial={false}
                        animate={{
                          scale: isCurrent ? 1.1 : 1,
                          backgroundColor: isCompleted
                            ? '#10b981'
                            : isCurrent
                              ? '#a855f7'
                              : '#374151',
                        }}
                        transition={{ duration: 0.2 }}
                        className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold ${
                          isCompleted || isCurrent ? '' : 'text-gray-400'
                        }`}
                      >
                        {isCompleted ? <FiCheck /> : stepNumber}
                      </motion.div>
                      {isCurrent && (
                        <motion.div
                          className="absolute inset-0 border-2 border-purple-500 rounded-full"
                          initial={{ scale: 1 }}
                          animate={{ scale: 1.3, opacity: 0 }}
                          transition={{ duration: 1, repeat: 0 }}
                        />
                      )}
                    </div>
                    {index < steps.length - 1 && (
                      <div className="flex-1 h-0.5 mx-2 bg-gray-700 relative">
                        <motion.div
                          initial={false}
                          animate={{
                            scaleX: isCompleted ? 1 : 0,
                          }}
                          transition={{ duration: 0.3 }}
                          style={{ originX: 0 }}
                          className="absolute inset-0 bg-green-500"
                        />
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-400">
                Step {steps.findIndex(s => s.id === currentStep) + 1} of {steps.length}
              </p>
            </div>
          </div>

          {/* Content */}
          <div className="px-8 pb-8">
            <AnimatePresence mode="wait">{renderStepContent()}</AnimatePresence>

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
              {currentStep !== 'welcome' && (
                <button
                  onClick={handleBack}
                  disabled={isLoading || uploadingAvatar}
                  className="px-6 py-2 text-gray-400 hover:text-white transition-colors disabled:opacity-50"
                >
                  Back
                </button>
              )}

              <button
                onClick={handleNext}
                disabled={
                  isLoading ||
                  uploadingAvatar ||
                  isCheckingUsername ||
                  (currentStep === 'welcome' && !agreedToTerms) ||
                  (currentStep === 'role' && !userRole) ||
                  !validateCurrentStep()
                }
                className={`${
                  currentStep === 'welcome' ? 'w-full' : 'ml-auto'
                } px-8 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold rounded-xl hover:from-pink-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center space-x-2`}
              >
                <span>
                  {isLoading || uploadingAvatar
                    ? 'Loading...'
                    : currentStep === 'welcome'
                      ? isAuthenticated ? 'Continue' : 'Get Started'
                      : (userRole === 'organizer' && currentStep === 'organization') ||
                        (userRole === 'attendee' && currentStep === 'social')
                        ? "Let's Dance!"
                        : currentStep === 'photo'
                          ? localAvatarFile ? 'Continue' : 'Skip for now'
                          : 'Continue'}
                </span>
                {!isLoading && !uploadingAvatar && <FiChevronRight />}
              </button>
            </div>
          </div>
        </motion.div>

        {/* Skip link for returning users */}
        {currentStep === 'welcome' && !isAuthenticated && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center mt-4"
          >
            <button
              type="button"
              onClick={login}
              className="text-gray-400 hover:text-purple-400 transition-colors text-sm"
            >
              Already have an account? Login →
            </button>
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}