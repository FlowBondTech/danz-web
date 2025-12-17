'use client'

import { useMutation } from '@apollo/client'
import { gql } from 'graphql-tag'
import { useEffect, useRef, useState } from 'react'
import { FaTiktok } from 'react-icons/fa'
import {
  FiCamera,
  FiCheck,
  FiEdit3,
  FiInstagram,
  FiLink,
  FiMapPin,
  FiTwitter,
  FiUser,
  FiYoutube,
} from 'react-icons/fi'

const UPDATE_PROFILE = gql`
  mutation UpdateProfile($input: UpdateProfileInput!) {
    updateProfile(input: $input) {
      privy_id
      username
      display_name
      bio
      avatar_url
      cover_image_url
      location
      city
      website
      website_url
      instagram
      tiktok
      youtube
      twitter
      dance_styles
      skill_level
      favorite_music
      age
      pronouns
      is_public
      allow_messages
      show_location
      role
      xp
      level
      subscription_tier
      is_premium
      total_dance_time
      total_sessions
      longest_streak
      total_events_attended
      total_events_created
      upcoming_events_count
      total_achievements
      dance_bonds_count
      created_at
      updated_at
    }
  }
`

const DANCE_STYLES = [
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
  'Krump',
  'Waacking',
  'Voguing',
  'Afrobeats',
  'Dancehall',
  'K-Pop',
]

const SKILL_LEVELS = [
  { value: 'beginner', label: 'Beginner', description: 'Just starting out' },
  { value: 'intermediate', label: 'Intermediate', description: 'Comfortable with basics' },
  { value: 'advanced', label: 'Advanced', description: 'Highly skilled' },
  { value: 'professional', label: 'Professional', description: 'Teaching or performing' },
]

interface ProfileEditFormProps {
  user: any
  onSave?: () => void
  onCancel?: () => void
}

export default function ProfileEditForm({ user, onSave, onCancel }: ProfileEditFormProps) {
  const [formData, setFormData] = useState({
    username: '',
    display_name: '',
    bio: '',
    avatar_url: '',
    cover_image_url: '',
    location: '',
    city: '',
    website: '',
    website_url: '',
    instagram: '',
    tiktok: '',
    youtube: '',
    twitter: '',
    dance_styles: [] as string[],
    skill_level: '',
    favorite_music: [] as string[],
    age: null as number | null,
    pronouns: '',
    is_public: true,
    allow_messages: true,
    show_location: true,
  })
  const [hasChanges, setHasChanges] = useState(false)
  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const [uploadingAvatar, setUploadingAvatar] = useState(false)
  const [uploadingCover, setUploadingCover] = useState(false)

  const avatarInputRef = useRef<HTMLInputElement>(null)
  const coverInputRef = useRef<HTMLInputElement>(null)

  const [updateProfile, { loading: saving }] = useMutation(UPDATE_PROFILE, {
    update(cache, { data }) {
      if (data?.updateProfile) {
        // Update the me query cache with the new profile data
        cache.modify({
          fields: {
            me() {
              return data.updateProfile
            },
          },
        })
      }
    },
    onCompleted: () => {
      setHasChanges(false)
      if (onSave) onSave()
    },
    onError: error => {
      console.error('Error updating profile:', error)
      setErrors({ submit: 'Failed to update profile. Please try again.' })
    },
  })

  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username || '',
        display_name: user.display_name || '',
        bio: user.bio || '',
        avatar_url: user.avatar_url || '',
        cover_image_url: user.cover_image_url || '',
        location: user.location || '',
        city: user.city || '',
        website: user.website || '',
        website_url: user.website_url || '',
        instagram: user.instagram || '',
        tiktok: user.tiktok || '',
        youtube: user.youtube || '',
        twitter: user.twitter || '',
        dance_styles: user.dance_styles || [],
        skill_level: user.skill_level || '',
        favorite_music: user.favorite_music || [],
        age: user.age || null,
        pronouns: user.pronouns || '',
        is_public: user.is_public ?? true,
        allow_messages: user.allow_messages ?? true,
        show_location: user.show_location ?? true,
      })
    }
  }, [user])

  useEffect(() => {
    // Check if any field has changed
    const changed =
      formData.display_name !== (user?.display_name || '') ||
      formData.bio !== (user?.bio || '') ||
      formData.avatar_url !== (user?.avatar_url || '') ||
      formData.cover_image_url !== (user?.cover_image_url || '') ||
      formData.location !== (user?.location || '') ||
      formData.city !== (user?.city || '') ||
      formData.website !== (user?.website || '') ||
      formData.instagram !== (user?.instagram || '') ||
      formData.tiktok !== (user?.tiktok || '') ||
      formData.youtube !== (user?.youtube || '') ||
      formData.twitter !== (user?.twitter || '') ||
      formData.pronouns !== (user?.pronouns || '') ||
      formData.skill_level !== (user?.skill_level || '') ||
      JSON.stringify(formData.dance_styles) !== JSON.stringify(user?.dance_styles || [])

    setHasChanges(changed)
  }, [formData, user])

  // Helper to remove spaces from social media handles
  const sanitizeSocialHandle = (value: string) => {
    return value.replace(/\s/g, '')
  }

  const handleDanceStyleToggle = (style: string) => {
    setFormData(prev => ({
      ...prev,
      dance_styles: prev.dance_styles.includes(style)
        ? prev.dance_styles.filter(s => s !== style)
        : [...prev.dance_styles, style],
    }))
  }

  const handleImageUpload = async (file: File, type: 'avatar' | 'cover') => {
    const isAvatar = type === 'avatar'
    const setUploading = isAvatar ? setUploadingAvatar : setUploadingCover
    const maxSize = isAvatar ? 5 * 1024 * 1024 : 10 * 1024 * 1024

    // Validate file
    if (!file.type.startsWith('image/')) {
      setErrors({ [type]: 'Please select an image file' })
      return
    }

    if (file.size > maxSize) {
      setErrors({
        [type]: `File size must be less than ${isAvatar ? '5MB' : '10MB'}`,
      })
      return
    }

    try {
      setUploading(true)
      setErrors({})

      // Get upload URL from GraphQL
      const response = await fetch(process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: `
            query GetUploadUrl($fileName: String!, $mimeType: MimeType!, $uploadType: UploadType!) {
              getUploadUrl(fileName: $fileName, mimeType: $mimeType, uploadType: $uploadType) {
                uploadUrl
                fields
                publicUrl
              }
            }
          `,
          variables: {
            fileName: file.name,
            mimeType: file.type.replace('/', '_').replace('-', '_').toUpperCase(),
            uploadType: type.toUpperCase(),
          },
        }),
      })

      const { data } = await response.json()
      if (!data?.getUploadUrl) {
        throw new Error('Failed to get upload URL')
      }

      const { uploadUrl, fields, publicUrl } = data.getUploadUrl

      // Upload to S3
      const formData = new FormData()
      Object.entries(fields).forEach(([key, value]) => {
        formData.append(key, value as string)
      })
      formData.append('file', file)

      const uploadResponse = await fetch(uploadUrl, {
        method: 'POST',
        body: formData,
      })

      if (!uploadResponse.ok) {
        throw new Error('Failed to upload file to S3')
      }

      // Update form data with new URL
      setFormData(prev => ({
        ...prev,
        [isAvatar ? 'avatar_url' : 'cover_image_url']: publicUrl,
      }))
    } catch (err: any) {
      console.error('Upload error:', err)
      setErrors({ [type]: err.message || 'Failed to upload image' })
    } finally {
      setUploading(false)
    }
  }

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      handleImageUpload(file, 'avatar')
    }
  }

  const handleCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      handleImageUpload(file, 'cover')
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrors({})

    // Only send changed fields
    const changedFields: any = {}

    if (formData.display_name !== user?.display_name)
      changedFields.display_name = formData.display_name
    if (formData.bio !== user?.bio) changedFields.bio = formData.bio
    if (formData.avatar_url !== user?.avatar_url) changedFields.avatar_url = formData.avatar_url
    if (formData.cover_image_url !== user?.cover_image_url)
      changedFields.cover_image_url = formData.cover_image_url
    if (formData.location !== user?.location) changedFields.location = formData.location
    if (formData.city !== user?.city) changedFields.city = formData.city
    if (formData.website !== user?.website) changedFields.website = formData.website
    if (formData.instagram !== user?.instagram) changedFields.instagram = formData.instagram
    if (formData.tiktok !== user?.tiktok) changedFields.tiktok = formData.tiktok
    if (formData.youtube !== user?.youtube) changedFields.youtube = formData.youtube
    if (formData.twitter !== user?.twitter) changedFields.twitter = formData.twitter
    if (formData.pronouns !== user?.pronouns) changedFields.pronouns = formData.pronouns
    if (formData.skill_level !== user?.skill_level) changedFields.skill_level = formData.skill_level
    if (JSON.stringify(formData.dance_styles) !== JSON.stringify(user?.dance_styles)) {
      changedFields.dance_styles = formData.dance_styles
    }

    if (Object.keys(changedFields).length === 0) {
      return // No changes to save
    }

    await updateProfile({
      variables: {
        input: changedFields,
      },
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Profile Images Preview */}
      <div className="relative">
        {/* Cover Image */}
        <div className="relative h-48 sm:h-64 rounded-2xl overflow-hidden bg-gradient-to-br from-neon-purple/20 to-neon-pink/20 border border-neon-purple/20">
          {formData.cover_image_url ? (
            <img
              src={formData.cover_image_url}
              alt="Cover"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <FiCamera className="w-12 h-12 mx-auto mb-2 text-text-secondary" />
                <p className="text-text-secondary text-sm">Add cover image</p>
              </div>
            </div>
          )}

          {/* Cover Edit Button */}
          <button
            type="button"
            onClick={() => coverInputRef.current?.click()}
            disabled={uploadingCover}
            className="absolute top-4 right-4 p-3 bg-bg-primary/90 hover:bg-bg-primary border border-white/20 hover:border-neon-purple/50 rounded-xl text-text-primary hover:text-neon-purple transition-all backdrop-blur-sm disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Edit cover image"
          >
            {uploadingCover ? (
              <div className="w-5 h-5 border-2 border-neon-purple/30 border-t-neon-purple rounded-full animate-spin" />
            ) : (
              <FiEdit3 size={20} />
            )}
          </button>

          <input
            ref={coverInputRef}
            type="file"
            accept="image/jpeg,image/png,image/gif,image/webp"
            onChange={handleCoverChange}
            className="hidden"
          />
        </div>

        {/* Profile Avatar */}
        <div className="absolute -bottom-16 left-6 sm:left-8">
          <div className="relative group">
            {formData.avatar_url ? (
              <img
                src={formData.avatar_url}
                alt="Avatar"
                className="w-32 h-32 rounded-full object-cover border-4 border-bg-primary"
              />
            ) : (
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-neon-purple to-neon-pink flex items-center justify-center text-white text-4xl font-bold border-4 border-bg-primary">
                {formData.username?.charAt(0).toUpperCase() || 'D'}
              </div>
            )}

            {/* Avatar Edit Button */}
            <button
              type="button"
              onClick={() => avatarInputRef.current?.click()}
              disabled={uploadingAvatar}
              className="absolute bottom-0 right-0 p-2.5 bg-gradient-to-br from-neon-purple to-neon-pink hover:from-neon-purple/90 hover:to-neon-pink/90 rounded-full text-white transition-all shadow-lg hover:shadow-neon-purple/50 disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Edit profile picture"
            >
              {uploadingAvatar ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <FiCamera size={16} />
              )}
            </button>

            <input
              ref={avatarInputRef}
              type="file"
              accept="image/jpeg,image/png,image/gif,image/webp"
              onChange={handleAvatarChange}
              className="hidden"
            />
          </div>
        </div>

        {/* Image Upload Errors */}
        {(errors.avatar || errors.cover) && (
          <div className="mt-20 space-y-2">
            {errors.avatar && <p className="text-sm text-red-400">{errors.avatar}</p>}
            {errors.cover && <p className="text-sm text-red-400">{errors.cover}</p>}
          </div>
        )}

        {/* Spacing for avatar overflow */}
        <div className="h-20" />
      </div>

      {/* Basic Information */}
      <div>
        <h3 className="text-xl font-bold text-text-primary mb-6">Basic Information</h3>
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label htmlFor="username" className="block text-text-secondary text-sm mb-2">
              Username
            </label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary">@</div>
              <input
                id="username"
                type="text"
                value={formData.username}
                disabled
                className="w-full pl-8 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-text-secondary cursor-not-allowed"
              />
            </div>
            <p className="text-text-secondary text-xs mt-1">Username cannot be changed</p>
          </div>

          <div>
            <label htmlFor="display-name" className="block text-text-secondary text-sm mb-2">
              Display Name
            </label>
            <div className="relative">
              <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" />
              <input
                id="display-name"
                type="text"
                value={formData.display_name}
                onChange={e => setFormData(prev => ({ ...prev, display_name: e.target.value }))}
                className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-text-primary focus:outline-none focus:border-neon-purple transition-colors"
                placeholder="How should we display your name?"
              />
            </div>
          </div>

          <div className="md:col-span-2">
            <label htmlFor="bio-field" className="block text-text-secondary text-sm mb-2">
              Bio
            </label>
            <textarea
              id="bio-field"
              value={formData.bio}
              onChange={e => setFormData(prev => ({ ...prev, bio: e.target.value }))}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-text-primary focus:outline-none focus:border-neon-purple transition-colors resize-none"
              rows={4}
              placeholder="Tell us about yourself..."
            />
          </div>

          <div>
            <label htmlFor="pronouns" className="block text-text-secondary text-sm mb-2">
              Pronouns
            </label>
            <input
              id="pronouns"
              type="text"
              value={formData.pronouns}
              onChange={e => setFormData(prev => ({ ...prev, pronouns: e.target.value }))}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-text-primary focus:outline-none focus:border-neon-purple transition-colors"
              placeholder="e.g., she/her, he/him, they/them"
            />
          </div>

          <div>
            <label htmlFor="skill-level" className="block text-text-secondary text-sm mb-2">
              Skill Level
            </label>
            <select
              id="skill-level"
              value={formData.skill_level}
              onChange={e => setFormData(prev => ({ ...prev, skill_level: e.target.value }))}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-text-primary focus:outline-none focus:border-neon-purple transition-colors"
            >
              <option value="">Select skill level</option>
              {SKILL_LEVELS.map(level => (
                <option key={level.value} value={level.value}>
                  {level.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Location */}
      <div>
        <h3 className="text-xl font-bold text-text-primary mb-6">Location</h3>
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label htmlFor="city" className="block text-text-secondary text-sm mb-2">
              City
            </label>
            <div className="relative">
              <FiMapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" />
              <input
                id="city"
                type="text"
                value={formData.city}
                onChange={e => setFormData(prev => ({ ...prev, city: e.target.value }))}
                className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-text-primary focus:outline-none focus:border-neon-purple transition-colors"
                placeholder="e.g., Los Angeles"
              />
            </div>
          </div>

          <div>
            <label htmlFor="location" className="block text-text-secondary text-sm mb-2">
              Location
            </label>
            <input
              id="location"
              type="text"
              value={formData.location}
              onChange={e => setFormData(prev => ({ ...prev, location: e.target.value }))}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-text-primary focus:outline-none focus:border-neon-purple transition-colors"
              placeholder="e.g., California, USA"
            />
          </div>
        </div>
      </div>

      {/* Social Links */}
      <div>
        <h3 className="text-xl font-bold text-text-primary mb-6">Social Links</h3>
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label htmlFor="website" className="block text-text-secondary text-sm mb-2">
              Website
            </label>
            <div className="relative">
              <FiLink className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" />
              <input
                id="website"
                type="url"
                value={formData.website}
                onChange={e => setFormData(prev => ({ ...prev, website: e.target.value }))}
                className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-text-primary focus:outline-none focus:border-neon-purple transition-colors"
                placeholder="https://yourwebsite.com"
              />
            </div>
          </div>

          <div>
            <label htmlFor="instagram" className="block text-text-secondary text-sm mb-2">
              Instagram
            </label>
            <div className="relative">
              <FiInstagram className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" />
              <input
                id="instagram"
                type="text"
                value={formData.instagram}
                onChange={e =>
                  setFormData(prev => ({ ...prev, instagram: sanitizeSocialHandle(e.target.value) }))
                }
                className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-text-primary focus:outline-none focus:border-neon-purple transition-colors"
                placeholder="@username"
              />
            </div>
          </div>

          <div>
            <label htmlFor="tiktok" className="block text-text-secondary text-sm mb-2">
              TikTok
            </label>
            <div className="relative">
              <FaTiktok className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" />
              <input
                id="tiktok"
                type="text"
                value={formData.tiktok}
                onChange={e =>
                  setFormData(prev => ({ ...prev, tiktok: sanitizeSocialHandle(e.target.value) }))
                }
                className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-text-primary focus:outline-none focus:border-neon-purple transition-colors"
                placeholder="@username"
              />
            </div>
          </div>

          <div>
            <label htmlFor="youtube" className="block text-text-secondary text-sm mb-2">
              YouTube
            </label>
            <div className="relative">
              <FiYoutube className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" />
              <input
                id="youtube"
                type="text"
                value={formData.youtube}
                onChange={e =>
                  setFormData(prev => ({ ...prev, youtube: sanitizeSocialHandle(e.target.value) }))
                }
                className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-text-primary focus:outline-none focus:border-neon-purple transition-colors"
                placeholder="@channel"
              />
            </div>
          </div>

          <div>
            <label htmlFor="twitter" className="block text-text-secondary text-sm mb-2">
              Twitter
            </label>
            <div className="relative">
              <FiTwitter className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" />
              <input
                id="twitter"
                type="text"
                value={formData.twitter}
                onChange={e =>
                  setFormData(prev => ({ ...prev, twitter: sanitizeSocialHandle(e.target.value) }))
                }
                className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-text-primary focus:outline-none focus:border-neon-purple transition-colors"
                placeholder="@username"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Dance Styles */}
      <div>
        <h3 className="text-xl font-bold text-text-primary mb-6">Dance Styles</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {DANCE_STYLES.map(style => (
            <button
              key={style}
              type="button"
              onClick={() => handleDanceStyleToggle(style)}
              className={`px-4 py-2 rounded-lg border transition-all ${
                formData.dance_styles.includes(style)
                  ? 'bg-neon-purple/20 border-neon-purple text-neon-purple'
                  : 'bg-white/5 border-white/10 text-text-secondary hover:border-white/20'
              }`}
            >
              <span className="flex items-center justify-center gap-2">
                {formData.dance_styles.includes(style) && <FiCheck size={16} />}
                {style}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Submit Buttons */}
      {errors.submit && (
        <div className="p-4 bg-red-400/10 border border-red-400/20 rounded-lg">
          <p className="text-red-400">{errors.submit}</p>
        </div>
      )}

      <div className="flex gap-4">
        {onCancel && (
          <button type="button" onClick={onCancel} className="btn btn-outline" disabled={saving}>
            Cancel
          </button>
        )}
        <button type="submit" className="btn btn-primary" disabled={saving || !hasChanges}>
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
        {!hasChanges && (
          <span className="flex items-center text-text-secondary text-sm">
            <FiCheck className="mr-2" /> All changes saved
          </span>
        )}
      </div>
    </form>
  )
}
