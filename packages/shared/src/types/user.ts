export type UserRole = 'attendee' | 'speaker' | 'admin'

export type RatingStatus = 'pending' | 'approved' | 'rejected' | 'hidden'

export type StarRating = 1 | 2 | 3 | 4 | 5

export interface UserProfile {
  uid: string
  email: string
  displayName: string
  role: UserRole
  sessionizeId?: string
  createdAt: Date
}

export interface Rating {
  id: string
  sessionId: string
  userId: string
  stars: StarRating
  comment: string
  status: RatingStatus
  createdAt: Date
  moderatedAt?: Date
  moderatedBy?: string
}

export interface CreateRatingInput {
  sessionId: string
  stars: StarRating
  comment: string
}

export interface UpdateRatingInput {
  stars?: StarRating
  comment?: string
}

export interface ModerateRatingInput {
  status: 'approved' | 'rejected' | 'hidden'
}
