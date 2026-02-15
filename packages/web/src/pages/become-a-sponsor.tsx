import React from "react"
import { useLocation } from "react-router-dom"
import SEOHead from "../components/seo-head"
import Section from "../components/ui/section"
import Button from "../components/ui/button"

type TierType = "platinum" | "gold" | "bronze" | "community"

interface SponsorTier {
  name: string
  tier: TierType
  price: string
  description: string
  highlights: string[]
  availability?: string
  addons?: string[]
}

const tierColors: Record<
  TierType,
  { bg: string; border: string; text: string }
> = {
  platinum: {
    bg: "bg-slate-100",
    border: "border-slate-300",
    text: "text-slate-500",
  },
  gold: {
    bg: "bg-amber-50",
    border: "border-amber-300",
    text: "text-amber-600",
  },
  bronze: {
    bg: "bg-orange-50",
    border: "border-orange-300",
    text: "text-orange-700",
  },
  community: {
    bg: "bg-pink-50",
    border: "border-pink-300",
    text: "text-pink-600",
  },
}

const sponsorTiers: SponsorTier[] = [
  {
    name: "Platinum",
    tier: "platinum",
    price: "180,000 DKK",
    description:
      "Platinum sponsors are the ones contributing the most to the conference. They represent companies for which Cloud Native approach is central in the way they implement their activity.",
    highlights: [
      "Extra Large booth*",
      "6 tickets",
      "15 minute keynote presentation",
      "30% discount for guests (10 tickets)**",
      "Lead scanner app",
      "Branding on swag and marketing material",
    ],
    addons: [
      "20,000 DKK: Logo on lanyard",
      "20,000 DKK: Promotion at the after party",
    ],
    availability: "Limited to 2 sponsorships or 1 sponsorship with 300,000 DKK",
  },
  {
    name: "Gold",
    tier: "gold",
    price: "100,000 DKK",
    description:
      "Gold sponsors form the backbone of the conference backers. They represent companies that believe strongly in the Cloud Native movement and have the financial means and the willingness to support it. Gold sponsors will be offered very high visibility during and after the event: a large sized booth, 2 minutes presentation during the keynote, and extended branding both onsite and offsite.",
    highlights: [
      "Large booth*",
      "4 tickets",
      "2 minutes keynote presence",
      "30% discount for guests (10 tickets)**",
      "Lead scanner app",
      "Branding on swag and marketing material",
    ],
    availability: "Limited to 4 sponsorships",
  },
  {
    name: "Bronze",
    tier: "bronze",
    price: "65,000 DKK",
    description:
      "Bronze sponsors are important contributors to the conference. They represent companies who believe in cloud native technologies and experience daily their benefits for their software and platforms. Bronze sponsors will be offered strong visibility during the event: regular sized booth, branding onsite on common areas and welcome banner, keynote mention, logo on the website.",
    highlights: [
      "Regular booth*",
      "2 tickets",
      "30% discount for guests (4 tickets)**",
      "Lead scanner app",
      "Branding on marketing material",
    ],
    availability: "Limited to 5 sponsorships",
  },
  {
    name: "Community",
    tier: "community",
    price: "15,000 DKK",
    description:
      "Community partners, such as cloud native project maintainers, tech community leaders in Open Source, DevOps, or Cloud Native technologies, and Open Source Evangelists, play a unique role as central contributors to our Cloud Native Denmark event. They have the opportunity to contribute to our community zone in a dedicated area of the venue.",
    highlights: [
      "5 tickets",
      "Keynote mention",
      "Branding in common areas and logo on website",
    ],
  },
]

const BecomeASponsorPage: React.FC = () => {
  const location = useLocation()

  return (
    <>
      <SEOHead title="Become a Sponsor" pathname={location.pathname} />

      {/* Hero Section with strong value proposition */}
      <Section className="bg-white">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Partner with Cloud Native Denmark 2026
          </h1>
          <p className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto">
            Connect with 500+ developers, engineers, and technical leaders at
            Copenhagen's premier Kubernetes and cloud-native conference.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <a href="mailto:sponsor@cloudnativedenmark.dk">
              <Button>Get in Touch</Button>
            </a>
            <a
              href="https://www.canva.com/design/DAG18lTHcrM/RZGm8CHGviE7ZRUBsupWOA/edit"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="secondary">View Prospectus</Button>
            </a>
          </div>
          <p className="text-gray-500 text-sm">
            November 19-20, 2026 • Scandic Copenhagen
          </p>
        </div>
      </Section>

      {/* Stats - Social proof */}
      <Section className="bg-white py-12">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="bg-blue-50 rounded-lg p-6 text-center border border-blue-100">
              <p className="text-3xl font-bold text-blue-600 mb-1">~500</p>
              <p className="text-gray-700 text-sm">Attendees</p>
            </div>
            <div className="bg-blue-50 rounded-lg p-6 text-center border border-blue-100">
              <p className="text-3xl font-bold text-blue-600 mb-1">50+</p>
              <p className="text-gray-700 text-sm">Speakers</p>
            </div>
            <div className="bg-blue-50 rounded-lg p-6 text-center border border-blue-100">
              <p className="text-3xl font-bold text-blue-600 mb-1">30+</p>
              <p className="text-gray-700 text-sm">Sessions</p>
            </div>
            <div className="bg-blue-50 rounded-lg p-6 text-center border border-blue-100">
              <p className="text-3xl font-bold text-blue-600 mb-1">3</p>
              <p className="text-gray-700 text-sm">Tracks</p>
            </div>
            <div className="bg-blue-50 rounded-lg p-6 text-center border border-blue-100 col-span-2 md:col-span-1">
              <p className="text-3xl font-bold text-blue-600 mb-1">2</p>
              <p className="text-gray-700 text-sm">Days</p>
            </div>
          </div>
        </div>
      </Section>

      {/* Why Sponsor - Benefits focused */}
      <Section className="bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">
            Why Sponsor?
          </h2>
          <p className="text-lg text-gray-600 text-center mb-10 max-w-2xl mx-auto">
            Position your brand at the forefront of the cloud-native movement in
            Denmark and the Nordics.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg p-8 border border-gray-200 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Brand Visibility
              </h3>
              <p className="text-gray-600">
                Reach highly engaged developers, system engineers, architects &
                technical leaders. Your brand will be seen by decision-makers
                who influence technology choices at their organizations.
              </p>
            </div>
            <div className="bg-white rounded-lg p-8 border border-gray-200 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Talent Recruitment
              </h3>
              <p className="text-gray-600">
                Access a concentrated pool of skilled cloud-native
                professionals. The conference is an ideal venue to showcase your
                company culture and attract top engineering talent.
              </p>
            </div>
            <div className="bg-white rounded-lg p-8 border border-gray-200 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Lead Generation
              </h3>
              <p className="text-gray-600">
                Connect directly with potential customers through booth
                interactions, lead scanner apps, and networking opportunities.
                Build relationships that convert to business.
              </p>
            </div>
            <div className="bg-white rounded-lg p-8 border border-gray-200 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Community Leadership
              </h3>
              <p className="text-gray-600">
                Demonstrate your commitment to the cloud-native ecosystem.
                Establish your brand as a thought leader and trusted partner in
                the community.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* Sponsorship Packages */}
      <Section className="bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">
            Sponsorship Packages
          </h2>
          <p className="text-lg text-gray-600 text-center mb-10">
            Choose the package that aligns with your goals and budget.
          </p>

          <div className="space-y-6">
            {sponsorTiers.map((tier) => {
              const colors = tierColors[tier.tier]
              return (
                <div
                  key={tier.name}
                  className="rounded-lg border border-gray-200 bg-white shadow-sm overflow-hidden"
                >
                  <div
                    className={`${colors.bg} border-b ${colors.border} px-6 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2`}
                  >
                    <h3 className="text-2xl font-bold text-gray-900">
                      {tier.name}
                    </h3>
                    <span className={`text-2xl font-bold ${colors.text}`}>
                      {tier.price}*
                    </span>
                  </div>
                  <div className="p-6">
                    <p className="text-gray-700 mb-6">{tier.description}</p>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">
                          What's Included:
                        </h4>
                        <ul className="space-y-2">
                          {tier.highlights.map((highlight, index) => (
                            <li
                              key={index}
                              className="flex items-baseline gap-2 text-gray-700"
                            >
                              <span className="text-green-500">✓</span>
                              {highlight}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {tier.addons && tier.addons.length > 0 && (
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-3">
                            Optional Add-ons:
                          </h4>
                          <ul className="space-y-2">
                            {tier.addons.map((addon, index) => (
                              <li
                                key={index}
                                className="flex items-baseline gap-2 text-gray-700"
                              >
                                <span className="text-blue-500">+</span>
                                {addon}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>

                    {tier.availability && (
                      <p className="text-sm text-orange-600 font-medium mt-4 bg-orange-50 px-3 py-2 rounded inline-block">
                        {tier.availability}
                      </p>
                    )}
                  </div>
                </div>
              )
            })}
          </div>

          <div className="text-sm text-gray-500 text-center mt-8 italic space-y-1">
            <p>*Prices exclude 25% VAT. Booths include standard furniture.</p>
            <p>
              **Subject to general availability of event tickets (if the event
              is sold out, the discount codes become invalid).
            </p>
          </div>
        </div>
      </Section>
    </>
  )
}

export default BecomeASponsorPage
