import { useEffect, useState, useCallback } from 'react'
import type {
  Speaker,
  GridEntry,
  SessionList,
  Session,
} from '../types/sessionize'

export const MainSessionizeId = 'ri9gml9f'

const SESSIONIZE_BASE_URL = 'https://sessionize.com/api/v2'

export const useSessionizeSpeakers = (
  sessionId: string = MainSessionizeId
) => {
  const [speakers, setSpeakers] = useState<Speaker[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const fetchSpeakers = useCallback(async () => {
    if (!sessionId) return

    try {
      setLoading(true)
      setError(null)
      const response = await fetch(
        `${SESSIONIZE_BASE_URL}/${sessionId}/view/Speakers`
      )
      if (!response.ok) {
        throw new Error(`Failed to fetch speakers: ${response.status}`)
      }
      const data: Speaker[] = await response.json()
      setSpeakers(data.filter((speaker) => speaker.profilePicture !== null))
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error'))
    } finally {
      setLoading(false)
    }
  }, [sessionId])

  useEffect(() => {
    fetchSpeakers()
  }, [fetchSpeakers])

  return { speakers, loading, error, refetch: fetchSpeakers }
}

export const useSessionizeSchedule = (
  sessionId: string = MainSessionizeId
) => {
  const [grid, setGrid] = useState<GridEntry[]>([])
  const [speakers, setSpeakers] = useState<Speaker[]>([])
  const [schedule, setSchedule] = useState<GridEntry[]>([])
  const [sessions, setSessions] = useState<SessionList[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const fetchGrid = useCallback(async () => {
    const response = await fetch(
      `${SESSIONIZE_BASE_URL}/${sessionId}/view/Grid`
    )
    if (!response.ok) {
      throw new Error(`Failed to fetch grid: ${response.status}`)
    }
    const data = await response.json()
    setGrid(data)
  }, [sessionId])

  const fetchSpeakers = useCallback(async () => {
    const response = await fetch(
      `${SESSIONIZE_BASE_URL}/${sessionId}/view/Speakers`
    )
    if (!response.ok) {
      throw new Error(`Failed to fetch speakers: ${response.status}`)
    }
    const data = await response.json()
    setSpeakers(data)
  }, [sessionId])

  const fetchSessions = useCallback(async () => {
    const response = await fetch(
      `${SESSIONIZE_BASE_URL}/${sessionId}/view/Sessions`
    )
    if (!response.ok) {
      throw new Error(`Failed to fetch sessions: ${response.status}`)
    }
    const data = await response.json()
    setSessions(data)
  }, [sessionId])

  const fetchAll = useCallback(async () => {
    if (!sessionId) return

    try {
      setLoading(true)
      setError(null)
      await Promise.all([fetchGrid(), fetchSpeakers(), fetchSessions()])
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error'))
    } finally {
      setLoading(false)
    }
  }, [sessionId, fetchGrid, fetchSpeakers, fetchSessions])

  useEffect(() => {
    fetchAll()
  }, [fetchAll])

  useEffect(() => {
    if (grid.length === 0 || speakers.length === 0 || sessions.length === 0) {
      setSchedule([])
      return
    }

    const processedSchedule = grid.map((entry) => {
      const timeSlots = entry.timeSlots.map((timeSlot) => {
        const rooms = timeSlot.rooms.map((room) => {
          const sessionSpeakers = room.session.speakers.map((speaker) => {
            return speakers.find((s) => s.id === speaker.id)
          })
          room.session.speakers = sessionSpeakers.filter(
            (s): s is Speaker => s !== undefined
          )

          const session = sessions[0]?.sessions.find(
            (s) => room.session.id === s.id
          )
          if (session !== undefined) {
            const slides = session.questionAnswers.find((q) => q.id === 99194)
            if (slides !== undefined) {
              room.session.slideDeck = slides.answer
            }
            const rate = session.questionAnswers.find((q) => q.id === 112538)
            if (rate !== undefined) {
              room.session.rate = rate.answer
            }
            room.session.title = session.title
            room.session.description = session.description
            room.session.video = session.recordingUrl
          }

          return room
        })
        return {
          ...timeSlot,
          rooms,
        }
      })
      return {
        ...entry,
        timeSlots,
      }
    })
    setSchedule(processedSchedule)
  }, [grid, speakers, sessions])

  return { schedule, loading, error, refetch: fetchAll }
}

export const getAllSessions = (schedule: GridEntry[]): Session[] => {
  const sessions: Session[] = []
  for (const entry of schedule) {
    for (const timeSlot of entry.timeSlots) {
      for (const room of timeSlot.rooms) {
        if (room.session && !room.session.isServiceSession) {
          sessions.push(room.session)
        }
      }
    }
  }
  return sessions
}

export const getSessionById = (
  schedule: GridEntry[],
  sessionId: string
): Session | undefined => {
  for (const entry of schedule) {
    for (const timeSlot of entry.timeSlots) {
      for (const room of timeSlot.rooms) {
        if (room.session?.id === sessionId) {
          return room.session
        }
      }
    }
  }
  return undefined
}

export const getSpeakerSessionIds = (
  schedule: GridEntry[],
  sessionizeId: string
): string[] => {
  const sessionIds: string[] = []
  for (const entry of schedule) {
    for (const timeSlot of entry.timeSlots) {
      for (const room of timeSlot.rooms) {
        if (
          room.session?.speakers?.some((s) => s.id === sessionizeId)
        ) {
          sessionIds.push(room.session.id)
        }
      }
    }
  }
  return sessionIds
}
