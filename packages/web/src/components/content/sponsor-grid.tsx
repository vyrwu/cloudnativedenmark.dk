import React from "react"
import ExternalLink from "../ui/external-link"

interface Sponsor {
  title: string
  url: string
  scale?: string
  logo: {
    publicURL: string
  }
}

type TierType = "platinum" | "gold" | "bronze" | "community" | "partners"

interface SponsorGridProps {
  sponsors: Sponsor[]
  title: string
  size?: "large" | "medium" | "small"
  tier?: TierType
}

const SponsorGrid: React.FC<SponsorGridProps> = ({
  sponsors,
  title,
  size = "medium",
  tier = "community",
}) => {
  if (!sponsors || sponsors.length === 0) {
    return null
  }

  const sizeConfig = {
    large: {
      container: "mt-16 mb-20",
      item: "flex items-center justify-center min-w-[380px] min-h-[130px] sm:min-w-[320px] sm:min-h-[110px] xs:min-w-fit xs:max-w-full",
      image: "h-auto max-h-[140px] xs:max-w-full max-w-[340px] sm:min-w-[70%]",
    },
    medium: {
      container: "mt-14 mb-18",
      item: "flex items-center justify-center min-w-[320px] min-h-[120px] sm:min-w-[280px] sm:min-h-[100px] xs:min-w-fit xs:max-w-full",
      image: "h-auto max-h-[120px] xs:max-w-full max-w-[280px] sm:min-w-[70%]",
    },
    small: {
      container: "mt-12 mb-16",
      item: "flex items-center justify-center min-w-[200px] min-h-[80px] sm:min-w-[180px] sm:min-h-[70px] xs:min-w-fit xs:max-w-full",
      image: "h-auto max-h-[80px] xs:max-w-full max-w-[180px] sm:min-w-[70%]",
    },
  }

  const tierConfig = {
    platinum: {
      line: "from-transparent via-slate-400 to-transparent",
      text: "text-slate-500",
    },
    gold: {
      line: "from-transparent via-amber-400 to-transparent",
      text: "text-amber-600",
    },
    bronze: {
      line: "from-transparent via-orange-700 to-transparent",
      text: "text-orange-700",
    },
    community: {
      line: "from-transparent via-pink-600 to-transparent",
      text: "text-pink-600",
    },
    partners: {
      line: "from-transparent via-gray-300 to-transparent",
      text: "text-gray-500",
    },
  }

  const {
    container: containerClasses,
    item: itemClasses,
    image: imageClasses,
  } = sizeConfig[size]
  const { line: lineGradient, text: textColor } = tierConfig[tier]

  return (
    <div className={containerClasses}>
      <div className="flex items-center justify-center gap-4 mb-10">
        <div
          className={`h-px bg-gradient-to-r ${lineGradient} flex-1 max-w-24`}
        ></div>
        <p
          className={`text-center text-lg font-semibold uppercase tracking-widest ${textColor}`}
        >
          {title}
        </p>
        <div
          className={`h-px bg-gradient-to-l ${lineGradient} flex-1 max-w-24`}
        ></div>
      </div>
      <div className="flex flex-wrap justify-center gap-x-8 xl:gap-y-6">
        {sponsors.map((sponsor, index) => (
          <div key={`${sponsor.title}-${index}`} className={itemClasses}>
            <ExternalLink
              href={sponsor.url}
              className="flex h-full w-fit items-center justify-center hover:opacity-80 transition-opacity"
            >
              {sponsor.logo && (
                <img
                  className={imageClasses}
                  src={sponsor.logo.publicURL}
                  width={sponsor.scale}
                  alt={sponsor.title}
                />
              )}
            </ExternalLink>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SponsorGrid
