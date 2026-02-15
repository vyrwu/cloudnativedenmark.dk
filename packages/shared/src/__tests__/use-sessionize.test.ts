import { getAllSessions, getSessionById, getSpeakerSessionIds } from '../hooks/use-sessionize'
import type { GridEntry, Session, Speaker } from '../types/sessionize'

const mockSpeaker: Speaker = {
  id: 'speaker-1',
  name: 'John Doe',
  firstName: 'John',
  lastName: 'Doe',
  fullName: 'John Doe',
  bio: 'A great speaker',
  tagLine: 'Cloud Expert',
  profilePicture: 'https://example.com/photo.jpg',
  isTopSpeaker: true,
  sessions: [{ id: 1, name: 'Test Session' }],
}

const mockSession: Session = {
  id: 'session-1',
  name: 'Test Session',
  title: 'Introduction to Kubernetes',
  description: 'Learn about K8s',
  startsAt: '2024-06-15T10:00:00Z',
  endsAt: '2024-06-15T11:00:00Z',
  isServiceSession: false,
  isPlenumSession: false,
  speakers: [mockSpeaker],
  roomId: 1,
  room: 'Room A',
  questionAnswers: [],
  recordingUrl: '',
  slideDeck: '',
  video: '',
  rate: '',
}

const mockServiceSession: Session = {
  ...mockSession,
  id: 'service-1',
  name: 'Lunch Break',
  title: 'Lunch Break',
  isServiceSession: true,
  speakers: [],
}

const mockSchedule: GridEntry[] = [
  {
    date: '2024-06-15',
    rooms: [],
    timeSlots: [
      {
        slotStart: '10:00',
        rooms: [
          {
            id: 1,
            name: 'Room A',
            sessions: [],
            session: mockSession,
          },
        ],
      },
      {
        slotStart: '12:00',
        rooms: [
          {
            id: 1,
            name: 'Room A',
            sessions: [],
            session: mockServiceSession,
          },
        ],
      },
    ],
  },
]

describe('Sessionize utility functions', () => {
  describe('getAllSessions', () => {
    it('should return all non-service sessions from schedule', () => {
      const sessions = getAllSessions(mockSchedule)
      expect(sessions).toHaveLength(1)
      expect(sessions[0].id).toBe('session-1')
    })

    it('should filter out service sessions', () => {
      const sessions = getAllSessions(mockSchedule)
      const serviceSession = sessions.find((s) => s.id === 'service-1')
      expect(serviceSession).toBeUndefined()
    })

    it('should return empty array for empty schedule', () => {
      const sessions = getAllSessions([])
      expect(sessions).toHaveLength(0)
    })
  })

  describe('getSessionById', () => {
    it('should find session by ID', () => {
      const session = getSessionById(mockSchedule, 'session-1')
      expect(session).toBeDefined()
      expect(session?.title).toBe('Introduction to Kubernetes')
    })

    it('should return undefined for non-existent ID', () => {
      const session = getSessionById(mockSchedule, 'non-existent')
      expect(session).toBeUndefined()
    })

    it('should return undefined for empty schedule', () => {
      const session = getSessionById([], 'session-1')
      expect(session).toBeUndefined()
    })
  })

  describe('getSpeakerSessionIds', () => {
    it('should return session IDs for speaker', () => {
      const sessionIds = getSpeakerSessionIds(mockSchedule, 'speaker-1')
      expect(sessionIds).toContain('session-1')
    })

    it('should return empty array for non-existent speaker', () => {
      const sessionIds = getSpeakerSessionIds(mockSchedule, 'non-existent')
      expect(sessionIds).toHaveLength(0)
    })

    it('should handle empty schedule', () => {
      const sessionIds = getSpeakerSessionIds([], 'speaker-1')
      expect(sessionIds).toHaveLength(0)
    })
  })
})
