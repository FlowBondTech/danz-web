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

export type AwardPointsInput = {
  action_key: Scalars['String']['input']
  metadata?: InputMaybe<Scalars['JSON']['input']>
  reference_id?: InputMaybe<Scalars['ID']['input']>
  reference_type?: InputMaybe<ReferenceType>
  user_id: Scalars['String']['input']
}

export type CheckInEventInput = {
  event_id: Scalars['ID']['input']
  user_id: Scalars['String']['input']
}

export type CheckOutEventInput = {
  attendance_id: Scalars['ID']['input']
}

export type CompleteReferralInput = {
  referee_user_id: Scalars['String']['input']
  referral_code: Scalars['String']['input']
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

export type CreatePointActionInput = {
  action_key: Scalars['String']['input']
  action_name: Scalars['String']['input']
  category: PointActionCategory
  description?: InputMaybe<Scalars['String']['input']>
  is_active?: InputMaybe<Scalars['Boolean']['input']>
  max_per_day?: InputMaybe<Scalars['Int']['input']>
  max_per_month?: InputMaybe<Scalars['Int']['input']>
  max_per_week?: InputMaybe<Scalars['Int']['input']>
  points_value: Scalars['Int']['input']
  requires_verification?: InputMaybe<Scalars['Boolean']['input']>
}

export type DailyActivity = {
  __typename?: 'DailyActivity'
  activity_date: Scalars['String']['output']
  app_opened: Scalars['Boolean']['output']
  app_opened_at?: Maybe<Scalars['DateTime']['output']>
  created_at: Scalars['DateTime']['output']
  events_attended: Scalars['Int']['output']
  first_session_completed: Scalars['Boolean']['output']
  id: Scalars['ID']['output']
  points_earned_today: Scalars['Int']['output']
  sessions_completed: Scalars['Int']['output']
  social_interactions: Scalars['Int']['output']
  streak_day: Scalars['Int']['output']
  total_dance_time: Scalars['Int']['output']
  updated_at: Scalars['DateTime']['output']
  user?: Maybe<User>
  user_id: Scalars['String']['output']
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

export type DanceSession = {
  __typename?: 'DanceSession'
  achievements_unlocked?: Maybe<Array<Scalars['String']['output']>>
  app_version?: Maybe<Scalars['String']['output']>
  bpm_average?: Maybe<Scalars['Float']['output']>
  bpm_peak?: Maybe<Scalars['Float']['output']>
  calories_burned?: Maybe<Scalars['Int']['output']>
  created_at: Scalars['DateTime']['output']
  dance_bonds_strengthened?: Maybe<Array<DanceBond>>
  device_type?: Maybe<Scalars['String']['output']>
  duration: Scalars['Int']['output']
  ended_at: Scalars['DateTime']['output']
  id: Scalars['ID']['output']
  is_shared: Scalars['Boolean']['output']
  level_at_session?: Maybe<Scalars['Int']['output']>
  level_ups?: Maybe<Scalars['Int']['output']>
  motion_intensity_avg?: Maybe<Scalars['Float']['output']>
  movement_score?: Maybe<Scalars['Int']['output']>
  session_quality?: Maybe<Scalars['Float']['output']>
  shared_with_user_ids?: Maybe<Array<Scalars['String']['output']>>
  shared_with_users?: Maybe<Array<User>>
  social_xp_bonus?: Maybe<Scalars['Int']['output']>
  started_at: Scalars['DateTime']['output']
  updated_at: Scalars['DateTime']['output']
  user: User
  user_id: Scalars['String']['output']
  xp_earned: Scalars['Int']['output']
}

export type DanceSessionConnection = {
  __typename?: 'DanceSessionConnection'
  pageInfo: PageInfo
  sessions: Array<DanceSession>
  totalCount: Scalars['Int']['output']
}

export type DanceSessionFilterInput = {
  from_date?: InputMaybe<Scalars['DateTime']['input']>
  is_shared?: InputMaybe<Scalars['Boolean']['input']>
  min_duration?: InputMaybe<Scalars['Int']['input']>
  min_score?: InputMaybe<Scalars['Int']['input']>
  to_date?: InputMaybe<Scalars['DateTime']['input']>
  user_id?: InputMaybe<Scalars['String']['input']>
}

export type DanceSessionStats = {
  __typename?: 'DanceSessionStats'
  average_bpm?: Maybe<Scalars['Float']['output']>
  best_duration: Scalars['Int']['output']
  best_score: Scalars['Int']['output']
  current_streak: Scalars['Int']['output']
  longest_streak: Scalars['Int']['output']
  total_calories: Scalars['Int']['output']
  total_duration: Scalars['Int']['output']
  total_sessions: Scalars['Int']['output']
  total_xp_earned: Scalars['Int']['output']
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

export type EventAttendance = {
  __typename?: 'EventAttendance'
  attendance_verified: Scalars['Boolean']['output']
  checked_in: Scalars['Boolean']['output']
  checked_in_at?: Maybe<Scalars['DateTime']['output']>
  checked_out: Scalars['Boolean']['output']
  checked_out_at?: Maybe<Scalars['DateTime']['output']>
  created_at: Scalars['DateTime']['output']
  duration_minutes: Scalars['Int']['output']
  event?: Maybe<Event>
  event_id: Scalars['ID']['output']
  id: Scalars['ID']['output']
  points_earned: Scalars['Int']['output']
  registration_id?: Maybe<Scalars['ID']['output']>
  updated_at: Scalars['DateTime']['output']
  user?: Maybe<User>
  user_id: Scalars['String']['output']
  verified_at?: Maybe<Scalars['DateTime']['output']>
  verified_by?: Maybe<Scalars['String']['output']>
  verifier?: Maybe<User>
}

export type EventAttendanceSummary = {
  __typename?: 'EventAttendanceSummary'
  avg_duration_minutes?: Maybe<Scalars['Float']['output']>
  avg_points_per_attendee?: Maybe<Scalars['Float']['output']>
  checked_in_count: Scalars['Int']['output']
  end_date?: Maybe<Scalars['DateTime']['output']>
  event_id: Scalars['ID']['output']
  event_name: Scalars['String']['output']
  start_date: Scalars['DateTime']['output']
  total_attendees: Scalars['Int']['output']
  total_points_awarded: Scalars['Int']['output']
  verified_count: Scalars['Int']['output']
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

export type ManualPointsInput = {
  admin_note: Scalars['String']['input']
  metadata?: InputMaybe<Scalars['JSON']['input']>
  points_amount: Scalars['Int']['input']
  transaction_type: TransactionType
  user_id: Scalars['String']['input']
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
  awardManualPoints: PointTransaction
  awardPoints: PointTransaction
  cancelEventRegistration: MutationResponse
  checkInEvent: EventAttendance
  checkInParticipant: EventRegistration
  checkOutEvent: EventAttendance
  completeReferral: Referral
  createDanceBond: DanceBond
  createEvent: Event
  createPointAction: PointAction
  deleteDanceSession: MutationResponse
  deleteEvent: MutationResponse
  deletePointAction: MutationResponse
  featureEvent: Event
  generateShareLinks: ShareLinks
  markReferralCompleted: Referral
  registerForEvent: EventRegistration
  reversePointTransaction: PointTransaction
  saveDanceSession: DanceSession
  shareDanceSession: DanceSession
  togglePointAction: PointAction
  trackAppOpen: DailyActivity
  trackReferralClick: MutationResponse
  updateDanceBond: DanceBond
  updateEvent: Event
  updatePointAction: PointAction
  updateProfile: User
  updateRegistrationStatus: EventRegistration
  updateUserRole: User
  verifyEventAttendance: EventAttendance
  verifyPointTransaction: PointTransaction
}

export type MutationApproveOrganizerArgs = {
  approved: Scalars['Boolean']['input']
  userId: Scalars['String']['input']
}

export type MutationAwardManualPointsArgs = {
  input: ManualPointsInput
}

export type MutationAwardPointsArgs = {
  input: AwardPointsInput
}

export type MutationCancelEventRegistrationArgs = {
  eventId: Scalars['ID']['input']
}

export type MutationCheckInEventArgs = {
  input: CheckInEventInput
}

export type MutationCheckInParticipantArgs = {
  eventId: Scalars['ID']['input']
  userId: Scalars['String']['input']
}

export type MutationCheckOutEventArgs = {
  input: CheckOutEventInput
}

export type MutationCompleteReferralArgs = {
  input: CompleteReferralInput
}

export type MutationCreateDanceBondArgs = {
  userId: Scalars['String']['input']
}

export type MutationCreateEventArgs = {
  input: CreateEventInput
}

export type MutationCreatePointActionArgs = {
  input: CreatePointActionInput
}

export type MutationDeleteDanceSessionArgs = {
  sessionId: Scalars['ID']['input']
}

export type MutationDeleteEventArgs = {
  id: Scalars['ID']['input']
}

export type MutationDeletePointActionArgs = {
  action_key: Scalars['String']['input']
}

export type MutationFeatureEventArgs = {
  eventId: Scalars['ID']['input']
  featured: Scalars['Boolean']['input']
}

export type MutationMarkReferralCompletedArgs = {
  referralId: Scalars['ID']['input']
}

export type MutationRegisterForEventArgs = {
  eventId: Scalars['ID']['input']
  notes?: InputMaybe<Scalars['String']['input']>
}

export type MutationReversePointTransactionArgs = {
  reason: Scalars['String']['input']
  transaction_id: Scalars['ID']['input']
}

export type MutationSaveDanceSessionArgs = {
  input: SaveDanceSessionInput
}

export type MutationShareDanceSessionArgs = {
  sessionId: Scalars['ID']['input']
  userIds: Array<Scalars['String']['input']>
}

export type MutationTogglePointActionArgs = {
  action_key: Scalars['String']['input']
}

export type MutationTrackAppOpenArgs = {
  user_id: Scalars['String']['input']
}

export type MutationTrackReferralClickArgs = {
  input: TrackReferralClickInput
}

export type MutationUpdateDanceBondArgs = {
  level: Scalars['Int']['input']
  userId: Scalars['String']['input']
}

export type MutationUpdateEventArgs = {
  id: Scalars['ID']['input']
  input: UpdateEventInput
}

export type MutationUpdatePointActionArgs = {
  input: UpdatePointActionInput
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

export type MutationVerifyEventAttendanceArgs = {
  input: VerifyAttendanceInput
}

export type MutationVerifyPointTransactionArgs = {
  transaction_id: Scalars['ID']['input']
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

export type PointAction = {
  __typename?: 'PointAction'
  action_key: Scalars['String']['output']
  action_name: Scalars['String']['output']
  avg_points_per_transaction?: Maybe<Scalars['Float']['output']>
  category: PointActionCategory
  created_at: Scalars['DateTime']['output']
  description?: Maybe<Scalars['String']['output']>
  id: Scalars['ID']['output']
  is_active: Scalars['Boolean']['output']
  last_awarded_at?: Maybe<Scalars['DateTime']['output']>
  max_per_day?: Maybe<Scalars['Int']['output']>
  max_per_month?: Maybe<Scalars['Int']['output']>
  max_per_week?: Maybe<Scalars['Int']['output']>
  points_value: Scalars['Int']['output']
  requires_verification: Scalars['Boolean']['output']
  total_points_awarded?: Maybe<Scalars['Int']['output']>
  total_transactions?: Maybe<Scalars['Int']['output']>
  unique_users?: Maybe<Scalars['Int']['output']>
  updated_at: Scalars['DateTime']['output']
}

export enum PointActionCategory {
  Achievement = 'achievement',
  Activity = 'activity',
  Admin = 'admin',
  Event = 'event',
  Referral = 'referral',
  Social = 'social',
  Special = 'special',
}

export type PointTransaction = {
  __typename?: 'PointTransaction'
  action?: Maybe<PointAction>
  action_key: Scalars['String']['output']
  admin_note?: Maybe<Scalars['String']['output']>
  admin_user?: Maybe<User>
  admin_user_id?: Maybe<Scalars['String']['output']>
  created_at: Scalars['DateTime']['output']
  id: Scalars['ID']['output']
  metadata?: Maybe<Scalars['JSON']['output']>
  points_amount: Scalars['Int']['output']
  reference_id?: Maybe<Scalars['ID']['output']>
  reference_type?: Maybe<ReferenceType>
  status: TransactionStatus
  transaction_type: TransactionType
  user?: Maybe<User>
  user_id: Scalars['String']['output']
}

export type PointsOverview = {
  __typename?: 'PointsOverview'
  avg_points_per_user: Scalars['Float']['output']
  points_issued_this_month: Scalars['Int']['output']
  points_issued_this_week: Scalars['Int']['output']
  points_issued_today: Scalars['Int']['output']
  top_earning_action?: Maybe<PointAction>
  total_active_users: Scalars['Int']['output']
  total_points_issued: Scalars['Int']['output']
  total_points_spent: Scalars['Int']['output']
}

export type Query = {
  __typename?: 'Query'
  _empty?: Maybe<Scalars['String']['output']>
  adminStats: AdminStats
  checkUsername: Scalars['Boolean']['output']
  danceSession?: Maybe<DanceSession>
  event?: Maybe<Event>
  eventRegistrations: Array<EventRegistration>
  events: EventConnection
  friendsDanceSessions: Array<DanceSession>
  getAllPointActions: Array<PointAction>
  getAllTransactions: TransactionHistory
  getEventAttendance: Array<EventAttendance>
  getEventAttendanceSummaries: Array<EventAttendanceSummary>
  getPointAction?: Maybe<PointAction>
  getPointsOverview: PointsOverview
  getReferralByCode?: Maybe<Referral>
  getReferralClickStats: Array<ReferralClickTracking>
  getUploadUrl: UploadUrl
  getUserByUsername?: Maybe<User>
  getUserDailyActivity: Array<DailyActivity>
  getUserEventAttendance: Array<EventAttendance>
  getUserPointsSummaries: Array<UserPointsSummary>
  getUserTransactions: TransactionHistory
  me?: Maybe<User>
  myDanceBonds: Array<DanceBond>
  myDanceSessionStats: DanceSessionStats
  myDanceSessions: DanceSessionConnection
  myReferralCode?: Maybe<ReferralCode>
  myReferralStats: ReferralStats
  myReferrals: Array<Referral>
  pendingOrganizers: UserConnection
  reportedContent?: Maybe<Scalars['JSON']['output']>
  user?: Maybe<User>
  users: UserConnection
}

export type QueryCheckUsernameArgs = {
  username: Scalars['String']['input']
}

export type QueryDanceSessionArgs = {
  id: Scalars['ID']['input']
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

export type QueryFriendsDanceSessionsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
}

export type QueryGetAllPointActionsArgs = {
  category?: InputMaybe<PointActionCategory>
  is_active?: InputMaybe<Scalars['Boolean']['input']>
}

export type QueryGetAllTransactionsArgs = {
  action_key?: InputMaybe<Scalars['String']['input']>
  end_date?: InputMaybe<Scalars['DateTime']['input']>
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  start_date?: InputMaybe<Scalars['DateTime']['input']>
  status?: InputMaybe<TransactionStatus>
}

export type QueryGetEventAttendanceArgs = {
  event_id: Scalars['ID']['input']
}

export type QueryGetPointActionArgs = {
  action_key: Scalars['String']['input']
}

export type QueryGetReferralByCodeArgs = {
  code: Scalars['String']['input']
}

export type QueryGetReferralClickStatsArgs = {
  code: Scalars['String']['input']
}

export type QueryGetUploadUrlArgs = {
  fileName: Scalars['String']['input']
  mimeType: MimeType
  uploadType: UploadType
}

export type QueryGetUserByUsernameArgs = {
  username: Scalars['String']['input']
}

export type QueryGetUserDailyActivityArgs = {
  end_date: Scalars['String']['input']
  start_date: Scalars['String']['input']
  user_id: Scalars['String']['input']
}

export type QueryGetUserEventAttendanceArgs = {
  user_id: Scalars['String']['input']
}

export type QueryGetUserPointsSummariesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  sort_by?: InputMaybe<Scalars['String']['input']>
  sort_order?: InputMaybe<Scalars['String']['input']>
}

export type QueryGetUserTransactionsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  status?: InputMaybe<TransactionStatus>
  user_id: Scalars['String']['input']
}

export type QueryMyDanceSessionsArgs = {
  filter?: InputMaybe<DanceSessionFilterInput>
  pagination?: InputMaybe<PaginationInput>
}

export type QueryMyReferralsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  status?: InputMaybe<ReferralStatus>
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

export enum ReferenceType {
  Achievement = 'achievement',
  Admin = 'admin',
  DanceSession = 'dance_session',
  Event = 'event',
  Purchase = 'purchase',
  Referral = 'referral',
}

export type Referral = {
  __typename?: 'Referral'
  completed_at?: Maybe<Scalars['DateTime']['output']>
  created_at: Scalars['DateTime']['output']
  device_id?: Maybe<Scalars['String']['output']>
  first_session_completed_at?: Maybe<Scalars['DateTime']['output']>
  id: Scalars['ID']['output']
  ip_address?: Maybe<Scalars['String']['output']>
  points_awarded: Scalars['Int']['output']
  referee?: Maybe<User>
  referee_user_id?: Maybe<Scalars['String']['output']>
  referral_code: Scalars['String']['output']
  referrer?: Maybe<User>
  referrer_user_id: Scalars['String']['output']
  signup_completed_at?: Maybe<Scalars['DateTime']['output']>
  status: ReferralStatus
  user_agent?: Maybe<Scalars['String']['output']>
}

export type ReferralClickTracking = {
  __typename?: 'ReferralClickTracking'
  clicked_at: Scalars['DateTime']['output']
  device_info?: Maybe<Scalars['JSON']['output']>
  id: Scalars['ID']['output']
  ip_address?: Maybe<Scalars['String']['output']>
  referral_code: Scalars['String']['output']
  user_agent?: Maybe<Scalars['String']['output']>
}

export type ReferralCode = {
  __typename?: 'ReferralCode'
  created_at: Scalars['DateTime']['output']
  id: Scalars['ID']['output']
  referral_code: Scalars['String']['output']
  share_url: Scalars['String']['output']
  total_clicks: Scalars['Int']['output']
  total_completed: Scalars['Int']['output']
  total_signups: Scalars['Int']['output']
  user?: Maybe<User>
  user_id: Scalars['String']['output']
}

export type ReferralStats = {
  __typename?: 'ReferralStats'
  completed_referrals: Scalars['Int']['output']
  conversion_rate: Scalars['Float']['output']
  pending_referrals: Scalars['Int']['output']
  total_clicks: Scalars['Int']['output']
  total_completed: Scalars['Int']['output']
  total_points_earned: Scalars['Int']['output']
  total_signups: Scalars['Int']['output']
}

export enum ReferralStatus {
  Clicked = 'clicked',
  Completed = 'completed',
  SignedUp = 'signed_up',
}

export enum RegistrationStatus {
  Attended = 'attended',
  Cancelled = 'cancelled',
  NoShow = 'no_show',
  Registered = 'registered',
}

export type SaveDanceSessionInput = {
  achievements_unlocked?: InputMaybe<Array<Scalars['String']['input']>>
  app_version?: InputMaybe<Scalars['String']['input']>
  bpm_average?: InputMaybe<Scalars['Float']['input']>
  bpm_peak?: InputMaybe<Scalars['Float']['input']>
  calories_burned?: InputMaybe<Scalars['Int']['input']>
  device_type?: InputMaybe<Scalars['String']['input']>
  duration: Scalars['Int']['input']
  ended_at: Scalars['DateTime']['input']
  is_shared?: InputMaybe<Scalars['Boolean']['input']>
  motion_intensity_avg?: InputMaybe<Scalars['Float']['input']>
  movement_score?: InputMaybe<Scalars['Int']['input']>
  session_quality?: InputMaybe<Scalars['Float']['input']>
  shared_with_user_ids?: InputMaybe<Array<Scalars['String']['input']>>
  started_at: Scalars['DateTime']['input']
  xp_earned: Scalars['Int']['input']
}

export type ShareLinks = {
  __typename?: 'ShareLinks'
  referral_code: Scalars['String']['output']
  short_url: Scalars['String']['output']
  sms_template: Scalars['String']['output']
  social_media_template: Scalars['String']['output']
  whatsapp_template: Scalars['String']['output']
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

export type TrackReferralClickInput = {
  device_info?: InputMaybe<Scalars['JSON']['input']>
  ip_address?: InputMaybe<Scalars['String']['input']>
  referral_code: Scalars['String']['input']
  user_agent?: InputMaybe<Scalars['String']['input']>
}

export type TransactionHistory = {
  __typename?: 'TransactionHistory'
  has_more: Scalars['Boolean']['output']
  total_count: Scalars['Int']['output']
  transactions: Array<PointTransaction>
}

export enum TransactionStatus {
  Completed = 'completed',
  Failed = 'failed',
  Pending = 'pending',
  Reversed = 'reversed',
}

export enum TransactionType {
  Adjustment = 'adjustment',
  Bonus = 'bonus',
  Earn = 'earn',
  Penalty = 'penalty',
  Refund = 'refund',
  Spend = 'spend',
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

export type UpdatePointActionInput = {
  action_key: Scalars['String']['input']
  action_name?: InputMaybe<Scalars['String']['input']>
  category?: InputMaybe<PointActionCategory>
  description?: InputMaybe<Scalars['String']['input']>
  is_active?: InputMaybe<Scalars['Boolean']['input']>
  max_per_day?: InputMaybe<Scalars['Int']['input']>
  max_per_month?: InputMaybe<Scalars['Int']['input']>
  max_per_week?: InputMaybe<Scalars['Int']['input']>
  points_value?: InputMaybe<Scalars['Int']['input']>
  requires_verification?: InputMaybe<Scalars['Boolean']['input']>
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
  is_admin?: Maybe<Scalars['Boolean']['output']>
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

export type UserPointsSummary = {
  __typename?: 'UserPointsSummary'
  current_points_balance: Scalars['Int']['output']
  last_transaction_at?: Maybe<Scalars['DateTime']['output']>
  level: Scalars['Int']['output']
  points_last_week: Scalars['Int']['output']
  privy_id: Scalars['String']['output']
  total_points_earned: Scalars['Int']['output']
  total_points_spent: Scalars['Int']['output']
  total_transactions: Scalars['Int']['output']
  transactions_last_week: Scalars['Int']['output']
  unique_actions: Scalars['Int']['output']
  username?: Maybe<Scalars['String']['output']>
  xp: Scalars['Int']['output']
}

export enum UserRole {
  Admin = 'admin',
  Manager = 'manager',
  Organizer = 'organizer',
  User = 'user',
}

export type VerifyAttendanceInput = {
  attendance_id: Scalars['ID']['input']
  points_awarded: Scalars['Int']['input']
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
  is_admin?: boolean | null
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

export type CreatePointActionMutationVariables = Exact<{
  input: CreatePointActionInput
}>

export type CreatePointActionMutation = {
  __typename?: 'Mutation'
  createPointAction: {
    __typename?: 'PointAction'
    id: string
    action_key: string
    action_name: string
    description?: string | null
    points_value: number
    category: PointActionCategory
    is_active: boolean
    requires_verification: boolean
    max_per_day?: number | null
    max_per_week?: number | null
    max_per_month?: number | null
    created_at: any
    updated_at: any
  }
}

export type UpdatePointActionMutationVariables = Exact<{
  input: UpdatePointActionInput
}>

export type UpdatePointActionMutation = {
  __typename?: 'Mutation'
  updatePointAction: {
    __typename?: 'PointAction'
    id: string
    action_key: string
    action_name: string
    description?: string | null
    points_value: number
    category: PointActionCategory
    is_active: boolean
    requires_verification: boolean
    max_per_day?: number | null
    max_per_week?: number | null
    max_per_month?: number | null
    created_at: any
    updated_at: any
  }
}

export type DeletePointActionMutationVariables = Exact<{
  action_key: Scalars['String']['input']
}>

export type DeletePointActionMutation = {
  __typename?: 'Mutation'
  deletePointAction: { __typename?: 'MutationResponse'; success: boolean; message?: string | null }
}

export type TogglePointActionMutationVariables = Exact<{
  action_key: Scalars['String']['input']
}>

export type TogglePointActionMutation = {
  __typename?: 'Mutation'
  togglePointAction: {
    __typename?: 'PointAction'
    id: string
    action_key: string
    action_name: string
    is_active: boolean
    updated_at: any
  }
}

export type AwardPointsMutationVariables = Exact<{
  input: AwardPointsInput
}>

export type AwardPointsMutation = {
  __typename?: 'Mutation'
  awardPoints: {
    __typename?: 'PointTransaction'
    id: string
    user_id: string
    action_key: string
    points_amount: number
    transaction_type: TransactionType
    reference_id?: string | null
    reference_type?: ReferenceType | null
    metadata?: any | null
    status: TransactionStatus
    created_at: any
    user?: {
      __typename?: 'User'
      username?: string | null
      display_name?: string | null
      xp?: number | null
    } | null
    action?: {
      __typename?: 'PointAction'
      action_name: string
      category: PointActionCategory
    } | null
  }
}

export type AwardManualPointsMutationVariables = Exact<{
  input: ManualPointsInput
}>

export type AwardManualPointsMutation = {
  __typename?: 'Mutation'
  awardManualPoints: {
    __typename?: 'PointTransaction'
    id: string
    user_id: string
    action_key: string
    points_amount: number
    transaction_type: TransactionType
    admin_user_id?: string | null
    admin_note?: string | null
    metadata?: any | null
    status: TransactionStatus
    created_at: any
    user?: {
      __typename?: 'User'
      username?: string | null
      display_name?: string | null
      xp?: number | null
    } | null
  }
}

export type VerifyPointTransactionMutationVariables = Exact<{
  transaction_id: Scalars['ID']['input']
}>

export type VerifyPointTransactionMutation = {
  __typename?: 'Mutation'
  verifyPointTransaction: {
    __typename?: 'PointTransaction'
    id: string
    user_id: string
    action_key: string
    points_amount: number
    status: TransactionStatus
    created_at: any
  }
}

export type ReversePointTransactionMutationVariables = Exact<{
  transaction_id: Scalars['ID']['input']
  reason: Scalars['String']['input']
}>

export type ReversePointTransactionMutation = {
  __typename?: 'Mutation'
  reversePointTransaction: {
    __typename?: 'PointTransaction'
    id: string
    user_id: string
    action_key: string
    points_amount: number
    status: TransactionStatus
    admin_note?: string | null
    created_at: any
  }
}

export type CheckInEventMutationVariables = Exact<{
  input: CheckInEventInput
}>

export type CheckInEventMutation = {
  __typename?: 'Mutation'
  checkInEvent: {
    __typename?: 'EventAttendance'
    id: string
    event_id: string
    user_id: string
    checked_in: boolean
    checked_in_at?: any | null
    created_at: any
    user?: { __typename?: 'User'; username?: string | null; display_name?: string | null } | null
    event?: { __typename?: 'Event'; id: string; title: string } | null
  }
}

export type CheckOutEventMutationVariables = Exact<{
  input: CheckOutEventInput
}>

export type CheckOutEventMutation = {
  __typename?: 'Mutation'
  checkOutEvent: {
    __typename?: 'EventAttendance'
    id: string
    event_id: string
    user_id: string
    checked_in: boolean
    checked_in_at?: any | null
    checked_out: boolean
    checked_out_at?: any | null
    duration_minutes: number
    points_earned: number
    user?: {
      __typename?: 'User'
      username?: string | null
      display_name?: string | null
      xp?: number | null
    } | null
  }
}

export type VerifyEventAttendanceMutationVariables = Exact<{
  input: VerifyAttendanceInput
}>

export type VerifyEventAttendanceMutation = {
  __typename?: 'Mutation'
  verifyEventAttendance: {
    __typename?: 'EventAttendance'
    id: string
    event_id: string
    user_id: string
    attendance_verified: boolean
    verified_by?: string | null
    verified_at?: any | null
    points_earned: number
    user?: {
      __typename?: 'User'
      username?: string | null
      display_name?: string | null
      xp?: number | null
    } | null
  }
}

export type TrackAppOpenMutationVariables = Exact<{
  user_id: Scalars['String']['input']
}>

export type TrackAppOpenMutation = {
  __typename?: 'Mutation'
  trackAppOpen: {
    __typename?: 'DailyActivity'
    id: string
    user_id: string
    activity_date: string
    app_opened: boolean
    app_opened_at?: any | null
    points_earned_today: number
    streak_day: number
  }
}

export type TrackReferralClickMutationVariables = Exact<{
  input: TrackReferralClickInput
}>

export type TrackReferralClickMutation = {
  __typename?: 'Mutation'
  trackReferralClick: { __typename?: 'MutationResponse'; success: boolean; message?: string | null }
}

export type CompleteReferralMutationVariables = Exact<{
  input: CompleteReferralInput
}>

export type CompleteReferralMutation = {
  __typename?: 'Mutation'
  completeReferral: {
    __typename?: 'Referral'
    id: string
    referral_code: string
    referee_user_id?: string | null
    status: ReferralStatus
    signup_completed_at?: any | null
  }
}

export type GenerateShareLinksMutationVariables = Exact<{ [key: string]: never }>

export type GenerateShareLinksMutation = {
  __typename?: 'Mutation'
  generateShareLinks: {
    __typename?: 'ShareLinks'
    referral_code: string
    short_url: string
    sms_template: string
    whatsapp_template: string
    social_media_template: string
  }
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
    is_admin?: boolean | null
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

export type GetAllPointActionsQueryVariables = Exact<{
  category?: InputMaybe<PointActionCategory>
  is_active?: InputMaybe<Scalars['Boolean']['input']>
}>

export type GetAllPointActionsQuery = {
  __typename?: 'Query'
  getAllPointActions: Array<{
    __typename?: 'PointAction'
    id: string
    action_key: string
    action_name: string
    description?: string | null
    points_value: number
    category: PointActionCategory
    is_active: boolean
    requires_verification: boolean
    max_per_day?: number | null
    max_per_week?: number | null
    max_per_month?: number | null
    created_at: any
    updated_at: any
    total_transactions?: number | null
    unique_users?: number | null
    total_points_awarded?: number | null
    avg_points_per_transaction?: number | null
    last_awarded_at?: any | null
  }>
}

export type GetPointActionQueryVariables = Exact<{
  action_key: Scalars['String']['input']
}>

export type GetPointActionQuery = {
  __typename?: 'Query'
  getPointAction?: {
    __typename?: 'PointAction'
    id: string
    action_key: string
    action_name: string
    description?: string | null
    points_value: number
    category: PointActionCategory
    is_active: boolean
    requires_verification: boolean
    max_per_day?: number | null
    max_per_week?: number | null
    max_per_month?: number | null
    created_at: any
    updated_at: any
    total_transactions?: number | null
    unique_users?: number | null
    total_points_awarded?: number | null
    avg_points_per_transaction?: number | null
    last_awarded_at?: any | null
  } | null
}

export type GetUserTransactionsQueryVariables = Exact<{
  user_id: Scalars['String']['input']
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  status?: InputMaybe<TransactionStatus>
}>

export type GetUserTransactionsQuery = {
  __typename?: 'Query'
  getUserTransactions: {
    __typename?: 'TransactionHistory'
    total_count: number
    has_more: boolean
    transactions: Array<{
      __typename?: 'PointTransaction'
      id: string
      user_id: string
      action_key: string
      points_amount: number
      transaction_type: TransactionType
      reference_id?: string | null
      reference_type?: ReferenceType | null
      metadata?: any | null
      admin_user_id?: string | null
      admin_note?: string | null
      status: TransactionStatus
      created_at: any
      user?: {
        __typename?: 'User'
        privy_id: string
        username?: string | null
        display_name?: string | null
        avatar_url?: string | null
      } | null
      action?: {
        __typename?: 'PointAction'
        action_name: string
        category: PointActionCategory
      } | null
    }>
  }
}

export type GetAllTransactionsQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  action_key?: InputMaybe<Scalars['String']['input']>
  status?: InputMaybe<TransactionStatus>
  start_date?: InputMaybe<Scalars['DateTime']['input']>
  end_date?: InputMaybe<Scalars['DateTime']['input']>
}>

export type GetAllTransactionsQuery = {
  __typename?: 'Query'
  getAllTransactions: {
    __typename?: 'TransactionHistory'
    total_count: number
    has_more: boolean
    transactions: Array<{
      __typename?: 'PointTransaction'
      id: string
      user_id: string
      action_key: string
      points_amount: number
      transaction_type: TransactionType
      reference_id?: string | null
      reference_type?: ReferenceType | null
      metadata?: any | null
      admin_user_id?: string | null
      admin_note?: string | null
      status: TransactionStatus
      created_at: any
      user?: {
        __typename?: 'User'
        privy_id: string
        username?: string | null
        display_name?: string | null
        avatar_url?: string | null
      } | null
      action?: {
        __typename?: 'PointAction'
        action_name: string
        category: PointActionCategory
      } | null
      admin_user?: {
        __typename?: 'User'
        privy_id: string
        username?: string | null
        display_name?: string | null
      } | null
    }>
  }
}

export type GetUserDailyActivityQueryVariables = Exact<{
  user_id: Scalars['String']['input']
  start_date: Scalars['String']['input']
  end_date: Scalars['String']['input']
}>

export type GetUserDailyActivityQuery = {
  __typename?: 'Query'
  getUserDailyActivity: Array<{
    __typename?: 'DailyActivity'
    id: string
    user_id: string
    activity_date: string
    app_opened: boolean
    app_opened_at?: any | null
    first_session_completed: boolean
    sessions_completed: number
    total_dance_time: number
    events_attended: number
    social_interactions: number
    points_earned_today: number
    streak_day: number
    created_at: any
    updated_at: any
    user?: {
      __typename?: 'User'
      username?: string | null
      display_name?: string | null
      avatar_url?: string | null
    } | null
  }>
}

export type GetEventAttendanceQueryVariables = Exact<{
  event_id: Scalars['ID']['input']
}>

export type GetEventAttendanceQuery = {
  __typename?: 'Query'
  getEventAttendance: Array<{
    __typename?: 'EventAttendance'
    id: string
    event_id: string
    user_id: string
    registration_id?: string | null
    checked_in: boolean
    checked_in_at?: any | null
    checked_out: boolean
    checked_out_at?: any | null
    duration_minutes: number
    points_earned: number
    attendance_verified: boolean
    verified_by?: string | null
    verified_at?: any | null
    created_at: any
    updated_at: any
    user?: {
      __typename?: 'User'
      privy_id: string
      username?: string | null
      display_name?: string | null
      avatar_url?: string | null
    } | null
    event?: {
      __typename?: 'Event'
      id: string
      title: string
      start_date_time: any
      end_date_time: any
    } | null
  }>
}

export type GetUserEventAttendanceQueryVariables = Exact<{
  user_id: Scalars['String']['input']
}>

export type GetUserEventAttendanceQuery = {
  __typename?: 'Query'
  getUserEventAttendance: Array<{
    __typename?: 'EventAttendance'
    id: string
    event_id: string
    user_id: string
    registration_id?: string | null
    checked_in: boolean
    checked_in_at?: any | null
    checked_out: boolean
    checked_out_at?: any | null
    duration_minutes: number
    points_earned: number
    attendance_verified: boolean
    verified_by?: string | null
    verified_at?: any | null
    created_at: any
    updated_at: any
    event?: {
      __typename?: 'Event'
      id: string
      title: string
      start_date_time: any
      end_date_time: any
      location_name: string
    } | null
  }>
}

export type GetPointsOverviewQueryVariables = Exact<{ [key: string]: never }>

export type GetPointsOverviewQuery = {
  __typename?: 'Query'
  getPointsOverview: {
    __typename?: 'PointsOverview'
    total_points_issued: number
    total_points_spent: number
    total_active_users: number
    avg_points_per_user: number
    points_issued_today: number
    points_issued_this_week: number
    points_issued_this_month: number
    top_earning_action?: {
      __typename?: 'PointAction'
      action_key: string
      action_name: string
      points_value: number
      total_points_awarded?: number | null
    } | null
  }
}

export type GetUserPointsSummariesQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  sort_by?: InputMaybe<Scalars['String']['input']>
  sort_order?: InputMaybe<Scalars['String']['input']>
}>

export type GetUserPointsSummariesQuery = {
  __typename?: 'Query'
  getUserPointsSummaries: Array<{
    __typename?: 'UserPointsSummary'
    privy_id: string
    username?: string | null
    total_points_earned: number
    total_points_spent: number
    current_points_balance: number
    xp: number
    level: number
    total_transactions: number
    unique_actions: number
    last_transaction_at?: any | null
    transactions_last_week: number
    points_last_week: number
  }>
}

export type GetEventAttendanceSummariesQueryVariables = Exact<{ [key: string]: never }>

export type GetEventAttendanceSummariesQuery = {
  __typename?: 'Query'
  getEventAttendanceSummaries: Array<{
    __typename?: 'EventAttendanceSummary'
    event_id: string
    event_name: string
    start_date: any
    end_date?: any | null
    total_attendees: number
    checked_in_count: number
    verified_count: number
    avg_duration_minutes?: number | null
    total_points_awarded: number
    avg_points_per_attendee?: number | null
  }>
}

export type GetReferralByCodeQueryVariables = Exact<{
  code: Scalars['String']['input']
}>

export type GetReferralByCodeQuery = {
  __typename?: 'Query'
  getReferralByCode?: {
    __typename?: 'Referral'
    id: string
    referral_code: string
    referrer_user_id: string
    status: ReferralStatus
    created_at: any
    referrer?: {
      __typename?: 'User'
      username?: string | null
      display_name?: string | null
      avatar_url?: string | null
      xp?: number | null
      level?: number | null
    } | null
  } | null
}

export type GetMyReferralCodeQueryVariables = Exact<{ [key: string]: never }>

export type GetMyReferralCodeQuery = {
  __typename?: 'Query'
  myReferralCode?: {
    __typename?: 'ReferralCode'
    id: string
    user_id: string
    referral_code: string
    created_at: any
    share_url: string
  } | null
}

export type GetMyReferralStatsQueryVariables = Exact<{ [key: string]: never }>

export type GetMyReferralStatsQuery = {
  __typename?: 'Query'
  myReferralStats: {
    __typename?: 'ReferralStats'
    total_clicks: number
    total_signups: number
    total_completed: number
    total_points_earned: number
    conversion_rate: number
    pending_referrals: number
    completed_referrals: number
  }
}

export type GetMyReferralsQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  status?: InputMaybe<ReferralStatus>
}>

export type GetMyReferralsQuery = {
  __typename?: 'Query'
  myReferrals: Array<{
    __typename?: 'Referral'
    id: string
    referral_code: string
    referee_user_id?: string | null
    status: ReferralStatus
    created_at: any
    signup_completed_at?: any | null
    first_session_completed_at?: any | null
    points_awarded: number
    referee?: {
      __typename?: 'User'
      username?: string | null
      display_name?: string | null
      avatar_url?: string | null
    } | null
  }>
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
    is_admin?: boolean | null
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
    is_admin?: boolean | null
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

export type GetUserByUsernameQueryVariables = Exact<{
  username: Scalars['String']['input']
}>

export type GetUserByUsernameQuery = {
  __typename?: 'Query'
  getUserByUsername?: {
    __typename?: 'User'
    privy_id: string
    username?: string | null
    display_name?: string | null
    avatar_url?: string | null
    cover_image_url?: string | null
    bio?: string | null
    role?: UserRole | null
    is_admin?: boolean | null
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
  is_admin
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
export const CreatePointActionDocument = gql`
    mutation CreatePointAction($input: CreatePointActionInput!) {
  createPointAction(input: $input) {
    id
    action_key
    action_name
    description
    points_value
    category
    is_active
    requires_verification
    max_per_day
    max_per_week
    max_per_month
    created_at
    updated_at
  }
}
    `
export type CreatePointActionMutationFn = Apollo.MutationFunction<
  CreatePointActionMutation,
  CreatePointActionMutationVariables
>

/**
 * __useCreatePointActionMutation__
 *
 * To run a mutation, you first call `useCreatePointActionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePointActionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPointActionMutation, { data, loading, error }] = useCreatePointActionMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreatePointActionMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreatePointActionMutation,
    CreatePointActionMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<CreatePointActionMutation, CreatePointActionMutationVariables>(
    CreatePointActionDocument,
    options,
  )
}
export type CreatePointActionMutationHookResult = ReturnType<typeof useCreatePointActionMutation>
export type CreatePointActionMutationResult = Apollo.MutationResult<CreatePointActionMutation>
export type CreatePointActionMutationOptions = Apollo.BaseMutationOptions<
  CreatePointActionMutation,
  CreatePointActionMutationVariables
>
export const UpdatePointActionDocument = gql`
    mutation UpdatePointAction($input: UpdatePointActionInput!) {
  updatePointAction(input: $input) {
    id
    action_key
    action_name
    description
    points_value
    category
    is_active
    requires_verification
    max_per_day
    max_per_week
    max_per_month
    created_at
    updated_at
  }
}
    `
export type UpdatePointActionMutationFn = Apollo.MutationFunction<
  UpdatePointActionMutation,
  UpdatePointActionMutationVariables
>

/**
 * __useUpdatePointActionMutation__
 *
 * To run a mutation, you first call `useUpdatePointActionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePointActionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePointActionMutation, { data, loading, error }] = useUpdatePointActionMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdatePointActionMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdatePointActionMutation,
    UpdatePointActionMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<UpdatePointActionMutation, UpdatePointActionMutationVariables>(
    UpdatePointActionDocument,
    options,
  )
}
export type UpdatePointActionMutationHookResult = ReturnType<typeof useUpdatePointActionMutation>
export type UpdatePointActionMutationResult = Apollo.MutationResult<UpdatePointActionMutation>
export type UpdatePointActionMutationOptions = Apollo.BaseMutationOptions<
  UpdatePointActionMutation,
  UpdatePointActionMutationVariables
>
export const DeletePointActionDocument = gql`
    mutation DeletePointAction($action_key: String!) {
  deletePointAction(action_key: $action_key) {
    success
    message
  }
}
    `
export type DeletePointActionMutationFn = Apollo.MutationFunction<
  DeletePointActionMutation,
  DeletePointActionMutationVariables
>

/**
 * __useDeletePointActionMutation__
 *
 * To run a mutation, you first call `useDeletePointActionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeletePointActionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deletePointActionMutation, { data, loading, error }] = useDeletePointActionMutation({
 *   variables: {
 *      action_key: // value for 'action_key'
 *   },
 * });
 */
export function useDeletePointActionMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DeletePointActionMutation,
    DeletePointActionMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<DeletePointActionMutation, DeletePointActionMutationVariables>(
    DeletePointActionDocument,
    options,
  )
}
export type DeletePointActionMutationHookResult = ReturnType<typeof useDeletePointActionMutation>
export type DeletePointActionMutationResult = Apollo.MutationResult<DeletePointActionMutation>
export type DeletePointActionMutationOptions = Apollo.BaseMutationOptions<
  DeletePointActionMutation,
  DeletePointActionMutationVariables
>
export const TogglePointActionDocument = gql`
    mutation TogglePointAction($action_key: String!) {
  togglePointAction(action_key: $action_key) {
    id
    action_key
    action_name
    is_active
    updated_at
  }
}
    `
export type TogglePointActionMutationFn = Apollo.MutationFunction<
  TogglePointActionMutation,
  TogglePointActionMutationVariables
>

/**
 * __useTogglePointActionMutation__
 *
 * To run a mutation, you first call `useTogglePointActionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useTogglePointActionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [togglePointActionMutation, { data, loading, error }] = useTogglePointActionMutation({
 *   variables: {
 *      action_key: // value for 'action_key'
 *   },
 * });
 */
export function useTogglePointActionMutation(
  baseOptions?: Apollo.MutationHookOptions<
    TogglePointActionMutation,
    TogglePointActionMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<TogglePointActionMutation, TogglePointActionMutationVariables>(
    TogglePointActionDocument,
    options,
  )
}
export type TogglePointActionMutationHookResult = ReturnType<typeof useTogglePointActionMutation>
export type TogglePointActionMutationResult = Apollo.MutationResult<TogglePointActionMutation>
export type TogglePointActionMutationOptions = Apollo.BaseMutationOptions<
  TogglePointActionMutation,
  TogglePointActionMutationVariables
>
export const AwardPointsDocument = gql`
    mutation AwardPoints($input: AwardPointsInput!) {
  awardPoints(input: $input) {
    id
    user_id
    action_key
    points_amount
    transaction_type
    reference_id
    reference_type
    metadata
    status
    created_at
    user {
      username
      display_name
      xp
    }
    action {
      action_name
      category
    }
  }
}
    `
export type AwardPointsMutationFn = Apollo.MutationFunction<
  AwardPointsMutation,
  AwardPointsMutationVariables
>

/**
 * __useAwardPointsMutation__
 *
 * To run a mutation, you first call `useAwardPointsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAwardPointsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [awardPointsMutation, { data, loading, error }] = useAwardPointsMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAwardPointsMutation(
  baseOptions?: Apollo.MutationHookOptions<AwardPointsMutation, AwardPointsMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<AwardPointsMutation, AwardPointsMutationVariables>(
    AwardPointsDocument,
    options,
  )
}
export type AwardPointsMutationHookResult = ReturnType<typeof useAwardPointsMutation>
export type AwardPointsMutationResult = Apollo.MutationResult<AwardPointsMutation>
export type AwardPointsMutationOptions = Apollo.BaseMutationOptions<
  AwardPointsMutation,
  AwardPointsMutationVariables
>
export const AwardManualPointsDocument = gql`
    mutation AwardManualPoints($input: ManualPointsInput!) {
  awardManualPoints(input: $input) {
    id
    user_id
    action_key
    points_amount
    transaction_type
    admin_user_id
    admin_note
    metadata
    status
    created_at
    user {
      username
      display_name
      xp
    }
  }
}
    `
export type AwardManualPointsMutationFn = Apollo.MutationFunction<
  AwardManualPointsMutation,
  AwardManualPointsMutationVariables
>

/**
 * __useAwardManualPointsMutation__
 *
 * To run a mutation, you first call `useAwardManualPointsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAwardManualPointsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [awardManualPointsMutation, { data, loading, error }] = useAwardManualPointsMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAwardManualPointsMutation(
  baseOptions?: Apollo.MutationHookOptions<
    AwardManualPointsMutation,
    AwardManualPointsMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<AwardManualPointsMutation, AwardManualPointsMutationVariables>(
    AwardManualPointsDocument,
    options,
  )
}
export type AwardManualPointsMutationHookResult = ReturnType<typeof useAwardManualPointsMutation>
export type AwardManualPointsMutationResult = Apollo.MutationResult<AwardManualPointsMutation>
export type AwardManualPointsMutationOptions = Apollo.BaseMutationOptions<
  AwardManualPointsMutation,
  AwardManualPointsMutationVariables
>
export const VerifyPointTransactionDocument = gql`
    mutation VerifyPointTransaction($transaction_id: ID!) {
  verifyPointTransaction(transaction_id: $transaction_id) {
    id
    user_id
    action_key
    points_amount
    status
    created_at
  }
}
    `
export type VerifyPointTransactionMutationFn = Apollo.MutationFunction<
  VerifyPointTransactionMutation,
  VerifyPointTransactionMutationVariables
>

/**
 * __useVerifyPointTransactionMutation__
 *
 * To run a mutation, you first call `useVerifyPointTransactionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useVerifyPointTransactionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [verifyPointTransactionMutation, { data, loading, error }] = useVerifyPointTransactionMutation({
 *   variables: {
 *      transaction_id: // value for 'transaction_id'
 *   },
 * });
 */
export function useVerifyPointTransactionMutation(
  baseOptions?: Apollo.MutationHookOptions<
    VerifyPointTransactionMutation,
    VerifyPointTransactionMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    VerifyPointTransactionMutation,
    VerifyPointTransactionMutationVariables
  >(VerifyPointTransactionDocument, options)
}
export type VerifyPointTransactionMutationHookResult = ReturnType<
  typeof useVerifyPointTransactionMutation
>
export type VerifyPointTransactionMutationResult =
  Apollo.MutationResult<VerifyPointTransactionMutation>
export type VerifyPointTransactionMutationOptions = Apollo.BaseMutationOptions<
  VerifyPointTransactionMutation,
  VerifyPointTransactionMutationVariables
>
export const ReversePointTransactionDocument = gql`
    mutation ReversePointTransaction($transaction_id: ID!, $reason: String!) {
  reversePointTransaction(transaction_id: $transaction_id, reason: $reason) {
    id
    user_id
    action_key
    points_amount
    status
    admin_note
    created_at
  }
}
    `
export type ReversePointTransactionMutationFn = Apollo.MutationFunction<
  ReversePointTransactionMutation,
  ReversePointTransactionMutationVariables
>

/**
 * __useReversePointTransactionMutation__
 *
 * To run a mutation, you first call `useReversePointTransactionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useReversePointTransactionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [reversePointTransactionMutation, { data, loading, error }] = useReversePointTransactionMutation({
 *   variables: {
 *      transaction_id: // value for 'transaction_id'
 *      reason: // value for 'reason'
 *   },
 * });
 */
export function useReversePointTransactionMutation(
  baseOptions?: Apollo.MutationHookOptions<
    ReversePointTransactionMutation,
    ReversePointTransactionMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    ReversePointTransactionMutation,
    ReversePointTransactionMutationVariables
  >(ReversePointTransactionDocument, options)
}
export type ReversePointTransactionMutationHookResult = ReturnType<
  typeof useReversePointTransactionMutation
>
export type ReversePointTransactionMutationResult =
  Apollo.MutationResult<ReversePointTransactionMutation>
export type ReversePointTransactionMutationOptions = Apollo.BaseMutationOptions<
  ReversePointTransactionMutation,
  ReversePointTransactionMutationVariables
>
export const CheckInEventDocument = gql`
    mutation CheckInEvent($input: CheckInEventInput!) {
  checkInEvent(input: $input) {
    id
    event_id
    user_id
    checked_in
    checked_in_at
    created_at
    user {
      username
      display_name
    }
    event {
      id
      title
    }
  }
}
    `
export type CheckInEventMutationFn = Apollo.MutationFunction<
  CheckInEventMutation,
  CheckInEventMutationVariables
>

/**
 * __useCheckInEventMutation__
 *
 * To run a mutation, you first call `useCheckInEventMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCheckInEventMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [checkInEventMutation, { data, loading, error }] = useCheckInEventMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCheckInEventMutation(
  baseOptions?: Apollo.MutationHookOptions<CheckInEventMutation, CheckInEventMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<CheckInEventMutation, CheckInEventMutationVariables>(
    CheckInEventDocument,
    options,
  )
}
export type CheckInEventMutationHookResult = ReturnType<typeof useCheckInEventMutation>
export type CheckInEventMutationResult = Apollo.MutationResult<CheckInEventMutation>
export type CheckInEventMutationOptions = Apollo.BaseMutationOptions<
  CheckInEventMutation,
  CheckInEventMutationVariables
>
export const CheckOutEventDocument = gql`
    mutation CheckOutEvent($input: CheckOutEventInput!) {
  checkOutEvent(input: $input) {
    id
    event_id
    user_id
    checked_in
    checked_in_at
    checked_out
    checked_out_at
    duration_minutes
    points_earned
    user {
      username
      display_name
      xp
    }
  }
}
    `
export type CheckOutEventMutationFn = Apollo.MutationFunction<
  CheckOutEventMutation,
  CheckOutEventMutationVariables
>

/**
 * __useCheckOutEventMutation__
 *
 * To run a mutation, you first call `useCheckOutEventMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCheckOutEventMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [checkOutEventMutation, { data, loading, error }] = useCheckOutEventMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCheckOutEventMutation(
  baseOptions?: Apollo.MutationHookOptions<CheckOutEventMutation, CheckOutEventMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<CheckOutEventMutation, CheckOutEventMutationVariables>(
    CheckOutEventDocument,
    options,
  )
}
export type CheckOutEventMutationHookResult = ReturnType<typeof useCheckOutEventMutation>
export type CheckOutEventMutationResult = Apollo.MutationResult<CheckOutEventMutation>
export type CheckOutEventMutationOptions = Apollo.BaseMutationOptions<
  CheckOutEventMutation,
  CheckOutEventMutationVariables
>
export const VerifyEventAttendanceDocument = gql`
    mutation VerifyEventAttendance($input: VerifyAttendanceInput!) {
  verifyEventAttendance(input: $input) {
    id
    event_id
    user_id
    attendance_verified
    verified_by
    verified_at
    points_earned
    user {
      username
      display_name
      xp
    }
  }
}
    `
export type VerifyEventAttendanceMutationFn = Apollo.MutationFunction<
  VerifyEventAttendanceMutation,
  VerifyEventAttendanceMutationVariables
>

/**
 * __useVerifyEventAttendanceMutation__
 *
 * To run a mutation, you first call `useVerifyEventAttendanceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useVerifyEventAttendanceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [verifyEventAttendanceMutation, { data, loading, error }] = useVerifyEventAttendanceMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useVerifyEventAttendanceMutation(
  baseOptions?: Apollo.MutationHookOptions<
    VerifyEventAttendanceMutation,
    VerifyEventAttendanceMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<VerifyEventAttendanceMutation, VerifyEventAttendanceMutationVariables>(
    VerifyEventAttendanceDocument,
    options,
  )
}
export type VerifyEventAttendanceMutationHookResult = ReturnType<
  typeof useVerifyEventAttendanceMutation
>
export type VerifyEventAttendanceMutationResult =
  Apollo.MutationResult<VerifyEventAttendanceMutation>
export type VerifyEventAttendanceMutationOptions = Apollo.BaseMutationOptions<
  VerifyEventAttendanceMutation,
  VerifyEventAttendanceMutationVariables
>
export const TrackAppOpenDocument = gql`
    mutation TrackAppOpen($user_id: String!) {
  trackAppOpen(user_id: $user_id) {
    id
    user_id
    activity_date
    app_opened
    app_opened_at
    points_earned_today
    streak_day
  }
}
    `
export type TrackAppOpenMutationFn = Apollo.MutationFunction<
  TrackAppOpenMutation,
  TrackAppOpenMutationVariables
>

/**
 * __useTrackAppOpenMutation__
 *
 * To run a mutation, you first call `useTrackAppOpenMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useTrackAppOpenMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [trackAppOpenMutation, { data, loading, error }] = useTrackAppOpenMutation({
 *   variables: {
 *      user_id: // value for 'user_id'
 *   },
 * });
 */
export function useTrackAppOpenMutation(
  baseOptions?: Apollo.MutationHookOptions<TrackAppOpenMutation, TrackAppOpenMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<TrackAppOpenMutation, TrackAppOpenMutationVariables>(
    TrackAppOpenDocument,
    options,
  )
}
export type TrackAppOpenMutationHookResult = ReturnType<typeof useTrackAppOpenMutation>
export type TrackAppOpenMutationResult = Apollo.MutationResult<TrackAppOpenMutation>
export type TrackAppOpenMutationOptions = Apollo.BaseMutationOptions<
  TrackAppOpenMutation,
  TrackAppOpenMutationVariables
>
export const TrackReferralClickDocument = gql`
    mutation TrackReferralClick($input: TrackReferralClickInput!) {
  trackReferralClick(input: $input) {
    success
    message
  }
}
    `
export type TrackReferralClickMutationFn = Apollo.MutationFunction<
  TrackReferralClickMutation,
  TrackReferralClickMutationVariables
>

/**
 * __useTrackReferralClickMutation__
 *
 * To run a mutation, you first call `useTrackReferralClickMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useTrackReferralClickMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [trackReferralClickMutation, { data, loading, error }] = useTrackReferralClickMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useTrackReferralClickMutation(
  baseOptions?: Apollo.MutationHookOptions<
    TrackReferralClickMutation,
    TrackReferralClickMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<TrackReferralClickMutation, TrackReferralClickMutationVariables>(
    TrackReferralClickDocument,
    options,
  )
}
export type TrackReferralClickMutationHookResult = ReturnType<typeof useTrackReferralClickMutation>
export type TrackReferralClickMutationResult = Apollo.MutationResult<TrackReferralClickMutation>
export type TrackReferralClickMutationOptions = Apollo.BaseMutationOptions<
  TrackReferralClickMutation,
  TrackReferralClickMutationVariables
>
export const CompleteReferralDocument = gql`
    mutation CompleteReferral($input: CompleteReferralInput!) {
  completeReferral(input: $input) {
    id
    referral_code
    referee_user_id
    status
    signup_completed_at
  }
}
    `
export type CompleteReferralMutationFn = Apollo.MutationFunction<
  CompleteReferralMutation,
  CompleteReferralMutationVariables
>

/**
 * __useCompleteReferralMutation__
 *
 * To run a mutation, you first call `useCompleteReferralMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCompleteReferralMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [completeReferralMutation, { data, loading, error }] = useCompleteReferralMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCompleteReferralMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CompleteReferralMutation,
    CompleteReferralMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<CompleteReferralMutation, CompleteReferralMutationVariables>(
    CompleteReferralDocument,
    options,
  )
}
export type CompleteReferralMutationHookResult = ReturnType<typeof useCompleteReferralMutation>
export type CompleteReferralMutationResult = Apollo.MutationResult<CompleteReferralMutation>
export type CompleteReferralMutationOptions = Apollo.BaseMutationOptions<
  CompleteReferralMutation,
  CompleteReferralMutationVariables
>
export const GenerateShareLinksDocument = gql`
    mutation GenerateShareLinks {
  generateShareLinks {
    referral_code
    short_url
    sms_template
    whatsapp_template
    social_media_template
  }
}
    `
export type GenerateShareLinksMutationFn = Apollo.MutationFunction<
  GenerateShareLinksMutation,
  GenerateShareLinksMutationVariables
>

/**
 * __useGenerateShareLinksMutation__
 *
 * To run a mutation, you first call `useGenerateShareLinksMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGenerateShareLinksMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [generateShareLinksMutation, { data, loading, error }] = useGenerateShareLinksMutation({
 *   variables: {
 *   },
 * });
 */
export function useGenerateShareLinksMutation(
  baseOptions?: Apollo.MutationHookOptions<
    GenerateShareLinksMutation,
    GenerateShareLinksMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<GenerateShareLinksMutation, GenerateShareLinksMutationVariables>(
    GenerateShareLinksDocument,
    options,
  )
}
export type GenerateShareLinksMutationHookResult = ReturnType<typeof useGenerateShareLinksMutation>
export type GenerateShareLinksMutationResult = Apollo.MutationResult<GenerateShareLinksMutation>
export type GenerateShareLinksMutationOptions = Apollo.BaseMutationOptions<
  GenerateShareLinksMutation,
  GenerateShareLinksMutationVariables
>
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
export const GetAllPointActionsDocument = gql`
    query GetAllPointActions($category: PointActionCategory, $is_active: Boolean) {
  getAllPointActions(category: $category, is_active: $is_active) {
    id
    action_key
    action_name
    description
    points_value
    category
    is_active
    requires_verification
    max_per_day
    max_per_week
    max_per_month
    created_at
    updated_at
    total_transactions
    unique_users
    total_points_awarded
    avg_points_per_transaction
    last_awarded_at
  }
}
    `

/**
 * __useGetAllPointActionsQuery__
 *
 * To run a query within a React component, call `useGetAllPointActionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllPointActionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllPointActionsQuery({
 *   variables: {
 *      category: // value for 'category'
 *      is_active: // value for 'is_active'
 *   },
 * });
 */
export function useGetAllPointActionsQuery(
  baseOptions?: Apollo.QueryHookOptions<GetAllPointActionsQuery, GetAllPointActionsQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetAllPointActionsQuery, GetAllPointActionsQueryVariables>(
    GetAllPointActionsDocument,
    options,
  )
}
export function useGetAllPointActionsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetAllPointActionsQuery,
    GetAllPointActionsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetAllPointActionsQuery, GetAllPointActionsQueryVariables>(
    GetAllPointActionsDocument,
    options,
  )
}
export function useGetAllPointActionsSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<GetAllPointActionsQuery, GetAllPointActionsQueryVariables>,
) {
  const options =
    baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions }
  return Apollo.useSuspenseQuery<GetAllPointActionsQuery, GetAllPointActionsQueryVariables>(
    GetAllPointActionsDocument,
    options,
  )
}
export type GetAllPointActionsQueryHookResult = ReturnType<typeof useGetAllPointActionsQuery>
export type GetAllPointActionsLazyQueryHookResult = ReturnType<
  typeof useGetAllPointActionsLazyQuery
>
export type GetAllPointActionsSuspenseQueryHookResult = ReturnType<
  typeof useGetAllPointActionsSuspenseQuery
>
export type GetAllPointActionsQueryResult = Apollo.QueryResult<
  GetAllPointActionsQuery,
  GetAllPointActionsQueryVariables
>
export const GetPointActionDocument = gql`
    query GetPointAction($action_key: String!) {
  getPointAction(action_key: $action_key) {
    id
    action_key
    action_name
    description
    points_value
    category
    is_active
    requires_verification
    max_per_day
    max_per_week
    max_per_month
    created_at
    updated_at
    total_transactions
    unique_users
    total_points_awarded
    avg_points_per_transaction
    last_awarded_at
  }
}
    `

/**
 * __useGetPointActionQuery__
 *
 * To run a query within a React component, call `useGetPointActionQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPointActionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPointActionQuery({
 *   variables: {
 *      action_key: // value for 'action_key'
 *   },
 * });
 */
export function useGetPointActionQuery(
  baseOptions: Apollo.QueryHookOptions<GetPointActionQuery, GetPointActionQueryVariables> &
    ({ variables: GetPointActionQueryVariables; skip?: boolean } | { skip: boolean }),
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetPointActionQuery, GetPointActionQueryVariables>(
    GetPointActionDocument,
    options,
  )
}
export function useGetPointActionLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetPointActionQuery, GetPointActionQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetPointActionQuery, GetPointActionQueryVariables>(
    GetPointActionDocument,
    options,
  )
}
export function useGetPointActionSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<GetPointActionQuery, GetPointActionQueryVariables>,
) {
  const options =
    baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions }
  return Apollo.useSuspenseQuery<GetPointActionQuery, GetPointActionQueryVariables>(
    GetPointActionDocument,
    options,
  )
}
export type GetPointActionQueryHookResult = ReturnType<typeof useGetPointActionQuery>
export type GetPointActionLazyQueryHookResult = ReturnType<typeof useGetPointActionLazyQuery>
export type GetPointActionSuspenseQueryHookResult = ReturnType<
  typeof useGetPointActionSuspenseQuery
>
export type GetPointActionQueryResult = Apollo.QueryResult<
  GetPointActionQuery,
  GetPointActionQueryVariables
>
export const GetUserTransactionsDocument = gql`
    query GetUserTransactions($user_id: String!, $limit: Int, $offset: Int, $status: TransactionStatus) {
  getUserTransactions(
    user_id: $user_id
    limit: $limit
    offset: $offset
    status: $status
  ) {
    transactions {
      id
      user_id
      action_key
      points_amount
      transaction_type
      reference_id
      reference_type
      metadata
      admin_user_id
      admin_note
      status
      created_at
      user {
        privy_id
        username
        display_name
        avatar_url
      }
      action {
        action_name
        category
      }
    }
    total_count
    has_more
  }
}
    `

/**
 * __useGetUserTransactionsQuery__
 *
 * To run a query within a React component, call `useGetUserTransactionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserTransactionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserTransactionsQuery({
 *   variables: {
 *      user_id: // value for 'user_id'
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *      status: // value for 'status'
 *   },
 * });
 */
export function useGetUserTransactionsQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetUserTransactionsQuery,
    GetUserTransactionsQueryVariables
  > &
    ({ variables: GetUserTransactionsQueryVariables; skip?: boolean } | { skip: boolean }),
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetUserTransactionsQuery, GetUserTransactionsQueryVariables>(
    GetUserTransactionsDocument,
    options,
  )
}
export function useGetUserTransactionsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetUserTransactionsQuery,
    GetUserTransactionsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetUserTransactionsQuery, GetUserTransactionsQueryVariables>(
    GetUserTransactionsDocument,
    options,
  )
}
export function useGetUserTransactionsSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<GetUserTransactionsQuery, GetUserTransactionsQueryVariables>,
) {
  const options =
    baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions }
  return Apollo.useSuspenseQuery<GetUserTransactionsQuery, GetUserTransactionsQueryVariables>(
    GetUserTransactionsDocument,
    options,
  )
}
export type GetUserTransactionsQueryHookResult = ReturnType<typeof useGetUserTransactionsQuery>
export type GetUserTransactionsLazyQueryHookResult = ReturnType<
  typeof useGetUserTransactionsLazyQuery
>
export type GetUserTransactionsSuspenseQueryHookResult = ReturnType<
  typeof useGetUserTransactionsSuspenseQuery
>
export type GetUserTransactionsQueryResult = Apollo.QueryResult<
  GetUserTransactionsQuery,
  GetUserTransactionsQueryVariables
>
export const GetAllTransactionsDocument = gql`
    query GetAllTransactions($limit: Int, $offset: Int, $action_key: String, $status: TransactionStatus, $start_date: DateTime, $end_date: DateTime) {
  getAllTransactions(
    limit: $limit
    offset: $offset
    action_key: $action_key
    status: $status
    start_date: $start_date
    end_date: $end_date
  ) {
    transactions {
      id
      user_id
      action_key
      points_amount
      transaction_type
      reference_id
      reference_type
      metadata
      admin_user_id
      admin_note
      status
      created_at
      user {
        privy_id
        username
        display_name
        avatar_url
      }
      action {
        action_name
        category
      }
      admin_user {
        privy_id
        username
        display_name
      }
    }
    total_count
    has_more
  }
}
    `

/**
 * __useGetAllTransactionsQuery__
 *
 * To run a query within a React component, call `useGetAllTransactionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllTransactionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllTransactionsQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *      action_key: // value for 'action_key'
 *      status: // value for 'status'
 *      start_date: // value for 'start_date'
 *      end_date: // value for 'end_date'
 *   },
 * });
 */
export function useGetAllTransactionsQuery(
  baseOptions?: Apollo.QueryHookOptions<GetAllTransactionsQuery, GetAllTransactionsQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetAllTransactionsQuery, GetAllTransactionsQueryVariables>(
    GetAllTransactionsDocument,
    options,
  )
}
export function useGetAllTransactionsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetAllTransactionsQuery,
    GetAllTransactionsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetAllTransactionsQuery, GetAllTransactionsQueryVariables>(
    GetAllTransactionsDocument,
    options,
  )
}
export function useGetAllTransactionsSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<GetAllTransactionsQuery, GetAllTransactionsQueryVariables>,
) {
  const options =
    baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions }
  return Apollo.useSuspenseQuery<GetAllTransactionsQuery, GetAllTransactionsQueryVariables>(
    GetAllTransactionsDocument,
    options,
  )
}
export type GetAllTransactionsQueryHookResult = ReturnType<typeof useGetAllTransactionsQuery>
export type GetAllTransactionsLazyQueryHookResult = ReturnType<
  typeof useGetAllTransactionsLazyQuery
>
export type GetAllTransactionsSuspenseQueryHookResult = ReturnType<
  typeof useGetAllTransactionsSuspenseQuery
>
export type GetAllTransactionsQueryResult = Apollo.QueryResult<
  GetAllTransactionsQuery,
  GetAllTransactionsQueryVariables
>
export const GetUserDailyActivityDocument = gql`
    query GetUserDailyActivity($user_id: String!, $start_date: String!, $end_date: String!) {
  getUserDailyActivity(
    user_id: $user_id
    start_date: $start_date
    end_date: $end_date
  ) {
    id
    user_id
    activity_date
    app_opened
    app_opened_at
    first_session_completed
    sessions_completed
    total_dance_time
    events_attended
    social_interactions
    points_earned_today
    streak_day
    created_at
    updated_at
    user {
      username
      display_name
      avatar_url
    }
  }
}
    `

/**
 * __useGetUserDailyActivityQuery__
 *
 * To run a query within a React component, call `useGetUserDailyActivityQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserDailyActivityQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserDailyActivityQuery({
 *   variables: {
 *      user_id: // value for 'user_id'
 *      start_date: // value for 'start_date'
 *      end_date: // value for 'end_date'
 *   },
 * });
 */
export function useGetUserDailyActivityQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetUserDailyActivityQuery,
    GetUserDailyActivityQueryVariables
  > &
    ({ variables: GetUserDailyActivityQueryVariables; skip?: boolean } | { skip: boolean }),
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetUserDailyActivityQuery, GetUserDailyActivityQueryVariables>(
    GetUserDailyActivityDocument,
    options,
  )
}
export function useGetUserDailyActivityLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetUserDailyActivityQuery,
    GetUserDailyActivityQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetUserDailyActivityQuery, GetUserDailyActivityQueryVariables>(
    GetUserDailyActivityDocument,
    options,
  )
}
export function useGetUserDailyActivitySuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        GetUserDailyActivityQuery,
        GetUserDailyActivityQueryVariables
      >,
) {
  const options =
    baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions }
  return Apollo.useSuspenseQuery<GetUserDailyActivityQuery, GetUserDailyActivityQueryVariables>(
    GetUserDailyActivityDocument,
    options,
  )
}
export type GetUserDailyActivityQueryHookResult = ReturnType<typeof useGetUserDailyActivityQuery>
export type GetUserDailyActivityLazyQueryHookResult = ReturnType<
  typeof useGetUserDailyActivityLazyQuery
>
export type GetUserDailyActivitySuspenseQueryHookResult = ReturnType<
  typeof useGetUserDailyActivitySuspenseQuery
>
export type GetUserDailyActivityQueryResult = Apollo.QueryResult<
  GetUserDailyActivityQuery,
  GetUserDailyActivityQueryVariables
>
export const GetEventAttendanceDocument = gql`
    query GetEventAttendance($event_id: ID!) {
  getEventAttendance(event_id: $event_id) {
    id
    event_id
    user_id
    registration_id
    checked_in
    checked_in_at
    checked_out
    checked_out_at
    duration_minutes
    points_earned
    attendance_verified
    verified_by
    verified_at
    created_at
    updated_at
    user {
      privy_id
      username
      display_name
      avatar_url
    }
    event {
      id
      title
      start_date_time
      end_date_time
    }
  }
}
    `

/**
 * __useGetEventAttendanceQuery__
 *
 * To run a query within a React component, call `useGetEventAttendanceQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetEventAttendanceQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetEventAttendanceQuery({
 *   variables: {
 *      event_id: // value for 'event_id'
 *   },
 * });
 */
export function useGetEventAttendanceQuery(
  baseOptions: Apollo.QueryHookOptions<GetEventAttendanceQuery, GetEventAttendanceQueryVariables> &
    ({ variables: GetEventAttendanceQueryVariables; skip?: boolean } | { skip: boolean }),
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetEventAttendanceQuery, GetEventAttendanceQueryVariables>(
    GetEventAttendanceDocument,
    options,
  )
}
export function useGetEventAttendanceLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetEventAttendanceQuery,
    GetEventAttendanceQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetEventAttendanceQuery, GetEventAttendanceQueryVariables>(
    GetEventAttendanceDocument,
    options,
  )
}
export function useGetEventAttendanceSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<GetEventAttendanceQuery, GetEventAttendanceQueryVariables>,
) {
  const options =
    baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions }
  return Apollo.useSuspenseQuery<GetEventAttendanceQuery, GetEventAttendanceQueryVariables>(
    GetEventAttendanceDocument,
    options,
  )
}
export type GetEventAttendanceQueryHookResult = ReturnType<typeof useGetEventAttendanceQuery>
export type GetEventAttendanceLazyQueryHookResult = ReturnType<
  typeof useGetEventAttendanceLazyQuery
>
export type GetEventAttendanceSuspenseQueryHookResult = ReturnType<
  typeof useGetEventAttendanceSuspenseQuery
>
export type GetEventAttendanceQueryResult = Apollo.QueryResult<
  GetEventAttendanceQuery,
  GetEventAttendanceQueryVariables
>
export const GetUserEventAttendanceDocument = gql`
    query GetUserEventAttendance($user_id: String!) {
  getUserEventAttendance(user_id: $user_id) {
    id
    event_id
    user_id
    registration_id
    checked_in
    checked_in_at
    checked_out
    checked_out_at
    duration_minutes
    points_earned
    attendance_verified
    verified_by
    verified_at
    created_at
    updated_at
    event {
      id
      title
      start_date_time
      end_date_time
      location_name
    }
  }
}
    `

/**
 * __useGetUserEventAttendanceQuery__
 *
 * To run a query within a React component, call `useGetUserEventAttendanceQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserEventAttendanceQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserEventAttendanceQuery({
 *   variables: {
 *      user_id: // value for 'user_id'
 *   },
 * });
 */
export function useGetUserEventAttendanceQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetUserEventAttendanceQuery,
    GetUserEventAttendanceQueryVariables
  > &
    ({ variables: GetUserEventAttendanceQueryVariables; skip?: boolean } | { skip: boolean }),
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetUserEventAttendanceQuery, GetUserEventAttendanceQueryVariables>(
    GetUserEventAttendanceDocument,
    options,
  )
}
export function useGetUserEventAttendanceLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetUserEventAttendanceQuery,
    GetUserEventAttendanceQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetUserEventAttendanceQuery, GetUserEventAttendanceQueryVariables>(
    GetUserEventAttendanceDocument,
    options,
  )
}
export function useGetUserEventAttendanceSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        GetUserEventAttendanceQuery,
        GetUserEventAttendanceQueryVariables
      >,
) {
  const options =
    baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions }
  return Apollo.useSuspenseQuery<GetUserEventAttendanceQuery, GetUserEventAttendanceQueryVariables>(
    GetUserEventAttendanceDocument,
    options,
  )
}
export type GetUserEventAttendanceQueryHookResult = ReturnType<
  typeof useGetUserEventAttendanceQuery
>
export type GetUserEventAttendanceLazyQueryHookResult = ReturnType<
  typeof useGetUserEventAttendanceLazyQuery
>
export type GetUserEventAttendanceSuspenseQueryHookResult = ReturnType<
  typeof useGetUserEventAttendanceSuspenseQuery
>
export type GetUserEventAttendanceQueryResult = Apollo.QueryResult<
  GetUserEventAttendanceQuery,
  GetUserEventAttendanceQueryVariables
>
export const GetPointsOverviewDocument = gql`
    query GetPointsOverview {
  getPointsOverview {
    total_points_issued
    total_points_spent
    total_active_users
    avg_points_per_user
    top_earning_action {
      action_key
      action_name
      points_value
      total_points_awarded
    }
    points_issued_today
    points_issued_this_week
    points_issued_this_month
  }
}
    `

/**
 * __useGetPointsOverviewQuery__
 *
 * To run a query within a React component, call `useGetPointsOverviewQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPointsOverviewQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPointsOverviewQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetPointsOverviewQuery(
  baseOptions?: Apollo.QueryHookOptions<GetPointsOverviewQuery, GetPointsOverviewQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetPointsOverviewQuery, GetPointsOverviewQueryVariables>(
    GetPointsOverviewDocument,
    options,
  )
}
export function useGetPointsOverviewLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetPointsOverviewQuery,
    GetPointsOverviewQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetPointsOverviewQuery, GetPointsOverviewQueryVariables>(
    GetPointsOverviewDocument,
    options,
  )
}
export function useGetPointsOverviewSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<GetPointsOverviewQuery, GetPointsOverviewQueryVariables>,
) {
  const options =
    baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions }
  return Apollo.useSuspenseQuery<GetPointsOverviewQuery, GetPointsOverviewQueryVariables>(
    GetPointsOverviewDocument,
    options,
  )
}
export type GetPointsOverviewQueryHookResult = ReturnType<typeof useGetPointsOverviewQuery>
export type GetPointsOverviewLazyQueryHookResult = ReturnType<typeof useGetPointsOverviewLazyQuery>
export type GetPointsOverviewSuspenseQueryHookResult = ReturnType<
  typeof useGetPointsOverviewSuspenseQuery
>
export type GetPointsOverviewQueryResult = Apollo.QueryResult<
  GetPointsOverviewQuery,
  GetPointsOverviewQueryVariables
>
export const GetUserPointsSummariesDocument = gql`
    query GetUserPointsSummaries($limit: Int, $offset: Int, $sort_by: String, $sort_order: String) {
  getUserPointsSummaries(
    limit: $limit
    offset: $offset
    sort_by: $sort_by
    sort_order: $sort_order
  ) {
    privy_id
    username
    total_points_earned
    total_points_spent
    current_points_balance
    xp
    level
    total_transactions
    unique_actions
    last_transaction_at
    transactions_last_week
    points_last_week
  }
}
    `

/**
 * __useGetUserPointsSummariesQuery__
 *
 * To run a query within a React component, call `useGetUserPointsSummariesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserPointsSummariesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserPointsSummariesQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *      sort_by: // value for 'sort_by'
 *      sort_order: // value for 'sort_order'
 *   },
 * });
 */
export function useGetUserPointsSummariesQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetUserPointsSummariesQuery,
    GetUserPointsSummariesQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetUserPointsSummariesQuery, GetUserPointsSummariesQueryVariables>(
    GetUserPointsSummariesDocument,
    options,
  )
}
export function useGetUserPointsSummariesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetUserPointsSummariesQuery,
    GetUserPointsSummariesQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetUserPointsSummariesQuery, GetUserPointsSummariesQueryVariables>(
    GetUserPointsSummariesDocument,
    options,
  )
}
export function useGetUserPointsSummariesSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        GetUserPointsSummariesQuery,
        GetUserPointsSummariesQueryVariables
      >,
) {
  const options =
    baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions }
  return Apollo.useSuspenseQuery<GetUserPointsSummariesQuery, GetUserPointsSummariesQueryVariables>(
    GetUserPointsSummariesDocument,
    options,
  )
}
export type GetUserPointsSummariesQueryHookResult = ReturnType<
  typeof useGetUserPointsSummariesQuery
>
export type GetUserPointsSummariesLazyQueryHookResult = ReturnType<
  typeof useGetUserPointsSummariesLazyQuery
>
export type GetUserPointsSummariesSuspenseQueryHookResult = ReturnType<
  typeof useGetUserPointsSummariesSuspenseQuery
>
export type GetUserPointsSummariesQueryResult = Apollo.QueryResult<
  GetUserPointsSummariesQuery,
  GetUserPointsSummariesQueryVariables
>
export const GetEventAttendanceSummariesDocument = gql`
    query GetEventAttendanceSummaries {
  getEventAttendanceSummaries {
    event_id
    event_name
    start_date
    end_date
    total_attendees
    checked_in_count
    verified_count
    avg_duration_minutes
    total_points_awarded
    avg_points_per_attendee
  }
}
    `

/**
 * __useGetEventAttendanceSummariesQuery__
 *
 * To run a query within a React component, call `useGetEventAttendanceSummariesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetEventAttendanceSummariesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetEventAttendanceSummariesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetEventAttendanceSummariesQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetEventAttendanceSummariesQuery,
    GetEventAttendanceSummariesQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<
    GetEventAttendanceSummariesQuery,
    GetEventAttendanceSummariesQueryVariables
  >(GetEventAttendanceSummariesDocument, options)
}
export function useGetEventAttendanceSummariesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetEventAttendanceSummariesQuery,
    GetEventAttendanceSummariesQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<
    GetEventAttendanceSummariesQuery,
    GetEventAttendanceSummariesQueryVariables
  >(GetEventAttendanceSummariesDocument, options)
}
export function useGetEventAttendanceSummariesSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        GetEventAttendanceSummariesQuery,
        GetEventAttendanceSummariesQueryVariables
      >,
) {
  const options =
    baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions }
  return Apollo.useSuspenseQuery<
    GetEventAttendanceSummariesQuery,
    GetEventAttendanceSummariesQueryVariables
  >(GetEventAttendanceSummariesDocument, options)
}
export type GetEventAttendanceSummariesQueryHookResult = ReturnType<
  typeof useGetEventAttendanceSummariesQuery
>
export type GetEventAttendanceSummariesLazyQueryHookResult = ReturnType<
  typeof useGetEventAttendanceSummariesLazyQuery
>
export type GetEventAttendanceSummariesSuspenseQueryHookResult = ReturnType<
  typeof useGetEventAttendanceSummariesSuspenseQuery
>
export type GetEventAttendanceSummariesQueryResult = Apollo.QueryResult<
  GetEventAttendanceSummariesQuery,
  GetEventAttendanceSummariesQueryVariables
>
export const GetReferralByCodeDocument = gql`
    query GetReferralByCode($code: String!) {
  getReferralByCode(code: $code) {
    id
    referral_code
    referrer_user_id
    status
    created_at
    referrer {
      username
      display_name
      avatar_url
      xp
      level
    }
  }
}
    `

/**
 * __useGetReferralByCodeQuery__
 *
 * To run a query within a React component, call `useGetReferralByCodeQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetReferralByCodeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetReferralByCodeQuery({
 *   variables: {
 *      code: // value for 'code'
 *   },
 * });
 */
export function useGetReferralByCodeQuery(
  baseOptions: Apollo.QueryHookOptions<GetReferralByCodeQuery, GetReferralByCodeQueryVariables> &
    ({ variables: GetReferralByCodeQueryVariables; skip?: boolean } | { skip: boolean }),
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetReferralByCodeQuery, GetReferralByCodeQueryVariables>(
    GetReferralByCodeDocument,
    options,
  )
}
export function useGetReferralByCodeLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetReferralByCodeQuery,
    GetReferralByCodeQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetReferralByCodeQuery, GetReferralByCodeQueryVariables>(
    GetReferralByCodeDocument,
    options,
  )
}
export function useGetReferralByCodeSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<GetReferralByCodeQuery, GetReferralByCodeQueryVariables>,
) {
  const options =
    baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions }
  return Apollo.useSuspenseQuery<GetReferralByCodeQuery, GetReferralByCodeQueryVariables>(
    GetReferralByCodeDocument,
    options,
  )
}
export type GetReferralByCodeQueryHookResult = ReturnType<typeof useGetReferralByCodeQuery>
export type GetReferralByCodeLazyQueryHookResult = ReturnType<typeof useGetReferralByCodeLazyQuery>
export type GetReferralByCodeSuspenseQueryHookResult = ReturnType<
  typeof useGetReferralByCodeSuspenseQuery
>
export type GetReferralByCodeQueryResult = Apollo.QueryResult<
  GetReferralByCodeQuery,
  GetReferralByCodeQueryVariables
>
export const GetMyReferralCodeDocument = gql`
    query GetMyReferralCode {
  myReferralCode {
    id
    user_id
    referral_code
    created_at
    share_url
  }
}
    `

/**
 * __useGetMyReferralCodeQuery__
 *
 * To run a query within a React component, call `useGetMyReferralCodeQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMyReferralCodeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMyReferralCodeQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetMyReferralCodeQuery(
  baseOptions?: Apollo.QueryHookOptions<GetMyReferralCodeQuery, GetMyReferralCodeQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetMyReferralCodeQuery, GetMyReferralCodeQueryVariables>(
    GetMyReferralCodeDocument,
    options,
  )
}
export function useGetMyReferralCodeLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetMyReferralCodeQuery,
    GetMyReferralCodeQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetMyReferralCodeQuery, GetMyReferralCodeQueryVariables>(
    GetMyReferralCodeDocument,
    options,
  )
}
export function useGetMyReferralCodeSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<GetMyReferralCodeQuery, GetMyReferralCodeQueryVariables>,
) {
  const options =
    baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions }
  return Apollo.useSuspenseQuery<GetMyReferralCodeQuery, GetMyReferralCodeQueryVariables>(
    GetMyReferralCodeDocument,
    options,
  )
}
export type GetMyReferralCodeQueryHookResult = ReturnType<typeof useGetMyReferralCodeQuery>
export type GetMyReferralCodeLazyQueryHookResult = ReturnType<typeof useGetMyReferralCodeLazyQuery>
export type GetMyReferralCodeSuspenseQueryHookResult = ReturnType<
  typeof useGetMyReferralCodeSuspenseQuery
>
export type GetMyReferralCodeQueryResult = Apollo.QueryResult<
  GetMyReferralCodeQuery,
  GetMyReferralCodeQueryVariables
>
export const GetMyReferralStatsDocument = gql`
    query GetMyReferralStats {
  myReferralStats {
    total_clicks
    total_signups
    total_completed
    total_points_earned
    conversion_rate
    pending_referrals
    completed_referrals
  }
}
    `

/**
 * __useGetMyReferralStatsQuery__
 *
 * To run a query within a React component, call `useGetMyReferralStatsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMyReferralStatsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMyReferralStatsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetMyReferralStatsQuery(
  baseOptions?: Apollo.QueryHookOptions<GetMyReferralStatsQuery, GetMyReferralStatsQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetMyReferralStatsQuery, GetMyReferralStatsQueryVariables>(
    GetMyReferralStatsDocument,
    options,
  )
}
export function useGetMyReferralStatsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetMyReferralStatsQuery,
    GetMyReferralStatsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetMyReferralStatsQuery, GetMyReferralStatsQueryVariables>(
    GetMyReferralStatsDocument,
    options,
  )
}
export function useGetMyReferralStatsSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<GetMyReferralStatsQuery, GetMyReferralStatsQueryVariables>,
) {
  const options =
    baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions }
  return Apollo.useSuspenseQuery<GetMyReferralStatsQuery, GetMyReferralStatsQueryVariables>(
    GetMyReferralStatsDocument,
    options,
  )
}
export type GetMyReferralStatsQueryHookResult = ReturnType<typeof useGetMyReferralStatsQuery>
export type GetMyReferralStatsLazyQueryHookResult = ReturnType<
  typeof useGetMyReferralStatsLazyQuery
>
export type GetMyReferralStatsSuspenseQueryHookResult = ReturnType<
  typeof useGetMyReferralStatsSuspenseQuery
>
export type GetMyReferralStatsQueryResult = Apollo.QueryResult<
  GetMyReferralStatsQuery,
  GetMyReferralStatsQueryVariables
>
export const GetMyReferralsDocument = gql`
    query GetMyReferrals($limit: Int, $offset: Int, $status: ReferralStatus) {
  myReferrals(limit: $limit, offset: $offset, status: $status) {
    id
    referral_code
    referee_user_id
    status
    created_at
    signup_completed_at
    first_session_completed_at
    points_awarded
    referee {
      username
      display_name
      avatar_url
    }
  }
}
    `

/**
 * __useGetMyReferralsQuery__
 *
 * To run a query within a React component, call `useGetMyReferralsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMyReferralsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMyReferralsQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *      status: // value for 'status'
 *   },
 * });
 */
export function useGetMyReferralsQuery(
  baseOptions?: Apollo.QueryHookOptions<GetMyReferralsQuery, GetMyReferralsQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetMyReferralsQuery, GetMyReferralsQueryVariables>(
    GetMyReferralsDocument,
    options,
  )
}
export function useGetMyReferralsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetMyReferralsQuery, GetMyReferralsQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetMyReferralsQuery, GetMyReferralsQueryVariables>(
    GetMyReferralsDocument,
    options,
  )
}
export function useGetMyReferralsSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<GetMyReferralsQuery, GetMyReferralsQueryVariables>,
) {
  const options =
    baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions }
  return Apollo.useSuspenseQuery<GetMyReferralsQuery, GetMyReferralsQueryVariables>(
    GetMyReferralsDocument,
    options,
  )
}
export type GetMyReferralsQueryHookResult = ReturnType<typeof useGetMyReferralsQuery>
export type GetMyReferralsLazyQueryHookResult = ReturnType<typeof useGetMyReferralsLazyQuery>
export type GetMyReferralsSuspenseQueryHookResult = ReturnType<
  typeof useGetMyReferralsSuspenseQuery
>
export type GetMyReferralsQueryResult = Apollo.QueryResult<
  GetMyReferralsQuery,
  GetMyReferralsQueryVariables
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
export const GetUserByUsernameDocument = gql`
    query GetUserByUsername($username: String!) {
  getUserByUsername(username: $username) {
    ...UserFullInfo
  }
}
    ${UserFullInfoFragmentDoc}`

/**
 * __useGetUserByUsernameQuery__
 *
 * To run a query within a React component, call `useGetUserByUsernameQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserByUsernameQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserByUsernameQuery({
 *   variables: {
 *      username: // value for 'username'
 *   },
 * });
 */
export function useGetUserByUsernameQuery(
  baseOptions: Apollo.QueryHookOptions<GetUserByUsernameQuery, GetUserByUsernameQueryVariables> &
    ({ variables: GetUserByUsernameQueryVariables; skip?: boolean } | { skip: boolean }),
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetUserByUsernameQuery, GetUserByUsernameQueryVariables>(
    GetUserByUsernameDocument,
    options,
  )
}
export function useGetUserByUsernameLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetUserByUsernameQuery,
    GetUserByUsernameQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetUserByUsernameQuery, GetUserByUsernameQueryVariables>(
    GetUserByUsernameDocument,
    options,
  )
}
export function useGetUserByUsernameSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<GetUserByUsernameQuery, GetUserByUsernameQueryVariables>,
) {
  const options =
    baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions }
  return Apollo.useSuspenseQuery<GetUserByUsernameQuery, GetUserByUsernameQueryVariables>(
    GetUserByUsernameDocument,
    options,
  )
}
export type GetUserByUsernameQueryHookResult = ReturnType<typeof useGetUserByUsernameQuery>
export type GetUserByUsernameLazyQueryHookResult = ReturnType<typeof useGetUserByUsernameLazyQuery>
export type GetUserByUsernameSuspenseQueryHookResult = ReturnType<
  typeof useGetUserByUsernameSuspenseQuery
>
export type GetUserByUsernameQueryResult = Apollo.QueryResult<
  GetUserByUsernameQuery,
  GetUserByUsernameQueryVariables
>
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
