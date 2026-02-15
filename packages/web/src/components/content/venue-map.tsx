import React from "react"
import Section from "../ui/section"

interface VenueMapProps {
  maps: {
    src: string
    alt: string
    title?: string
  }[]
  title?: string
  description?: string
}

const VenueMap: React.FC<VenueMapProps> = ({
  maps,
  title = "Venue Plan",
  description,
}) => {
  return (
    <Section className="bg-white lg:py-12">
      <div className="text-center">
        {title && (
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-8">
            {title}
          </h2>
        )}
        {description && (
          <p className="text-lg text-gray-700 mb-12 max-w-3xl mx-auto">
            {description}
          </p>
        )}
        <div className="space-y-12">
          {maps.map((map, index) => (
            <div key={index} className="w-full">
              {map.title && (
                <h3 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
                  {map.title}
                </h3>
              )}
              <div className="flex justify-center">
                <img
                  src={map.src}
                  alt={map.alt}
                  className="w-full h-auto max-w-4xl rounded-lg shadow-lg"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  )
}

export default VenueMap
