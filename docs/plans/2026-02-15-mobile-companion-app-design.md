# Cloud Native Denmark Mobile Companion App - Design Document

**Date:** 2026-02-15
**Status:** Approved

## Overview

A cross-platform mobile companion app for Cloud Native Denmark conference attendees. Built with Expo/React Native, sharing code with the existing website via a monorepo structure.

### Key Features

- Browse conference schedule (data from Sessionize API)
- Rate sessions (1-5 stars + comment) - unlocks after session starts
- Role-based access: Attendee, Speaker, Admin
- Queue-based feedback moderation (Admin approves before Speakers see)
- Authentication via Google, GitHub, or email/password

### Tech Stack

- **Mobile:** Expo (React Native)
- **Backend:** Firebase (Auth + Firestore)
- **Shared Code:** TypeScript monorepo package
- **Testing:** Jest + React Native Testing Library

---

## Project Structure

```
cloudnativedenmark.dk/
├── packages/
│   ├── web/                    # Existing website (moved from root)
│   ├── mobile/                 # New Expo React Native app
│   └── shared/                 # Shared code between web & mobile
├── package.json                # Root workspace config
├── tsconfig.base.json          # Shared TypeScript config
└── ... (existing root files)
```

### Shared Package (`packages/shared/`)

```
shared/
├── src/
│   ├── types/
│   │   ├── sessionize.ts       # Session, Speaker, GridEntry, etc.
│   │   └── user.ts             # UserProfile, Rating, UserRole
│   ├── hooks/
│   │   └── use-sessionize.ts   # Sessionize API hook
│   ├── utils/
│   │   └── time-formatting.ts  # Date/time utilities
│   ├── theme.ts                # Color palette, fonts, spacing
│   └── index.ts                # Barrel export
├── package.json
└── tsconfig.json
```

### Mobile Package (`packages/mobile/`)

```
mobile/
├── app/                        # Expo Router file-based routing
│   ├── (tabs)/                 # Tab navigation group
│   │   ├── _layout.tsx         # Tab bar configuration
│   │   ├── schedule.tsx        # Schedule screen (default tab)
│   │   ├── my-ratings.tsx      # User's submitted ratings
│   │   ├── feedback.tsx        # Feedback queue (Speakers/Admins)
│   │   └── profile.tsx         # User profile & settings
│   ├── session/[id].tsx        # Session detail & rating screen
│   ├── login.tsx               # Auth screen
│   └── _layout.tsx             # Root layout with auth guard
├── components/                 # Mobile-specific components
│   ├── SessionCard.tsx
│   ├── RatingForm.tsx
│   ├── StarRating.tsx
│   ├── FeedbackCard.tsx
│   └── RoleBadge.tsx
├── services/                   # Firebase integration
│   ├── firebase.ts             # Firebase app initialization
│   ├── auth.ts                 # Authentication functions
│   └── ratings.ts              # Firestore rating operations
├── contexts/
│   └── AuthContext.tsx         # Auth state provider
├── app.json                    # Expo config
└── package.json
```

---

## Authentication & User Roles

### Firebase Auth Providers

- Google Sign-In
- GitHub Sign-In
- Email/Password

### Role System

```typescript
type UserRole = 'attendee' | 'speaker' | 'admin'

interface UserProfile {
  uid: string
  email: string
  displayName: string
  role: UserRole
  sessionizeId?: string      // For speakers - links to Sessionize data
  createdAt: Timestamp
}
```

### Role Assignment

| Role | How Assigned |
|------|--------------|
| Attendee | Default for all new users |
| Speaker | Firebase Console: add `sessionizeId` to user doc |
| Admin | Firebase Console: set custom claim `admin: true` |

### Auth Flow

1. App launches → Check Firebase auth state
2. Not logged in → Show login screen
3. Logged in → Fetch user profile, check custom claims
4. Route based on role (Feedback tab hidden for Attendees)

---

## Firestore Data Model

### Collections

```typescript
// users/{uid}
interface UserProfile {
  uid: string
  email: string
  displayName: string
  role: 'attendee' | 'speaker' | 'admin'
  sessionizeId?: string
  createdAt: Timestamp
}

// ratings/{docId}
interface Rating {
  id: string
  sessionId: string            // Sessionize session ID
  userId: string               // Who submitted
  stars: 1 | 2 | 3 | 4 | 5
  comment: string
  status: 'pending' | 'approved' | 'rejected' | 'hidden'
  createdAt: Timestamp
  moderatedAt?: Timestamp
  moderatedBy?: string         // Admin uid who moderated
}
```

### Security Rules Summary

- Authenticated users can create ratings
- Users can read/update their own ratings
- Admins can read all ratings, update status
- Speakers can read only `approved` ratings for their sessions

---

## Mobile App Screens

### Bottom Tab Navigation

| Tab | Icon | Visibility |
|-----|------|------------|
| Schedule | calendar | All users |
| My Ratings | star | All users |
| Feedback | message-circle | Speakers & Admins only |
| Profile | user | All users |

### Screen Details

#### 1. Schedule Tab
- Grid/list of sessions from Sessionize API
- Grouped by time slot
- Visual indicator for already-rated sessions
- Tap → Session detail

#### 2. Session Detail (`/session/[id]`)
- Session info: title, description, speakers, time, room
- Rating form: 5-star picker + comment textarea
- Submit disabled until session start time
- Shows existing rating if already submitted

#### 3. My Ratings Tab
- List of user's submitted ratings
- Shows: session name, stars, comment, status badge
- Tap to edit rating

#### 4. Feedback Tab (Speakers/Admins)
- **Admin view:** Pending ratings queue with approve/reject/hide buttons
- **Speaker view:** Approved ratings for their sessions only
- Filter dropdown by session

#### 5. Profile Tab
- User info with role badge
- Sign out button

#### 6. Login Screen
- Google sign-in button
- GitHub sign-in button
- Email/password form with sign-up toggle

---

## Theme (Shared)

```typescript
export const theme = {
  colors: {
    primary: '#262f59',           // Dark navy
    background: '#0026ce',        // Bright blue
    backgroundHover: '#001ba0',   // Pressed states
    backgroundDark: '#11347e',    // Headers
    backgroundLight: '#d7dff4',   // Cards
    white: '#ffffff',
    error: '#dc2626',
    success: '#16a34a',
    warning: '#f59e0b',
    pending: '#6b7280',
  },
  fonts: {
    sans: 'PlusJakartaSans',
  },
  spacing: { xs: 4, sm: 8, md: 16, lg: 24, xl: 32 },
  borderRadius: { sm: 4, md: 8, lg: 16, full: 9999 },
}
```

---

## Testing Strategy

| Layer | Tool | Coverage |
|-------|------|----------|
| Shared | Jest | Utils, hooks (mocked fetch) |
| Components | Jest + RNTL | Rendering, interactions |
| Services | Jest | Firebase functions (mocked) |

### Key Test Cases

1. Sessionize hook: fetch, transform, error handling
2. Rating form: validation, submit timing, state
3. Auth: sign-in flows, profile creation, role detection
4. Feedback list: role-based filtering
5. Navigation: tab visibility, auth guards

**Target:** 80%+ coverage on critical paths

---

## Decisions Log

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Backend | Firebase | Fast setup, built-in auth, free tier sufficient |
| Code sharing | Monorepo | Unified versioning, shared types/hooks |
| Moderation | Queue-based | Safe - no harmful content reaches Speakers |
| Offline | Online-only | Simpler, sufficient for v1 |
| Rating timing | After session starts | Allows rating during or after talk |
| Feedback anonymity | Anonymous to Speakers | Honest feedback + Admin accountability |
| Speaker-session link | Sessionize data | No manual assignment needed |
| Admin assignment | Firebase Console | No app updates for admin changes |
| Navigation | Bottom tabs | Native mobile convention |

---

## Out of Scope (This Iteration)

- GitHub Actions CI/CD pipeline
- EAS Build + Auto Submit to stores
- Offline support
- Push notifications
- E2E tests with Detox

---

## Future: CI/CD Setup

When ready to deploy:

1. **EAS Setup:** `eas init`, configure `eas.json`
2. **Store Accounts:** Apple Developer ($99/yr), Google Play ($25 one-time)
3. **GitHub Actions:** Build on push to main, auto-submit to stores
4. **OTA Updates:** Configure EAS Update for JS-only changes

Detailed steps will be in README.
