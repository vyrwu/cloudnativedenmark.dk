import React, { useState, useMemo } from "react"
import { useLocation } from "react-router-dom"
import SEOHead from "../components/seo-head"
import { useSessionizeSchedule } from "../hooks/use-sessionize"
import { useModalManagement } from "../hooks/use-modal-management"
import Fuse from "fuse.js"
import ArchiveSession from "../components/archive-session"
import SpeakerModal from "../components/speaker_modal"

const sessionizeEvents = {
  "2025": { id: "ri9gml9f", name: "CND 2025 Aarhus", location: "Aarhus" },
}

const ArchivePage: React.FC = () => {
  const location = useLocation()
  const selectedYear = "2025"
  const { schedule } = useSessionizeSchedule(sessionizeEvents[selectedYear].id)
  const [searchQuery, setSearchQuery] = useState("")
  const { selectedSpeaker, handleSpeakerClick, handleCloseSpeakerModal } =
    useModalManagement()

  const sessions = useMemo(() => {
    if (!schedule.length) return []

    return schedule
      .flatMap((day) => day.timeSlots)
      .flatMap((slot) => slot.rooms)
      .map((room) => ({
        ...room.session,
        room: room.name,
      }))
      .filter(
        (session) =>
          !session.isServiceSession &&
          session.speakers &&
          session.speakers.length > 0
      )
  }, [schedule])

  const archivedSessions = useMemo(() => {
    if (!sessions.length) return []
    const eventInfo = sessionizeEvents[selectedYear]
    return sessions.map((session) => {
      return {
        ...session,
        event: eventInfo.name,
        year: selectedYear,
        location: eventInfo.location,
      }
    })
  }, [sessions, selectedYear])

  const fuse = useMemo(
    () =>
      new Fuse(archivedSessions, {
        keys: ["title", "description", "speakers.fullName"],
        threshold: 0.3,
        ignoreLocation: true,
      }),
    [archivedSessions]
  )

  const filteredSessions = useMemo(() => {
    if (!searchQuery) {
      return archivedSessions
    }
    return fuse.search(searchQuery).map((result) => result.item)
  }, [searchQuery, archivedSessions, fuse])

  return (
    <>
      <SEOHead title="Talk Archive" pathname={location.pathname} />
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-12 text-center">
            Talk Archive
          </h2>
          <div className="mb-8 max-w-lg mx-auto">
            <input
              type="text"
              placeholder="Search talks by title, speaker, description..."
              className="w-full p-4 border border-gray-300 rounded-lg"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="space-y-8">
            {!archivedSessions.length ? (
              <p className="text-center">Loading talks...</p>
            ) : (
              filteredSessions.map((session) => (
                <ArchiveSession
                  key={session.id}
                  session={session}
                  onSpeakerClick={handleSpeakerClick}
                />
              ))
            )}
          </div>
        </div>
      </section>
      {selectedSpeaker && (
        <SpeakerModal
          speaker={selectedSpeaker}
          onClose={handleCloseSpeakerModal}
        />
      )}
    </>
  )
}

export default ArchivePage
