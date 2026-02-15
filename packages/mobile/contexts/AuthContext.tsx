import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  ReactNode,
} from 'react'
import { User } from 'firebase/auth'
import type { UserProfile } from '@cloudnative/shared'
import {
  subscribeToAuthState,
  getUserProfile,
  checkIsAdmin,
  signOut as authSignOut,
  signInWithEmail,
  signUpWithEmail,
  signInWithGoogle,
  signInWithGithub,
} from '../services/auth'
import { initializeFirebase } from '../services/firebase'

interface AuthContextType {
  user: User | null
  profile: UserProfile | null
  isAdmin: boolean
  isLoading: boolean
  error: string | null
  signIn: (email: string, password: string) => Promise<void>
  signUp: (email: string, password: string, displayName: string) => Promise<void>
  signInGoogle: (idToken: string) => Promise<void>
  signInGithub: (accessToken: string) => Promise<void>
  signOut: () => Promise<void>
  clearError: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [isAdmin, setIsAdmin] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    initializeFirebase()

    const unsubscribe = subscribeToAuthState(async (firebaseUser) => {
      setUser(firebaseUser)

      if (firebaseUser) {
        try {
          const [userProfile, adminStatus] = await Promise.all([
            getUserProfile(firebaseUser.uid),
            checkIsAdmin(firebaseUser),
          ])
          setProfile(userProfile)
          setIsAdmin(adminStatus)
        } catch (err) {
          console.error('Error loading user data:', err)
          setProfile(null)
          setIsAdmin(false)
        }
      } else {
        setProfile(null)
        setIsAdmin(false)
      }

      setIsLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const signIn = useCallback(async (email: string, password: string) => {
    setError(null)
    setIsLoading(true)
    try {
      await signInWithEmail(email, password)
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Sign in failed'
      setError(message)
      throw err
    } finally {
      setIsLoading(false)
    }
  }, [])

  const signUp = useCallback(
    async (email: string, password: string, displayName: string) => {
      setError(null)
      setIsLoading(true)
      try {
        await signUpWithEmail(email, password, displayName)
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Sign up failed'
        setError(message)
        throw err
      } finally {
        setIsLoading(false)
      }
    },
    []
  )

  const signInGoogle = useCallback(async (idToken: string) => {
    setError(null)
    setIsLoading(true)
    try {
      await signInWithGoogle(idToken)
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Google sign in failed'
      setError(message)
      throw err
    } finally {
      setIsLoading(false)
    }
  }, [])

  const signInGithub = useCallback(async (accessToken: string) => {
    setError(null)
    setIsLoading(true)
    try {
      await signInWithGithub(accessToken)
    } catch (err) {
      const message = err instanceof Error ? err.message : 'GitHub sign in failed'
      setError(message)
      throw err
    } finally {
      setIsLoading(false)
    }
  }, [])

  const signOut = useCallback(async () => {
    setError(null)
    try {
      await authSignOut()
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Sign out failed'
      setError(message)
      throw err
    }
  }, [])

  const clearError = useCallback(() => {
    setError(null)
  }, [])

  const value: AuthContextType = {
    user,
    profile,
    isAdmin,
    isLoading,
    error,
    signIn,
    signUp,
    signInGoogle,
    signInGithub,
    signOut,
    clearError,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
