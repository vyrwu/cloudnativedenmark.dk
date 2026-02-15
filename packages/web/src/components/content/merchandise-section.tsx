import React from "react"
import Section from "../ui/section"
import ExternalLink from "../ui/external-link"
import Button from "../ui/button"

const MerchandiseSection: React.FC = () => {
  return (
    <Section className="bg-white">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-12">
          Official Merchandise
        </h2>
        <div className="max-w-4xl mx-auto mb-12">
          <p className="text-lg lg:text-xl text-gray-800 leading-relaxed mb-6 text-center">
            Unable to attend? You can still get your hands on our exclusive
            conference merchandise! Order now and have a colleague pick it up
            for you at the event.
          </p>
          <p className="text-lg lg:text-xl text-gray-700 leading-relaxed text-center mb-4">
            For large orders, shipping is possible. Please contact us at:
          </p>
          <p className="text-center mb-4">
            <ExternalLink
              href="mailto:contact@cloudnativedenmark.dk"
              openInNewTab={false}
              className="text-lg font-medium text-background hover:text-background/80 underline"
            >
              contact@cloudnativedenmark.dk
            </ExternalLink>
          </p>
          <p className="text-lg lg:text-xl text-gray-700 leading-relaxed text-center">
            for more information.
          </p>
        </div>
        <ExternalLink href="https://cloudnativedenmark.ticketbutler.io/en/e/cloud-native-denmark/?extras_flow=true">
          <Button variant="primary">Order Merch</Button>
        </ExternalLink>
      </div>
    </Section>
  )
}

export default MerchandiseSection
