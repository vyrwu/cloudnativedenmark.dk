import React from "react"
import { useLocation } from "react-router-dom"
import SEOHead from "../components/seo-head"
import PageHeader from "../components/layout/page-header"
import VenueMap from "../components/content/venue-map"
import SavvaerketMap from "../images/savvaerket.svg"
import KlingenMap from "../images/klingen.svg"

const VenuePage: React.FC = () => {
  const location = useLocation()
  const maps = [
    {
      src: SavvaerketMap,
      alt: "Savvaerket Map",
    },
    {
      src: KlingenMap,
      alt: "Klingen Map",
    },
  ]

  return (
    <>
      <SEOHead title="Venue Plan" pathname={location.pathname} />
      <PageHeader
        title="Venue Plan"
        description="Find your way around the conference."
        variant="dark"
        size="large"
      />
      <VenueMap maps={maps} />
    </>
  )
}

export default VenuePage
