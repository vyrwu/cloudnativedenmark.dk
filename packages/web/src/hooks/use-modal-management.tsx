import { useState, useEffect } from "react"
import { type Session, type Speaker, type GridEntry } from "./use-sessionize"

interface UseModalManagementProps {
  schedule?: GridEntry[]
  onSessionSelect?: (session: Session) => void
}

export const useModalManagement = ({
  schedule = [],
  onSessionSelect,
}: UseModalManagementProps = {}) => {
  const [selectedSession, setSelectedSession] = useState<Session | null>(null)
  const [selectedSpeaker, setSelectedSpeaker] = useState<Speaker | null>(null)

  const handleSessionClick = (session: Session) => {
    if (session && session.id) {
      setSelectedSession(session)
      onSessionSelect?.(session)
      if (typeof window !== "undefined") {
        window.history.pushState(null, "", `#${session.id}`)
      }
    }
  }

  const handleSpeakerClick = (speaker: Speaker) => {
    setSelectedSpeaker(speaker)
  }

  const handleCloseSessionModal = () => {
    setSelectedSession(null)
    if (typeof window !== "undefined") {
      window.history.pushState(
        null,
        "",
        window.location.pathname + window.location.search
      )
    }
  }

  const handleCloseSpeakerModal = () => {
    setSelectedSpeaker(null)
  }

  // Handle initial session selection from URL hash
  useEffect(() => {
    if (schedule.length > 0 && typeof window !== "undefined") {
      const hash = window.location.hash
      if (hash) {
        const sessionId = hash.substring(1)
        if (sessionId) {
          const allSessions = schedule.flatMap(
            (day) =>
              day.timeSlots?.flatMap((ts) => ts.rooms?.map((r) => r.session)) ||
              []
          )
          const session = allSessions.find((s) => s?.id === sessionId)
          if (session) {
            setSelectedSession(session)
          }
        }
      }
    }
  }, [schedule])

  return {
    selectedSession,
    selectedSpeaker,
    handleSessionClick,
    handleSpeakerClick,
    handleCloseSessionModal,
    handleCloseSpeakerModal,
  }
}
