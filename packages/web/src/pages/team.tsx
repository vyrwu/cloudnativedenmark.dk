import React from "react"
import { useLocation } from "react-router-dom"
import SEOHead from "../components/seo-head"
import PageHeader from "../components/layout/page-header"
import Section from "../components/ui/section"
import TeamGrid from "../components/content/team-grid"
import { getTeamMembers } from "../utils/data-loader"

const TeamPage: React.FC = () => {
  const location = useLocation()
  const teamMembers = getTeamMembers()

  return (
    <>
      <SEOHead title="Team" pathname={location.pathname} />
      <PageHeader
        title="Team"
        description="Cloud Native Denmark is organized by a dedicated committee who are passionate about bringing people together and fostering a sense of community. Our goal is to provide a platform for like-minded individuals from all levels and backgrounds that is dedicated to learning, growth, and diversity."
        variant="dark"
        size="large"
      />
      <Section className="bg-white py-20 pb-40">
        <div className="max-w-7xl mx-auto">
          <TeamGrid members={teamMembers} />
        </div>
      </Section>
    </>
  )
}

export default TeamPage
