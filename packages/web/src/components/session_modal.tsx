import * as React from "react"
import { type Session, type Speaker } from "../hooks/use-sessionize"
import {
  formatTimeDetailed,
  calculateSessionDuration,
} from "../utils/time-formatting"
import SpeakerList from "./speaker-list"
import Button from "./ui/button"

const SessionModal: React.FC<{
  session: Session
  onClose: () => void
  onSpeakerClick: (speaker: Speaker) => void
}> = ({ session, onClose, onSpeakerClick }) => {
  const duration = calculateSessionDuration(session.startsAt, session.endsAt)

  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose()
      }
    }

    document.body.style.overflow = "hidden"
    document.addEventListener("keydown", handleKeyDown)

    return () => {
      document.body.style.overflow = "unset"
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [onClose])

  return (
    <>
      <div
        className="fixed inset-0 bg-white z-40"
        style={{ opacity: 0.5 }}
        onClick={onClose}
      ></div>
      <div
        className="fixed inset-x-0 bottom-0 z-50 flex justify-center items-center p-4"
        style={{ top: "76px" }}
        onClick={onClose}
      >
        <div
          className="bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-full flex flex-col relative border border-gray-200"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="overflow-y-auto p-8 flex-grow">
            <h2 className="text-3xl font-bold text-primary mb-4">
              {session.title || session.name}
            </h2>

            <div className="flex flex-wrap gap-x-6 gap-y-2 text-gray-600 mb-6">
              <span>
                <strong>Time:</strong> {formatTimeDetailed(session.startsAt)} -{" "}
                {formatTimeDetailed(session.endsAt)} ({duration} min)
              </span>
              <span>
                <strong>Room:</strong> {session.room}
              </span>
            </div>

            {session.speakers && session.speakers.length > 0 && (
              <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-800 mb-3">
                  Speakers
                </h3>
                <SpeakerList
                  speakers={session.speakers}
                  onSpeakerClick={onSpeakerClick}
                  variant="inline"
                  size="medium"
                />
              </div>
            )}

            {session.description && (
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">
                  Description
                </h3>
                <div
                  className="text-gray-700 space-y-4"
                  dangerouslySetInnerHTML={{ __html: session.description }}
                />
              </div>
            )}
          </div>

          <div className="p-4 pb-8 text-center bg-white flex-shrink-0 relative flex justify-center gap-4">
            <div className="absolute bottom-full left-0 right-0 h-8 bg-gradient-to-t from-white to-transparent pointer-events-none"></div>
            <Button onClick={onClose} variant="primary">
              Back to Schedule
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}

export default SessionModal
