import React, { useState, useMemo } from "react"
import { type Speaker } from "../../hooks/use-sessionize"
import Section from "../ui/section"
import Button from "../ui/button"
import SpeakerList from "../speaker-list"

interface SpeakersSectionProps {
  speakers: Speaker[]
  onSpeakerClick: (speaker: Speaker) => void
  initialSpeakersToShow?: number
}

const SpeakersSection: React.FC<SpeakersSectionProps> = ({
  speakers,
  onSpeakerClick,
  initialSpeakersToShow = 4,
}) => {
  const [isExpanded, setIsExpanded] = useState(false)

  const sortedSpeakers = useMemo(() => {
    return [...speakers].sort((a, b) => {
      if (a.isTopSpeaker && !b.isTopSpeaker) return -1
      if (!a.isTopSpeaker && b.isTopSpeaker) return 1
      return a.fullName.localeCompare(b.fullName)
    })
  }, [speakers])

  const speakersToShow = isExpanded
    ? sortedSpeakers
    : sortedSpeakers.slice(0, initialSpeakersToShow)

  if (speakers.length === 0) {
    return null
  }

  return (
    <Section className="bg-white">
      <div className="text-center">
        <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-12">
          Speakers
        </h2>
        <SpeakerList
          speakers={speakersToShow}
          onSpeakerClick={onSpeakerClick}
          variant="grid"
          size="large"
        />
        {sortedSpeakers.length > initialSpeakersToShow && (
          <div className="mt-12">
            <Button onClick={() => setIsExpanded(!isExpanded)}>
              {isExpanded ? "Show Less" : "Show More Speakers"}
            </Button>
          </div>
        )}
      </div>
    </Section>
  )
}

export default SpeakersSection
