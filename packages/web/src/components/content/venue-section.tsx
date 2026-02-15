import React from "react"
import Section from "../ui/section"
import { siteConfig } from "../../config/site"

const VenueSection: React.FC = () => {
  return (
    <Section className="bg-white">
      <div className="text-center">
        <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-12">
          Venue
        </h2>
        {siteConfig.venueAnnouncementMode ? (
          <div className="flex flex-col items-center justify-center gap-8">
            <p className="text-3xl lg:text-3xl italic text-gray-900">
              To be announced. Stay tuned!{" "}
              <span className="not-italic">🔔</span>
            </p>
          </div>
        ) : (
          <>
            <div className="flex flex-col lg:flex-row items-center justify-evenly gap-12">
              <div className="flex flex-col items-center">
                <img
                  src="/images/scandic-logo.png"
                  alt="Scandic Copenhagen"
                  className="w-32 h-32 mb-4 object-contain"
                  loading="lazy"
                />
                <p className="text-xl font-semibold text-gray-800 mb-2">
                  Scandic Copenhagen
                </p>
                <p className="text-lg text-gray-600">Vester Søgade 6</p>
                <p className="text-lg text-gray-600">1602 København</p>
              </div>
              <div className="w-full lg:w-1/2 h-64 bg-gray-200 rounded-lg overflow-hidden">
                <iframe
                  className="border-0"
                  src="https://maps.google.com/maps?q=Scandic+Copenhagen,Vester+Søgade+6,1602+København,Denmark&t=&z=15&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="100%"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Scandic Copenhagen Location"
                />
              </div>
            </div>
            {/*            <div className="mt-12">
              <Link to="/venue-plan">
                <Button>See Venue Plan</Button>
              </Link>
            </div>*/}
          </>
        )}
      </div>
    </Section>
  )
}

export default VenueSection
