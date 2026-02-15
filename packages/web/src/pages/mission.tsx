import React from "react"
import { useLocation } from "react-router-dom"
import SEOHead from "../components/seo-head"
import PageHeader from "../components/layout/page-header"
import Section from "../components/ui/section"

const MissionPage: React.FC = () => {
  const location = useLocation()

  return (
    <>
      <SEOHead title="Mission" pathname={location.pathname} />
      <PageHeader title="Mission" variant="default" size="medium" />
      <Section className="bg-white py-20">
        <div className="text-center">
          <p className="text-2xl text-primary leading-relaxed max-w-4xl">
            Cloud Native Denmark shares knowledge about Cloud Native
            Technologies and creates community networks in Denmark within this
            area. This may happen through events and profit from these will be
            donated to charity.
          </p>
        </div>
      </Section>
    </>
  )
}

export default MissionPage
