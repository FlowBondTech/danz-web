import { gql } from '@apollo/client'
import * as Apollo from '@apollo/client'
export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] }
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> }
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> }
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = {
  [_ in K]?: never
}
export type Incremental<T> =
  | T
  | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never }
const defaultOptions = {} as const
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string }
  String: { input: string; output: string }
  Boolean: { input: boolean; output: boolean }
  Int: { input: number; output: number }
  Float: { input: number; output: number }
  DateTime: { input: any; output: any }
  JSON: { input: any; output: any }
}

export type Achievement = {
  __typename?: 'Achievement'
  achievement_type: Scalars['String']['output']
  danz_reward?: Maybe<Scalars['Float']['output']>
  description?: Maybe<Scalars['String']['output']>
  icon?: Maybe<Scalars['String']['output']>
  id: Scalars['ID']['output']
  title: Scalars['String']['output']
  unlocked_at?: Maybe<Scalars['DateTime']['output']>
  user_id: Scalars['String']['output']
  xp_reward?: Maybe<Scalars['Int']['output']>
}

export type AdminStats = {
  __typename?: 'AdminStats'
  activeUsers: Scalars['Int']['output']
  eventsThisMonth: Scalars['Int']['output']
  newUsersThisMonth: Scalars['Int']['output']
  totalEvents: Scalars['Int']['output']
  totalRevenue: Scalars['Float']['output']
  totalUsers: Scalars['Int']['output']
  upcomingEvents: Scalars['Int']['output']
}

export type CreateEventInput = {
  category?: InputMaybe<EventCategory>
  currency?: InputMaybe<Scalars['String']['input']>
  dance_styles?: InputMaybe<Array<Scalars['String']['input']>>
  description?: InputMaybe<Scalars['String']['input']>
  end_date_time: Scalars['DateTime']['input']
  image_url?: InputMaybe<Scalars['String']['input']>
  is_featured?: InputMaybe<Scalars['Boolean']['input']>
  is_virtual?: InputMaybe<Scalars['Boolean']['input']>
  location_address?: InputMaybe<Scalars['String']['input']>
  location_city?: InputMaybe<Scalars['String']['input']>
  location_latitude?: InputMaybe<Scalars['Float']['input']>
  location_longitude?: InputMaybe<Scalars['Float']['input']>
  location_name: Scalars['String']['input']
  max_capacity?: InputMaybe<Scalars['Int']['input']>
  price_danz?: InputMaybe<Scalars['Float']['input']>
  price_usd?: InputMaybe<Scalars['Float']['input']>
  requirements?: InputMaybe<Scalars['String']['input']>
  skill_level?: InputMaybe<SkillLevel>
  start_date_time: Scalars['DateTime']['input']
  tags?: InputMaybe<Array<Scalars['String']['input']>>
  title: Scalars['String']['input']
  virtual_link?: InputMaybe<Scalars['String']['input']>
}

export type DanceBond = {
  __typename?: 'DanceBond'
  bond_level?: Maybe<Scalars['Int']['output']>
  created_at?: Maybe<Scalars['DateTime']['output']>
  id: Scalars['ID']['output']
  otherUser?: Maybe<User>
  shared_sessions?: Maybe<Scalars['Int']['output']>
  updated_at?: Maybe<Scalars['DateTime']['output']>
  user1_id: Scalars['String']['output']
  user2_id: Scalars['String']['output']
}

export type Event = {
  __typename?: 'Event'
  category?: Maybe<EventCategory>
  created_at: Scalars['DateTime']['output']
  currency?: Maybe<Scalars['String']['output']>
  current_capacity?: Maybe<Scalars['Int']['output']>
  dance_styles?: Maybe<Array<Scalars['String']['output']>>
  description?: Maybe<Scalars['String']['output']>
  distance?: Maybe<Scalars['Float']['output']>
  end_date_time: Scalars['DateTime']['output']
  facilitator?: Maybe<User>
  facilitator_id?: Maybe<Scalars['String']['output']>
  id: Scalars['ID']['output']
  image_url?: Maybe<Scalars['String']['output']>
  is_featured?: Maybe<Scalars['Boolean']['output']>
  is_registered?: Maybe<Scalars['Boolean']['output']>
  is_virtual?: Maybe<Scalars['Boolean']['output']>
  location_address?: Maybe<Scalars['String']['output']>
  location_city?: Maybe<Scalars['String']['output']>
  location_latitude?: Maybe<Scalars['Float']['output']>
  location_longitude?: Maybe<Scalars['Float']['output']>
  location_name: Scalars['String']['output']
  max_capacity?: Maybe<Scalars['Int']['output']>
  participants?: Maybe<Array<EventRegistration>>
  price_danz?: Maybe<Scalars['Float']['output']>
  price_usd?: Maybe<Scalars['Float']['output']>
  registration_count?: Maybe<Scalars['Int']['output']>
  requirements?: Maybe<Scalars['String']['output']>
  skill_level?: Maybe<SkillLevel>
  start_date_time: Scalars['DateTime']['output']
  status?: Maybe<EventStatus>
  tags?: Maybe<Array<Scalars['String']['output']>>
  title: Scalars['String']['output']
  updated_at: Scalars['DateTime']['output']
  user_registration_status?: Maybe<RegistrationStatus>
  virtual_link?: Maybe<Scalars['String']['output']>
}

export enum EventCategory {
  Ballet = 'ballet',
  Ballroom = 'ballroom',
  Battle = 'battle',
  Class = 'class',
  Contemporary = 'contemporary',
  Cultural = 'cultural',
  Fitness = 'fitness',
  HipHop = 'hip_hop',
  Jazz = 'jazz',
  Other = 'other',
  Performance = 'performance',
  Salsa = 'salsa',
  Social = 'social',
  Street = 'street',
  Workshop = 'workshop',
}

export type EventConnection = {
  __typename?: 'EventConnection'
  events: Array<Event>
  pageInfo: PageInfo
  totalCount: Scalars['Int']['output']
}

export type EventFilterInput = {
  category?: InputMaybe<EventCategory>
  city?: InputMaybe<Scalars['String']['input']>
  created_by?: InputMaybe<Scalars['String']['input']>
  created_by_me?: InputMaybe<Scalars['Boolean']['input']>
  dance_style?: InputMaybe<Scalars['String']['input']>
  endDate?: InputMaybe<Scalars['DateTime']['input']>
  facilitator_id?: InputMaybe<Scalars['String']['input']>
  is_featured?: InputMaybe<Scalars['Boolean']['input']>
  is_virtual?: InputMaybe<Scalars['Boolean']['input']>
  maxPrice?: InputMaybe<Scalars['Float']['input']>
  minPrice?: InputMaybe<Scalars['Float']['input']>
  nearLocation?: InputMaybe<LocationInput>
  registered_by?: InputMaybe<Scalars['String']['input']>
  registered_by_me?: InputMaybe<Scalars['Boolean']['input']>
  skill_level?: InputMaybe<SkillLevel>
  startDate?: InputMaybe<Scalars['DateTime']['input']>
  status?: InputMaybe<EventStatus>
}

export type EventRegistration = {
  __typename?: 'EventRegistration'
  admin_notes?: Maybe<Scalars['String']['output']>
  check_in_time?: Maybe<Scalars['DateTime']['output']>
  checked_in?: Maybe<Scalars['Boolean']['output']>
  created_at?: Maybe<Scalars['DateTime']['output']>
  event?: Maybe<Event>
  event_id: Scalars['String']['output']
  id: Scalars['ID']['output']
  payment_amount?: Maybe<Scalars['Float']['output']>
  payment_date?: Maybe<Scalars['DateTime']['output']>
  payment_status?: Maybe<PaymentStatus>
  registration_date?: Maybe<Scalars['DateTime']['output']>
  status?: Maybe<RegistrationStatus>
  updated_at?: Maybe<Scalars['DateTime']['output']>
  user?: Maybe<User>
  user_id: Scalars['String']['output']
  user_notes?: Maybe<Scalars['String']['output']>
}

export enum EventSortBy {
  CreatedAtDesc = 'created_at_desc',
  DateAsc = 'date_asc',
  DateDesc = 'date_desc',
  PriceAsc = 'price_asc',
  PriceDesc = 'price_desc',
  TitleAsc = 'title_asc',
  TitleDesc = 'title_desc',
}

export enum EventStatus {
  Cancelled = 'cancelled',
  Ongoing = 'ongoing',
  Past = 'past',
  Upcoming = 'upcoming',
}

export type FileUploadResponse = {
  __typename?: 'FileUploadResponse'
  filename?: Maybe<Scalars['String']['output']>
  message?: Maybe<Scalars['String']['output']>
  mimetype?: Maybe<Scalars['String']['output']>
  size?: Maybe<Scalars['Int']['output']>
  success: Scalars['Boolean']['output']
  url?: Maybe<Scalars['String']['output']>
}

export type LocationInput = {
  latitude: Scalars['Float']['input']
  longitude: Scalars['Float']['input']
  radius?: InputMaybe<Scalars['Float']['input']>
}

export enum MimeType {
  ApplicationMsword = 'APPLICATION_MSWORD',
  ApplicationPdf = 'APPLICATION_PDF',
  ApplicationVndOpenxmlformatsOfficedocumentWordprocessingmlDocument = 'APPLICATION_VND_OPENXMLFORMATS_OFFICEDOCUMENT_WORDPROCESSINGML_DOCUMENT',
  ImageGif = 'IMAGE_GIF',
  ImageJpeg = 'IMAGE_JPEG',
  ImagePng = 'IMAGE_PNG',
  ImageWebp = 'IMAGE_WEBP',
  VideoAvi = 'VIDEO_AVI',
  VideoMp4 = 'VIDEO_MP4',
  VideoQuicktime = 'VIDEO_QUICKTIME',
  VideoWebm = 'VIDEO_WEBM',
}

export type Mutation = {
  __typename?: 'Mutation'
  _empty?: Maybe<Scalars['String']['output']>
  approveOrganizer: User
  cancelEventRegistration: MutationResponse
  checkInParticipant: EventRegistration
  createDanceBond: DanceBond
  createEvent: Event
  deleteEvent: MutationResponse
  featureEvent: Event
  registerForEvent: EventRegistration
  updateDanceBond: DanceBond
  updateEvent: Event
  updateProfile: User
  updateRegistrationStatus: EventRegistration
  updateUserRole: User
}

export type MutationApproveOrganizerArgs = {
  approved: Scalars['Boolean']['input']
  userId: Scalars['String']['input']
}

export type MutationCancelEventRegistrationArgs = {
  eventId: Scalars['ID']['input']
}

export type MutationCheckInParticipantArgs = {
  eventId: Scalars['ID']['input']
  userId: Scalars['String']['input']
}

export type MutationCreateDanceBondArgs = {
  userId: Scalars['String']['input']
}

export type MutationCreateEventArgs = {
  input: CreateEventInput
}

export type MutationDeleteEventArgs = {
  id: Scalars['ID']['input']
}

export type MutationFeatureEventArgs = {
  eventId: Scalars['ID']['input']
  featured: Scalars['Boolean']['input']
}

export type MutationRegisterForEventArgs = {
  eventId: Scalars['ID']['input']
  notes?: InputMaybe<Scalars['String']['input']>
}

export type MutationUpdateDanceBondArgs = {
  level: Scalars['Int']['input']
  userId: Scalars['String']['input']
}

export type MutationUpdateEventArgs = {
  id: Scalars['ID']['input']
  input: UpdateEventInput
}

export type MutationUpdateProfileArgs = {
  input: UpdateProfileInput
}

export type MutationUpdateRegistrationStatusArgs = {
  adminNotes?: InputMaybe<Scalars['String']['input']>
  eventId: Scalars['ID']['input']
  status: RegistrationStatus
  userId: Scalars['String']['input']
}

export type MutationUpdateUserRoleArgs = {
  role: UserRole
  userId: Scalars['String']['input']
}

export type MutationResponse = {
  __typename?: 'MutationResponse'
  code?: Maybe<Scalars['String']['output']>
  message?: Maybe<Scalars['String']['output']>
  success: Scalars['Boolean']['output']
}

export type PageInfo = {
  __typename?: 'PageInfo'
  endCursor?: Maybe<Scalars['String']['output']>
  hasNextPage: Scalars['Boolean']['output']
  hasPreviousPage: Scalars['Boolean']['output']
  startCursor?: Maybe<Scalars['String']['output']>
}

export type PaginationInput = {
  cursor?: InputMaybe<Scalars['String']['input']>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
}

export enum PaymentStatus {
  Free = 'free',
  Paid = 'paid',
  Pending = 'pending',
  Refunded = 'refunded',
}

export type Query = {
  __typename?: 'Query'
  _empty?: Maybe<Scalars['String']['output']>
  adminStats: AdminStats
  checkUsername: Scalars['Boolean']['output']
  event?: Maybe<Event>
  eventRegistrations: Array<EventRegistration>
  events: EventConnection
  getUploadUrl: UploadUrl
  me?: Maybe<User>
  myDanceBonds: Array<DanceBond>
  pendingOrganizers: UserConnection
  reportedContent?: Maybe<Scalars['JSON']['output']>
  user?: Maybe<User>
  users: UserConnection
}

export type QueryCheckUsernameArgs = {
  username: Scalars['String']['input']
}

export type QueryEventArgs = {
  id: Scalars['ID']['input']
}

export type QueryEventRegistrationsArgs = {
  eventId: Scalars['ID']['input']
  status?: InputMaybe<RegistrationStatus>
}

export type QueryEventsArgs = {
  filter?: InputMaybe<EventFilterInput>
  pagination?: InputMaybe<PaginationInput>
  sortBy?: InputMaybe<EventSortBy>
}

export type QueryGetUploadUrlArgs = {
  fileName: Scalars['String']['input']
  mimeType: MimeType
  uploadType: UploadType
}

export type QueryPendingOrganizersArgs = {
  pagination?: InputMaybe<PaginationInput>
}

export type QueryReportedContentArgs = {
  pagination?: InputMaybe<PaginationInput>
  status?: InputMaybe<Scalars['String']['input']>
  type?: InputMaybe<Scalars['String']['input']>
}

export type QueryUserArgs = {
  id: Scalars['String']['input']
}

export type QueryUsersArgs = {
  filter?: InputMaybe<UserFilterInput>
  pagination?: InputMaybe<PaginationInput>
}

export enum RegistrationStatus {
  Attended = 'attended',
  Cancelled = 'cancelled',
  NoShow = 'no_show',
  Registered = 'registered',
}

export enum SkillLevel {
  Advanced = 'advanced',
  All = 'all',
  Beginner = 'beginner',
  Intermediate = 'intermediate',
}

export type Subscription = {
  __typename?: 'Subscription'
  _empty?: Maybe<Scalars['String']['output']>
}

export type UpdateEventInput = {
  category?: InputMaybe<EventCategory>
  currency?: InputMaybe<Scalars['String']['input']>
  dance_styles?: InputMaybe<Array<Scalars['String']['input']>>
  description?: InputMaybe<Scalars['String']['input']>
  end_date_time?: InputMaybe<Scalars['DateTime']['input']>
  image_url?: InputMaybe<Scalars['String']['input']>
  is_featured?: InputMaybe<Scalars['Boolean']['input']>
  is_virtual?: InputMaybe<Scalars['Boolean']['input']>
  location_address?: InputMaybe<Scalars['String']['input']>
  location_city?: InputMaybe<Scalars['String']['input']>
  location_latitude?: InputMaybe<Scalars['Float']['input']>
  location_longitude?: InputMaybe<Scalars['Float']['input']>
  location_name?: InputMaybe<Scalars['String']['input']>
  max_capacity?: InputMaybe<Scalars['Int']['input']>
  price_danz?: InputMaybe<Scalars['Float']['input']>
  price_usd?: InputMaybe<Scalars['Float']['input']>
  requirements?: InputMaybe<Scalars['String']['input']>
  skill_level?: InputMaybe<SkillLevel>
  start_date_time?: InputMaybe<Scalars['DateTime']['input']>
  tags?: InputMaybe<Array<Scalars['String']['input']>>
  title?: InputMaybe<Scalars['String']['input']>
  virtual_link?: InputMaybe<Scalars['String']['input']>
}

export type UpdateProfileInput = {
  age?: InputMaybe<Scalars['Int']['input']>
  allow_messages?: InputMaybe<Scalars['Boolean']['input']>
  avatar_url?: InputMaybe<Scalars['String']['input']>
  bio?: InputMaybe<Scalars['String']['input']>
  city?: InputMaybe<Scalars['String']['input']>
  company_name?: InputMaybe<Scalars['String']['input']>
  cover_image_url?: InputMaybe<Scalars['String']['input']>
  dance_styles?: InputMaybe<Array<Scalars['String']['input']>>
  display_name?: InputMaybe<Scalars['String']['input']>
  event_types?: InputMaybe<Array<Scalars['String']['input']>>
  favorite_music?: InputMaybe<Array<Scalars['String']['input']>>
  instagram?: InputMaybe<Scalars['String']['input']>
  invited_by?: InputMaybe<Scalars['String']['input']>
  is_public?: InputMaybe<Scalars['Boolean']['input']>
  latitude?: InputMaybe<Scalars['Float']['input']>
  location?: InputMaybe<Scalars['String']['input']>
  longitude?: InputMaybe<Scalars['Float']['input']>
  notification_preferences?: InputMaybe<Scalars['JSON']['input']>
  organizer_bio?: InputMaybe<Scalars['String']['input']>
  pronouns?: InputMaybe<Scalars['String']['input']>
  show_location?: InputMaybe<Scalars['Boolean']['input']>
  skill_level?: InputMaybe<SkillLevel>
  social_media_links?: InputMaybe<Scalars['JSON']['input']>
  tiktok?: InputMaybe<Scalars['String']['input']>
  twitter?: InputMaybe<Scalars['String']['input']>
  username?: InputMaybe<Scalars['String']['input']>
  website?: InputMaybe<Scalars['String']['input']>
  website_url?: InputMaybe<Scalars['String']['input']>
  youtube?: InputMaybe<Scalars['String']['input']>
}

export enum UploadType {
  Avatar = 'avatar',
  Cover = 'cover',
  Event = 'event',
  General = 'general',
  Post = 'post',
}

export type UploadUrl = {
  __typename?: 'UploadUrl'
  expires: Scalars['Int']['output']
  fields: Scalars['JSON']['output']
  key: Scalars['String']['output']
  maxSize: Scalars['Int']['output']
  publicUrl: Scalars['String']['output']
  success: Scalars['Boolean']['output']
  uploadUrl: Scalars['String']['output']
}

export type User = {
  __typename?: 'User'
  achievements?: Maybe<Array<Achievement>>
  age?: Maybe<Scalars['Int']['output']>
  allow_messages?: Maybe<Scalars['Boolean']['output']>
  avatar_url?: Maybe<Scalars['String']['output']>
  bio?: Maybe<Scalars['String']['output']>
  city?: Maybe<Scalars['String']['output']>
  company_name?: Maybe<Scalars['String']['output']>
  cover_image_url?: Maybe<Scalars['String']['output']>
  created_at?: Maybe<Scalars['DateTime']['output']>
  dance_bonds_count?: Maybe<Scalars['Int']['output']>
  dance_styles?: Maybe<Array<Scalars['String']['output']>>
  display_name?: Maybe<Scalars['String']['output']>
  event_types?: Maybe<Array<Scalars['String']['output']>>
  favorite_music?: Maybe<Array<Scalars['String']['output']>>
  instagram?: Maybe<Scalars['String']['output']>
  invited_by?: Maybe<Scalars['String']['output']>
  is_organizer_approved?: Maybe<Scalars['Boolean']['output']>
  is_premium?: Maybe<Scalars['String']['output']>
  is_public?: Maybe<Scalars['Boolean']['output']>
  last_active_at?: Maybe<Scalars['DateTime']['output']>
  latitude?: Maybe<Scalars['Float']['output']>
  level?: Maybe<Scalars['Int']['output']>
  location?: Maybe<Scalars['String']['output']>
  longest_streak?: Maybe<Scalars['Int']['output']>
  longitude?: Maybe<Scalars['Float']['output']>
  notification_preferences?: Maybe<Scalars['JSON']['output']>
  organizer_approved_at?: Maybe<Scalars['DateTime']['output']>
  organizer_approved_by?: Maybe<Scalars['String']['output']>
  organizer_bio?: Maybe<Scalars['String']['output']>
  organizer_rejection_reason?: Maybe<Scalars['String']['output']>
  organizer_requested_at?: Maybe<Scalars['DateTime']['output']>
  privy_id: Scalars['String']['output']
  pronouns?: Maybe<Scalars['String']['output']>
  role?: Maybe<UserRole>
  show_location?: Maybe<Scalars['Boolean']['output']>
  skill_level?: Maybe<SkillLevel>
  social_media_links?: Maybe<Scalars['JSON']['output']>
  stripe_customer_id?: Maybe<Scalars['String']['output']>
  stripe_subscription_id?: Maybe<Scalars['String']['output']>
  subscription_cancelled_at?: Maybe<Scalars['DateTime']['output']>
  subscription_end_date?: Maybe<Scalars['DateTime']['output']>
  subscription_plan?: Maybe<Scalars['String']['output']>
  subscription_start_date?: Maybe<Scalars['DateTime']['output']>
  subscription_status?: Maybe<Scalars['String']['output']>
  subscription_tier?: Maybe<Scalars['String']['output']>
  tiktok?: Maybe<Scalars['String']['output']>
  total_achievements?: Maybe<Scalars['Int']['output']>
  total_dance_time?: Maybe<Scalars['Int']['output']>
  total_events_attended?: Maybe<Scalars['Int']['output']>
  total_events_created?: Maybe<Scalars['Int']['output']>
  total_sessions?: Maybe<Scalars['Int']['output']>
  twitter?: Maybe<Scalars['String']['output']>
  upcoming_events_count?: Maybe<Scalars['Int']['output']>
  updated_at?: Maybe<Scalars['DateTime']['output']>
  username?: Maybe<Scalars['String']['output']>
  website?: Maybe<Scalars['String']['output']>
  website_url?: Maybe<Scalars['String']['output']>
  xp?: Maybe<Scalars['Int']['output']>
  youtube?: Maybe<Scalars['String']['output']>
}

export type UserConnection = {
  __typename?: 'UserConnection'
  pageInfo: PageInfo
  totalCount: Scalars['Int']['output']
  users: Array<User>
}

export type UserFilterInput = {
  city?: InputMaybe<Scalars['String']['input']>
  dance_style?: InputMaybe<Scalars['String']['input']>
  is_organizer_approved?: InputMaybe<Scalars['Boolean']['input']>
  role?: InputMaybe<UserRole>
  skill_level?: InputMaybe<SkillLevel>
}

export enum UserRole {
  Admin = 'admin',
  Manager = 'manager',
  Organizer = 'organizer',
  User = 'user',
}

export type UserBasicInfoFragment = {
  __typename?: 'User'
  privy_id: string
  username?: string | null
  display_name?: string | null
  avatar_url?: string | null
  cover_image_url?: string | null
  bio?: string | null
  role?: UserRole | null
}

export type UserFullInfoFragment = {
  __typename?: 'User'
  privy_id: string
  username?: string | null
  display_name?: string | null
  avatar_url?: string | null
  cover_image_url?: string | null
  bio?: string | null
  role?: UserRole | null
  location?: string | null
  city?: string | null
  latitude?: number | null
  longitude?: number | null
  website?: string | null
  website_url?: string | null
  instagram?: string | null
  tiktok?: string | null
  youtube?: string | null
  twitter?: string | null
  pronouns?: string | null
  dance_styles?: Array<string> | null
  skill_level?: SkillLevel | null
  favorite_music?: Array<string> | null
  age?: number | null
  is_public?: boolean | null
  allow_messages?: boolean | null
  show_location?: boolean | null
  notification_preferences?: any | null
  xp?: number | null
  level?: number | null
  subscription_tier?: string | null
  is_premium?: string | null
  stripe_customer_id?: string | null
  stripe_subscription_id?: string | null
  subscription_status?: string | null
  subscription_plan?: string | null
  subscription_start_date?: any | null
  subscription_end_date?: any | null
  subscription_cancelled_at?: any | null
  total_dance_time?: number | null
  total_sessions?: number | null
  longest_streak?: number | null
  is_organizer_approved?: boolean | null
  organizer_approved_by?: string | null
  organizer_approved_at?: any | null
  company_name?: string | null
  organizer_bio?: string | null
  event_types?: Array<string> | null
  invited_by?: string | null
  social_media_links?: any | null
  organizer_requested_at?: any | null
  organizer_rejection_reason?: string | null
  total_events_attended?: number | null
  total_events_created?: number | null
  upcoming_events_count?: number | null
  total_achievements?: number | null
  dance_bonds_count?: number | null
  created_at?: any | null
  updated_at?: any | null
  last_active_at?: any | null
}

export type UpdateProfileMutationVariables = Exact<{
  input: UpdateProfileInput
}>

export type UpdateProfileMutation = {
  __typename?: 'Mutation'
  updateProfile: {
    __typename?: 'User'
    privy_id: string
    username?: string | null
    display_name?: string | null
    avatar_url?: string | null
    cover_image_url?: string | null
    bio?: string | null
    role?: UserRole | null
    location?: string | null
    city?: string | null
    latitude?: number | null
    longitude?: number | null
    website?: string | null
    website_url?: string | null
    instagram?: string | null
    tiktok?: string | null
    youtube?: string | null
    twitter?: string | null
    pronouns?: string | null
    dance_styles?: Array<string> | null
    skill_level?: SkillLevel | null
    favorite_music?: Array<string> | null
    age?: number | null
    is_public?: boolean | null
    allow_messages?: boolean | null
    show_location?: boolean | null
    notification_preferences?: any | null
    xp?: number | null
    level?: number | null
    subscription_tier?: string | null
    is_premium?: string | null
    stripe_customer_id?: string | null
    stripe_subscription_id?: string | null
    subscription_status?: string | null
    subscription_plan?: string | null
    subscription_start_date?: any | null
    subscription_end_date?: any | null
    subscription_cancelled_at?: any | null
    total_dance_time?: number | null
    total_sessions?: number | null
    longest_streak?: number | null
    is_organizer_approved?: boolean | null
    organizer_approved_by?: string | null
    organizer_approved_at?: any | null
    company_name?: string | null
    organizer_bio?: string | null
    event_types?: Array<string> | null
    invited_by?: string | null
    social_media_links?: any | null
    organizer_requested_at?: any | null
    organizer_rejection_reason?: string | null
    total_events_attended?: number | null
    total_events_created?: number | null
    upcoming_events_count?: number | null
    total_achievements?: number | null
    dance_bonds_count?: number | null
    created_at?: any | null
    updated_at?: any | null
    last_active_at?: any | null
  }
}

export type GetMyProfileQueryVariables = Exact<{ [key: string]: never }>

export type GetMyProfileQuery = {
  __typename?: 'Query'
  me?: {
    __typename?: 'User'
    privy_id: string
    username?: string | null
    display_name?: string | null
    avatar_url?: string | null
    cover_image_url?: string | null
    bio?: string | null
    role?: UserRole | null
    location?: string | null
    city?: string | null
    latitude?: number | null
    longitude?: number | null
    website?: string | null
    website_url?: string | null
    instagram?: string | null
    tiktok?: string | null
    youtube?: string | null
    twitter?: string | null
    pronouns?: string | null
    dance_styles?: Array<string> | null
    skill_level?: SkillLevel | null
    favorite_music?: Array<string> | null
    age?: number | null
    is_public?: boolean | null
    allow_messages?: boolean | null
    show_location?: boolean | null
    notification_preferences?: any | null
    xp?: number | null
    level?: number | null
    subscription_tier?: string | null
    is_premium?: string | null
    stripe_customer_id?: string | null
    stripe_subscription_id?: string | null
    subscription_status?: string | null
    subscription_plan?: string | null
    subscription_start_date?: any | null
    subscription_end_date?: any | null
    subscription_cancelled_at?: any | null
    total_dance_time?: number | null
    total_sessions?: number | null
    longest_streak?: number | null
    is_organizer_approved?: boolean | null
    organizer_approved_by?: string | null
    organizer_approved_at?: any | null
    company_name?: string | null
    organizer_bio?: string | null
    event_types?: Array<string> | null
    invited_by?: string | null
    social_media_links?: any | null
    organizer_requested_at?: any | null
    organizer_rejection_reason?: string | null
    total_events_attended?: number | null
    total_events_created?: number | null
    upcoming_events_count?: number | null
    total_achievements?: number | null
    dance_bonds_count?: number | null
    created_at?: any | null
    updated_at?: any | null
    last_active_at?: any | null
  } | null
}

export type GetUserByIdQueryVariables = Exact<{
  id: Scalars['String']['input']
}>

export type GetUserByIdQuery = {
  __typename?: 'Query'
  user?: {
    __typename?: 'User'
    privy_id: string
    username?: string | null
    display_name?: string | null
    avatar_url?: string | null
    cover_image_url?: string | null
    bio?: string | null
    role?: UserRole | null
    location?: string | null
    city?: string | null
    latitude?: number | null
    longitude?: number | null
    website?: string | null
    website_url?: string | null
    instagram?: string | null
    tiktok?: string | null
    youtube?: string | null
    twitter?: string | null
    pronouns?: string | null
    dance_styles?: Array<string> | null
    skill_level?: SkillLevel | null
    favorite_music?: Array<string> | null
    age?: number | null
    is_public?: boolean | null
    allow_messages?: boolean | null
    show_location?: boolean | null
    notification_preferences?: any | null
    xp?: number | null
    level?: number | null
    subscription_tier?: string | null
    is_premium?: string | null
    stripe_customer_id?: string | null
    stripe_subscription_id?: string | null
    subscription_status?: string | null
    subscription_plan?: string | null
    subscription_start_date?: any | null
    subscription_end_date?: any | null
    subscription_cancelled_at?: any | null
    total_dance_time?: number | null
    total_sessions?: number | null
    longest_streak?: number | null
    is_organizer_approved?: boolean | null
    organizer_approved_by?: string | null
    organizer_approved_at?: any | null
    company_name?: string | null
    organizer_bio?: string | null
    event_types?: Array<string> | null
    invited_by?: string | null
    social_media_links?: any | null
    organizer_requested_at?: any | null
    organizer_rejection_reason?: string | null
    total_events_attended?: number | null
    total_events_created?: number | null
    upcoming_events_count?: number | null
    total_achievements?: number | null
    dance_bonds_count?: number | null
    created_at?: any | null
    updated_at?: any | null
    last_active_at?: any | null
  } | null
}

export type CheckUsernameQueryVariables = Exact<{
  username: Scalars['String']['input']
}>

export type CheckUsernameQuery = { __typename?: 'Query'; checkUsername: boolean }

export const UserBasicInfoFragmentDoc = gql`
    fragment UserBasicInfo on User {
  privy_id
  username
  display_name
  avatar_url
  cover_image_url
  bio
  role
}
    `
export const UserFullInfoFragmentDoc = gql`
    fragment UserFullInfo on User {
  privy_id
  username
  display_name
  avatar_url
  cover_image_url
  bio
  role
  location
  city
  latitude
  longitude
  website
  website_url
  instagram
  tiktok
  youtube
  twitter
  pronouns
  dance_styles
  skill_level
  favorite_music
  age
  is_public
  allow_messages
  show_location
  notification_preferences
  xp
  level
  subscription_tier
  is_premium
  stripe_customer_id
  stripe_subscription_id
  subscription_status
  subscription_plan
  subscription_start_date
  subscription_end_date
  subscription_cancelled_at
  total_dance_time
  total_sessions
  longest_streak
  is_organizer_approved
  organizer_approved_by
  organizer_approved_at
  company_name
  organizer_bio
  event_types
  invited_by
  social_media_links
  organizer_requested_at
  organizer_rejection_reason
  total_events_attended
  total_events_created
  upcoming_events_count
  total_achievements
  dance_bonds_count
  created_at
  updated_at
  last_active_at
}
    `
export const UpdateProfileDocument = gql`
    mutation UpdateProfile($input: UpdateProfileInput!) {
  updateProfile(input: $input) {
    ...UserFullInfo
  }
}
    ${UserFullInfoFragmentDoc}`
export type UpdateProfileMutationFn = Apollo.MutationFunction<
  UpdateProfileMutation,
  UpdateProfileMutationVariables
>

/**
 * __useUpdateProfileMutation__
 *
 * To run a mutation, you first call `useUpdateProfileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateProfileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateProfileMutation, { data, loading, error }] = useUpdateProfileMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateProfileMutation(
  baseOptions?: Apollo.MutationHookOptions<UpdateProfileMutation, UpdateProfileMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<UpdateProfileMutation, UpdateProfileMutationVariables>(
    UpdateProfileDocument,
    options,
  )
}
export type UpdateProfileMutationHookResult = ReturnType<typeof useUpdateProfileMutation>
export type UpdateProfileMutationResult = Apollo.MutationResult<UpdateProfileMutation>
export type UpdateProfileMutationOptions = Apollo.BaseMutationOptions<
  UpdateProfileMutation,
  UpdateProfileMutationVariables
>
export const GetMyProfileDocument = gql`
    query GetMyProfile {
  me {
    ...UserFullInfo
  }
}
    ${UserFullInfoFragmentDoc}`

/**
 * __useGetMyProfileQuery__
 *
 * To run a query within a React component, call `useGetMyProfileQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMyProfileQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMyProfileQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetMyProfileQuery(
  baseOptions?: Apollo.QueryHookOptions<GetMyProfileQuery, GetMyProfileQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetMyProfileQuery, GetMyProfileQueryVariables>(
    GetMyProfileDocument,
    options,
  )
}
export function useGetMyProfileLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetMyProfileQuery, GetMyProfileQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetMyProfileQuery, GetMyProfileQueryVariables>(
    GetMyProfileDocument,
    options,
  )
}
export function useGetMyProfileSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<GetMyProfileQuery, GetMyProfileQueryVariables>,
) {
  const options =
    baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions }
  return Apollo.useSuspenseQuery<GetMyProfileQuery, GetMyProfileQueryVariables>(
    GetMyProfileDocument,
    options,
  )
}
export type GetMyProfileQueryHookResult = ReturnType<typeof useGetMyProfileQuery>
export type GetMyProfileLazyQueryHookResult = ReturnType<typeof useGetMyProfileLazyQuery>
export type GetMyProfileSuspenseQueryHookResult = ReturnType<typeof useGetMyProfileSuspenseQuery>
export type GetMyProfileQueryResult = Apollo.QueryResult<
  GetMyProfileQuery,
  GetMyProfileQueryVariables
>
export const GetUserByIdDocument = gql`
    query GetUserById($id: String!) {
  user(id: $id) {
    ...UserFullInfo
  }
}
    ${UserFullInfoFragmentDoc}`

/**
 * __useGetUserByIdQuery__
 *
 * To run a query within a React component, call `useGetUserByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetUserByIdQuery(
  baseOptions: Apollo.QueryHookOptions<GetUserByIdQuery, GetUserByIdQueryVariables> &
    ({ variables: GetUserByIdQueryVariables; skip?: boolean } | { skip: boolean }),
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetUserByIdQuery, GetUserByIdQueryVariables>(GetUserByIdDocument, options)
}
export function useGetUserByIdLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetUserByIdQuery, GetUserByIdQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetUserByIdQuery, GetUserByIdQueryVariables>(
    GetUserByIdDocument,
    options,
  )
}
export function useGetUserByIdSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<GetUserByIdQuery, GetUserByIdQueryVariables>,
) {
  const options =
    baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions }
  return Apollo.useSuspenseQuery<GetUserByIdQuery, GetUserByIdQueryVariables>(
    GetUserByIdDocument,
    options,
  )
}
export type GetUserByIdQueryHookResult = ReturnType<typeof useGetUserByIdQuery>
export type GetUserByIdLazyQueryHookResult = ReturnType<typeof useGetUserByIdLazyQuery>
export type GetUserByIdSuspenseQueryHookResult = ReturnType<typeof useGetUserByIdSuspenseQuery>
export type GetUserByIdQueryResult = Apollo.QueryResult<GetUserByIdQuery, GetUserByIdQueryVariables>
export const CheckUsernameDocument = gql`
    query CheckUsername($username: String!) {
  checkUsername(username: $username)
}
    `

/**
 * __useCheckUsernameQuery__
 *
 * To run a query within a React component, call `useCheckUsernameQuery` and pass it any options that fit your needs.
 * When your component renders, `useCheckUsernameQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCheckUsernameQuery({
 *   variables: {
 *      username: // value for 'username'
 *   },
 * });
 */
export function useCheckUsernameQuery(
  baseOptions: Apollo.QueryHookOptions<CheckUsernameQuery, CheckUsernameQueryVariables> &
    ({ variables: CheckUsernameQueryVariables; skip?: boolean } | { skip: boolean }),
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<CheckUsernameQuery, CheckUsernameQueryVariables>(
    CheckUsernameDocument,
    options,
  )
}
export function useCheckUsernameLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<CheckUsernameQuery, CheckUsernameQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<CheckUsernameQuery, CheckUsernameQueryVariables>(
    CheckUsernameDocument,
    options,
  )
}
export function useCheckUsernameSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<CheckUsernameQuery, CheckUsernameQueryVariables>,
) {
  const options =
    baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions }
  return Apollo.useSuspenseQuery<CheckUsernameQuery, CheckUsernameQueryVariables>(
    CheckUsernameDocument,
    options,
  )
}
export type CheckUsernameQueryHookResult = ReturnType<typeof useCheckUsernameQuery>
export type CheckUsernameLazyQueryHookResult = ReturnType<typeof useCheckUsernameLazyQuery>
export type CheckUsernameSuspenseQueryHookResult = ReturnType<typeof useCheckUsernameSuspenseQuery>
export type CheckUsernameQueryResult = Apollo.QueryResult<
  CheckUsernameQuery,
  CheckUsernameQueryVariables
>

export interface PossibleTypesResultData {
  possibleTypes: {
    [key: string]: string[]
  }
}
const result: PossibleTypesResultData = {
  possibleTypes: {},
}
export default result
