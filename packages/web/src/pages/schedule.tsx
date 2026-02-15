import React from "react"
import { useLocation } from "react-router-dom"
import SEOHead from "../components/seo-head"
import { useSessionizeSchedule } from "../hooks/use-sessionize"
import { useModalManagement } from "../hooks/use-modal-management"
import { formatDate, formatTime } from "../utils/time-formatting"
import SessionCard from "../components/session-card"
import SessionModal from "../components/session_modal"
import SpeakerModal from "../components/speaker_modal"

const SchedulePage: React.FC = () => {
  const location = useLocation()
  const { schedule } = useSessionizeSchedule()
  const {
    selectedSession,
    selectedSpeaker,
    handleSessionClick,
    handleSpeakerClick,
    handleCloseSessionModal,
    handleCloseSpeakerModal,
  } = useModalManagement({ schedule })

  return (
    <>
      <SEOHead title="Schedule" pathname={location.pathname} />
      <section className="pt-24 pb-12 bg-background-dark">
        <div className="mx-auto max-w-6xl text-white text-center px-6">
          <h1 className="text-6xl font-bold">Schedule</h1>
          <p className="text-2xl font-light mt-8 leading-normal">
            Plan your conference experience. Here’s the full schedule of talks
            and events.
          </p>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {schedule.length === 0 && (
            <div className="text-center">
              <p className="text-xl text-gray-600">Loading schedule...</p>
            </div>
          )}

          {schedule.length > 0 && (
            <div className="flex justify-center space-x-4">
              {schedule.map((day) => (
                <button
                  key={day.date}
                  onClick={() => {
                    const element = document.getElementById(day.date)
                    if (element) {
                      const elementPosition =
                        element.getBoundingClientRect().top
                      const offsetPosition =
                        elementPosition + window.pageYOffset - 76

                      window.scrollTo({
                        top: offsetPosition,
                        behavior: "smooth",
                      })
                    }
                  }}
                  className="bg-background hover:bg-hover text-white text-l font-semibold py-3 px-6 rounded-full transition-colors duration-200"
                >
                  {formatDate(day.date)}
                </button>
              ))}
            </div>
          )}

          {schedule.map((day) => {
            const renderedSessions = new Map<string, Set<number>>()
            return (
              <div key={day.date} id={day.date} className="mb-16">
                <h2 className="text-3xl font-bold text-gray-900 my-8 text-center">
                  {formatDate(day.date)}
                </h2>
                <div
                  className="hidden md:grid gap-px bg-gray-200 border border-gray-300 rounded-lg overflow-hidden"
                  style={{
                    gridTemplateColumns: `minmax(80px, 0.5fr) repeat(${day.rooms.length}, 1fr)`,
                  }}
                >
                  {/* Header Row */}
                  <div className="bg-gray-100 p-4 font-bold text-center">
                    Time
                  </div>
                  {day.rooms.map((room) => (
                    <div
                      key={room.id}
                      className="bg-gray-100 p-4 font-bold text-center"
                    >
                      {room.name}
                    </div>
                  ))}

                  {/* Time Slots */}
                  {day.timeSlots.flatMap((timeSlot, timeSlotIndex) => {
                    const plenumSession =
                      timeSlot.rooms.length === 1 &&
                      timeSlot.rooms[0].session.isPlenumSession
                        ? timeSlot.rooms[0].session
                        : null

                    if (plenumSession) {
                      const concurrent =
                        renderedSessions.get(timeSlot.slotStart)?.size || 0
                      return [
                        <div
                          key={`${timeSlot.slotStart}-time`}
                          className="bg-white p-4 text-center font-semibold flex items-center justify-center"
                        >
                          {formatTime(timeSlot.slotStart)}
                        </div>,
                        <div
                          key={`${timeSlot.slotStart}-session`}
                          className="bg-white p-1"
                          style={{
                            gridColumn: `span ${day.rooms.length - concurrent}`,
                          }}
                        >
                          <SessionCard
                            session={plenumSession}
                            onClick={() => handleSessionClick(plenumSession)}
                            variant="schedule"
                          />
                        </div>,
                      ]
                    }

                    const timeCell = (
                      <div
                        key={`${timeSlot.slotStart}-time`}
                        className="bg-white p-4 text-center font-semibold flex items-center justify-center"
                      >
                        {formatTime(timeSlot.slotStart)}
                      </div>
                    )

                    const sessionCells = day.rooms.flatMap((room) => {
                      // This room already has a continued session for the timeslot
                      if (
                        renderedSessions.get(timeSlot.slotStart)?.has(room.id)
                      ) {
                        return []
                      }

                      // Nothing happens in the room at this time
                      const sessionForRoom = timeSlot.rooms.find(
                        (r) => r.id === room.id
                      )?.session
                      if (!sessionForRoom || !sessionForRoom.id) {
                        return [
                          <div
                            key={`${timeSlot.slotStart}-${room.id}`}
                            className="bg-white p-1"
                          />,
                        ]
                      }

                      // A session is schedules for this timeslot
                      let rowSpan = 1
                      const ends = new Date(sessionForRoom.endsAt)
                      for (
                        let i = timeSlotIndex + 1;
                        i < day.timeSlots.length;
                        i++
                      ) {
                        const slotStart = new Date(
                          day.timeSlots[i].rooms[0].session.startsAt
                        )
                        if (slotStart < ends) {
                          rowSpan++
                          if (
                            !renderedSessions.has(day.timeSlots[i].slotStart)
                          ) {
                            renderedSessions.set(
                              day.timeSlots[i].slotStart,
                              new Set()
                            )
                          }
                          renderedSessions
                            .get(day.timeSlots[i].slotStart)
                            ?.add(room.id)
                        } else {
                          break
                        }
                      }
                      return [
                        <div
                          key={`${timeSlot.slotStart}-${room.id}`}
                          className="bg-white p-1"
                          style={{ gridRow: `span ${rowSpan}` }}
                        >
                          <SessionCard
                            session={sessionForRoom}
                            onClick={() => handleSessionClick(sessionForRoom)}
                            variant="schedule"
                          />
                        </div>,
                      ]
                    })

                    return [timeCell, ...sessionCells]
                  })}
                </div>
                <div className="md:hidden">
                  {day.timeSlots.map((timeSlot) => (
                    <div key={timeSlot.slotStart} className="mb-8">
                      <h3 className="text-xl font-semibold text-gray-800 mb-4 bg-gray-100 p-3 rounded-t-lg border-b border-gray-200">
                        {formatTime(timeSlot.slotStart)}
                      </h3>
                      <div className="space-y-4">
                        {timeSlot.rooms.map((room) => (
                          <div
                            key={room.id}
                            className="bg-white p-1 rounded-lg shadow-sm border border-gray-300"
                          >
                            <div className="p-3">
                              <p className="font-bold text-gray-600">
                                {room.name}
                              </p>
                            </div>
                            <SessionCard
                              session={room.session}
                              onClick={() => handleSessionClick(room.session)}
                              variant="schedule"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </section>
      {selectedSession && (
        <SessionModal
          session={selectedSession}
          onClose={handleCloseSessionModal}
          onSpeakerClick={handleSpeakerClick}
        />
      )}
      {selectedSpeaker && (
        <SpeakerModal
          speaker={selectedSpeaker}
          onClose={handleCloseSpeakerModal}
        />
      )}
    </>
  )
}

export default SchedulePage
