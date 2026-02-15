import {
  collection,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  getDoc,
  getDocs,
  query,
  where,
  orderBy,
  serverTimestamp,
  Timestamp,
} from 'firebase/firestore'
import { getFirebaseDb } from './firebase'
import type {
  Rating,
  RatingStatus,
  StarRating,
  CreateRatingInput,
  UpdateRatingInput,
  ModerateRatingInput,
} from '@cloudnative/shared'

const RATINGS_COLLECTION = 'ratings'

const convertTimestamp = (timestamp: unknown): Date => {
  if (timestamp instanceof Timestamp) {
    return timestamp.toDate()
  }
  return new Date()
}

const convertRatingDoc = (id: string, data: Record<string, unknown>): Rating => ({
  id,
  sessionId: data.sessionId as string,
  userId: data.userId as string,
  stars: data.stars as StarRating,
  comment: data.comment as string,
  status: data.status as RatingStatus,
  createdAt: convertTimestamp(data.createdAt),
  moderatedAt: data.moderatedAt ? convertTimestamp(data.moderatedAt) : undefined,
  moderatedBy: data.moderatedBy as string | undefined,
})

export const createRating = async (
  userId: string,
  input: CreateRatingInput
): Promise<Rating> => {
  const db = getFirebaseDb()
  const ratingsRef = collection(db, RATINGS_COLLECTION)

  const existingRating = await getUserRatingForSession(userId, input.sessionId)
  if (existingRating) {
    throw new Error('You have already rated this session')
  }

  const docRef = await addDoc(ratingsRef, {
    ...input,
    userId,
    status: 'pending' as RatingStatus,
    createdAt: serverTimestamp(),
  })

  const newDoc = await getDoc(docRef)
  const data = newDoc.data()!
  return convertRatingDoc(docRef.id, data)
}

export const updateRating = async (
  ratingId: string,
  userId: string,
  input: UpdateRatingInput
): Promise<void> => {
  const db = getFirebaseDb()
  const ratingRef = doc(db, RATINGS_COLLECTION, ratingId)

  const ratingDoc = await getDoc(ratingRef)
  if (!ratingDoc.exists()) {
    throw new Error('Rating not found')
  }

  const data = ratingDoc.data()
  if (data.userId !== userId) {
    throw new Error('You can only update your own ratings')
  }

  await updateDoc(ratingRef, {
    ...input,
    status: 'pending' as RatingStatus,
  })
}

export const moderateRating = async (
  ratingId: string,
  adminId: string,
  input: ModerateRatingInput
): Promise<void> => {
  const db = getFirebaseDb()
  const ratingRef = doc(db, RATINGS_COLLECTION, ratingId)

  await updateDoc(ratingRef, {
    status: input.status,
    moderatedAt: serverTimestamp(),
    moderatedBy: adminId,
  })
}

export const deleteRating = async (
  ratingId: string,
  userId: string
): Promise<void> => {
  const db = getFirebaseDb()
  const ratingRef = doc(db, RATINGS_COLLECTION, ratingId)

  const ratingDoc = await getDoc(ratingRef)
  if (!ratingDoc.exists()) {
    throw new Error('Rating not found')
  }

  const data = ratingDoc.data()
  if (data.userId !== userId) {
    throw new Error('You can only delete your own ratings')
  }

  await deleteDoc(ratingRef)
}

export const getUserRatings = async (userId: string): Promise<Rating[]> => {
  const db = getFirebaseDb()
  const ratingsRef = collection(db, RATINGS_COLLECTION)
  const q = query(
    ratingsRef,
    where('userId', '==', userId),
    orderBy('createdAt', 'desc')
  )

  const snapshot = await getDocs(q)
  return snapshot.docs.map((doc) => convertRatingDoc(doc.id, doc.data()))
}

export const getUserRatingForSession = async (
  userId: string,
  sessionId: string
): Promise<Rating | null> => {
  const db = getFirebaseDb()
  const ratingsRef = collection(db, RATINGS_COLLECTION)
  const q = query(
    ratingsRef,
    where('userId', '==', userId),
    where('sessionId', '==', sessionId)
  )

  const snapshot = await getDocs(q)
  if (snapshot.empty) {
    return null
  }

  const doc = snapshot.docs[0]
  return convertRatingDoc(doc.id, doc.data())
}

export const getApprovedRatingsForSession = async (
  sessionId: string
): Promise<Rating[]> => {
  const db = getFirebaseDb()
  const ratingsRef = collection(db, RATINGS_COLLECTION)
  const q = query(
    ratingsRef,
    where('sessionId', '==', sessionId),
    where('status', '==', 'approved'),
    orderBy('createdAt', 'desc')
  )

  const snapshot = await getDocs(q)
  return snapshot.docs.map((doc) => convertRatingDoc(doc.id, doc.data()))
}

export const getApprovedRatingsForSessions = async (
  sessionIds: string[]
): Promise<Rating[]> => {
  if (sessionIds.length === 0) return []

  const db = getFirebaseDb()
  const ratingsRef = collection(db, RATINGS_COLLECTION)

  const batchSize = 10
  const batches: Rating[][] = []

  for (let i = 0; i < sessionIds.length; i += batchSize) {
    const batchIds = sessionIds.slice(i, i + batchSize)
    const q = query(
      ratingsRef,
      where('sessionId', 'in', batchIds),
      where('status', '==', 'approved')
    )

    const snapshot = await getDocs(q)
    batches.push(snapshot.docs.map((doc) => convertRatingDoc(doc.id, doc.data())))
  }

  return batches.flat().sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
}

export const getPendingRatings = async (): Promise<Rating[]> => {
  const db = getFirebaseDb()
  const ratingsRef = collection(db, RATINGS_COLLECTION)
  const q = query(
    ratingsRef,
    where('status', '==', 'pending'),
    orderBy('createdAt', 'asc')
  )

  const snapshot = await getDocs(q)
  return snapshot.docs.map((doc) => convertRatingDoc(doc.id, doc.data()))
}

export const getAllRatings = async (): Promise<Rating[]> => {
  const db = getFirebaseDb()
  const ratingsRef = collection(db, RATINGS_COLLECTION)
  const q = query(ratingsRef, orderBy('createdAt', 'desc'))

  const snapshot = await getDocs(q)
  return snapshot.docs.map((doc) => convertRatingDoc(doc.id, doc.data()))
}
