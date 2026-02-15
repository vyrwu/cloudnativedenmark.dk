import React from "react"
import Section from "../ui/section"
import Button from "../ui/button"

interface TicketTier {
  name: string
  price: number
  availableUntil: Date
  displayDate: string
}

const ticketTiers: TicketTier[] = [
  {
    name: "Early Blind Bird",
    price: 999,
    availableUntil: new Date("2026-01-01"),
    displayDate: "Through Jan 1",
  },
  {
    name: "Blind Bird",
    price: 1499,
    availableUntil: new Date("2026-09-18"),
    displayDate: "Through Sep 18",
  },
  {
    name: "Standard",
    price: 1999,
    availableUntil: new Date("2026-11-17"),
    displayDate: "Through Nov 17",
  },
  {
    name: "Late Bird",
    price: 4999,
    availableUntil: new Date("2026-11-20"),
    displayDate: "Through Event",
  },
]

type TierStatus = "expired" | "active" | "upcoming"

const getTierStatus = (
  tier: TicketTier,
  index: number,
  activeTierIndex: number
): TierStatus => {
  if (index < activeTierIndex) return "expired"
  if (index === activeTierIndex) return "active"
  return "upcoming"
}

const getActiveTierIndex = (tiers: TicketTier[]): number => {
  const now = new Date()
  for (let i = 0; i < tiers.length; i++) {
    if (now <= tiers[i].availableUntil) {
      return i
    }
  }
  return -1
}

interface TicketRatesSectionProps {
  id?: string
}

const TicketRatesSection: React.FC<TicketRatesSectionProps> = ({ id }) => {
  const activeTierIndex = getActiveTierIndex(ticketTiers)

  return (
    <Section id={id} className="bg-gray-50">
      <div className="text-center">
        <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
          Ticket Rates
        </h2>
        <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
          Book early to get the best price!
        </p>

        <h3 className="text-2xl font-bold text-gray-900 mb-6">Individual</h3>

        {/* Desktop table */}
        <div className="hidden md:grid md:grid-cols-4 gap-4 max-w-5xl mx-auto">
          {ticketTiers.map((tier, index) => {
            const status = getTierStatus(tier, index, activeTierIndex)
            return (
              <div
                key={tier.name}
                className={`rounded-lg p-6 text-center border ${
                  status === "active"
                    ? "bg-blue-50 border-blue-300"
                    : status === "upcoming"
                      ? "bg-white border-gray-200"
                      : "bg-gray-100 border-gray-300 opacity-50"
                }`}
              >
                <h3
                  className={`text-lg font-bold ${
                    status === "expired" ? "text-gray-400" : "text-gray-900"
                  }`}
                >
                  {tier.name}
                </h3>
                <p
                  className={`text-sm mt-1 ${
                    status === "expired" ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  {tier.displayDate}
                </p>
                <p
                  className={`text-2xl font-bold mt-4 ${
                    status === "active"
                      ? "text-blue-600"
                      : status === "upcoming"
                        ? "text-gray-700"
                        : "text-gray-400"
                  }`}
                >
                  {tier.price.toLocaleString("da-DK")} DKK
                </p>
              </div>
            )
          })}
        </div>

        {/* Mobile cards */}
        <div className="md:hidden space-y-4">
          {ticketTiers.map((tier, index) => {
            const status = getTierStatus(tier, index, activeTierIndex)
            return (
              <div
                key={tier.name}
                className={`rounded-lg p-6 text-center border ${
                  status === "active"
                    ? "bg-blue-50 border-blue-300"
                    : status === "upcoming"
                      ? "bg-white border-gray-200"
                      : "bg-gray-100 border-gray-300 opacity-50"
                }`}
              >
                <h3
                  className={`text-lg font-bold ${
                    status === "expired" ? "text-gray-400" : "text-gray-900"
                  }`}
                >
                  {tier.name}
                </h3>
                <p
                  className={`text-sm mt-1 ${
                    status === "expired" ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  {tier.displayDate}
                </p>
                <p
                  className={`text-2xl font-bold mt-4 ${
                    status === "active"
                      ? "text-blue-600"
                      : status === "upcoming"
                        ? "text-gray-700"
                        : "text-gray-400"
                  }`}
                >
                  {tier.price.toLocaleString("da-DK")} DKK
                </p>
              </div>
            )
          })}
        </div>

        <p className="text-sm text-gray-500 text-center mt-8 italic">
          Visible prices include 25% VAT. Additional Ticketbutler service fees
          apply at checkout. Blind Bird availability is capped at 100 tickets,
          and may be limitted given early release of the conference schedule.
        </p>

        <div className="text-center mt-8">
          <a
            href="https://cloudnativedenmark.ticketbutler.io/da/e/cloud-native-denmark-26/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button>Buy Tickets</Button>
          </a>
        </div>
      </div>
    </Section>
  )
}

export default TicketRatesSection
