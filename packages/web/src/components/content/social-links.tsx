import React from "react"
import LinkedIn from "../../images/linkedin-logo.inline.svg"
import Youtube from "../../images/youtube.inline.svg"
import Flickr from "../../images/flickr.inline.svg"

interface SocialLink {
  type: "linkedin" | "youtube" | "flickr" | "custom"
  url: string
  icon?: React.ComponentType
  label?: string
}

interface SocialLinksProps {
  links: SocialLink[]
  size?: "small" | "medium" | "large"
  spacing?: "tight" | "normal" | "wide"
}

const SocialLinks: React.FC<SocialLinksProps> = ({
  links,
  size = "medium",
  spacing = "normal",
}) => {
  const sizeClasses = {
    small: "h-6 w-6",
    medium: "h-9 w-9",
    large: "h-12 w-12",
  }

  const spacingClasses = {
    tight: "gap-x-1.5",
    normal: "gap-x-2.5",
    wide: "gap-x-4",
  }

  const iconComponents = {
    linkedin: LinkedIn,
    youtube: Youtube,
    flickr: Flickr,
  }

  const getIcon = (link: SocialLink) => {
    if (link.type === "custom" && link.icon) {
      return link.icon
    }
    return iconComponents[link.type as keyof typeof iconComponents]
  }

  return (
    <ul className={`flex ${spacingClasses[spacing]}`}>
      {links.map((link, index) => {
        const IconComponent = getIcon(link)
        if (!IconComponent) return null

        return (
          <li key={index} className={sizeClasses[size]}>
            <a
              className="flex items-center h-full w-full hover:opacity-80 transition-opacity"
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.label || `${link.type} link`}
            >
              <IconComponent />
            </a>
          </li>
        )
      })}
    </ul>
  )
}

export default SocialLinks
