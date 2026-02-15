import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  User,
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithCredential,
  updateProfile,
} from 'firebase/auth'
import {
  doc,
  getDoc,
  setDoc,
  serverTimestamp,
  Timestamp,
} from 'firebase/firestore'
import { getFirebaseAuth, getFirebaseDb } from './firebase'
import type { UserProfile, UserRole } from '@cloudnative/shared'

export interface AuthUser extends User {
  profile?: UserProfile
  isAdmin?: boolean
}

export const signInWithEmail = async (
  email: string,
  password: string
): Promise<User> => {
  const auth = getFirebaseAuth()
  const result = await signInWithEmailAndPassword(auth, email, password)
  return result.user
}

export const signUpWithEmail = async (
  email: string,
  password: string,
  displayName: string
): Promise<User> => {
  const auth = getFirebaseAuth()
  const result = await createUserWithEmailAndPassword(auth, email, password)

  await updateProfile(result.user, { displayName })
  await createUserProfile(result.user.uid, email, displayName)

  return result.user
}

export const signInWithGoogle = async (idToken: string): Promise<User> => {
  const auth = getFirebaseAuth()
  const credential = GoogleAuthProvider.credential(idToken)
  const result = await signInWithCredential(auth, credential)

  const profileExists = await checkUserProfileExists(result.user.uid)
  if (!profileExists) {
    await createUserProfile(
      result.user.uid,
      result.user.email || '',
      result.user.displayName || 'User'
    )
  }

  return result.user
}

export const signInWithGithub = async (accessToken: string): Promise<User> => {
  const auth = getFirebaseAuth()
  const credential = GithubAuthProvider.credential(accessToken)
  const result = await signInWithCredential(auth, credential)

  const profileExists = await checkUserProfileExists(result.user.uid)
  if (!profileExists) {
    await createUserProfile(
      result.user.uid,
      result.user.email || '',
      result.user.displayName || 'User'
    )
  }

  return result.user
}

export const signOut = async (): Promise<void> => {
  const auth = getFirebaseAuth()
  await firebaseSignOut(auth)
}

export const subscribeToAuthState = (
  callback: (user: User | null) => void
): (() => void) => {
  const auth = getFirebaseAuth()
  return onAuthStateChanged(auth, callback)
}

export const createUserProfile = async (
  uid: string,
  email: string,
  displayName: string,
  role: UserRole = 'attendee'
): Promise<void> => {
  const db = getFirebaseDb()
  const userRef = doc(db, 'users', uid)

  await setDoc(userRef, {
    uid,
    email,
    displayName,
    role,
    createdAt: serverTimestamp(),
  })
}

export const checkUserProfileExists = async (uid: string): Promise<boolean> => {
  const db = getFirebaseDb()
  const userRef = doc(db, 'users', uid)
  const userDoc = await getDoc(userRef)
  return userDoc.exists()
}

export const getUserProfile = async (uid: string): Promise<UserProfile | null> => {
  const db = getFirebaseDb()
  const userRef = doc(db, 'users', uid)
  const userDoc = await getDoc(userRef)

  if (!userDoc.exists()) {
    return null
  }

  const data = userDoc.data()
  return {
    uid: data.uid,
    email: data.email,
    displayName: data.displayName,
    role: data.role as UserRole,
    sessionizeId: data.sessionizeId,
    createdAt:
      data.createdAt instanceof Timestamp
        ? data.createdAt.toDate()
        : new Date(),
  }
}

export const checkIsAdmin = async (user: User): Promise<boolean> => {
  const tokenResult = await user.getIdTokenResult()
  return tokenResult.claims.admin === true
}
