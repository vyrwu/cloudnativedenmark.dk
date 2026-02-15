// Mock Firebase
jest.mock('../firebase', () => ({
  getFirebaseDb: jest.fn(() => ({})),
}))

jest.mock('firebase/firestore', () => ({
  collection: jest.fn(),
  doc: jest.fn(),
  addDoc: jest.fn(),
  updateDoc: jest.fn(),
  deleteDoc: jest.fn(),
  getDoc: jest.fn(),
  getDocs: jest.fn(),
  query: jest.fn(),
  where: jest.fn(),
  orderBy: jest.fn(),
  serverTimestamp: jest.fn(() => ({ toDate: () => new Date() })),
  Timestamp: {
    fromDate: (date: Date) => ({ toDate: () => date }),
  },
}))

import {
  collection,
  addDoc,
  getDoc,
  getDocs,
  query,
  where,
} from 'firebase/firestore'

describe('ratings service', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('getUserRatings', () => {
    it('should query ratings by userId', async () => {
      const mockDocs = {
        docs: [
          {
            id: 'rating-1',
            data: () => ({
              sessionId: 'session-1',
              userId: 'user-1',
              stars: 5,
              comment: 'Great session!',
              status: 'approved',
              createdAt: { toDate: () => new Date() },
            }),
          },
        ],
      }
      ;(getDocs as jest.Mock).mockResolvedValue(mockDocs)
      ;(collection as jest.Mock).mockReturnValue({})
      ;(query as jest.Mock).mockReturnValue({})
      ;(where as jest.Mock).mockReturnValue({})

      const { getUserRatings } = require('../ratings')
      const ratings = await getUserRatings('user-1')

      expect(collection).toHaveBeenCalled()
      expect(query).toHaveBeenCalled()
      expect(ratings).toHaveLength(1)
      expect(ratings[0].stars).toBe(5)
    })
  })

  describe('createRating', () => {
    it('should create a new rating', async () => {
      const mockDocRef = { id: 'new-rating-id' }
      const mockDocData = {
        exists: () => true,
        data: () => ({
          sessionId: 'session-1',
          userId: 'user-1',
          stars: 4,
          comment: 'Good talk',
          status: 'pending',
          createdAt: { toDate: () => new Date() },
        }),
      }
      ;(addDoc as jest.Mock).mockResolvedValue(mockDocRef)
      ;(getDoc as jest.Mock).mockResolvedValue(mockDocData)
      ;(getDocs as jest.Mock).mockResolvedValue({ empty: true, docs: [] })
      ;(collection as jest.Mock).mockReturnValue({})
      ;(query as jest.Mock).mockReturnValue({})
      ;(where as jest.Mock).mockReturnValue({})

      const { createRating } = require('../ratings')
      const rating = await createRating('user-1', {
        sessionId: 'session-1',
        stars: 4,
        comment: 'Good talk',
      })

      expect(addDoc).toHaveBeenCalled()
      expect(rating.stars).toBe(4)
      expect(rating.status).toBe('pending')
    })

    it('should throw error if user already rated session', async () => {
      const mockExistingRating = {
        empty: false,
        docs: [
          {
            id: 'existing-rating',
            data: () => ({
              sessionId: 'session-1',
              userId: 'user-1',
              stars: 3,
              comment: 'Already rated',
              status: 'pending',
              createdAt: { toDate: () => new Date() },
            }),
          },
        ],
      }
      ;(getDocs as jest.Mock).mockResolvedValue(mockExistingRating)
      ;(collection as jest.Mock).mockReturnValue({})
      ;(query as jest.Mock).mockReturnValue({})
      ;(where as jest.Mock).mockReturnValue({})

      const { createRating } = require('../ratings')

      await expect(
        createRating('user-1', {
          sessionId: 'session-1',
          stars: 4,
          comment: 'New rating',
        })
      ).rejects.toThrow('You have already rated this session')
    })
  })
})
