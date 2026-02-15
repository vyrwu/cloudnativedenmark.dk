# Cloud Native Denmark

Official website and mobile companion app for Cloud Native Denmark (CND), a vibrant community for cloud-native technology enthusiasts in Denmark.

## Project Structure

This is a monorepo containing three packages:

```
cloudnativedenmark.dk/
├── packages/
│   ├── web/          # Conference website (React + Vite)
│   ├── mobile/       # Companion app (Expo/React Native)
│   └── shared/       # Shared code (types, hooks, theme)
├── docs/             # Documentation and design docs
└── package.json      # Root workspace config
```

## Quick Start

### Prerequisites

- Node.js v20+
- Yarn v4+ (Berry)
- For mobile: Expo CLI, iOS Simulator / Android Emulator

### Installation

```bash
# Clone and install
git clone https://github.com/vyrwu/cloudnativedenmark.dk.git
cd cloudnativedenmark.dk
yarn install
```

### Running the Website

```bash
yarn web:dev          # Start dev server at http://localhost:8000
yarn web:build        # Build for production
yarn web:test         # Run tests
```

### Running the Mobile App

```bash
# First, set up Firebase (see Mobile Setup section below)
cd packages/mobile
cp .env.example .env  # Then fill in your Firebase config

yarn mobile:start     # Start Expo dev server
yarn mobile:ios       # Run on iOS Simulator
yarn mobile:android   # Run on Android Emulator
yarn mobile:test      # Run tests
```

## Mobile App Setup

### 1. Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project (or use existing)
3. Enable **Authentication** with these providers:
   - Email/Password
   - Google
   - GitHub (optional)
4. Enable **Cloud Firestore** database
5. Copy your Firebase config values

### 2. Configure Environment

```bash
cd packages/mobile
cp .env.example .env
```

Edit `.env` with your Firebase config:

```env
EXPO_PUBLIC_FIREBASE_API_KEY=your_api_key
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
EXPO_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
EXPO_PUBLIC_FIREBASE_APP_ID=your_app_id

# For Google Sign-In (from Firebase Console -> Authentication -> Google)
EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID=your_web_client_id
EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID=your_ios_client_id
EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID=your_android_client_id
```

### 3. Deploy Firestore Rules

```bash
# Install Firebase CLI if needed
npm install -g firebase-tools
firebase login

# Deploy rules
cd packages/mobile
firebase deploy --only firestore:rules
```

### 4. Add Fonts

Download [Plus Jakarta Sans](https://fonts.google.com/specimen/Plus+Jakarta+Sans) and add to `packages/mobile/assets/fonts/`:
- PlusJakartaSans-Regular.ttf
- PlusJakartaSans-Medium.ttf
- PlusJakartaSans-SemiBold.ttf
- PlusJakartaSans-Bold.ttf

### 5. Set Up Admin Users

Admins are designated via Firebase Console custom claims:

1. Go to Firebase Console -> Authentication -> Users
2. Find the user to promote
3. Click the three dots -> Edit user
4. Add custom claim: `{"admin": true}`

### 6. Link Speakers to Sessionize

Speakers are linked by their Sessionize ID:

1. Go to Firebase Console -> Firestore -> users collection
2. Find the speaker's user document
3. Add field: `sessionizeId` with their Sessionize speaker ID
4. Add field: `role` with value `speaker`

## Mobile App Features

### For All Users (Attendees, Speakers, Admins)

- **Schedule**: Browse conference sessions from Sessionize
- **Rate Sessions**: 1-5 stars + comment (available after session starts)
- **My Ratings**: View your submitted ratings and their status

### For Speakers

- **Feedback Tab**: View approved feedback for your sessions (anonymous)

### For Admins

- **Moderation Queue**: Review pending feedback
- **Approve/Reject/Hide**: Moderate feedback before it reaches speakers

## Available Scripts

### Root Level

| Command | Description |
|---------|-------------|
| `yarn web:dev` | Start website dev server |
| `yarn web:build` | Build website for production |
| `yarn web:test` | Run website tests |
| `yarn mobile:start` | Start Expo dev server |
| `yarn mobile:ios` | Run on iOS Simulator |
| `yarn mobile:android` | Run on Android Emulator |
| `yarn mobile:test` | Run mobile tests |
| `yarn shared:test` | Run shared package tests |
| `yarn test` | Run all tests |
| `yarn typecheck` | TypeScript check all packages |

## Tech Stack

### Website (`packages/web`)

- **Build**: Vite
- **UI**: React 19 + TypeScript
- **Styling**: Tailwind CSS v4
- **Routing**: React Router v7
- **Data**: Sessionize API

### Mobile App (`packages/mobile`)

- **Framework**: Expo (React Native)
- **Navigation**: Expo Router
- **Backend**: Firebase (Auth + Firestore)
- **State**: React Context

### Shared (`packages/shared`)

- **Types**: TypeScript interfaces for Sessionize data, users, ratings
- **Hooks**: `useSessionizeSchedule`, `useSessionizeSpeakers`
- **Utils**: Time formatting, session helpers
- **Theme**: Color palette, spacing, typography tokens

## Architecture

### Authentication Flow

```
User opens app
  → Check auth state
  → Not logged in → Login screen (Google/GitHub/Email)
  → Logged in → Fetch user profile + check admin claims
  → Route to tabs
```

### Rating Flow

```
User views session
  → Session started? → Show rating form
  → Submit rating → Status: "pending"
  → Admin reviews → Approve/Reject/Hide
  → Approved → Visible to speaker
```

### Data Flow

```
Sessionize API
  ↓
useSessionizeSchedule hook (shared)
  ↓
Schedule screen (mobile) / Schedule page (web)
  ↓
Session detail
  ↓
Firestore (ratings)
```

## Future: CI/CD Setup

When ready to deploy the mobile app to stores:

### 1. EAS Setup

```bash
cd packages/mobile
npx eas-cli init
npx eas build:configure
```

### 2. Store Accounts

- Apple Developer Program: $99/year
- Google Play Developer: $25 one-time

### 3. GitHub Actions (example workflow)

```yaml
name: Build and Deploy Mobile
on:
  push:
    branches: [main]
    paths: ['packages/mobile/**', 'packages/shared/**']

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: expo/expo-github-action@v8
        with:
          eas-version: latest
          token: ${{ secrets.EXPO_TOKEN }}
      - run: yarn install
      - run: cd packages/mobile && eas build --platform all --non-interactive
      - run: cd packages/mobile && eas submit --platform all --non-interactive
```

### 4. Required Secrets

- `EXPO_TOKEN`: From expo.dev account
- Store credentials configured via `eas credentials`

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for development guidelines.

## License

GNU General Public License v3.0 - see [LICENSE](./LICENSE)

## Community

- **Website**: [cloudnativedenmark.dk](https://cloudnativedenmark.dk)
- **LinkedIn**: [Cloud Native Denmark](https://www.linkedin.com/company/cloud-native-denmark/)
- **Email**: [info@cloudnativedenmark.dk](mailto:info@cloudnativedenmark.dk)

---

Built with love by the Cloud Native Denmark community
