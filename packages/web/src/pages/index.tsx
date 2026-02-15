import React from "react"
import { useLocation } from "react-router-dom"
import SEOHead from "../components/seo-head"
import { useModalManagement } from "../hooks/use-modal-management"
import { useSponsors } from "../hooks/use-sponsors"
import HeroSection from "../components/layout/hero-section"
import ConferenceInfo from "../components/content/conference-info"
import TicketRatesSection from "../components/content/ticket-rates-section"
import VenueSection from "../components/content/venue-section"
import LastYearEventSection from "../components/content/last-year-event-section"
import MissionSection from "../components/content/mission-section"
import SponsorsSection from "../components/content/sponsors-section"
import SpeakerModal from "../components/speaker_modal"
import Logo from "../images/logo.svg"

const IndexPage: React.FC = () => {
  const location = useLocation()
  const { sponsors } = useSponsors()
  const { selectedSpeaker, handleCloseSpeakerModal } = useModalManagement()

  const scrollToTicketRates = () => {
    const element = document.getElementById("ticket-rates")
    if (element) {
      const headerOffset = 70
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.scrollY - headerOffset
      window.scrollTo({ top: offsetPosition, behavior: "smooth" })
    }
  }

  // Hero background SVG element
  const heroBackgroundSvg = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
      viewBox="-80.724 316.355 927.667 175.986"
      preserveAspectRatio="xMidYMid slice"
      width="927.667px"
      height="175.986px"
    >
      <defs></defs>
      <g clipPath="url(#wave1)">
        <path
          fill="#d7dff4"
          d="M 348.113 567.704 L -1048.965 568.625 L -1048.965 464.805 C -583.18 717.992 -117.672 142.594 348.113 395.777 L 348.113 567.704 Z"
        />
      </g>
      <g clipPath="url(#wave2)">
        <path
          fill="#0026ce"
          d="M 548.566 568.003 L -637.617 568.186 L -637.617 477.156 C -242.145 692.121 153.094 203.582 548.566 418.551 L 548.566 568.003 Z"
        />
      </g>
      <g clipPath="url(#wave3)">
        <path
          fill="#11347e"
          d="M 1019.449219 568.15625 L -151.777344 568.15625 L -151.777344 430.761719 C 238.710938 642.867188 628.964844 160.832031 1019.449219 372.9375 Z"
        />
      </g>
    </svg>
  )

  return (
    <>
      <SEOHead title="Cloud Native Denmark 2026" pathname={location.pathname} />
      <HeroSection
        logo={{
          src: Logo,
          alt: "Cloud Native Denmark",
          width: 300,
        }}
        title={
          <>
            <span className="font-medium tracking-wider">CLOUD NATIVE</span>
            <br />
            <span className="font-extrabold">DENMARK</span>
          </>
        }
        subtitle="November 19-20, 2026 • Scandic Copenhagen"
        actions={[
          {
            text: "Ticket Rates",
            onClick: scrollToTicketRates,
            variant: "primary",
          },
          {
            text: "Submit a talk",
            href: "http://cloudnativedenmark.dk/cfp",
            isExternal: true,
            variant: "primary",
          },
          {
            text: "Merch",
            href: "https://cloudnativedenmark.ticketbutler.io/en/e/cloud-native-denmark-26/?extras_flow=true",
            isExternal: true,
            variant: "secondary",
          },
        ]}
        backgroundElement={heroBackgroundSvg}
      />

      <ConferenceInfo
        title=""
        description="Join us in Copenhagen as the Kubernetes and Cloud Native community comes together for a technical conference packed with inspiring talks, hands-on insights, and great opportunities to connect and grow."
        variant="dark"
      />

      <TicketRatesSection id="ticket-rates" />

      <VenueSection />

      <LastYearEventSection />

      <MissionSection
        description="Through our joint passion for Cloud Native Technologies, we help facilitate the vibrant community meetups and conferences around Denmark, that aim primarily at sharing knowledge and creating deep and diverse professional networks. We use generated profits to make generous donations to trusted charities."
        partnerDescription="Over the last three years, we have proudly made cumulative donations valued over 840,000 DKK to charity. Help us reach well beyond 1,000,000 DKK in 2026! ⭐ We welcome inquiries from good cause organizations - particularly those supporting technological education and enablement!"
      />

      {/*<SpeakersSection
        speakers={speakers}
        onSpeakerClick={handleSpeakerClick}
        initialSpeakersToShow={4}
      />*/}

      {/*<MerchandiseSection />*/}

      <SponsorsSection
        platinum={sponsors.platinum}
        gold={sponsors.gold}
        bronze={sponsors.bronze}
        community={sponsors.community}
        partners={sponsors.partners}
      />

      {selectedSpeaker && (
        <SpeakerModal
          speaker={selectedSpeaker}
          onClose={handleCloseSpeakerModal}
        />
      )}
    </>
  )
}

export default IndexPage
