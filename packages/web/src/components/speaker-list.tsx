import React from "react"
import { type Speaker } from "../hooks/use-sessionize"

interface SpeakerListProps {
  speakers: Speaker[]
  onSpeakerClick?: (speaker: Speaker) => void
  variant?: "inline" | "grid"
  size?: "small" | "medium" | "large"
}

const SpeakerList: React.FC<SpeakerListProps> = ({
  speakers,
  onSpeakerClick,
  variant = "inline",
  size = "medium",
}) => {
  const sizeClasses = {
    small: "w-8 h-8",
    medium: "w-16 h-16",
    large: "w-32 h-32",
  }

  const containerClasses = {
    inline: "flex flex-wrap gap-4",
    grid: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-12 justify-items-center",
  }

  if (variant === "grid") {
    return (
      <div className={containerClasses.grid}>
        {speakers.map((speaker) => (
          <div
            key={speaker.id}
            className="flex flex-col items-center w-60 cursor-pointer hover:opacity-80 transition-opacity"
            onClick={() => onSpeakerClick?.(speaker)}
          >
            {speaker.profilePicture && (
              <img
                className={`${size === "large" ? "w-48 h-48" : sizeClasses[size]} rounded-full object-cover mx-auto shadow-lg`}
                src={speaker.profilePicture}
                alt={speaker.fullName}
              />
            )}
            <p
              className={`mt-4 font-bold ${size === "large" ? "text-xl text-gray-900" : "text-gray-700"}`}
            >
              {speaker.fullName}
            </p>
            {speaker.tagLine && (
              <p
                className={`mt-1 text-gray-600 ${size === "large" ? "text-base h-24" : "text-sm"}`}
              >
                {speaker.tagLine}
              </p>
            )}
          </div>
        ))}
      </div>
    )
  }

  // Inline variant
  return (
    <div className={containerClasses.inline}>
      {speakers.map((speaker) => (
        <div
          key={speaker.id}
          className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity"
          onClick={() => onSpeakerClick?.(speaker)}
        >
          <img
            src={speaker.profilePicture || "/default-avatar.png"}
            alt={speaker.fullName}
            className={`${sizeClasses[size]} rounded-full object-cover shadow-md`}
          />
          <span className="font-semibold text-gray-700">
            {speaker.fullName}
          </span>
        </div>
      ))}
    </div>
  )
}

export default SpeakerList
