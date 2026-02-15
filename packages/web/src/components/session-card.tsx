import React from "react"
import { type Session } from "../hooks/use-sessionize"

interface SessionCardProps {
  session: Session
  onClick?: () => void
  variant?: "schedule" | "archive"
}

const SessionCard: React.FC<SessionCardProps> = ({
  session,
  onClick,
  variant = "schedule",
}) => {
  if (!session || !session.id) {
    return null
  }

  if (session.isServiceSession) {
    return (
      <div className="bg-gray-100 p-4 h-full flex items-center justify-center text-center rounded-lg border border-gray-300">
        <h3 className="font-bold text-lg text-gray-700">
          {session.title || session.name}
        </h3>
      </div>
    )
  }

  if (variant === "archive") {
    return (
      <div className="p-6 border border-gray-200 rounded-lg text-left bg-white hover:shadow-md transition-shadow duration-200">
        <h3 className="text-2xl font-bold">{session.title}</h3>
        {session.speakers && session.speakers.length > 0 && (
          <div className="flex flex-wrap items-center gap-4 mt-3">
            {session.speakers.map((speaker) => (
              <div key={speaker.id} className="flex items-center gap-2">
                <img
                  src={speaker.profilePicture || "/default-avatar.png"}
                  alt={speaker.fullName}
                  className="w-8 h-8 rounded-full object-cover"
                />
                <p className="text-md font-semibold">{speaker.fullName}</p>
              </div>
            ))}
          </div>
        )}
        <p className="mt-4 text-gray-700">{session.description}</p>
      </div>
    )
  }

  // Schedule variant (default)
  return (
    <div
      className="bg-blue-50 hover:bg-blue-100 p-3 h-full flex flex-col justify-between rounded-lg shadow-sm border border-blue-200 transition-colors duration-200 cursor-pointer"
      onClick={onClick}
    >
      <div>
        <h3 className="font-bold text-md text-primary">
          {session.title || session.name}
        </h3>
        {session.speakers && session.speakers.length > 0 && (
          <p className="text-sm text-gray-600 mt-2">
            <em>{session.speakers.map((s) => s.fullName).join(", ")}</em>
          </p>
        )}
      </div>
    </div>
  )
}

export default SessionCard
