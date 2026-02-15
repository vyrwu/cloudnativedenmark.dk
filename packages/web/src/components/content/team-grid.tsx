import React from "react"
import TeamMember from "./team-member"

interface TeamMemberData {
  name: string
  position: string
  image: string
  linkedin?: string
}

interface TeamGridProps {
  members: TeamMemberData[]
  variant?: "default" | "compact"
  columns?: {
    mobile?: number
    tablet?: number
    desktop?: number
  }
}

const TeamGrid: React.FC<TeamGridProps> = ({
  members,
  variant = "default",
  columns = { mobile: 1, tablet: 2, desktop: 4 },
}) => {
  const gridClasses = `text-primary grid grid-cols-${columns.mobile} md:grid-cols-${columns.tablet} lg:grid-cols-${columns.desktop} gap-8 justify-items-center`

  return (
    <div className={gridClasses}>
      {members.map((member, index) => (
        <TeamMember
          key={`${member.name}-${index}`}
          name={member.name}
          position={member.position}
          image={member.image}
          linkedin={member.linkedin}
          variant={variant}
        />
      ))}
    </div>
  )
}

export default TeamGrid
