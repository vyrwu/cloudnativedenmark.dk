import * as React from "react"
import { type Speaker } from "../hooks/use-sessionize"
import Button from "./ui/button"

const SpeakerModal: React.FC<{ speaker: Speaker; onClose: () => void }> = ({
  speaker,
  onClose,
}) => {
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
        className="fixed inset-0 bg-white z-50"
        style={{ opacity: 0.5 }}
        onClick={onClose}
      ></div>
      <div
        className="fixed inset-x-0 bottom-0 z-50 flex justify-center items-center p-4"
        style={{ top: "76px" }}
        onClick={onClose}
      >
        <div
          className="bg-white rounded-lg border border-gray-200 shadow-2xl max-w-2xl w-full max-h-full flex flex-col relative"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="overflow-y-auto p-8 flex-grow">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-6">
              <img
                src={speaker.profilePicture || "/default-avatar.png"}
                alt={speaker.fullName}
                className="w-32 h-32 rounded-full object-cover shadow-md flex-shrink-0"
              />
              <div className="text-center sm:text-left">
                <h2 className="text-3xl font-bold text-primary mb-2">
                  {speaker.fullName}
                </h2>
                <p className="text-lg text-gray-600">{speaker.tagLine}</p>
              </div>
            </div>

            {speaker.bio && (
              <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-800 mb-3">About</h3>
                <div
                  className="text-gray-700 space-y-4"
                  dangerouslySetInnerHTML={{ __html: speaker.bio }}
                />
              </div>
            )}

            {speaker.sessions && speaker.sessions.length > 0 && (
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">
                  Sessions
                </h3>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  {speaker.sessions.map((session) => (
                    <li key={session.id}>{session.name}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <div className="p-4 pb-8 text-center bg-white flex-shrink-0 relative">
            <div className="absolute bottom-full left-0 right-0 h-8 bg-gradient-to-t from-white to-transparent pointer-events-none"></div>
            <Button onClick={onClose} variant="primary">
              Back
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}

export default SpeakerModal
