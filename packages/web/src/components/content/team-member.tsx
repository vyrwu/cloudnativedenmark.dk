import React from "react"
import ExternalLink from "../ui/external-link"
import { teamImages } from "../../utils/team-images"

interface TeamMemberProps {
  name: string
  position: string
  image: string
  linkedin?: string
  variant?: "default" | "compact"
}

const TeamMember: React.FC<TeamMemberProps> = ({
  name,
  position,
  image,
  linkedin,
  variant = "default",
}) => {
  const containerClasses =
    variant === "compact"
      ? "flex-col w-48 md:w-full"
      : "flex-col w-60 md:w-full"

  return (
    <div className={containerClasses}>
      <img
        className={variant === "compact" ? "w-48" : "w-60"}
        src={teamImages[image] || `/images/${image}`}
        alt={name}
        loading="lazy"
      />
      <div className="text-center mt-4">
        <h3 className="text-xl font-bold text-primary mb-2">{name}</h3>
        {position && <p className="text-base text-gray-600 mb-4">{position}</p>}
        {linkedin && (
          <ExternalLink
            href={`https://linkedin.com/in/${linkedin}`}
            className="text-blue-600 hover:text-blue-800 underline"
          >
            LinkedIn
          </ExternalLink>
        )}
      </div>
    </div>
  )
}

export default TeamMember
