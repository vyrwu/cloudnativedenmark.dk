import React from "react"
import Section from "../ui/section"
import VideoEmbed from "./video-embed"
import ExternalLink from "../ui/external-link"

const LastYearEventSection: React.FC = () => {
  return (
    <Section className="bg-background-dark">
      <div>
        <h2 className="text-4xl lg:text-5xl font-bold text-center text-white mb-8">
          Recap last year's event
        </h2>
        <div className="mx-auto max-w-4xl text-center mb-12">
          <p className="text-lg lg:text-xl text-white">
            Last year, we hosted{" "}
            <ExternalLink
              href="https://2025.cloudnativedenmark.dk/"
              className="text-white underline decoration-dotted hover:text-gray-200"
            >
              Cloud Native Denmark 2025
            </ExternalLink>{" "}
            at the Savværket in Aarhus, bringing together over 450 attendees for
            two packed days of technical talks, community connection, and cloud
            native inspiration.
          </p>
          <p className="text-lg lg:text-xl text-white leading-relaxed mt-6">
            While we're not running under the official KCD banner this year due
            to a few logistical reasons, it's still the same event, organized by
            the same passionate community. Join us as we take things to the next
            level in 2026!
          </p>
        </div>
        <VideoEmbed
          src="https://www.youtube-nocookie.com/embed/BCYvLADtKjE"
          title="Cloud Native Denmark 2025 Aarhus Reel"
          maxWidth="4xl"
        />
      </div>
    </Section>
  )
}

export default LastYearEventSection
