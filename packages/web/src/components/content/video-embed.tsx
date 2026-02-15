import React from "react"

interface VideoEmbedProps {
  src: string
  title: string
  aspectRatio?: "16:9" | "4:3"
  maxWidth?: string
  className?: string
}

const VideoEmbed: React.FC<VideoEmbedProps> = ({
  src,
  title,
  aspectRatio = "16:9",
  maxWidth = "4xl",
  className = "",
}) => {
  const paddingClasses = {
    "16:9": "56.25%",
    "4:3": "75%",
  }

  const maxWidthClasses: Record<string, string> = {
    "2xl": "max-w-2xl",
    "3xl": "max-w-3xl",
    "4xl": "max-w-4xl",
    "5xl": "max-w-5xl",
    "6xl": "max-w-6xl",
    full: "max-w-full",
  }

  return (
    <div className={`flex justify-center ${className}`}>
      <div className={`w-full ${maxWidthClasses[maxWidth] || "max-w-4xl"}`}>
        <div
          className="relative w-full"
          style={{ paddingBottom: paddingClasses[aspectRatio] }}
        >
          <iframe
            className="absolute top-0 left-0 w-full h-full rounded-lg shadow-lg border-0"
            src={src}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  )
}

export default VideoEmbed
