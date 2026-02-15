import React from "react"
import { Link } from "react-router-dom"
import Section from "../ui/section"
import SponsorGrid from "./sponsor-grid"
import Button from "../ui/button"

interface Sponsor {
  title: string
  url: string
  scale?: string
  logo: {
    publicURL: string
  }
}

interface SponsorsSectionProps {
  platinum: Sponsor[]
  gold: Sponsor[]
  bronze: Sponsor[]
  community: Sponsor[]
  partners: Sponsor[]
}

const SponsorsSection: React.FC<SponsorsSectionProps> = ({
  platinum,
  gold,
  bronze,
  community,
  partners,
}) => {
  return (
    <>
      <Section className="bg-gradient-to-b from-gray-50 via-white to-gray-50 px-0 sm:px-6 lg:px-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <h2
            className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4"
            id="sponsors"
          >
            Sponsors
          </h2>
          <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
            Cloud Native Denmark is made possible by the generous support of our
            sponsors.
          </p>
          <Link to="/become-a-sponsor">
            <Button variant="primary">Become a Sponsor</Button>
          </Link>
        </div>

        <SponsorGrid
          sponsors={platinum}
          title="Platinum"
          size="large"
          tier="platinum"
        />
        <SponsorGrid sponsors={gold} title="Gold" size="medium" tier="gold" />
        <SponsorGrid
          sponsors={bronze}
          title="Bronze"
          size="small"
          tier="bronze"
        />
        <SponsorGrid
          sponsors={community}
          title="Community"
          size="small"
          tier="community"
        />
        <SponsorGrid
          sponsors={partners}
          title="Partners & Media"
          size="small"
          tier="partners"
        />
      </Section>
    </>
  )
}

export default SponsorsSection
