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

export enum ActionType {
  OpenAchievement = 'open_achievement',
  OpenEvent = 'open_event',
  OpenPost = 'open_post',
  OpenProfile = 'open_profile',
  OpenSettings = 'open_settings',
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

export enum BroadcastTarget {
  AllUsers = 'all_users',
  Dancers = 'dancers',
  EventParticipants = 'event_participants',
  Organizers = 'organizers',
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

export type CreateCommentInput = {
  content: Scalars['String']['input']
  post_id: Scalars['ID']['input']
}

export type CreateDanceBondInput = {
  user_id: Scalars['String']['input']
}

export type CreateEventInput = {
  category?: InputMaybe<EventCategory>
  currency?: InputMaybe<Scalars['String']['input']>
  dance_styles?: InputMaybe<Array<Scalars['String']['input']>>
  description?: InputMaybe<Scalars['String']['input']>
  end_date_time: Scalars['DateTime']['input']
  image_url?: InputMaybe<Scalars['String']['input']>
  is_featured?: InputMaybe<Scalars['Boolean']['input']>
  is_recurring?: InputMaybe<Scalars['Boolean']['input']>
  is_virtual?: InputMaybe<Scalars['Boolean']['input']>
  location_address?: InputMaybe<Scalars['String']['input']>
  location_city?: InputMaybe<Scalars['String']['input']>
  location_latitude?: InputMaybe<Scalars['Float']['input']>
  location_longitude?: InputMaybe<Scalars['Float']['input']>
  location_name: Scalars['String']['input']
  max_capacity?: InputMaybe<Scalars['Int']['input']>
  price_danz?: InputMaybe<Scalars['Float']['input']>
  price_usd?: InputMaybe<Scalars['Float']['input']>
  recurrence_count?: InputMaybe<Scalars['Int']['input']>
  recurrence_days?: InputMaybe<Array<Scalars['String']['input']>>
  recurrence_end_date?: InputMaybe<Scalars['DateTime']['input']>
  recurrence_type?: InputMaybe<RecurrenceType>
  requirements?: InputMaybe<Scalars['String']['input']>
  skill_level?: InputMaybe<SkillLevel>
  start_date_time: Scalars['DateTime']['input']
  tags?: InputMaybe<Array<Scalars['String']['input']>>
  title: Scalars['String']['input']
  virtual_link?: InputMaybe<Scalars['String']['input']>
}

export type CreateFreestyleSessionInput = {
  completed?: InputMaybe<Scalars['Boolean']['input']>
  duration_seconds: Scalars['Int']['input']
  motion_data?: InputMaybe<Scalars['JSON']['input']>
  movement_score: Scalars['Float']['input']
  music_source?: InputMaybe<MusicSource>
}

export type CreateNotificationInput = {
  action_data?: InputMaybe<Scalars['JSON']['input']>
  action_type?: InputMaybe<ActionType>
  event_id?: InputMaybe<Scalars['ID']['input']>
  message: Scalars['String']['input']
  post_id?: InputMaybe<Scalars['ID']['input']>
  recipient_id: Scalars['String']['input']
  title: Scalars['String']['input']
  type: NotificationType
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

export type CreatePostInput = {
  content: Scalars['String']['input']
  event_id?: InputMaybe<Scalars['ID']['input']>
  is_public?: InputMaybe<Scalars['Boolean']['input']>
  location?: InputMaybe<Scalars['String']['input']>
  media_type?: InputMaybe<MediaType>
  media_url?: InputMaybe<Scalars['String']['input']>
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
  bond_level: Scalars['Int']['output']
  created_at: Scalars['DateTime']['output']
  id: Scalars['ID']['output']
  last_dance_date?: Maybe<Scalars['DateTime']['output']>
  otherUser?: Maybe<User>
  shared_events_count: Scalars['Int']['output']
  shared_sessions?: Maybe<Scalars['Int']['output']>
  total_dances: Scalars['Int']['output']
  updated_at: Scalars['DateTime']['output']
  user1: User
  user1_id: Scalars['String']['output']
  user2: User
  user2_id: Scalars['String']['output']
  user_id_1: Scalars['String']['output']
  user_id_2: Scalars['String']['output']
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
  is_recurring?: Maybe<Scalars['Boolean']['output']>
  is_virtual?: Maybe<Scalars['Boolean']['output']>
  location_address?: Maybe<Scalars['String']['output']>
  location_city?: Maybe<Scalars['String']['output']>
  location_latitude?: Maybe<Scalars['Float']['output']>
  location_longitude?: Maybe<Scalars['Float']['output']>
  location_name: Scalars['String']['output']
  max_capacity?: Maybe<Scalars['Int']['output']>
  parent_event?: Maybe<Event>
  parent_event_id?: Maybe<Scalars['ID']['output']>
  participants?: Maybe<Array<EventRegistration>>
  price_danz?: Maybe<Scalars['Float']['output']>
  price_usd?: Maybe<Scalars['Float']['output']>
  recurrence_count?: Maybe<Scalars['Int']['output']>
  recurrence_days?: Maybe<Array<Scalars['String']['output']>>
  recurrence_end_date?: Maybe<Scalars['DateTime']['output']>
  recurrence_type?: Maybe<RecurrenceType>
  recurring_instances?: Maybe<Array<Event>>
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

export type EventManager = {
  __typename?: 'EventManager'
  accepted_at?: Maybe<Scalars['DateTime']['output']>
  can_delete_event: Scalars['Boolean']['output']
  can_edit_details: Scalars['Boolean']['output']
  can_invite_managers: Scalars['Boolean']['output']
  can_manage_posts: Scalars['Boolean']['output']
  can_manage_registrations: Scalars['Boolean']['output']
  can_send_broadcasts: Scalars['Boolean']['output']
  created_at: Scalars['DateTime']['output']
  event?: Maybe<Event>
  event_id: Scalars['ID']['output']
  id: Scalars['ID']['output']
  invited_at?: Maybe<Scalars['DateTime']['output']>
  invited_by?: Maybe<Scalars['String']['output']>
  inviter?: Maybe<User>
  role: EventManagerRole
  status: EventManagerStatus
  updated_at?: Maybe<Scalars['DateTime']['output']>
  user?: Maybe<User>
  user_id: Scalars['String']['output']
}

export type EventManagerConnection = {
  __typename?: 'EventManagerConnection'
  managers: Array<EventManager>
  total_count: Scalars['Int']['output']
}

export type EventManagerPermissions = {
  __typename?: 'EventManagerPermissions'
  can_delete_event: Scalars['Boolean']['output']
  can_edit_details: Scalars['Boolean']['output']
  can_invite_managers: Scalars['Boolean']['output']
  can_manage_posts: Scalars['Boolean']['output']
  can_manage_registrations: Scalars['Boolean']['output']
  can_send_broadcasts: Scalars['Boolean']['output']
}

export enum EventManagerRole {
  Creator = 'creator',
  Manager = 'manager',
  Moderator = 'moderator',
}

export enum EventManagerStatus {
  Active = 'active',
  Declined = 'declined',
  Pending = 'pending',
  Removed = 'removed',
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

export enum RecurrenceType {
  None = 'none',
  Daily = 'daily',
  Weekly = 'weekly',
  Biweekly = 'biweekly',
  Monthly = 'monthly',
}

export type FeedResponse = {
  __typename?: 'FeedResponse'
  cursor?: Maybe<Scalars['String']['output']>
  has_more: Scalars['Boolean']['output']
  posts: Array<Post>
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

export type FreestyleSession = {
  __typename?: 'FreestyleSession'
  completed: Scalars['Boolean']['output']
  created_at: Scalars['DateTime']['output']
  duration_seconds: Scalars['Int']['output']
  id: Scalars['ID']['output']
  motion_data?: Maybe<Scalars['JSON']['output']>
  movement_score: Scalars['Float']['output']
  music_source: MusicSource
  points_awarded: Scalars['Int']['output']
  session_date: Scalars['DateTime']['output']
  updated_at: Scalars['DateTime']['output']
  user: User
  user_id: Scalars['String']['output']
}

export type FreestyleSessionStats = {
  __typename?: 'FreestyleSessionStats'
  average_movement_score: Scalars['Float']['output']
  best_movement_score: Scalars['Float']['output']
  current_streak: Scalars['Int']['output']
  last_session_date?: Maybe<Scalars['DateTime']['output']>
  longest_streak: Scalars['Int']['output']
  sessions_this_week: Scalars['Int']['output']
  total_duration_seconds: Scalars['Int']['output']
  total_points: Scalars['Int']['output']
  total_sessions: Scalars['Int']['output']
}

export type InviteEventManagerInput = {
  can_edit_details?: InputMaybe<Scalars['Boolean']['input']>
  can_invite_managers?: InputMaybe<Scalars['Boolean']['input']>
  can_manage_posts?: InputMaybe<Scalars['Boolean']['input']>
  can_manage_registrations?: InputMaybe<Scalars['Boolean']['input']>
  can_send_broadcasts?: InputMaybe<Scalars['Boolean']['input']>
  event_id: Scalars['ID']['input']
  role?: InputMaybe<EventManagerRole>
  user_id: Scalars['String']['input']
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

export enum MediaType {
  Image = 'image',
  Video = 'video',
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

export enum MusicSource {
  Licensed = 'licensed',
  None = 'none',
  UserLibrary = 'user_library',
}

export type Mutation = {
  __typename?: 'Mutation'
  _empty?: Maybe<Scalars['String']['output']>
  acceptManagerInvitation: EventManager
  approveOrganizer: User
  awardManualPoints: PointTransaction
  awardPoints: PointTransaction
  cancelEventRegistration: MutationResponse
  checkInEvent: EventAttendance
  checkInParticipant: EventRegistration
  checkOutEvent: EventAttendance
  completeReferral: Referral
  createComment: PostComment
  createDanceBond: DanceBond
  createEvent: Event
  createFreestyleSession: FreestyleSession
  createNotification: Notification
  createPointAction: PointAction
  createPost: Post
  declineManagerInvitation: EventManager
  deleteComment: MutationResponse
  deleteDanceBond: MutationResponse
  deleteDanceSession: MutationResponse
  deleteEvent: MutationResponse
  deleteFreestyleSession: MutationResponse
  deleteNotification: MutationResponse
  deletePointAction: MutationResponse
  deletePost: MutationResponse
  featureEvent: Event
  generateShareLinks: ShareLinks
  inviteEventManager: EventManager
  leaveEventAsManager: MutationResponse
  likePost: MutationResponse
  markAllNotificationsRead: MutationResponse
  markNotificationRead: Notification
  markReferralCompleted: Referral
  registerForEvent: EventRegistration
  removeEventManager: MutationResponse
  reversePointTransaction: PointTransaction
  saveDanceSession: DanceSession
  sendAdminBroadcast: MutationResponse
  sendEventBroadcast: MutationResponse
  shareDanceSession: DanceSession
  togglePointAction: PointAction
  trackAppOpen: DailyActivity
  trackReferralClick: MutationResponse
  transferEventOwnership: EventManager
  unlikePost: MutationResponse
  updateComment: PostComment
  updateDanceBond: DanceBond
  updateEvent: Event
  updateEventManager: EventManager
  updateFreestylePreferences: UserPreferences
  updateNotificationPreferences: NotificationPreferences
  updatePointAction: PointAction
  updatePost: Post
  updateProfile: User
  updateRegistrationStatus: EventRegistration
  updateUserRole: User
  verifyEventAttendance: EventAttendance
  verifyPointTransaction: PointTransaction
}

export type MutationAcceptManagerInvitationArgs = {
  manager_id: Scalars['ID']['input']
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

export type MutationCreateCommentArgs = {
  input: CreateCommentInput
}

export type MutationCreateDanceBondArgs = {
  input: CreateDanceBondInput
  userId: Scalars['String']['input']
}

export type MutationCreateEventArgs = {
  input: CreateEventInput
}

export type MutationCreateFreestyleSessionArgs = {
  input: CreateFreestyleSessionInput
}

export type MutationCreateNotificationArgs = {
  input: CreateNotificationInput
}

export type MutationCreatePointActionArgs = {
  input: CreatePointActionInput
}

export type MutationCreatePostArgs = {
  input: CreatePostInput
}

export type MutationDeclineManagerInvitationArgs = {
  manager_id: Scalars['ID']['input']
}

export type MutationDeleteCommentArgs = {
  commentId: Scalars['ID']['input']
}

export type MutationDeleteDanceBondArgs = {
  bondId: Scalars['ID']['input']
}

export type MutationDeleteDanceSessionArgs = {
  sessionId: Scalars['ID']['input']
}

export type MutationDeleteEventArgs = {
  id: Scalars['ID']['input']
}

export type MutationDeleteFreestyleSessionArgs = {
  sessionId: Scalars['ID']['input']
}

export type MutationDeleteNotificationArgs = {
  id: Scalars['ID']['input']
}

export type MutationDeletePointActionArgs = {
  action_key: Scalars['String']['input']
}

export type MutationDeletePostArgs = {
  postId: Scalars['ID']['input']
}

export type MutationFeatureEventArgs = {
  eventId: Scalars['ID']['input']
  featured: Scalars['Boolean']['input']
}

export type MutationInviteEventManagerArgs = {
  input: InviteEventManagerInput
}

export type MutationLeaveEventAsManagerArgs = {
  event_id: Scalars['ID']['input']
}

export type MutationLikePostArgs = {
  postId: Scalars['ID']['input']
}

export type MutationMarkNotificationReadArgs = {
  id: Scalars['ID']['input']
}

export type MutationMarkReferralCompletedArgs = {
  referralId: Scalars['ID']['input']
}

export type MutationRegisterForEventArgs = {
  eventId: Scalars['ID']['input']
  notes?: InputMaybe<Scalars['String']['input']>
}

export type MutationRemoveEventManagerArgs = {
  manager_id: Scalars['ID']['input']
}

export type MutationReversePointTransactionArgs = {
  reason: Scalars['String']['input']
  transaction_id: Scalars['ID']['input']
}

export type MutationSaveDanceSessionArgs = {
  input: SaveDanceSessionInput
}

export type MutationSendAdminBroadcastArgs = {
  input: SendBroadcastInput
}

export type MutationSendEventBroadcastArgs = {
  input: SendEventBroadcastInput
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

export type MutationTransferEventOwnershipArgs = {
  event_id: Scalars['ID']['input']
  new_creator_id: Scalars['String']['input']
}

export type MutationUnlikePostArgs = {
  postId: Scalars['ID']['input']
}

export type MutationUpdateCommentArgs = {
  commentId: Scalars['ID']['input']
  content: Scalars['String']['input']
}

export type MutationUpdateDanceBondArgs = {
  level: Scalars['Int']['input']
  userId: Scalars['String']['input']
}

export type MutationUpdateEventArgs = {
  id: Scalars['ID']['input']
  input: UpdateEventInput
}

export type MutationUpdateEventManagerArgs = {
  input: UpdateEventManagerInput
}

export type MutationUpdateFreestylePreferencesArgs = {
  input: UpdateUserPreferencesInput
}

export type MutationUpdateNotificationPreferencesArgs = {
  input: UpdateNotificationPreferencesInput
}

export type MutationUpdatePointActionArgs = {
  input: UpdatePointActionInput
}

export type MutationUpdatePostArgs = {
  input: UpdatePostInput
  postId: Scalars['ID']['input']
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

export type Notification = {
  __typename?: 'Notification'
  achievement_id?: Maybe<Scalars['ID']['output']>
  action_data?: Maybe<Scalars['JSON']['output']>
  action_type?: Maybe<ActionType>
  bond_id?: Maybe<Scalars['ID']['output']>
  broadcast_target?: Maybe<BroadcastTarget>
  created_at: Scalars['DateTime']['output']
  event?: Maybe<Event>
  event_id?: Maybe<Scalars['ID']['output']>
  expires_at?: Maybe<Scalars['DateTime']['output']>
  id: Scalars['ID']['output']
  is_broadcast: Scalars['Boolean']['output']
  message: Scalars['String']['output']
  post_id?: Maybe<Scalars['ID']['output']>
  push_sent: Scalars['Boolean']['output']
  push_sent_at?: Maybe<Scalars['DateTime']['output']>
  read: Scalars['Boolean']['output']
  read_at?: Maybe<Scalars['DateTime']['output']>
  recipient?: Maybe<User>
  recipient_id: Scalars['String']['output']
  sender?: Maybe<User>
  sender_id?: Maybe<Scalars['String']['output']>
  sender_type?: Maybe<SenderType>
  title: Scalars['String']['output']
  type: NotificationType
}

export type NotificationConnection = {
  __typename?: 'NotificationConnection'
  has_more: Scalars['Boolean']['output']
  notifications: Array<Notification>
  total_count: Scalars['Int']['output']
  unread_count: Scalars['Int']['output']
}

export type NotificationPreferences = {
  __typename?: 'NotificationPreferences'
  achievements: Scalars['Boolean']['output']
  admin_broadcasts: Scalars['Boolean']['output']
  created_at: Scalars['DateTime']['output']
  dance_bonds: Scalars['Boolean']['output']
  email_notifications: Scalars['Boolean']['output']
  event_manager_broadcasts: Scalars['Boolean']['output']
  event_updates: Scalars['Boolean']['output']
  id: Scalars['ID']['output']
  post_interactions: Scalars['Boolean']['output']
  push_notifications: Scalars['Boolean']['output']
  quiet_hours_enabled: Scalars['Boolean']['output']
  quiet_hours_end?: Maybe<Scalars['String']['output']>
  quiet_hours_start?: Maybe<Scalars['String']['output']>
  updated_at: Scalars['DateTime']['output']
  user_id: Scalars['String']['output']
}

export enum NotificationType {
  Achievement = 'achievement',
  AdminBroadcast = 'admin_broadcast',
  DanceBond = 'dance_bond',
  EventManagerBroadcast = 'event_manager_broadcast',
  EventReminder = 'event_reminder',
  EventUpdate = 'event_update',
  PostComment = 'post_comment',
  PostLike = 'post_like',
  Referral = 'referral',
  System = 'system',
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

export type Post = {
  __typename?: 'Post'
  comments_count: Scalars['Int']['output']
  content: Scalars['String']['output']
  created_at: Scalars['DateTime']['output']
  event?: Maybe<Event>
  event_id?: Maybe<Scalars['ID']['output']>
  id: Scalars['ID']['output']
  is_liked_by_me: Scalars['Boolean']['output']
  is_public: Scalars['Boolean']['output']
  likes_count: Scalars['Int']['output']
  location?: Maybe<Scalars['String']['output']>
  media_type?: Maybe<MediaType>
  media_url?: Maybe<Scalars['String']['output']>
  updated_at: Scalars['DateTime']['output']
  user: User
  user_id: Scalars['String']['output']
}

export type PostComment = {
  __typename?: 'PostComment'
  content: Scalars['String']['output']
  created_at: Scalars['DateTime']['output']
  id: Scalars['ID']['output']
  post_id: Scalars['ID']['output']
  updated_at: Scalars['DateTime']['output']
  user: User
  user_id: Scalars['String']['output']
}

export type PostLike = {
  __typename?: 'PostLike'
  created_at: Scalars['DateTime']['output']
  id: Scalars['ID']['output']
  post_id: Scalars['ID']['output']
  user: User
  user_id: Scalars['String']['output']
}

export type PostWithDetails = {
  __typename?: 'PostWithDetails'
  comments: Array<PostComment>
  comments_count: Scalars['Int']['output']
  content: Scalars['String']['output']
  created_at: Scalars['DateTime']['output']
  event?: Maybe<Event>
  event_id?: Maybe<Scalars['ID']['output']>
  id: Scalars['ID']['output']
  is_liked_by_me: Scalars['Boolean']['output']
  is_public: Scalars['Boolean']['output']
  likes: Array<PostLike>
  likes_count: Scalars['Int']['output']
  location?: Maybe<Scalars['String']['output']>
  media_type?: Maybe<MediaType>
  media_url?: Maybe<Scalars['String']['output']>
  updated_at: Scalars['DateTime']['output']
  user: User
  user_id: Scalars['String']['output']
}

export type Query = {
  __typename?: 'Query'
  _empty?: Maybe<Scalars['String']['output']>
  adminStats: AdminStats
  checkEventPermission: Scalars['Boolean']['output']
  checkUsername: Scalars['Boolean']['output']
  completedFreestyleToday: Scalars['Boolean']['output']
  danceSession?: Maybe<DanceSession>
  event?: Maybe<Event>
  eventManager?: Maybe<EventManager>
  eventManagers: EventManagerConnection
  eventRegistrations: Array<EventRegistration>
  events: EventConnection
  freestyleSession?: Maybe<FreestyleSession>
  friendsDanceSessions: Array<DanceSession>
  getAllEventRegistrations: Array<EventRegistration>
  getAllPointActions: Array<PointAction>
  getAllTransactions: TransactionHistory
  getAllUsers: Array<User>
  getDanceBond?: Maybe<DanceBond>
  getEventAttendance: Array<EventAttendance>
  getEventAttendanceSummaries: Array<EventAttendanceSummary>
  getEventPosts: Array<Post>
  getFeed: FeedResponse
  getMyDanceBonds: Array<DanceBond>
  getMyPosts: Array<Post>
  getMyReferrals: Array<UserReferralInfo>
  getPointAction?: Maybe<PointAction>
  getPointsOverview: PointsOverview
  getPost?: Maybe<PostWithDetails>
  getReferralByCode?: Maybe<Referral>
  getReferralChain: Array<ReferralChainNode>
  getReferralClickStats: Array<ReferralClickTracking>
  getUploadUrl: UploadUrl
  getUserByUsername?: Maybe<User>
  getUserDailyActivity: Array<DailyActivity>
  getUserEventAttendance: Array<EventAttendance>
  getUserPointsSummaries: Array<UserPointsSummary>
  getUserPosts: Array<Post>
  getUserTransactions: TransactionHistory
  me?: Maybe<User>
  myDanceBonds: Array<DanceBond>
  myDanceSessionStats: DanceSessionStats
  myDanceSessions: DanceSessionConnection
  myEventManagerRole?: Maybe<EventManager>
  myFreestylePreferences: UserPreferences
  myFreestyleSessions: Array<FreestyleSession>
  myFreestyleStats: FreestyleSessionStats
  myManagedEvents: Array<Event>
  myNotificationPreferences: NotificationPreferences
  myNotifications: NotificationConnection
  myReferralCode?: Maybe<ReferralCode>
  myReferralStats: ReferralStats
  myReferrals: Array<Referral>
  notification?: Maybe<Notification>
  pendingOrganizers: UserConnection
  reportedContent?: Maybe<Scalars['JSON']['output']>
  unreadNotificationCount: Scalars['Int']['output']
  user?: Maybe<User>
  users: UserConnection
}

export type QueryCheckEventPermissionArgs = {
  event_id: Scalars['ID']['input']
  permission: Scalars['String']['input']
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

export type QueryEventManagerArgs = {
  id: Scalars['ID']['input']
}

export type QueryEventManagersArgs = {
  event_id: Scalars['ID']['input']
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

export type QueryFreestyleSessionArgs = {
  id: Scalars['ID']['input']
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

export type QueryGetDanceBondArgs = {
  userId: Scalars['String']['input']
}

export type QueryGetEventAttendanceArgs = {
  event_id: Scalars['ID']['input']
}

export type QueryGetEventPostsArgs = {
  eventId: Scalars['ID']['input']
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
}

export type QueryGetFeedArgs = {
  cursor?: InputMaybe<Scalars['String']['input']>
  limit?: InputMaybe<Scalars['Int']['input']>
}

export type QueryGetMyPostsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
}

export type QueryGetPointActionArgs = {
  action_key: Scalars['String']['input']
}

export type QueryGetPostArgs = {
  id: Scalars['ID']['input']
}

export type QueryGetReferralByCodeArgs = {
  code: Scalars['String']['input']
}

export type QueryGetReferralChainArgs = {
  userId?: InputMaybe<Scalars['String']['input']>
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

export type QueryGetUserPostsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  userId: Scalars['String']['input']
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

export type QueryMyEventManagerRoleArgs = {
  event_id: Scalars['ID']['input']
}

export type QueryMyFreestyleSessionsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
}

export type QueryMyNotificationsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  type?: InputMaybe<NotificationType>
  unread_only?: InputMaybe<Scalars['Boolean']['input']>
}

export type QueryMyReferralsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  status?: InputMaybe<ReferralStatus>
}

export type QueryNotificationArgs = {
  id: Scalars['ID']['input']
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
  clicked_at: Scalars['DateTime']['output']
  completed_at?: Maybe<Scalars['DateTime']['output']>
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
  signed_up_at?: Maybe<Scalars['DateTime']['output']>
  status: ReferralStatus
  user_agent?: Maybe<Scalars['String']['output']>
}

export type ReferralChainNode = {
  __typename?: 'ReferralChainNode'
  depth: Scalars['Int']['output']
  invited_by?: Maybe<Scalars['String']['output']>
  user_id: Scalars['String']['output']
  username?: Maybe<Scalars['String']['output']>
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

export type SendBroadcastInput = {
  action_data?: InputMaybe<Scalars['JSON']['input']>
  action_type?: InputMaybe<ActionType>
  broadcast_target: BroadcastTarget
  event_id?: InputMaybe<Scalars['ID']['input']>
  expires_at?: InputMaybe<Scalars['DateTime']['input']>
  message: Scalars['String']['input']
  title: Scalars['String']['input']
}

export type SendEventBroadcastInput = {
  action_data?: InputMaybe<Scalars['JSON']['input']>
  action_type?: InputMaybe<ActionType>
  event_id: Scalars['ID']['input']
  message: Scalars['String']['input']
  title: Scalars['String']['input']
}

export enum SenderType {
  Admin = 'admin',
  EventManager = 'event_manager',
  System = 'system',
  User = 'user',
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

export type UpdateEventManagerInput = {
  can_edit_details?: InputMaybe<Scalars['Boolean']['input']>
  can_invite_managers?: InputMaybe<Scalars['Boolean']['input']>
  can_manage_posts?: InputMaybe<Scalars['Boolean']['input']>
  can_manage_registrations?: InputMaybe<Scalars['Boolean']['input']>
  can_send_broadcasts?: InputMaybe<Scalars['Boolean']['input']>
  manager_id: Scalars['ID']['input']
  role?: InputMaybe<EventManagerRole>
}

export type UpdateNotificationPreferencesInput = {
  achievements?: InputMaybe<Scalars['Boolean']['input']>
  admin_broadcasts?: InputMaybe<Scalars['Boolean']['input']>
  dance_bonds?: InputMaybe<Scalars['Boolean']['input']>
  email_notifications?: InputMaybe<Scalars['Boolean']['input']>
  event_manager_broadcasts?: InputMaybe<Scalars['Boolean']['input']>
  event_updates?: InputMaybe<Scalars['Boolean']['input']>
  post_interactions?: InputMaybe<Scalars['Boolean']['input']>
  push_notifications?: InputMaybe<Scalars['Boolean']['input']>
  quiet_hours_enabled?: InputMaybe<Scalars['Boolean']['input']>
  quiet_hours_end?: InputMaybe<Scalars['String']['input']>
  quiet_hours_start?: InputMaybe<Scalars['String']['input']>
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

export type UpdatePostInput = {
  content?: InputMaybe<Scalars['String']['input']>
  is_public?: InputMaybe<Scalars['Boolean']['input']>
  location?: InputMaybe<Scalars['String']['input']>
  media_type?: InputMaybe<MediaType>
  media_url?: InputMaybe<Scalars['String']['input']>
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

export type UpdateUserPreferencesInput = {
  daily_reminder_enabled?: InputMaybe<Scalars['Boolean']['input']>
  daily_reminder_time?: InputMaybe<Scalars['String']['input']>
  live_sessions_enabled?: InputMaybe<Scalars['Boolean']['input']>
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
  referral_count?: Maybe<Scalars['Int']['output']>
  referral_points_earned?: Maybe<Scalars['Int']['output']>
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

export type UserPreferences = {
  __typename?: 'UserPreferences'
  daily_reminder_enabled: Scalars['Boolean']['output']
  daily_reminder_time: Scalars['String']['output']
  live_sessions_enabled: Scalars['Boolean']['output']
}

export type UserReferralInfo = {
  __typename?: 'UserReferralInfo'
  avatar_url?: Maybe<Scalars['String']['output']>
  created_at: Scalars['DateTime']['output']
  display_name?: Maybe<Scalars['String']['output']>
  invited_by?: Maybe<Scalars['String']['output']>
  privy_id: Scalars['String']['output']
  username?: Maybe<Scalars['String']['output']>
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

export type PostBasicInfoFragment = {
  __typename?: 'Post'
  id: string
  user_id: string
  content: string
  media_url?: string | null
  media_type?: MediaType | null
  event_id?: string | null
  location?: string | null
  is_public: boolean
  likes_count: number
  comments_count: number
  is_liked_by_me: boolean
  created_at: any
  updated_at: any
}

export type PostCommentFragment = {
  __typename?: 'PostComment'
  id: string
  post_id: string
  user_id: string
  content: string
  created_at: any
  updated_at: any
  user: {
    __typename?: 'User'
    privy_id: string
    username?: string | null
    display_name?: string | null
    avatar_url?: string | null
    cover_image_url?: string | null
    bio?: string | null
    role?: UserRole | null
  }
}

export type PostLikeFragment = {
  __typename?: 'PostLike'
  id: string
  post_id: string
  user_id: string
  created_at: any
  user: {
    __typename?: 'User'
    privy_id: string
    username?: string | null
    display_name?: string | null
    avatar_url?: string | null
    cover_image_url?: string | null
    bio?: string | null
    role?: UserRole | null
  }
}

export type PostWithUserFragment = {
  __typename?: 'Post'
  id: string
  user_id: string
  content: string
  media_url?: string | null
  media_type?: MediaType | null
  event_id?: string | null
  location?: string | null
  is_public: boolean
  likes_count: number
  comments_count: number
  is_liked_by_me: boolean
  created_at: any
  updated_at: any
  user: {
    __typename?: 'User'
    privy_id: string
    username?: string | null
    display_name?: string | null
    avatar_url?: string | null
    cover_image_url?: string | null
    bio?: string | null
    role?: UserRole | null
  }
}

export type PostWithDetailsFragment = {
  __typename?: 'PostWithDetails'
  id: string
  user_id: string
  content: string
  media_url?: string | null
  media_type?: MediaType | null
  event_id?: string | null
  location?: string | null
  is_public: boolean
  likes_count: number
  comments_count: number
  is_liked_by_me: boolean
  created_at: any
  updated_at: any
  user: {
    __typename?: 'User'
    privy_id: string
    username?: string | null
    display_name?: string | null
    avatar_url?: string | null
    cover_image_url?: string | null
    bio?: string | null
    role?: UserRole | null
  }
  likes: Array<{
    __typename?: 'PostLike'
    id: string
    post_id: string
    user_id: string
    created_at: any
    user: {
      __typename?: 'User'
      privy_id: string
      username?: string | null
      display_name?: string | null
      avatar_url?: string | null
      cover_image_url?: string | null
      bio?: string | null
      role?: UserRole | null
    }
  }>
  comments: Array<{
    __typename?: 'PostComment'
    id: string
    post_id: string
    user_id: string
    content: string
    created_at: any
    updated_at: any
    user: {
      __typename?: 'User'
      privy_id: string
      username?: string | null
      display_name?: string | null
      avatar_url?: string | null
      cover_image_url?: string | null
      bio?: string | null
      role?: UserRole | null
    }
  }>
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

export type UpdateUserRoleMutationVariables = Exact<{
  userId: Scalars['String']['input']
  role: UserRole
}>

export type UpdateUserRoleMutation = {
  __typename?: 'Mutation'
  updateUserRole: {
    __typename?: 'User'
    privy_id: string
    username?: string | null
    display_name?: string | null
    role?: UserRole | null
    xp?: number | null
    level?: number | null
    is_organizer_approved?: boolean | null
    updated_at?: any | null
  }
}

export type ApproveOrganizerMutationVariables = Exact<{
  userId: Scalars['String']['input']
  approved: Scalars['Boolean']['input']
}>

export type ApproveOrganizerMutation = {
  __typename?: 'Mutation'
  approveOrganizer: {
    __typename?: 'User'
    privy_id: string
    username?: string | null
    display_name?: string | null
    role?: UserRole | null
    is_organizer_approved?: boolean | null
    organizer_approved_at?: any | null
    organizer_approved_by?: string | null
    organizer_rejection_reason?: string | null
    updated_at?: any | null
  }
}

export type FeatureEventMutationVariables = Exact<{
  eventId: Scalars['ID']['input']
  featured: Scalars['Boolean']['input']
}>

export type FeatureEventMutation = {
  __typename?: 'Mutation'
  featureEvent: {
    __typename?: 'Event'
    id: string
    title: string
    is_featured?: boolean | null
    updated_at: any
  }
}

export type CreateEventMutationVariables = Exact<{
  input: CreateEventInput
}>

export type CreateEventMutation = {
  __typename?: 'Mutation'
  createEvent: {
    __typename?: 'Event'
    id: string
    title: string
    description?: string | null
    category?: EventCategory | null
    image_url?: string | null
    location_name: string
    location_address?: string | null
    location_city?: string | null
    location_latitude?: number | null
    location_longitude?: number | null
    max_capacity?: number | null
    price_usd?: number | null
    price_danz?: number | null
    is_featured?: boolean | null
    skill_level?: SkillLevel | null
    is_virtual?: boolean | null
    virtual_link?: string | null
    requirements?: string | null
    tags?: Array<string> | null
    dance_styles?: Array<string> | null
    currency?: string | null
    start_date_time: any
    end_date_time: any
    created_at: any
    status?: EventStatus | null
    is_recurring?: boolean | null
    recurrence_type?: RecurrenceType | null
    recurrence_end_date?: any | null
    recurrence_days?: Array<string> | null
    recurrence_count?: number | null
    parent_event_id?: string | null
  }
}

export type RegisterForEventMutationVariables = Exact<{
  eventId: Scalars['ID']['input']
  notes?: InputMaybe<Scalars['String']['input']>
}>

export type RegisterForEventMutation = {
  __typename?: 'Mutation'
  registerForEvent: {
    __typename?: 'EventRegistration'
    id: string
    event_id: string
    user_id: string
    status?: RegistrationStatus | null
    registration_date?: any | null
    user_notes?: string | null
    created_at?: any | null
  }
}

export type InviteEventManagerMutationVariables = Exact<{
  input: InviteEventManagerInput
}>

export type InviteEventManagerMutation = {
  __typename?: 'Mutation'
  inviteEventManager: {
    __typename?: 'EventManager'
    id: string
    event_id: string
    user_id: string
    role: EventManagerRole
    status: EventManagerStatus
    can_edit_details: boolean
    can_manage_registrations: boolean
    can_send_broadcasts: boolean
    can_manage_posts: boolean
    can_invite_managers: boolean
    invited_at?: any | null
    user?: {
      __typename?: 'User'
      username?: string | null
      display_name?: string | null
      avatar_url?: string | null
    } | null
  }
}

export type AcceptManagerInvitationMutationVariables = Exact<{
  manager_id: Scalars['ID']['input']
}>

export type AcceptManagerInvitationMutation = {
  __typename?: 'Mutation'
  acceptManagerInvitation: {
    __typename?: 'EventManager'
    id: string
    status: EventManagerStatus
    accepted_at?: any | null
    role: EventManagerRole
    event?: { __typename?: 'Event'; id: string; title: string } | null
  }
}

export type DeclineManagerInvitationMutationVariables = Exact<{
  manager_id: Scalars['ID']['input']
}>

export type DeclineManagerInvitationMutation = {
  __typename?: 'Mutation'
  declineManagerInvitation: { __typename?: 'EventManager'; id: string; status: EventManagerStatus }
}

export type UpdateEventManagerMutationVariables = Exact<{
  input: UpdateEventManagerInput
}>

export type UpdateEventManagerMutation = {
  __typename?: 'Mutation'
  updateEventManager: {
    __typename?: 'EventManager'
    id: string
    role: EventManagerRole
    can_edit_details: boolean
    can_manage_registrations: boolean
    can_send_broadcasts: boolean
    can_manage_posts: boolean
    can_invite_managers: boolean
    updated_at?: any | null
  }
}

export type RemoveEventManagerMutationVariables = Exact<{
  manager_id: Scalars['ID']['input']
}>

export type RemoveEventManagerMutation = {
  __typename?: 'Mutation'
  removeEventManager: { __typename?: 'MutationResponse'; success: boolean; message?: string | null }
}

export type LeaveEventAsManagerMutationVariables = Exact<{
  event_id: Scalars['ID']['input']
}>

export type LeaveEventAsManagerMutation = {
  __typename?: 'Mutation'
  leaveEventAsManager: {
    __typename?: 'MutationResponse'
    success: boolean
    message?: string | null
  }
}

export type TransferEventOwnershipMutationVariables = Exact<{
  event_id: Scalars['ID']['input']
  new_creator_id: Scalars['String']['input']
}>

export type TransferEventOwnershipMutation = {
  __typename?: 'Mutation'
  transferEventOwnership: {
    __typename?: 'EventManager'
    id: string
    user_id: string
    role: EventManagerRole
    user?: { __typename?: 'User'; username?: string | null; display_name?: string | null } | null
  }
}

export type CreatePostMutationVariables = Exact<{
  input: CreatePostInput
}>

export type CreatePostMutation = {
  __typename?: 'Mutation'
  createPost: {
    __typename?: 'Post'
    id: string
    user_id: string
    content: string
    media_url?: string | null
    media_type?: MediaType | null
    event_id?: string | null
    location?: string | null
    is_public: boolean
    likes_count: number
    comments_count: number
    is_liked_by_me: boolean
    created_at: any
    updated_at: any
  }
}

export type UpdatePostMutationVariables = Exact<{
  postId: Scalars['ID']['input']
  input: UpdatePostInput
}>

export type UpdatePostMutation = {
  __typename?: 'Mutation'
  updatePost: {
    __typename?: 'Post'
    id: string
    user_id: string
    content: string
    media_url?: string | null
    media_type?: MediaType | null
    event_id?: string | null
    location?: string | null
    is_public: boolean
    likes_count: number
    comments_count: number
    is_liked_by_me: boolean
    created_at: any
    updated_at: any
  }
}

export type DeletePostMutationVariables = Exact<{
  postId: Scalars['ID']['input']
}>

export type DeletePostMutation = {
  __typename?: 'Mutation'
  deletePost: { __typename?: 'MutationResponse'; success: boolean; message?: string | null }
}

export type LikePostMutationVariables = Exact<{
  postId: Scalars['ID']['input']
}>

export type LikePostMutation = {
  __typename?: 'Mutation'
  likePost: { __typename?: 'MutationResponse'; success: boolean; message?: string | null }
}

export type UnlikePostMutationVariables = Exact<{
  postId: Scalars['ID']['input']
}>

export type UnlikePostMutation = {
  __typename?: 'Mutation'
  unlikePost: { __typename?: 'MutationResponse'; success: boolean; message?: string | null }
}

export type CreateCommentMutationVariables = Exact<{
  input: CreateCommentInput
}>

export type CreateCommentMutation = {
  __typename?: 'Mutation'
  createComment: {
    __typename?: 'PostComment'
    id: string
    post_id: string
    user_id: string
    content: string
    created_at: any
    updated_at: any
    user: {
      __typename?: 'User'
      privy_id: string
      username?: string | null
      display_name?: string | null
      avatar_url?: string | null
      cover_image_url?: string | null
      bio?: string | null
      role?: UserRole | null
    }
  }
}

export type UpdateCommentMutationVariables = Exact<{
  commentId: Scalars['ID']['input']
  content: Scalars['String']['input']
}>

export type UpdateCommentMutation = {
  __typename?: 'Mutation'
  updateComment: {
    __typename?: 'PostComment'
    id: string
    post_id: string
    user_id: string
    content: string
    created_at: any
    updated_at: any
    user: {
      __typename?: 'User'
      privy_id: string
      username?: string | null
      display_name?: string | null
      avatar_url?: string | null
      cover_image_url?: string | null
      bio?: string | null
      role?: UserRole | null
    }
  }
}

export type DeleteCommentMutationVariables = Exact<{
  commentId: Scalars['ID']['input']
}>

export type DeleteCommentMutation = {
  __typename?: 'Mutation'
  deleteComment: { __typename?: 'MutationResponse'; success: boolean; message?: string | null }
}

export type MarkNotificationReadMutationVariables = Exact<{
  id: Scalars['ID']['input']
}>

export type MarkNotificationReadMutation = {
  __typename?: 'Mutation'
  markNotificationRead: {
    __typename?: 'Notification'
    id: string
    read: boolean
    read_at?: any | null
  }
}

export type MarkAllNotificationsReadMutationVariables = Exact<{ [key: string]: never }>

export type MarkAllNotificationsReadMutation = {
  __typename?: 'Mutation'
  markAllNotificationsRead: {
    __typename?: 'MutationResponse'
    success: boolean
    message?: string | null
  }
}

export type DeleteNotificationMutationVariables = Exact<{
  id: Scalars['ID']['input']
}>

export type DeleteNotificationMutation = {
  __typename?: 'Mutation'
  deleteNotification: { __typename?: 'MutationResponse'; success: boolean; message?: string | null }
}

export type UpdateNotificationPreferencesMutationVariables = Exact<{
  input: UpdateNotificationPreferencesInput
}>

export type UpdateNotificationPreferencesMutation = {
  __typename?: 'Mutation'
  updateNotificationPreferences: {
    __typename?: 'NotificationPreferences'
    id: string
    admin_broadcasts: boolean
    event_manager_broadcasts: boolean
    event_updates: boolean
    dance_bonds: boolean
    post_interactions: boolean
    achievements: boolean
    push_notifications: boolean
    email_notifications: boolean
    quiet_hours_enabled: boolean
    quiet_hours_start?: string | null
    quiet_hours_end?: string | null
    updated_at: any
  }
}

export type SendAdminBroadcastMutationVariables = Exact<{
  input: SendBroadcastInput
}>

export type SendAdminBroadcastMutation = {
  __typename?: 'Mutation'
  sendAdminBroadcast: { __typename?: 'MutationResponse'; success: boolean; message?: string | null }
}

export type SendEventBroadcastMutationVariables = Exact<{
  input: SendEventBroadcastInput
}>

export type SendEventBroadcastMutation = {
  __typename?: 'Mutation'
  sendEventBroadcast: { __typename?: 'MutationResponse'; success: boolean; message?: string | null }
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
    signed_up_at?: any | null
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

export type GetAllUsersQueryVariables = Exact<{ [key: string]: never }>

export type GetAllUsersQuery = {
  __typename?: 'Query'
  getAllUsers: Array<{
    __typename?: 'User'
    privy_id: string
    username?: string | null
    display_name?: string | null
    role?: UserRole | null
    xp?: number | null
    level?: number | null
    referral_count?: number | null
    referral_points_earned?: number | null
    total_sessions?: number | null
    invited_by?: string | null
    is_organizer_approved?: boolean | null
    created_at?: any | null
    updated_at?: any | null
  }>
}

export type GetAdminStatsQueryVariables = Exact<{ [key: string]: never }>

export type GetAdminStatsQuery = {
  __typename?: 'Query'
  adminStats: {
    __typename?: 'AdminStats'
    totalUsers: number
    totalEvents: number
    totalRevenue: number
    activeUsers: number
    upcomingEvents: number
    newUsersThisMonth: number
    eventsThisMonth: number
  }
}

export type GetPendingOrganizersQueryVariables = Exact<{
  pagination?: InputMaybe<PaginationInput>
}>

export type GetPendingOrganizersQuery = {
  __typename?: 'Query'
  pendingOrganizers: {
    __typename?: 'UserConnection'
    totalCount: number
    users: Array<{
      __typename?: 'User'
      privy_id: string
      username?: string | null
      display_name?: string | null
      role?: UserRole | null
      is_organizer_approved?: boolean | null
      created_at?: any | null
    }>
    pageInfo: {
      __typename?: 'PageInfo'
      hasNextPage: boolean
      hasPreviousPage: boolean
      startCursor?: string | null
      endCursor?: string | null
    }
  }
}

export type GetEventManagersQueryVariables = Exact<{
  event_id: Scalars['ID']['input']
}>

export type GetEventManagersQuery = {
  __typename?: 'Query'
  eventManagers: {
    __typename?: 'EventManagerConnection'
    total_count: number
    managers: Array<{
      __typename?: 'EventManager'
      id: string
      event_id: string
      user_id: string
      role: EventManagerRole
      can_edit_details: boolean
      can_manage_registrations: boolean
      can_send_broadcasts: boolean
      can_manage_posts: boolean
      can_invite_managers: boolean
      can_delete_event: boolean
      status: EventManagerStatus
      invited_by?: string | null
      invited_at?: any | null
      accepted_at?: any | null
      created_at: any
      user?: {
        __typename?: 'User'
        privy_id: string
        username?: string | null
        display_name?: string | null
        avatar_url?: string | null
      } | null
      inviter?: {
        __typename?: 'User'
        username?: string | null
        display_name?: string | null
      } | null
    }>
  }
}

export type GetEventManagerQueryVariables = Exact<{
  id: Scalars['ID']['input']
}>

export type GetEventManagerQuery = {
  __typename?: 'Query'
  eventManager?: {
    __typename?: 'EventManager'
    id: string
    event_id: string
    user_id: string
    role: EventManagerRole
    can_edit_details: boolean
    can_manage_registrations: boolean
    can_send_broadcasts: boolean
    can_manage_posts: boolean
    can_invite_managers: boolean
    can_delete_event: boolean
    status: EventManagerStatus
    invited_by?: string | null
    invited_at?: any | null
    accepted_at?: any | null
    created_at: any
    event?: { __typename?: 'Event'; id: string; title: string; start_date_time: any } | null
    user?: {
      __typename?: 'User'
      privy_id: string
      username?: string | null
      display_name?: string | null
      avatar_url?: string | null
    } | null
  } | null
}

export type GetMyEventManagerRoleQueryVariables = Exact<{
  event_id: Scalars['ID']['input']
}>

export type GetMyEventManagerRoleQuery = {
  __typename?: 'Query'
  myEventManagerRole?: {
    __typename?: 'EventManager'
    id: string
    role: EventManagerRole
    can_edit_details: boolean
    can_manage_registrations: boolean
    can_send_broadcasts: boolean
    can_manage_posts: boolean
    can_invite_managers: boolean
    can_delete_event: boolean
    status: EventManagerStatus
  } | null
}

export type GetMyManagedEventsQueryVariables = Exact<{ [key: string]: never }>

export type GetMyManagedEventsQuery = {
  __typename?: 'Query'
  myManagedEvents: Array<{
    __typename?: 'Event'
    id: string
    title: string
    description?: string | null
    start_date_time: any
    end_date_time: any
    location_name: string
    location_address?: string | null
    image_url?: string | null
    status?: EventStatus | null
    max_capacity?: number | null
    current_capacity?: number | null
  }>
}

export type CheckEventPermissionQueryVariables = Exact<{
  event_id: Scalars['ID']['input']
  permission: Scalars['String']['input']
}>

export type CheckEventPermissionQuery = { __typename?: 'Query'; checkEventPermission: boolean }

export type GetFeedQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']['input']>
  cursor?: InputMaybe<Scalars['String']['input']>
}>

export type GetFeedQuery = {
  __typename?: 'Query'
  getFeed: {
    __typename?: 'FeedResponse'
    has_more: boolean
    cursor?: string | null
    posts: Array<{
      __typename?: 'Post'
      id: string
      user_id: string
      content: string
      media_url?: string | null
      media_type?: MediaType | null
      event_id?: string | null
      location?: string | null
      is_public: boolean
      likes_count: number
      comments_count: number
      is_liked_by_me: boolean
      created_at: any
      updated_at: any
      user: {
        __typename?: 'User'
        privy_id: string
        username?: string | null
        display_name?: string | null
        avatar_url?: string | null
        cover_image_url?: string | null
        bio?: string | null
        role?: UserRole | null
      }
    }>
  }
}

export type GetPostQueryVariables = Exact<{
  id: Scalars['ID']['input']
}>

export type GetPostQuery = {
  __typename?: 'Query'
  getPost?: {
    __typename?: 'PostWithDetails'
    id: string
    user_id: string
    content: string
    media_url?: string | null
    media_type?: MediaType | null
    event_id?: string | null
    location?: string | null
    is_public: boolean
    likes_count: number
    comments_count: number
    is_liked_by_me: boolean
    created_at: any
    updated_at: any
    user: {
      __typename?: 'User'
      privy_id: string
      username?: string | null
      display_name?: string | null
      avatar_url?: string | null
      cover_image_url?: string | null
      bio?: string | null
      role?: UserRole | null
    }
    likes: Array<{
      __typename?: 'PostLike'
      id: string
      post_id: string
      user_id: string
      created_at: any
      user: {
        __typename?: 'User'
        privy_id: string
        username?: string | null
        display_name?: string | null
        avatar_url?: string | null
        cover_image_url?: string | null
        bio?: string | null
        role?: UserRole | null
      }
    }>
    comments: Array<{
      __typename?: 'PostComment'
      id: string
      post_id: string
      user_id: string
      content: string
      created_at: any
      updated_at: any
      user: {
        __typename?: 'User'
        privy_id: string
        username?: string | null
        display_name?: string | null
        avatar_url?: string | null
        cover_image_url?: string | null
        bio?: string | null
        role?: UserRole | null
      }
    }>
  } | null
}

export type GetMyPostsQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
}>

export type GetMyPostsQuery = {
  __typename?: 'Query'
  getMyPosts: Array<{
    __typename?: 'Post'
    id: string
    user_id: string
    content: string
    media_url?: string | null
    media_type?: MediaType | null
    event_id?: string | null
    location?: string | null
    is_public: boolean
    likes_count: number
    comments_count: number
    is_liked_by_me: boolean
    created_at: any
    updated_at: any
    user: {
      __typename?: 'User'
      privy_id: string
      username?: string | null
      display_name?: string | null
      avatar_url?: string | null
      cover_image_url?: string | null
      bio?: string | null
      role?: UserRole | null
    }
  }>
}

export type GetUserPostsQueryVariables = Exact<{
  userId: Scalars['String']['input']
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
}>

export type GetUserPostsQuery = {
  __typename?: 'Query'
  getUserPosts: Array<{
    __typename?: 'Post'
    id: string
    user_id: string
    content: string
    media_url?: string | null
    media_type?: MediaType | null
    event_id?: string | null
    location?: string | null
    is_public: boolean
    likes_count: number
    comments_count: number
    is_liked_by_me: boolean
    created_at: any
    updated_at: any
    user: {
      __typename?: 'User'
      privy_id: string
      username?: string | null
      display_name?: string | null
      avatar_url?: string | null
      cover_image_url?: string | null
      bio?: string | null
      role?: UserRole | null
    }
  }>
}

export type GetEventPostsQueryVariables = Exact<{
  eventId: Scalars['ID']['input']
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
}>

export type GetEventPostsQuery = {
  __typename?: 'Query'
  getEventPosts: Array<{
    __typename?: 'Post'
    id: string
    user_id: string
    content: string
    media_url?: string | null
    media_type?: MediaType | null
    event_id?: string | null
    location?: string | null
    is_public: boolean
    likes_count: number
    comments_count: number
    is_liked_by_me: boolean
    created_at: any
    updated_at: any
    user: {
      __typename?: 'User'
      privy_id: string
      username?: string | null
      display_name?: string | null
      avatar_url?: string | null
      cover_image_url?: string | null
      bio?: string | null
      role?: UserRole | null
    }
  }>
}

export type GetAllEventRegistrationsQueryVariables = Exact<{ [key: string]: never }>

export type GetAllEventRegistrationsQuery = {
  __typename?: 'Query'
  getAllEventRegistrations: Array<{
    __typename?: 'EventRegistration'
    id: string
    event_id: string
    user_id: string
    status?: RegistrationStatus | null
    registration_date?: any | null
    payment_status?: PaymentStatus | null
    payment_amount?: number | null
    payment_date?: any | null
    checked_in?: boolean | null
    check_in_time?: any | null
    user_notes?: string | null
    admin_notes?: string | null
    created_at?: any | null
    updated_at?: any | null
    user?: {
      __typename?: 'User'
      privy_id: string
      username?: string | null
      display_name?: string | null
    } | null
    event?: {
      __typename?: 'Event'
      id: string
      title: string
      start_date_time: any
      location_name: string
    } | null
  }>
}

export type GetEventsQueryVariables = Exact<{
  filter?: InputMaybe<EventFilterInput>
  pagination?: InputMaybe<PaginationInput>
}>

export type GetEventsQuery = {
  __typename?: 'Query'
  events: {
    __typename?: 'EventConnection'
    totalCount: number
    events: Array<{
      __typename?: 'Event'
      id: string
      title: string
      description?: string | null
      category?: EventCategory | null
      image_url?: string | null
      location_name: string
      location_address?: string | null
      location_city?: string | null
      facilitator_id?: string | null
      max_capacity?: number | null
      current_capacity?: number | null
      price_usd?: number | null
      price_danz?: number | null
      is_featured?: boolean | null
      skill_level?: SkillLevel | null
      is_virtual?: boolean | null
      virtual_link?: string | null
      requirements?: string | null
      tags?: Array<string> | null
      dance_styles?: Array<string> | null
      currency?: string | null
      start_date_time: any
      end_date_time: any
      created_at: any
      updated_at: any
      status?: EventStatus | null
      is_registered?: boolean | null
      registration_count?: number | null
      is_recurring?: boolean | null
      recurrence_type?: RecurrenceType | null
      recurrence_end_date?: any | null
      recurrence_days?: Array<string> | null
      recurrence_count?: number | null
      parent_event_id?: string | null
      facilitator?: {
        __typename?: 'User'
        privy_id: string
        username?: string | null
        display_name?: string | null
      } | null
    }>
    pageInfo: {
      __typename?: 'PageInfo'
      hasNextPage: boolean
      hasPreviousPage: boolean
      startCursor?: string | null
      endCursor?: string | null
    }
  }
}

export type GetMyNotificationsQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']['input']>
  offset?: InputMaybe<Scalars['Int']['input']>
  unread_only?: InputMaybe<Scalars['Boolean']['input']>
  type?: InputMaybe<NotificationType>
}>

export type GetMyNotificationsQuery = {
  __typename?: 'Query'
  myNotifications: {
    __typename?: 'NotificationConnection'
    total_count: number
    unread_count: number
    has_more: boolean
    notifications: Array<{
      __typename?: 'Notification'
      id: string
      type: NotificationType
      title: string
      message: string
      sender_id?: string | null
      sender_type?: SenderType | null
      recipient_id: string
      event_id?: string | null
      post_id?: string | null
      read: boolean
      read_at?: any | null
      is_broadcast: boolean
      broadcast_target?: BroadcastTarget | null
      action_type?: ActionType | null
      action_data?: any | null
      created_at: any
      expires_at?: any | null
      sender?: {
        __typename?: 'User'
        username?: string | null
        display_name?: string | null
        avatar_url?: string | null
      } | null
    }>
  }
}

export type GetNotificationQueryVariables = Exact<{
  id: Scalars['ID']['input']
}>

export type GetNotificationQuery = {
  __typename?: 'Query'
  notification?: {
    __typename?: 'Notification'
    id: string
    type: NotificationType
    title: string
    message: string
    sender_id?: string | null
    sender_type?: SenderType | null
    event_id?: string | null
    post_id?: string | null
    read: boolean
    read_at?: any | null
    action_type?: ActionType | null
    action_data?: any | null
    created_at: any
    sender?: {
      __typename?: 'User'
      username?: string | null
      display_name?: string | null
      avatar_url?: string | null
    } | null
    event?: { __typename?: 'Event'; id: string; title: string; start_date_time: any } | null
  } | null
}

export type GetMyNotificationPreferencesQueryVariables = Exact<{ [key: string]: never }>

export type GetMyNotificationPreferencesQuery = {
  __typename?: 'Query'
  myNotificationPreferences: {
    __typename?: 'NotificationPreferences'
    id: string
    user_id: string
    admin_broadcasts: boolean
    event_manager_broadcasts: boolean
    event_updates: boolean
    dance_bonds: boolean
    post_interactions: boolean
    achievements: boolean
    push_notifications: boolean
    email_notifications: boolean
    quiet_hours_enabled: boolean
    quiet_hours_start?: string | null
    quiet_hours_end?: string | null
    created_at: any
    updated_at: any
  }
}

export type GetUnreadNotificationCountQueryVariables = Exact<{ [key: string]: never }>

export type GetUnreadNotificationCountQuery = {
  __typename?: 'Query'
  unreadNotificationCount: number
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
    clicked_at: any
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
    clicked_at: any
    signed_up_at?: any | null
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

export const PostBasicInfoFragmentDoc = gql`
    fragment PostBasicInfo on Post {
  id
  user_id
  content
  media_url
  media_type
  event_id
  location
  is_public
  likes_count
  comments_count
  is_liked_by_me
  created_at
  updated_at
}
    `
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
export const PostWithUserFragmentDoc = gql`
    fragment PostWithUser on Post {
  ...PostBasicInfo
  user {
    ...UserBasicInfo
  }
}
    ${PostBasicInfoFragmentDoc}
${UserBasicInfoFragmentDoc}`
export const PostLikeFragmentDoc = gql`
    fragment PostLike on PostLike {
  id
  post_id
  user_id
  created_at
  user {
    ...UserBasicInfo
  }
}
    ${UserBasicInfoFragmentDoc}`
export const PostCommentFragmentDoc = gql`
    fragment PostComment on PostComment {
  id
  post_id
  user_id
  content
  created_at
  updated_at
  user {
    ...UserBasicInfo
  }
}
    ${UserBasicInfoFragmentDoc}`
export const PostWithDetailsFragmentDoc = gql`
    fragment PostWithDetails on PostWithDetails {
  id
  user_id
  content
  media_url
  media_type
  event_id
  location
  is_public
  likes_count
  comments_count
  is_liked_by_me
  created_at
  updated_at
  user {
    ...UserBasicInfo
  }
  likes {
    ...PostLike
  }
  comments {
    ...PostComment
  }
}
    ${UserBasicInfoFragmentDoc}
${PostLikeFragmentDoc}
${PostCommentFragmentDoc}`
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
export const UpdateUserRoleDocument = gql`
    mutation UpdateUserRole($userId: String!, $role: UserRole!) {
  updateUserRole(userId: $userId, role: $role) {
    privy_id
    username
    display_name
    role
    xp
    level
    is_organizer_approved
    updated_at
  }
}
    `
export type UpdateUserRoleMutationFn = Apollo.MutationFunction<
  UpdateUserRoleMutation,
  UpdateUserRoleMutationVariables
>

/**
 * __useUpdateUserRoleMutation__
 *
 * To run a mutation, you first call `useUpdateUserRoleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserRoleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserRoleMutation, { data, loading, error }] = useUpdateUserRoleMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *      role: // value for 'role'
 *   },
 * });
 */
export function useUpdateUserRoleMutation(
  baseOptions?: Apollo.MutationHookOptions<UpdateUserRoleMutation, UpdateUserRoleMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<UpdateUserRoleMutation, UpdateUserRoleMutationVariables>(
    UpdateUserRoleDocument,
    options,
  )
}
export type UpdateUserRoleMutationHookResult = ReturnType<typeof useUpdateUserRoleMutation>
export type UpdateUserRoleMutationResult = Apollo.MutationResult<UpdateUserRoleMutation>
export type UpdateUserRoleMutationOptions = Apollo.BaseMutationOptions<
  UpdateUserRoleMutation,
  UpdateUserRoleMutationVariables
>
export const ApproveOrganizerDocument = gql`
    mutation ApproveOrganizer($userId: String!, $approved: Boolean!) {
  approveOrganizer(userId: $userId, approved: $approved) {
    privy_id
    username
    display_name
    role
    is_organizer_approved
    organizer_approved_at
    organizer_approved_by
    organizer_rejection_reason
    updated_at
  }
}
    `
export type ApproveOrganizerMutationFn = Apollo.MutationFunction<
  ApproveOrganizerMutation,
  ApproveOrganizerMutationVariables
>

/**
 * __useApproveOrganizerMutation__
 *
 * To run a mutation, you first call `useApproveOrganizerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useApproveOrganizerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [approveOrganizerMutation, { data, loading, error }] = useApproveOrganizerMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *      approved: // value for 'approved'
 *   },
 * });
 */
export function useApproveOrganizerMutation(
  baseOptions?: Apollo.MutationHookOptions<
    ApproveOrganizerMutation,
    ApproveOrganizerMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<ApproveOrganizerMutation, ApproveOrganizerMutationVariables>(
    ApproveOrganizerDocument,
    options,
  )
}
export type ApproveOrganizerMutationHookResult = ReturnType<typeof useApproveOrganizerMutation>
export type ApproveOrganizerMutationResult = Apollo.MutationResult<ApproveOrganizerMutation>
export type ApproveOrganizerMutationOptions = Apollo.BaseMutationOptions<
  ApproveOrganizerMutation,
  ApproveOrganizerMutationVariables
>
export const FeatureEventDocument = gql`
    mutation FeatureEvent($eventId: ID!, $featured: Boolean!) {
  featureEvent(eventId: $eventId, featured: $featured) {
    id
    title
    is_featured
    updated_at
  }
}
    `
export type FeatureEventMutationFn = Apollo.MutationFunction<
  FeatureEventMutation,
  FeatureEventMutationVariables
>

/**
 * __useFeatureEventMutation__
 *
 * To run a mutation, you first call `useFeatureEventMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useFeatureEventMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [featureEventMutation, { data, loading, error }] = useFeatureEventMutation({
 *   variables: {
 *      eventId: // value for 'eventId'
 *      featured: // value for 'featured'
 *   },
 * });
 */
export function useFeatureEventMutation(
  baseOptions?: Apollo.MutationHookOptions<FeatureEventMutation, FeatureEventMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<FeatureEventMutation, FeatureEventMutationVariables>(
    FeatureEventDocument,
    options,
  )
}
export type FeatureEventMutationHookResult = ReturnType<typeof useFeatureEventMutation>
export type FeatureEventMutationResult = Apollo.MutationResult<FeatureEventMutation>
export type FeatureEventMutationOptions = Apollo.BaseMutationOptions<
  FeatureEventMutation,
  FeatureEventMutationVariables
>
export const CreateEventDocument = gql`
    mutation CreateEvent($input: CreateEventInput!) {
  createEvent(input: $input) {
    id
    title
    description
    category
    image_url
    location_name
    location_address
    location_city
    location_latitude
    location_longitude
    max_capacity
    price_usd
    price_danz
    is_featured
    skill_level
    is_virtual
    virtual_link
    requirements
    tags
    dance_styles
    currency
    start_date_time
    end_date_time
    created_at
    status
    is_recurring
    recurrence_type
    recurrence_end_date
    recurrence_days
    recurrence_count
    parent_event_id
  }
}
    `
export type CreateEventMutationFn = Apollo.MutationFunction<
  CreateEventMutation,
  CreateEventMutationVariables
>

/**
 * __useCreateEventMutation__
 *
 * To run a mutation, you first call `useCreateEventMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateEventMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createEventMutation, { data, loading, error }] = useCreateEventMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateEventMutation(
  baseOptions?: Apollo.MutationHookOptions<CreateEventMutation, CreateEventMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<CreateEventMutation, CreateEventMutationVariables>(
    CreateEventDocument,
    options,
  )
}
export type CreateEventMutationHookResult = ReturnType<typeof useCreateEventMutation>
export type CreateEventMutationResult = Apollo.MutationResult<CreateEventMutation>
export type CreateEventMutationOptions = Apollo.BaseMutationOptions<
  CreateEventMutation,
  CreateEventMutationVariables
>
export const RegisterForEventDocument = gql`
    mutation RegisterForEvent($eventId: ID!, $notes: String) {
  registerForEvent(eventId: $eventId, notes: $notes) {
    id
    event_id
    user_id
    status
    registration_date
    user_notes
    created_at
  }
}
    `
export type RegisterForEventMutationFn = Apollo.MutationFunction<
  RegisterForEventMutation,
  RegisterForEventMutationVariables
>

/**
 * __useRegisterForEventMutation__
 *
 * To run a mutation, you first call `useRegisterForEventMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterForEventMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerForEventMutation, { data, loading, error }] = useRegisterForEventMutation({
 *   variables: {
 *      eventId: // value for 'eventId'
 *      notes: // value for 'notes'
 *   },
 * });
 */
export function useRegisterForEventMutation(
  baseOptions?: Apollo.MutationHookOptions<
    RegisterForEventMutation,
    RegisterForEventMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<RegisterForEventMutation, RegisterForEventMutationVariables>(
    RegisterForEventDocument,
    options,
  )
}
export type RegisterForEventMutationHookResult = ReturnType<typeof useRegisterForEventMutation>
export type RegisterForEventMutationResult = Apollo.MutationResult<RegisterForEventMutation>
export type RegisterForEventMutationOptions = Apollo.BaseMutationOptions<
  RegisterForEventMutation,
  RegisterForEventMutationVariables
>
export const InviteEventManagerDocument = gql`
    mutation InviteEventManager($input: InviteEventManagerInput!) {
  inviteEventManager(input: $input) {
    id
    event_id
    user_id
    role
    status
    can_edit_details
    can_manage_registrations
    can_send_broadcasts
    can_manage_posts
    can_invite_managers
    invited_at
    user {
      username
      display_name
      avatar_url
    }
  }
}
    `
export type InviteEventManagerMutationFn = Apollo.MutationFunction<
  InviteEventManagerMutation,
  InviteEventManagerMutationVariables
>

/**
 * __useInviteEventManagerMutation__
 *
 * To run a mutation, you first call `useInviteEventManagerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useInviteEventManagerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [inviteEventManagerMutation, { data, loading, error }] = useInviteEventManagerMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useInviteEventManagerMutation(
  baseOptions?: Apollo.MutationHookOptions<
    InviteEventManagerMutation,
    InviteEventManagerMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<InviteEventManagerMutation, InviteEventManagerMutationVariables>(
    InviteEventManagerDocument,
    options,
  )
}
export type InviteEventManagerMutationHookResult = ReturnType<typeof useInviteEventManagerMutation>
export type InviteEventManagerMutationResult = Apollo.MutationResult<InviteEventManagerMutation>
export type InviteEventManagerMutationOptions = Apollo.BaseMutationOptions<
  InviteEventManagerMutation,
  InviteEventManagerMutationVariables
>
export const AcceptManagerInvitationDocument = gql`
    mutation AcceptManagerInvitation($manager_id: ID!) {
  acceptManagerInvitation(manager_id: $manager_id) {
    id
    status
    accepted_at
    role
    event {
      id
      title
    }
  }
}
    `
export type AcceptManagerInvitationMutationFn = Apollo.MutationFunction<
  AcceptManagerInvitationMutation,
  AcceptManagerInvitationMutationVariables
>

/**
 * __useAcceptManagerInvitationMutation__
 *
 * To run a mutation, you first call `useAcceptManagerInvitationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAcceptManagerInvitationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [acceptManagerInvitationMutation, { data, loading, error }] = useAcceptManagerInvitationMutation({
 *   variables: {
 *      manager_id: // value for 'manager_id'
 *   },
 * });
 */
export function useAcceptManagerInvitationMutation(
  baseOptions?: Apollo.MutationHookOptions<
    AcceptManagerInvitationMutation,
    AcceptManagerInvitationMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    AcceptManagerInvitationMutation,
    AcceptManagerInvitationMutationVariables
  >(AcceptManagerInvitationDocument, options)
}
export type AcceptManagerInvitationMutationHookResult = ReturnType<
  typeof useAcceptManagerInvitationMutation
>
export type AcceptManagerInvitationMutationResult =
  Apollo.MutationResult<AcceptManagerInvitationMutation>
export type AcceptManagerInvitationMutationOptions = Apollo.BaseMutationOptions<
  AcceptManagerInvitationMutation,
  AcceptManagerInvitationMutationVariables
>
export const DeclineManagerInvitationDocument = gql`
    mutation DeclineManagerInvitation($manager_id: ID!) {
  declineManagerInvitation(manager_id: $manager_id) {
    id
    status
  }
}
    `
export type DeclineManagerInvitationMutationFn = Apollo.MutationFunction<
  DeclineManagerInvitationMutation,
  DeclineManagerInvitationMutationVariables
>

/**
 * __useDeclineManagerInvitationMutation__
 *
 * To run a mutation, you first call `useDeclineManagerInvitationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeclineManagerInvitationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [declineManagerInvitationMutation, { data, loading, error }] = useDeclineManagerInvitationMutation({
 *   variables: {
 *      manager_id: // value for 'manager_id'
 *   },
 * });
 */
export function useDeclineManagerInvitationMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DeclineManagerInvitationMutation,
    DeclineManagerInvitationMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    DeclineManagerInvitationMutation,
    DeclineManagerInvitationMutationVariables
  >(DeclineManagerInvitationDocument, options)
}
export type DeclineManagerInvitationMutationHookResult = ReturnType<
  typeof useDeclineManagerInvitationMutation
>
export type DeclineManagerInvitationMutationResult =
  Apollo.MutationResult<DeclineManagerInvitationMutation>
export type DeclineManagerInvitationMutationOptions = Apollo.BaseMutationOptions<
  DeclineManagerInvitationMutation,
  DeclineManagerInvitationMutationVariables
>
export const UpdateEventManagerDocument = gql`
    mutation UpdateEventManager($input: UpdateEventManagerInput!) {
  updateEventManager(input: $input) {
    id
    role
    can_edit_details
    can_manage_registrations
    can_send_broadcasts
    can_manage_posts
    can_invite_managers
    updated_at
  }
}
    `
export type UpdateEventManagerMutationFn = Apollo.MutationFunction<
  UpdateEventManagerMutation,
  UpdateEventManagerMutationVariables
>

/**
 * __useUpdateEventManagerMutation__
 *
 * To run a mutation, you first call `useUpdateEventManagerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateEventManagerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateEventManagerMutation, { data, loading, error }] = useUpdateEventManagerMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateEventManagerMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateEventManagerMutation,
    UpdateEventManagerMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<UpdateEventManagerMutation, UpdateEventManagerMutationVariables>(
    UpdateEventManagerDocument,
    options,
  )
}
export type UpdateEventManagerMutationHookResult = ReturnType<typeof useUpdateEventManagerMutation>
export type UpdateEventManagerMutationResult = Apollo.MutationResult<UpdateEventManagerMutation>
export type UpdateEventManagerMutationOptions = Apollo.BaseMutationOptions<
  UpdateEventManagerMutation,
  UpdateEventManagerMutationVariables
>
export const RemoveEventManagerDocument = gql`
    mutation RemoveEventManager($manager_id: ID!) {
  removeEventManager(manager_id: $manager_id) {
    success
    message
  }
}
    `
export type RemoveEventManagerMutationFn = Apollo.MutationFunction<
  RemoveEventManagerMutation,
  RemoveEventManagerMutationVariables
>

/**
 * __useRemoveEventManagerMutation__
 *
 * To run a mutation, you first call `useRemoveEventManagerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveEventManagerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeEventManagerMutation, { data, loading, error }] = useRemoveEventManagerMutation({
 *   variables: {
 *      manager_id: // value for 'manager_id'
 *   },
 * });
 */
export function useRemoveEventManagerMutation(
  baseOptions?: Apollo.MutationHookOptions<
    RemoveEventManagerMutation,
    RemoveEventManagerMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<RemoveEventManagerMutation, RemoveEventManagerMutationVariables>(
    RemoveEventManagerDocument,
    options,
  )
}
export type RemoveEventManagerMutationHookResult = ReturnType<typeof useRemoveEventManagerMutation>
export type RemoveEventManagerMutationResult = Apollo.MutationResult<RemoveEventManagerMutation>
export type RemoveEventManagerMutationOptions = Apollo.BaseMutationOptions<
  RemoveEventManagerMutation,
  RemoveEventManagerMutationVariables
>
export const LeaveEventAsManagerDocument = gql`
    mutation LeaveEventAsManager($event_id: ID!) {
  leaveEventAsManager(event_id: $event_id) {
    success
    message
  }
}
    `
export type LeaveEventAsManagerMutationFn = Apollo.MutationFunction<
  LeaveEventAsManagerMutation,
  LeaveEventAsManagerMutationVariables
>

/**
 * __useLeaveEventAsManagerMutation__
 *
 * To run a mutation, you first call `useLeaveEventAsManagerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLeaveEventAsManagerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [leaveEventAsManagerMutation, { data, loading, error }] = useLeaveEventAsManagerMutation({
 *   variables: {
 *      event_id: // value for 'event_id'
 *   },
 * });
 */
export function useLeaveEventAsManagerMutation(
  baseOptions?: Apollo.MutationHookOptions<
    LeaveEventAsManagerMutation,
    LeaveEventAsManagerMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<LeaveEventAsManagerMutation, LeaveEventAsManagerMutationVariables>(
    LeaveEventAsManagerDocument,
    options,
  )
}
export type LeaveEventAsManagerMutationHookResult = ReturnType<
  typeof useLeaveEventAsManagerMutation
>
export type LeaveEventAsManagerMutationResult = Apollo.MutationResult<LeaveEventAsManagerMutation>
export type LeaveEventAsManagerMutationOptions = Apollo.BaseMutationOptions<
  LeaveEventAsManagerMutation,
  LeaveEventAsManagerMutationVariables
>
export const TransferEventOwnershipDocument = gql`
    mutation TransferEventOwnership($event_id: ID!, $new_creator_id: String!) {
  transferEventOwnership(event_id: $event_id, new_creator_id: $new_creator_id) {
    id
    user_id
    role
    user {
      username
      display_name
    }
  }
}
    `
export type TransferEventOwnershipMutationFn = Apollo.MutationFunction<
  TransferEventOwnershipMutation,
  TransferEventOwnershipMutationVariables
>

/**
 * __useTransferEventOwnershipMutation__
 *
 * To run a mutation, you first call `useTransferEventOwnershipMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useTransferEventOwnershipMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [transferEventOwnershipMutation, { data, loading, error }] = useTransferEventOwnershipMutation({
 *   variables: {
 *      event_id: // value for 'event_id'
 *      new_creator_id: // value for 'new_creator_id'
 *   },
 * });
 */
export function useTransferEventOwnershipMutation(
  baseOptions?: Apollo.MutationHookOptions<
    TransferEventOwnershipMutation,
    TransferEventOwnershipMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    TransferEventOwnershipMutation,
    TransferEventOwnershipMutationVariables
  >(TransferEventOwnershipDocument, options)
}
export type TransferEventOwnershipMutationHookResult = ReturnType<
  typeof useTransferEventOwnershipMutation
>
export type TransferEventOwnershipMutationResult =
  Apollo.MutationResult<TransferEventOwnershipMutation>
export type TransferEventOwnershipMutationOptions = Apollo.BaseMutationOptions<
  TransferEventOwnershipMutation,
  TransferEventOwnershipMutationVariables
>
export const CreatePostDocument = gql`
    mutation CreatePost($input: CreatePostInput!) {
  createPost(input: $input) {
    ...PostBasicInfo
  }
}
    ${PostBasicInfoFragmentDoc}`
export type CreatePostMutationFn = Apollo.MutationFunction<
  CreatePostMutation,
  CreatePostMutationVariables
>

/**
 * __useCreatePostMutation__
 *
 * To run a mutation, you first call `useCreatePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPostMutation, { data, loading, error }] = useCreatePostMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreatePostMutation(
  baseOptions?: Apollo.MutationHookOptions<CreatePostMutation, CreatePostMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<CreatePostMutation, CreatePostMutationVariables>(
    CreatePostDocument,
    options,
  )
}
export type CreatePostMutationHookResult = ReturnType<typeof useCreatePostMutation>
export type CreatePostMutationResult = Apollo.MutationResult<CreatePostMutation>
export type CreatePostMutationOptions = Apollo.BaseMutationOptions<
  CreatePostMutation,
  CreatePostMutationVariables
>
export const UpdatePostDocument = gql`
    mutation UpdatePost($postId: ID!, $input: UpdatePostInput!) {
  updatePost(postId: $postId, input: $input) {
    ...PostBasicInfo
  }
}
    ${PostBasicInfoFragmentDoc}`
export type UpdatePostMutationFn = Apollo.MutationFunction<
  UpdatePostMutation,
  UpdatePostMutationVariables
>

/**
 * __useUpdatePostMutation__
 *
 * To run a mutation, you first call `useUpdatePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePostMutation, { data, loading, error }] = useUpdatePostMutation({
 *   variables: {
 *      postId: // value for 'postId'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdatePostMutation(
  baseOptions?: Apollo.MutationHookOptions<UpdatePostMutation, UpdatePostMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<UpdatePostMutation, UpdatePostMutationVariables>(
    UpdatePostDocument,
    options,
  )
}
export type UpdatePostMutationHookResult = ReturnType<typeof useUpdatePostMutation>
export type UpdatePostMutationResult = Apollo.MutationResult<UpdatePostMutation>
export type UpdatePostMutationOptions = Apollo.BaseMutationOptions<
  UpdatePostMutation,
  UpdatePostMutationVariables
>
export const DeletePostDocument = gql`
    mutation DeletePost($postId: ID!) {
  deletePost(postId: $postId) {
    success
    message
  }
}
    `
export type DeletePostMutationFn = Apollo.MutationFunction<
  DeletePostMutation,
  DeletePostMutationVariables
>

/**
 * __useDeletePostMutation__
 *
 * To run a mutation, you first call `useDeletePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeletePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deletePostMutation, { data, loading, error }] = useDeletePostMutation({
 *   variables: {
 *      postId: // value for 'postId'
 *   },
 * });
 */
export function useDeletePostMutation(
  baseOptions?: Apollo.MutationHookOptions<DeletePostMutation, DeletePostMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<DeletePostMutation, DeletePostMutationVariables>(
    DeletePostDocument,
    options,
  )
}
export type DeletePostMutationHookResult = ReturnType<typeof useDeletePostMutation>
export type DeletePostMutationResult = Apollo.MutationResult<DeletePostMutation>
export type DeletePostMutationOptions = Apollo.BaseMutationOptions<
  DeletePostMutation,
  DeletePostMutationVariables
>
export const LikePostDocument = gql`
    mutation LikePost($postId: ID!) {
  likePost(postId: $postId) {
    success
    message
  }
}
    `
export type LikePostMutationFn = Apollo.MutationFunction<
  LikePostMutation,
  LikePostMutationVariables
>

/**
 * __useLikePostMutation__
 *
 * To run a mutation, you first call `useLikePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLikePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [likePostMutation, { data, loading, error }] = useLikePostMutation({
 *   variables: {
 *      postId: // value for 'postId'
 *   },
 * });
 */
export function useLikePostMutation(
  baseOptions?: Apollo.MutationHookOptions<LikePostMutation, LikePostMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<LikePostMutation, LikePostMutationVariables>(LikePostDocument, options)
}
export type LikePostMutationHookResult = ReturnType<typeof useLikePostMutation>
export type LikePostMutationResult = Apollo.MutationResult<LikePostMutation>
export type LikePostMutationOptions = Apollo.BaseMutationOptions<
  LikePostMutation,
  LikePostMutationVariables
>
export const UnlikePostDocument = gql`
    mutation UnlikePost($postId: ID!) {
  unlikePost(postId: $postId) {
    success
    message
  }
}
    `
export type UnlikePostMutationFn = Apollo.MutationFunction<
  UnlikePostMutation,
  UnlikePostMutationVariables
>

/**
 * __useUnlikePostMutation__
 *
 * To run a mutation, you first call `useUnlikePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUnlikePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [unlikePostMutation, { data, loading, error }] = useUnlikePostMutation({
 *   variables: {
 *      postId: // value for 'postId'
 *   },
 * });
 */
export function useUnlikePostMutation(
  baseOptions?: Apollo.MutationHookOptions<UnlikePostMutation, UnlikePostMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<UnlikePostMutation, UnlikePostMutationVariables>(
    UnlikePostDocument,
    options,
  )
}
export type UnlikePostMutationHookResult = ReturnType<typeof useUnlikePostMutation>
export type UnlikePostMutationResult = Apollo.MutationResult<UnlikePostMutation>
export type UnlikePostMutationOptions = Apollo.BaseMutationOptions<
  UnlikePostMutation,
  UnlikePostMutationVariables
>
export const CreateCommentDocument = gql`
    mutation CreateComment($input: CreateCommentInput!) {
  createComment(input: $input) {
    ...PostComment
  }
}
    ${PostCommentFragmentDoc}`
export type CreateCommentMutationFn = Apollo.MutationFunction<
  CreateCommentMutation,
  CreateCommentMutationVariables
>

/**
 * __useCreateCommentMutation__
 *
 * To run a mutation, you first call `useCreateCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCommentMutation, { data, loading, error }] = useCreateCommentMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateCommentMutation(
  baseOptions?: Apollo.MutationHookOptions<CreateCommentMutation, CreateCommentMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<CreateCommentMutation, CreateCommentMutationVariables>(
    CreateCommentDocument,
    options,
  )
}
export type CreateCommentMutationHookResult = ReturnType<typeof useCreateCommentMutation>
export type CreateCommentMutationResult = Apollo.MutationResult<CreateCommentMutation>
export type CreateCommentMutationOptions = Apollo.BaseMutationOptions<
  CreateCommentMutation,
  CreateCommentMutationVariables
>
export const UpdateCommentDocument = gql`
    mutation UpdateComment($commentId: ID!, $content: String!) {
  updateComment(commentId: $commentId, content: $content) {
    ...PostComment
  }
}
    ${PostCommentFragmentDoc}`
export type UpdateCommentMutationFn = Apollo.MutationFunction<
  UpdateCommentMutation,
  UpdateCommentMutationVariables
>

/**
 * __useUpdateCommentMutation__
 *
 * To run a mutation, you first call `useUpdateCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCommentMutation, { data, loading, error }] = useUpdateCommentMutation({
 *   variables: {
 *      commentId: // value for 'commentId'
 *      content: // value for 'content'
 *   },
 * });
 */
export function useUpdateCommentMutation(
  baseOptions?: Apollo.MutationHookOptions<UpdateCommentMutation, UpdateCommentMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<UpdateCommentMutation, UpdateCommentMutationVariables>(
    UpdateCommentDocument,
    options,
  )
}
export type UpdateCommentMutationHookResult = ReturnType<typeof useUpdateCommentMutation>
export type UpdateCommentMutationResult = Apollo.MutationResult<UpdateCommentMutation>
export type UpdateCommentMutationOptions = Apollo.BaseMutationOptions<
  UpdateCommentMutation,
  UpdateCommentMutationVariables
>
export const DeleteCommentDocument = gql`
    mutation DeleteComment($commentId: ID!) {
  deleteComment(commentId: $commentId) {
    success
    message
  }
}
    `
export type DeleteCommentMutationFn = Apollo.MutationFunction<
  DeleteCommentMutation,
  DeleteCommentMutationVariables
>

/**
 * __useDeleteCommentMutation__
 *
 * To run a mutation, you first call `useDeleteCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteCommentMutation, { data, loading, error }] = useDeleteCommentMutation({
 *   variables: {
 *      commentId: // value for 'commentId'
 *   },
 * });
 */
export function useDeleteCommentMutation(
  baseOptions?: Apollo.MutationHookOptions<DeleteCommentMutation, DeleteCommentMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<DeleteCommentMutation, DeleteCommentMutationVariables>(
    DeleteCommentDocument,
    options,
  )
}
export type DeleteCommentMutationHookResult = ReturnType<typeof useDeleteCommentMutation>
export type DeleteCommentMutationResult = Apollo.MutationResult<DeleteCommentMutation>
export type DeleteCommentMutationOptions = Apollo.BaseMutationOptions<
  DeleteCommentMutation,
  DeleteCommentMutationVariables
>
export const MarkNotificationReadDocument = gql`
    mutation MarkNotificationRead($id: ID!) {
  markNotificationRead(id: $id) {
    id
    read
    read_at
  }
}
    `
export type MarkNotificationReadMutationFn = Apollo.MutationFunction<
  MarkNotificationReadMutation,
  MarkNotificationReadMutationVariables
>

/**
 * __useMarkNotificationReadMutation__
 *
 * To run a mutation, you first call `useMarkNotificationReadMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMarkNotificationReadMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [markNotificationReadMutation, { data, loading, error }] = useMarkNotificationReadMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useMarkNotificationReadMutation(
  baseOptions?: Apollo.MutationHookOptions<
    MarkNotificationReadMutation,
    MarkNotificationReadMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<MarkNotificationReadMutation, MarkNotificationReadMutationVariables>(
    MarkNotificationReadDocument,
    options,
  )
}
export type MarkNotificationReadMutationHookResult = ReturnType<
  typeof useMarkNotificationReadMutation
>
export type MarkNotificationReadMutationResult = Apollo.MutationResult<MarkNotificationReadMutation>
export type MarkNotificationReadMutationOptions = Apollo.BaseMutationOptions<
  MarkNotificationReadMutation,
  MarkNotificationReadMutationVariables
>
export const MarkAllNotificationsReadDocument = gql`
    mutation MarkAllNotificationsRead {
  markAllNotificationsRead {
    success
    message
  }
}
    `
export type MarkAllNotificationsReadMutationFn = Apollo.MutationFunction<
  MarkAllNotificationsReadMutation,
  MarkAllNotificationsReadMutationVariables
>

/**
 * __useMarkAllNotificationsReadMutation__
 *
 * To run a mutation, you first call `useMarkAllNotificationsReadMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMarkAllNotificationsReadMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [markAllNotificationsReadMutation, { data, loading, error }] = useMarkAllNotificationsReadMutation({
 *   variables: {
 *   },
 * });
 */
export function useMarkAllNotificationsReadMutation(
  baseOptions?: Apollo.MutationHookOptions<
    MarkAllNotificationsReadMutation,
    MarkAllNotificationsReadMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    MarkAllNotificationsReadMutation,
    MarkAllNotificationsReadMutationVariables
  >(MarkAllNotificationsReadDocument, options)
}
export type MarkAllNotificationsReadMutationHookResult = ReturnType<
  typeof useMarkAllNotificationsReadMutation
>
export type MarkAllNotificationsReadMutationResult =
  Apollo.MutationResult<MarkAllNotificationsReadMutation>
export type MarkAllNotificationsReadMutationOptions = Apollo.BaseMutationOptions<
  MarkAllNotificationsReadMutation,
  MarkAllNotificationsReadMutationVariables
>
export const DeleteNotificationDocument = gql`
    mutation DeleteNotification($id: ID!) {
  deleteNotification(id: $id) {
    success
    message
  }
}
    `
export type DeleteNotificationMutationFn = Apollo.MutationFunction<
  DeleteNotificationMutation,
  DeleteNotificationMutationVariables
>

/**
 * __useDeleteNotificationMutation__
 *
 * To run a mutation, you first call `useDeleteNotificationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteNotificationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteNotificationMutation, { data, loading, error }] = useDeleteNotificationMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteNotificationMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DeleteNotificationMutation,
    DeleteNotificationMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<DeleteNotificationMutation, DeleteNotificationMutationVariables>(
    DeleteNotificationDocument,
    options,
  )
}
export type DeleteNotificationMutationHookResult = ReturnType<typeof useDeleteNotificationMutation>
export type DeleteNotificationMutationResult = Apollo.MutationResult<DeleteNotificationMutation>
export type DeleteNotificationMutationOptions = Apollo.BaseMutationOptions<
  DeleteNotificationMutation,
  DeleteNotificationMutationVariables
>
export const UpdateNotificationPreferencesDocument = gql`
    mutation UpdateNotificationPreferences($input: UpdateNotificationPreferencesInput!) {
  updateNotificationPreferences(input: $input) {
    id
    admin_broadcasts
    event_manager_broadcasts
    event_updates
    dance_bonds
    post_interactions
    achievements
    push_notifications
    email_notifications
    quiet_hours_enabled
    quiet_hours_start
    quiet_hours_end
    updated_at
  }
}
    `
export type UpdateNotificationPreferencesMutationFn = Apollo.MutationFunction<
  UpdateNotificationPreferencesMutation,
  UpdateNotificationPreferencesMutationVariables
>

/**
 * __useUpdateNotificationPreferencesMutation__
 *
 * To run a mutation, you first call `useUpdateNotificationPreferencesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateNotificationPreferencesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateNotificationPreferencesMutation, { data, loading, error }] = useUpdateNotificationPreferencesMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateNotificationPreferencesMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateNotificationPreferencesMutation,
    UpdateNotificationPreferencesMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<
    UpdateNotificationPreferencesMutation,
    UpdateNotificationPreferencesMutationVariables
  >(UpdateNotificationPreferencesDocument, options)
}
export type UpdateNotificationPreferencesMutationHookResult = ReturnType<
  typeof useUpdateNotificationPreferencesMutation
>
export type UpdateNotificationPreferencesMutationResult =
  Apollo.MutationResult<UpdateNotificationPreferencesMutation>
export type UpdateNotificationPreferencesMutationOptions = Apollo.BaseMutationOptions<
  UpdateNotificationPreferencesMutation,
  UpdateNotificationPreferencesMutationVariables
>
export const SendAdminBroadcastDocument = gql`
    mutation SendAdminBroadcast($input: SendBroadcastInput!) {
  sendAdminBroadcast(input: $input) {
    success
    message
  }
}
    `
export type SendAdminBroadcastMutationFn = Apollo.MutationFunction<
  SendAdminBroadcastMutation,
  SendAdminBroadcastMutationVariables
>

/**
 * __useSendAdminBroadcastMutation__
 *
 * To run a mutation, you first call `useSendAdminBroadcastMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSendAdminBroadcastMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sendAdminBroadcastMutation, { data, loading, error }] = useSendAdminBroadcastMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSendAdminBroadcastMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SendAdminBroadcastMutation,
    SendAdminBroadcastMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<SendAdminBroadcastMutation, SendAdminBroadcastMutationVariables>(
    SendAdminBroadcastDocument,
    options,
  )
}
export type SendAdminBroadcastMutationHookResult = ReturnType<typeof useSendAdminBroadcastMutation>
export type SendAdminBroadcastMutationResult = Apollo.MutationResult<SendAdminBroadcastMutation>
export type SendAdminBroadcastMutationOptions = Apollo.BaseMutationOptions<
  SendAdminBroadcastMutation,
  SendAdminBroadcastMutationVariables
>
export const SendEventBroadcastDocument = gql`
    mutation SendEventBroadcast($input: SendEventBroadcastInput!) {
  sendEventBroadcast(input: $input) {
    success
    message
  }
}
    `
export type SendEventBroadcastMutationFn = Apollo.MutationFunction<
  SendEventBroadcastMutation,
  SendEventBroadcastMutationVariables
>

/**
 * __useSendEventBroadcastMutation__
 *
 * To run a mutation, you first call `useSendEventBroadcastMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSendEventBroadcastMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sendEventBroadcastMutation, { data, loading, error }] = useSendEventBroadcastMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSendEventBroadcastMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SendEventBroadcastMutation,
    SendEventBroadcastMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useMutation<SendEventBroadcastMutation, SendEventBroadcastMutationVariables>(
    SendEventBroadcastDocument,
    options,
  )
}
export type SendEventBroadcastMutationHookResult = ReturnType<typeof useSendEventBroadcastMutation>
export type SendEventBroadcastMutationResult = Apollo.MutationResult<SendEventBroadcastMutation>
export type SendEventBroadcastMutationOptions = Apollo.BaseMutationOptions<
  SendEventBroadcastMutation,
  SendEventBroadcastMutationVariables
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
    signed_up_at
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
export const GetAllUsersDocument = gql`
    query GetAllUsers {
  getAllUsers {
    privy_id
    username
    display_name
    role
    xp
    level
    referral_count
    referral_points_earned
    total_sessions
    invited_by
    is_organizer_approved
    created_at
    updated_at
  }
}
    `

/**
 * __useGetAllUsersQuery__
 *
 * To run a query within a React component, call `useGetAllUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllUsersQuery(
  baseOptions?: Apollo.QueryHookOptions<GetAllUsersQuery, GetAllUsersQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetAllUsersQuery, GetAllUsersQueryVariables>(GetAllUsersDocument, options)
}
export function useGetAllUsersLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetAllUsersQuery, GetAllUsersQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetAllUsersQuery, GetAllUsersQueryVariables>(
    GetAllUsersDocument,
    options,
  )
}
export function useGetAllUsersSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<GetAllUsersQuery, GetAllUsersQueryVariables>,
) {
  const options =
    baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions }
  return Apollo.useSuspenseQuery<GetAllUsersQuery, GetAllUsersQueryVariables>(
    GetAllUsersDocument,
    options,
  )
}
export type GetAllUsersQueryHookResult = ReturnType<typeof useGetAllUsersQuery>
export type GetAllUsersLazyQueryHookResult = ReturnType<typeof useGetAllUsersLazyQuery>
export type GetAllUsersSuspenseQueryHookResult = ReturnType<typeof useGetAllUsersSuspenseQuery>
export type GetAllUsersQueryResult = Apollo.QueryResult<GetAllUsersQuery, GetAllUsersQueryVariables>
export const GetAdminStatsDocument = gql`
    query GetAdminStats {
  adminStats {
    totalUsers
    totalEvents
    totalRevenue
    activeUsers
    upcomingEvents
    newUsersThisMonth
    eventsThisMonth
  }
}
    `

/**
 * __useGetAdminStatsQuery__
 *
 * To run a query within a React component, call `useGetAdminStatsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAdminStatsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAdminStatsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAdminStatsQuery(
  baseOptions?: Apollo.QueryHookOptions<GetAdminStatsQuery, GetAdminStatsQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetAdminStatsQuery, GetAdminStatsQueryVariables>(
    GetAdminStatsDocument,
    options,
  )
}
export function useGetAdminStatsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetAdminStatsQuery, GetAdminStatsQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetAdminStatsQuery, GetAdminStatsQueryVariables>(
    GetAdminStatsDocument,
    options,
  )
}
export function useGetAdminStatsSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<GetAdminStatsQuery, GetAdminStatsQueryVariables>,
) {
  const options =
    baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions }
  return Apollo.useSuspenseQuery<GetAdminStatsQuery, GetAdminStatsQueryVariables>(
    GetAdminStatsDocument,
    options,
  )
}
export type GetAdminStatsQueryHookResult = ReturnType<typeof useGetAdminStatsQuery>
export type GetAdminStatsLazyQueryHookResult = ReturnType<typeof useGetAdminStatsLazyQuery>
export type GetAdminStatsSuspenseQueryHookResult = ReturnType<typeof useGetAdminStatsSuspenseQuery>
export type GetAdminStatsQueryResult = Apollo.QueryResult<
  GetAdminStatsQuery,
  GetAdminStatsQueryVariables
>
export const GetPendingOrganizersDocument = gql`
    query GetPendingOrganizers($pagination: PaginationInput) {
  pendingOrganizers(pagination: $pagination) {
    users {
      privy_id
      username
      display_name
      role
      is_organizer_approved
      created_at
    }
    pageInfo {
      hasNextPage
      hasPreviousPage
      startCursor
      endCursor
    }
    totalCount
  }
}
    `

/**
 * __useGetPendingOrganizersQuery__
 *
 * To run a query within a React component, call `useGetPendingOrganizersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPendingOrganizersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPendingOrganizersQuery({
 *   variables: {
 *      pagination: // value for 'pagination'
 *   },
 * });
 */
export function useGetPendingOrganizersQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetPendingOrganizersQuery,
    GetPendingOrganizersQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetPendingOrganizersQuery, GetPendingOrganizersQueryVariables>(
    GetPendingOrganizersDocument,
    options,
  )
}
export function useGetPendingOrganizersLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetPendingOrganizersQuery,
    GetPendingOrganizersQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetPendingOrganizersQuery, GetPendingOrganizersQueryVariables>(
    GetPendingOrganizersDocument,
    options,
  )
}
export function useGetPendingOrganizersSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        GetPendingOrganizersQuery,
        GetPendingOrganizersQueryVariables
      >,
) {
  const options =
    baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions }
  return Apollo.useSuspenseQuery<GetPendingOrganizersQuery, GetPendingOrganizersQueryVariables>(
    GetPendingOrganizersDocument,
    options,
  )
}
export type GetPendingOrganizersQueryHookResult = ReturnType<typeof useGetPendingOrganizersQuery>
export type GetPendingOrganizersLazyQueryHookResult = ReturnType<
  typeof useGetPendingOrganizersLazyQuery
>
export type GetPendingOrganizersSuspenseQueryHookResult = ReturnType<
  typeof useGetPendingOrganizersSuspenseQuery
>
export type GetPendingOrganizersQueryResult = Apollo.QueryResult<
  GetPendingOrganizersQuery,
  GetPendingOrganizersQueryVariables
>
export const GetEventManagersDocument = gql`
    query GetEventManagers($event_id: ID!) {
  eventManagers(event_id: $event_id) {
    managers {
      id
      event_id
      user_id
      role
      can_edit_details
      can_manage_registrations
      can_send_broadcasts
      can_manage_posts
      can_invite_managers
      can_delete_event
      status
      invited_by
      invited_at
      accepted_at
      created_at
      user {
        privy_id
        username
        display_name
        avatar_url
      }
      inviter {
        username
        display_name
      }
    }
    total_count
  }
}
    `

/**
 * __useGetEventManagersQuery__
 *
 * To run a query within a React component, call `useGetEventManagersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetEventManagersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetEventManagersQuery({
 *   variables: {
 *      event_id: // value for 'event_id'
 *   },
 * });
 */
export function useGetEventManagersQuery(
  baseOptions: Apollo.QueryHookOptions<GetEventManagersQuery, GetEventManagersQueryVariables> &
    ({ variables: GetEventManagersQueryVariables; skip?: boolean } | { skip: boolean }),
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetEventManagersQuery, GetEventManagersQueryVariables>(
    GetEventManagersDocument,
    options,
  )
}
export function useGetEventManagersLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetEventManagersQuery, GetEventManagersQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetEventManagersQuery, GetEventManagersQueryVariables>(
    GetEventManagersDocument,
    options,
  )
}
export function useGetEventManagersSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<GetEventManagersQuery, GetEventManagersQueryVariables>,
) {
  const options =
    baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions }
  return Apollo.useSuspenseQuery<GetEventManagersQuery, GetEventManagersQueryVariables>(
    GetEventManagersDocument,
    options,
  )
}
export type GetEventManagersQueryHookResult = ReturnType<typeof useGetEventManagersQuery>
export type GetEventManagersLazyQueryHookResult = ReturnType<typeof useGetEventManagersLazyQuery>
export type GetEventManagersSuspenseQueryHookResult = ReturnType<
  typeof useGetEventManagersSuspenseQuery
>
export type GetEventManagersQueryResult = Apollo.QueryResult<
  GetEventManagersQuery,
  GetEventManagersQueryVariables
>
export const GetEventManagerDocument = gql`
    query GetEventManager($id: ID!) {
  eventManager(id: $id) {
    id
    event_id
    user_id
    role
    can_edit_details
    can_manage_registrations
    can_send_broadcasts
    can_manage_posts
    can_invite_managers
    can_delete_event
    status
    invited_by
    invited_at
    accepted_at
    created_at
    event {
      id
      title
      start_date_time
    }
    user {
      privy_id
      username
      display_name
      avatar_url
    }
  }
}
    `

/**
 * __useGetEventManagerQuery__
 *
 * To run a query within a React component, call `useGetEventManagerQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetEventManagerQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetEventManagerQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetEventManagerQuery(
  baseOptions: Apollo.QueryHookOptions<GetEventManagerQuery, GetEventManagerQueryVariables> &
    ({ variables: GetEventManagerQueryVariables; skip?: boolean } | { skip: boolean }),
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetEventManagerQuery, GetEventManagerQueryVariables>(
    GetEventManagerDocument,
    options,
  )
}
export function useGetEventManagerLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetEventManagerQuery, GetEventManagerQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetEventManagerQuery, GetEventManagerQueryVariables>(
    GetEventManagerDocument,
    options,
  )
}
export function useGetEventManagerSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<GetEventManagerQuery, GetEventManagerQueryVariables>,
) {
  const options =
    baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions }
  return Apollo.useSuspenseQuery<GetEventManagerQuery, GetEventManagerQueryVariables>(
    GetEventManagerDocument,
    options,
  )
}
export type GetEventManagerQueryHookResult = ReturnType<typeof useGetEventManagerQuery>
export type GetEventManagerLazyQueryHookResult = ReturnType<typeof useGetEventManagerLazyQuery>
export type GetEventManagerSuspenseQueryHookResult = ReturnType<
  typeof useGetEventManagerSuspenseQuery
>
export type GetEventManagerQueryResult = Apollo.QueryResult<
  GetEventManagerQuery,
  GetEventManagerQueryVariables
>
export const GetMyEventManagerRoleDocument = gql`
    query GetMyEventManagerRole($event_id: ID!) {
  myEventManagerRole(event_id: $event_id) {
    id
    role
    can_edit_details
    can_manage_registrations
    can_send_broadcasts
    can_manage_posts
    can_invite_managers
    can_delete_event
    status
  }
}
    `

/**
 * __useGetMyEventManagerRoleQuery__
 *
 * To run a query within a React component, call `useGetMyEventManagerRoleQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMyEventManagerRoleQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMyEventManagerRoleQuery({
 *   variables: {
 *      event_id: // value for 'event_id'
 *   },
 * });
 */
export function useGetMyEventManagerRoleQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetMyEventManagerRoleQuery,
    GetMyEventManagerRoleQueryVariables
  > &
    ({ variables: GetMyEventManagerRoleQueryVariables; skip?: boolean } | { skip: boolean }),
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetMyEventManagerRoleQuery, GetMyEventManagerRoleQueryVariables>(
    GetMyEventManagerRoleDocument,
    options,
  )
}
export function useGetMyEventManagerRoleLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetMyEventManagerRoleQuery,
    GetMyEventManagerRoleQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetMyEventManagerRoleQuery, GetMyEventManagerRoleQueryVariables>(
    GetMyEventManagerRoleDocument,
    options,
  )
}
export function useGetMyEventManagerRoleSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        GetMyEventManagerRoleQuery,
        GetMyEventManagerRoleQueryVariables
      >,
) {
  const options =
    baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions }
  return Apollo.useSuspenseQuery<GetMyEventManagerRoleQuery, GetMyEventManagerRoleQueryVariables>(
    GetMyEventManagerRoleDocument,
    options,
  )
}
export type GetMyEventManagerRoleQueryHookResult = ReturnType<typeof useGetMyEventManagerRoleQuery>
export type GetMyEventManagerRoleLazyQueryHookResult = ReturnType<
  typeof useGetMyEventManagerRoleLazyQuery
>
export type GetMyEventManagerRoleSuspenseQueryHookResult = ReturnType<
  typeof useGetMyEventManagerRoleSuspenseQuery
>
export type GetMyEventManagerRoleQueryResult = Apollo.QueryResult<
  GetMyEventManagerRoleQuery,
  GetMyEventManagerRoleQueryVariables
>
export const GetMyManagedEventsDocument = gql`
    query GetMyManagedEvents {
  myManagedEvents {
    id
    title
    description
    start_date_time
    end_date_time
    location_name
    location_address
    image_url
    status
    max_capacity
    current_capacity
  }
}
    `

/**
 * __useGetMyManagedEventsQuery__
 *
 * To run a query within a React component, call `useGetMyManagedEventsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMyManagedEventsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMyManagedEventsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetMyManagedEventsQuery(
  baseOptions?: Apollo.QueryHookOptions<GetMyManagedEventsQuery, GetMyManagedEventsQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetMyManagedEventsQuery, GetMyManagedEventsQueryVariables>(
    GetMyManagedEventsDocument,
    options,
  )
}
export function useGetMyManagedEventsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetMyManagedEventsQuery,
    GetMyManagedEventsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetMyManagedEventsQuery, GetMyManagedEventsQueryVariables>(
    GetMyManagedEventsDocument,
    options,
  )
}
export function useGetMyManagedEventsSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<GetMyManagedEventsQuery, GetMyManagedEventsQueryVariables>,
) {
  const options =
    baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions }
  return Apollo.useSuspenseQuery<GetMyManagedEventsQuery, GetMyManagedEventsQueryVariables>(
    GetMyManagedEventsDocument,
    options,
  )
}
export type GetMyManagedEventsQueryHookResult = ReturnType<typeof useGetMyManagedEventsQuery>
export type GetMyManagedEventsLazyQueryHookResult = ReturnType<
  typeof useGetMyManagedEventsLazyQuery
>
export type GetMyManagedEventsSuspenseQueryHookResult = ReturnType<
  typeof useGetMyManagedEventsSuspenseQuery
>
export type GetMyManagedEventsQueryResult = Apollo.QueryResult<
  GetMyManagedEventsQuery,
  GetMyManagedEventsQueryVariables
>
export const CheckEventPermissionDocument = gql`
    query CheckEventPermission($event_id: ID!, $permission: String!) {
  checkEventPermission(event_id: $event_id, permission: $permission)
}
    `

/**
 * __useCheckEventPermissionQuery__
 *
 * To run a query within a React component, call `useCheckEventPermissionQuery` and pass it any options that fit your needs.
 * When your component renders, `useCheckEventPermissionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCheckEventPermissionQuery({
 *   variables: {
 *      event_id: // value for 'event_id'
 *      permission: // value for 'permission'
 *   },
 * });
 */
export function useCheckEventPermissionQuery(
  baseOptions: Apollo.QueryHookOptions<
    CheckEventPermissionQuery,
    CheckEventPermissionQueryVariables
  > &
    ({ variables: CheckEventPermissionQueryVariables; skip?: boolean } | { skip: boolean }),
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<CheckEventPermissionQuery, CheckEventPermissionQueryVariables>(
    CheckEventPermissionDocument,
    options,
  )
}
export function useCheckEventPermissionLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    CheckEventPermissionQuery,
    CheckEventPermissionQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<CheckEventPermissionQuery, CheckEventPermissionQueryVariables>(
    CheckEventPermissionDocument,
    options,
  )
}
export function useCheckEventPermissionSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        CheckEventPermissionQuery,
        CheckEventPermissionQueryVariables
      >,
) {
  const options =
    baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions }
  return Apollo.useSuspenseQuery<CheckEventPermissionQuery, CheckEventPermissionQueryVariables>(
    CheckEventPermissionDocument,
    options,
  )
}
export type CheckEventPermissionQueryHookResult = ReturnType<typeof useCheckEventPermissionQuery>
export type CheckEventPermissionLazyQueryHookResult = ReturnType<
  typeof useCheckEventPermissionLazyQuery
>
export type CheckEventPermissionSuspenseQueryHookResult = ReturnType<
  typeof useCheckEventPermissionSuspenseQuery
>
export type CheckEventPermissionQueryResult = Apollo.QueryResult<
  CheckEventPermissionQuery,
  CheckEventPermissionQueryVariables
>
export const GetFeedDocument = gql`
    query GetFeed($limit: Int, $cursor: String) {
  getFeed(limit: $limit, cursor: $cursor) {
    posts {
      ...PostWithUser
    }
    has_more
    cursor
  }
}
    ${PostWithUserFragmentDoc}`

/**
 * __useGetFeedQuery__
 *
 * To run a query within a React component, call `useGetFeedQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetFeedQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetFeedQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      cursor: // value for 'cursor'
 *   },
 * });
 */
export function useGetFeedQuery(
  baseOptions?: Apollo.QueryHookOptions<GetFeedQuery, GetFeedQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetFeedQuery, GetFeedQueryVariables>(GetFeedDocument, options)
}
export function useGetFeedLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetFeedQuery, GetFeedQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetFeedQuery, GetFeedQueryVariables>(GetFeedDocument, options)
}
export function useGetFeedSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<GetFeedQuery, GetFeedQueryVariables>,
) {
  const options =
    baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions }
  return Apollo.useSuspenseQuery<GetFeedQuery, GetFeedQueryVariables>(GetFeedDocument, options)
}
export type GetFeedQueryHookResult = ReturnType<typeof useGetFeedQuery>
export type GetFeedLazyQueryHookResult = ReturnType<typeof useGetFeedLazyQuery>
export type GetFeedSuspenseQueryHookResult = ReturnType<typeof useGetFeedSuspenseQuery>
export type GetFeedQueryResult = Apollo.QueryResult<GetFeedQuery, GetFeedQueryVariables>
export const GetPostDocument = gql`
    query GetPost($id: ID!) {
  getPost(id: $id) {
    ...PostWithDetails
  }
}
    ${PostWithDetailsFragmentDoc}`

/**
 * __useGetPostQuery__
 *
 * To run a query within a React component, call `useGetPostQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPostQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPostQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetPostQuery(
  baseOptions: Apollo.QueryHookOptions<GetPostQuery, GetPostQueryVariables> &
    ({ variables: GetPostQueryVariables; skip?: boolean } | { skip: boolean }),
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetPostQuery, GetPostQueryVariables>(GetPostDocument, options)
}
export function useGetPostLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetPostQuery, GetPostQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetPostQuery, GetPostQueryVariables>(GetPostDocument, options)
}
export function useGetPostSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<GetPostQuery, GetPostQueryVariables>,
) {
  const options =
    baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions }
  return Apollo.useSuspenseQuery<GetPostQuery, GetPostQueryVariables>(GetPostDocument, options)
}
export type GetPostQueryHookResult = ReturnType<typeof useGetPostQuery>
export type GetPostLazyQueryHookResult = ReturnType<typeof useGetPostLazyQuery>
export type GetPostSuspenseQueryHookResult = ReturnType<typeof useGetPostSuspenseQuery>
export type GetPostQueryResult = Apollo.QueryResult<GetPostQuery, GetPostQueryVariables>
export const GetMyPostsDocument = gql`
    query GetMyPosts($limit: Int, $offset: Int) {
  getMyPosts(limit: $limit, offset: $offset) {
    ...PostWithUser
  }
}
    ${PostWithUserFragmentDoc}`

/**
 * __useGetMyPostsQuery__
 *
 * To run a query within a React component, call `useGetMyPostsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMyPostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMyPostsQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *   },
 * });
 */
export function useGetMyPostsQuery(
  baseOptions?: Apollo.QueryHookOptions<GetMyPostsQuery, GetMyPostsQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetMyPostsQuery, GetMyPostsQueryVariables>(GetMyPostsDocument, options)
}
export function useGetMyPostsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetMyPostsQuery, GetMyPostsQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetMyPostsQuery, GetMyPostsQueryVariables>(GetMyPostsDocument, options)
}
export function useGetMyPostsSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<GetMyPostsQuery, GetMyPostsQueryVariables>,
) {
  const options =
    baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions }
  return Apollo.useSuspenseQuery<GetMyPostsQuery, GetMyPostsQueryVariables>(
    GetMyPostsDocument,
    options,
  )
}
export type GetMyPostsQueryHookResult = ReturnType<typeof useGetMyPostsQuery>
export type GetMyPostsLazyQueryHookResult = ReturnType<typeof useGetMyPostsLazyQuery>
export type GetMyPostsSuspenseQueryHookResult = ReturnType<typeof useGetMyPostsSuspenseQuery>
export type GetMyPostsQueryResult = Apollo.QueryResult<GetMyPostsQuery, GetMyPostsQueryVariables>
export const GetUserPostsDocument = gql`
    query GetUserPosts($userId: String!, $limit: Int, $offset: Int) {
  getUserPosts(userId: $userId, limit: $limit, offset: $offset) {
    ...PostWithUser
  }
}
    ${PostWithUserFragmentDoc}`

/**
 * __useGetUserPostsQuery__
 *
 * To run a query within a React component, call `useGetUserPostsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserPostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserPostsQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *   },
 * });
 */
export function useGetUserPostsQuery(
  baseOptions: Apollo.QueryHookOptions<GetUserPostsQuery, GetUserPostsQueryVariables> &
    ({ variables: GetUserPostsQueryVariables; skip?: boolean } | { skip: boolean }),
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetUserPostsQuery, GetUserPostsQueryVariables>(
    GetUserPostsDocument,
    options,
  )
}
export function useGetUserPostsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetUserPostsQuery, GetUserPostsQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetUserPostsQuery, GetUserPostsQueryVariables>(
    GetUserPostsDocument,
    options,
  )
}
export function useGetUserPostsSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<GetUserPostsQuery, GetUserPostsQueryVariables>,
) {
  const options =
    baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions }
  return Apollo.useSuspenseQuery<GetUserPostsQuery, GetUserPostsQueryVariables>(
    GetUserPostsDocument,
    options,
  )
}
export type GetUserPostsQueryHookResult = ReturnType<typeof useGetUserPostsQuery>
export type GetUserPostsLazyQueryHookResult = ReturnType<typeof useGetUserPostsLazyQuery>
export type GetUserPostsSuspenseQueryHookResult = ReturnType<typeof useGetUserPostsSuspenseQuery>
export type GetUserPostsQueryResult = Apollo.QueryResult<
  GetUserPostsQuery,
  GetUserPostsQueryVariables
>
export const GetEventPostsDocument = gql`
    query GetEventPosts($eventId: ID!, $limit: Int, $offset: Int) {
  getEventPosts(eventId: $eventId, limit: $limit, offset: $offset) {
    ...PostWithUser
  }
}
    ${PostWithUserFragmentDoc}`

/**
 * __useGetEventPostsQuery__
 *
 * To run a query within a React component, call `useGetEventPostsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetEventPostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetEventPostsQuery({
 *   variables: {
 *      eventId: // value for 'eventId'
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *   },
 * });
 */
export function useGetEventPostsQuery(
  baseOptions: Apollo.QueryHookOptions<GetEventPostsQuery, GetEventPostsQueryVariables> &
    ({ variables: GetEventPostsQueryVariables; skip?: boolean } | { skip: boolean }),
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetEventPostsQuery, GetEventPostsQueryVariables>(
    GetEventPostsDocument,
    options,
  )
}
export function useGetEventPostsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetEventPostsQuery, GetEventPostsQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetEventPostsQuery, GetEventPostsQueryVariables>(
    GetEventPostsDocument,
    options,
  )
}
export function useGetEventPostsSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<GetEventPostsQuery, GetEventPostsQueryVariables>,
) {
  const options =
    baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions }
  return Apollo.useSuspenseQuery<GetEventPostsQuery, GetEventPostsQueryVariables>(
    GetEventPostsDocument,
    options,
  )
}
export type GetEventPostsQueryHookResult = ReturnType<typeof useGetEventPostsQuery>
export type GetEventPostsLazyQueryHookResult = ReturnType<typeof useGetEventPostsLazyQuery>
export type GetEventPostsSuspenseQueryHookResult = ReturnType<typeof useGetEventPostsSuspenseQuery>
export type GetEventPostsQueryResult = Apollo.QueryResult<
  GetEventPostsQuery,
  GetEventPostsQueryVariables
>
export const GetAllEventRegistrationsDocument = gql`
    query GetAllEventRegistrations {
  getAllEventRegistrations {
    id
    event_id
    user_id
    status
    registration_date
    payment_status
    payment_amount
    payment_date
    checked_in
    check_in_time
    user_notes
    admin_notes
    created_at
    updated_at
    user {
      privy_id
      username
      display_name
    }
    event {
      id
      title
      start_date_time
      location_name
    }
  }
}
    `

/**
 * __useGetAllEventRegistrationsQuery__
 *
 * To run a query within a React component, call `useGetAllEventRegistrationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllEventRegistrationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllEventRegistrationsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllEventRegistrationsQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetAllEventRegistrationsQuery,
    GetAllEventRegistrationsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetAllEventRegistrationsQuery, GetAllEventRegistrationsQueryVariables>(
    GetAllEventRegistrationsDocument,
    options,
  )
}
export function useGetAllEventRegistrationsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetAllEventRegistrationsQuery,
    GetAllEventRegistrationsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetAllEventRegistrationsQuery, GetAllEventRegistrationsQueryVariables>(
    GetAllEventRegistrationsDocument,
    options,
  )
}
export function useGetAllEventRegistrationsSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        GetAllEventRegistrationsQuery,
        GetAllEventRegistrationsQueryVariables
      >,
) {
  const options =
    baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions }
  return Apollo.useSuspenseQuery<
    GetAllEventRegistrationsQuery,
    GetAllEventRegistrationsQueryVariables
  >(GetAllEventRegistrationsDocument, options)
}
export type GetAllEventRegistrationsQueryHookResult = ReturnType<
  typeof useGetAllEventRegistrationsQuery
>
export type GetAllEventRegistrationsLazyQueryHookResult = ReturnType<
  typeof useGetAllEventRegistrationsLazyQuery
>
export type GetAllEventRegistrationsSuspenseQueryHookResult = ReturnType<
  typeof useGetAllEventRegistrationsSuspenseQuery
>
export type GetAllEventRegistrationsQueryResult = Apollo.QueryResult<
  GetAllEventRegistrationsQuery,
  GetAllEventRegistrationsQueryVariables
>
export const GetEventsDocument = gql`
    query GetEvents($filter: EventFilterInput, $pagination: PaginationInput) {
  events(filter: $filter, pagination: $pagination) {
    events {
      id
      title
      description
      category
      image_url
      location_name
      location_address
      location_city
      facilitator_id
      facilitator {
        privy_id
        username
        display_name
      }
      max_capacity
      current_capacity
      price_usd
      price_danz
      is_featured
      skill_level
      is_virtual
      virtual_link
      requirements
      tags
      dance_styles
      currency
      start_date_time
      end_date_time
      created_at
      updated_at
      status
      is_registered
      registration_count
      is_recurring
      recurrence_type
      recurrence_end_date
      recurrence_days
      recurrence_count
      parent_event_id
    }
    pageInfo {
      hasNextPage
      hasPreviousPage
      startCursor
      endCursor
    }
    totalCount
  }
}
    `

/**
 * __useGetEventsQuery__
 *
 * To run a query within a React component, call `useGetEventsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetEventsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetEventsQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *      pagination: // value for 'pagination'
 *   },
 * });
 */
export function useGetEventsQuery(
  baseOptions?: Apollo.QueryHookOptions<GetEventsQuery, GetEventsQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetEventsQuery, GetEventsQueryVariables>(GetEventsDocument, options)
}
export function useGetEventsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetEventsQuery, GetEventsQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetEventsQuery, GetEventsQueryVariables>(GetEventsDocument, options)
}
export function useGetEventsSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<GetEventsQuery, GetEventsQueryVariables>,
) {
  const options =
    baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions }
  return Apollo.useSuspenseQuery<GetEventsQuery, GetEventsQueryVariables>(
    GetEventsDocument,
    options,
  )
}
export type GetEventsQueryHookResult = ReturnType<typeof useGetEventsQuery>
export type GetEventsLazyQueryHookResult = ReturnType<typeof useGetEventsLazyQuery>
export type GetEventsSuspenseQueryHookResult = ReturnType<typeof useGetEventsSuspenseQuery>
export type GetEventsQueryResult = Apollo.QueryResult<GetEventsQuery, GetEventsQueryVariables>
export const GetMyNotificationsDocument = gql`
    query GetMyNotifications($limit: Int, $offset: Int, $unread_only: Boolean, $type: NotificationType) {
  myNotifications(
    limit: $limit
    offset: $offset
    unread_only: $unread_only
    type: $type
  ) {
    notifications {
      id
      type
      title
      message
      sender_id
      sender_type
      sender {
        username
        display_name
        avatar_url
      }
      recipient_id
      event_id
      post_id
      read
      read_at
      is_broadcast
      broadcast_target
      action_type
      action_data
      created_at
      expires_at
    }
    total_count
    unread_count
    has_more
  }
}
    `

/**
 * __useGetMyNotificationsQuery__
 *
 * To run a query within a React component, call `useGetMyNotificationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMyNotificationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMyNotificationsQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *      unread_only: // value for 'unread_only'
 *      type: // value for 'type'
 *   },
 * });
 */
export function useGetMyNotificationsQuery(
  baseOptions?: Apollo.QueryHookOptions<GetMyNotificationsQuery, GetMyNotificationsQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetMyNotificationsQuery, GetMyNotificationsQueryVariables>(
    GetMyNotificationsDocument,
    options,
  )
}
export function useGetMyNotificationsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetMyNotificationsQuery,
    GetMyNotificationsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetMyNotificationsQuery, GetMyNotificationsQueryVariables>(
    GetMyNotificationsDocument,
    options,
  )
}
export function useGetMyNotificationsSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<GetMyNotificationsQuery, GetMyNotificationsQueryVariables>,
) {
  const options =
    baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions }
  return Apollo.useSuspenseQuery<GetMyNotificationsQuery, GetMyNotificationsQueryVariables>(
    GetMyNotificationsDocument,
    options,
  )
}
export type GetMyNotificationsQueryHookResult = ReturnType<typeof useGetMyNotificationsQuery>
export type GetMyNotificationsLazyQueryHookResult = ReturnType<
  typeof useGetMyNotificationsLazyQuery
>
export type GetMyNotificationsSuspenseQueryHookResult = ReturnType<
  typeof useGetMyNotificationsSuspenseQuery
>
export type GetMyNotificationsQueryResult = Apollo.QueryResult<
  GetMyNotificationsQuery,
  GetMyNotificationsQueryVariables
>
export const GetNotificationDocument = gql`
    query GetNotification($id: ID!) {
  notification(id: $id) {
    id
    type
    title
    message
    sender_id
    sender_type
    sender {
      username
      display_name
      avatar_url
    }
    event_id
    event {
      id
      title
      start_date_time
    }
    post_id
    read
    read_at
    action_type
    action_data
    created_at
  }
}
    `

/**
 * __useGetNotificationQuery__
 *
 * To run a query within a React component, call `useGetNotificationQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetNotificationQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetNotificationQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetNotificationQuery(
  baseOptions: Apollo.QueryHookOptions<GetNotificationQuery, GetNotificationQueryVariables> &
    ({ variables: GetNotificationQueryVariables; skip?: boolean } | { skip: boolean }),
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetNotificationQuery, GetNotificationQueryVariables>(
    GetNotificationDocument,
    options,
  )
}
export function useGetNotificationLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetNotificationQuery, GetNotificationQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<GetNotificationQuery, GetNotificationQueryVariables>(
    GetNotificationDocument,
    options,
  )
}
export function useGetNotificationSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<GetNotificationQuery, GetNotificationQueryVariables>,
) {
  const options =
    baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions }
  return Apollo.useSuspenseQuery<GetNotificationQuery, GetNotificationQueryVariables>(
    GetNotificationDocument,
    options,
  )
}
export type GetNotificationQueryHookResult = ReturnType<typeof useGetNotificationQuery>
export type GetNotificationLazyQueryHookResult = ReturnType<typeof useGetNotificationLazyQuery>
export type GetNotificationSuspenseQueryHookResult = ReturnType<
  typeof useGetNotificationSuspenseQuery
>
export type GetNotificationQueryResult = Apollo.QueryResult<
  GetNotificationQuery,
  GetNotificationQueryVariables
>
export const GetMyNotificationPreferencesDocument = gql`
    query GetMyNotificationPreferences {
  myNotificationPreferences {
    id
    user_id
    admin_broadcasts
    event_manager_broadcasts
    event_updates
    dance_bonds
    post_interactions
    achievements
    push_notifications
    email_notifications
    quiet_hours_enabled
    quiet_hours_start
    quiet_hours_end
    created_at
    updated_at
  }
}
    `

/**
 * __useGetMyNotificationPreferencesQuery__
 *
 * To run a query within a React component, call `useGetMyNotificationPreferencesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMyNotificationPreferencesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMyNotificationPreferencesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetMyNotificationPreferencesQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetMyNotificationPreferencesQuery,
    GetMyNotificationPreferencesQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<
    GetMyNotificationPreferencesQuery,
    GetMyNotificationPreferencesQueryVariables
  >(GetMyNotificationPreferencesDocument, options)
}
export function useGetMyNotificationPreferencesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetMyNotificationPreferencesQuery,
    GetMyNotificationPreferencesQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<
    GetMyNotificationPreferencesQuery,
    GetMyNotificationPreferencesQueryVariables
  >(GetMyNotificationPreferencesDocument, options)
}
export function useGetMyNotificationPreferencesSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        GetMyNotificationPreferencesQuery,
        GetMyNotificationPreferencesQueryVariables
      >,
) {
  const options =
    baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions }
  return Apollo.useSuspenseQuery<
    GetMyNotificationPreferencesQuery,
    GetMyNotificationPreferencesQueryVariables
  >(GetMyNotificationPreferencesDocument, options)
}
export type GetMyNotificationPreferencesQueryHookResult = ReturnType<
  typeof useGetMyNotificationPreferencesQuery
>
export type GetMyNotificationPreferencesLazyQueryHookResult = ReturnType<
  typeof useGetMyNotificationPreferencesLazyQuery
>
export type GetMyNotificationPreferencesSuspenseQueryHookResult = ReturnType<
  typeof useGetMyNotificationPreferencesSuspenseQuery
>
export type GetMyNotificationPreferencesQueryResult = Apollo.QueryResult<
  GetMyNotificationPreferencesQuery,
  GetMyNotificationPreferencesQueryVariables
>
export const GetUnreadNotificationCountDocument = gql`
    query GetUnreadNotificationCount {
  unreadNotificationCount
}
    `

/**
 * __useGetUnreadNotificationCountQuery__
 *
 * To run a query within a React component, call `useGetUnreadNotificationCountQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUnreadNotificationCountQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUnreadNotificationCountQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUnreadNotificationCountQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetUnreadNotificationCountQuery,
    GetUnreadNotificationCountQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<GetUnreadNotificationCountQuery, GetUnreadNotificationCountQueryVariables>(
    GetUnreadNotificationCountDocument,
    options,
  )
}
export function useGetUnreadNotificationCountLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetUnreadNotificationCountQuery,
    GetUnreadNotificationCountQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<
    GetUnreadNotificationCountQuery,
    GetUnreadNotificationCountQueryVariables
  >(GetUnreadNotificationCountDocument, options)
}
export function useGetUnreadNotificationCountSuspenseQuery(
  baseOptions?:
    | Apollo.SkipToken
    | Apollo.SuspenseQueryHookOptions<
        GetUnreadNotificationCountQuery,
        GetUnreadNotificationCountQueryVariables
      >,
) {
  const options =
    baseOptions === Apollo.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions }
  return Apollo.useSuspenseQuery<
    GetUnreadNotificationCountQuery,
    GetUnreadNotificationCountQueryVariables
  >(GetUnreadNotificationCountDocument, options)
}
export type GetUnreadNotificationCountQueryHookResult = ReturnType<
  typeof useGetUnreadNotificationCountQuery
>
export type GetUnreadNotificationCountLazyQueryHookResult = ReturnType<
  typeof useGetUnreadNotificationCountLazyQuery
>
export type GetUnreadNotificationCountSuspenseQueryHookResult = ReturnType<
  typeof useGetUnreadNotificationCountSuspenseQuery
>
export type GetUnreadNotificationCountQueryResult = Apollo.QueryResult<
  GetUnreadNotificationCountQuery,
  GetUnreadNotificationCountQueryVariables
>
export const GetReferralByCodeDocument = gql`
    query GetReferralByCode($code: String!) {
  getReferralByCode(code: $code) {
    id
    referral_code
    referrer_user_id
    status
    clicked_at
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
    clicked_at
    signed_up_at
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
