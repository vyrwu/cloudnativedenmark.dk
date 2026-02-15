import React from "react"
import { render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import SponsorsSection from "../sponsors-section"

const renderWithRouter = (ui: React.ReactElement) => {
  return render(<MemoryRouter>{ui}</MemoryRouter>)
}

const createMockSponsor = (title: string, overrides = {}) => ({
  title,
  url: `https://${title.toLowerCase().replace(/\s/g, "")}.com`,
  logo: {
    publicURL: `/assets/${title.toLowerCase().replace(/\s/g, "-")}.svg`,
  },
  ...overrides,
})

describe("SponsorsSection", () => {
  const defaultProps = {
    platinum: [],
    gold: [],
    bronze: [],
    community: [],
    partners: [],
  }

  describe("rendering", () => {
    it("should render the Sponsors heading", () => {
      renderWithRouter(<SponsorsSection {...defaultProps} />)

      expect(
        screen.getByRole("heading", { name: "Sponsors" })
      ).toBeInTheDocument()
    })

    it("should render the Become a Sponsor button", () => {
      renderWithRouter(<SponsorsSection {...defaultProps} />)

      expect(
        screen.getByRole("button", { name: "Become a Sponsor" })
      ).toBeInTheDocument()
    })

    it("should link to the become-a-sponsor page", () => {
      renderWithRouter(<SponsorsSection {...defaultProps} />)

      const sponsorLink = screen.getByRole("link", {
        name: "Become a Sponsor",
      })
      expect(sponsorLink).toHaveAttribute("href", "/become-a-sponsor")
    })
  })

  describe("sponsor tier rendering", () => {
    it("should render platinum sponsors when provided", () => {
      const props = {
        ...defaultProps,
        platinum: [createMockSponsor("Platinum Sponsor")],
      }

      renderWithRouter(<SponsorsSection {...props} />)

      expect(screen.getByText("Platinum")).toBeInTheDocument()
      expect(screen.getByAltText("Platinum Sponsor")).toBeInTheDocument()
    })

    it("should render gold sponsors when provided", () => {
      const props = {
        ...defaultProps,
        gold: [createMockSponsor("Gold Sponsor")],
      }

      renderWithRouter(<SponsorsSection {...props} />)

      expect(screen.getByText("Gold")).toBeInTheDocument()
      expect(screen.getByAltText("Gold Sponsor")).toBeInTheDocument()
    })

    it("should render bronze sponsors when provided", () => {
      const props = {
        ...defaultProps,
        bronze: [createMockSponsor("Bronze Sponsor")],
      }

      renderWithRouter(<SponsorsSection {...props} />)

      expect(screen.getByText("Bronze")).toBeInTheDocument()
      expect(screen.getByAltText("Bronze Sponsor")).toBeInTheDocument()
    })

    it("should render community sponsors when provided", () => {
      const props = {
        ...defaultProps,
        community: [createMockSponsor("Online City", { scale: "120%" })],
      }

      renderWithRouter(<SponsorsSection {...props} />)

      expect(screen.getByText("Community")).toBeInTheDocument()
      expect(screen.getByAltText("Online City")).toBeInTheDocument()
    })

    it("should render partners when provided", () => {
      const props = {
        ...defaultProps,
        partners: [createMockSponsor("CNCF")],
      }

      renderWithRouter(<SponsorsSection {...props} />)

      expect(screen.getByText("Partners & Media")).toBeInTheDocument()
      expect(screen.getByAltText("CNCF")).toBeInTheDocument()
    })

    it("should not render tier sections when empty", () => {
      renderWithRouter(<SponsorsSection {...defaultProps} />)

      expect(screen.queryByText("Platinum")).not.toBeInTheDocument()
      expect(screen.queryByText("Gold")).not.toBeInTheDocument()
      expect(screen.queryByText("Bronze")).not.toBeInTheDocument()
      expect(screen.queryByText("Community")).not.toBeInTheDocument()
      expect(screen.queryByText("Partners & Media")).not.toBeInTheDocument()
    })
  })

  describe("multiple sponsors per tier", () => {
    it("should render all sponsors in a tier", () => {
      const props = {
        ...defaultProps,
        community: [
          createMockSponsor("Online City"),
          createMockSponsor("Another Sponsor"),
          createMockSponsor("Third Sponsor"),
        ],
      }

      renderWithRouter(<SponsorsSection {...props} />)

      expect(screen.getByAltText("Online City")).toBeInTheDocument()
      expect(screen.getByAltText("Another Sponsor")).toBeInTheDocument()
      expect(screen.getByAltText("Third Sponsor")).toBeInTheDocument()
    })
  })

  describe("multiple tiers with sponsors", () => {
    it("should render multiple tier sections simultaneously", () => {
      const props = {
        platinum: [createMockSponsor("Platinum Co")],
        gold: [createMockSponsor("Gold Co")],
        bronze: [createMockSponsor("Bronze Co")],
        community: [createMockSponsor("Community Co")],
        partners: [createMockSponsor("Partner Co")],
      }

      renderWithRouter(<SponsorsSection {...props} />)

      expect(screen.getByText("Platinum")).toBeInTheDocument()
      expect(screen.getByText("Gold")).toBeInTheDocument()
      expect(screen.getByText("Bronze")).toBeInTheDocument()
      expect(screen.getByText("Community")).toBeInTheDocument()
      expect(screen.getByText("Partners & Media")).toBeInTheDocument()
    })
  })

  describe("accessibility", () => {
    it("should have accessible sponsor heading with id", () => {
      renderWithRouter(<SponsorsSection {...defaultProps} />)

      const heading = screen.getByRole("heading", { name: "Sponsors" })
      expect(heading).toHaveAttribute("id", "sponsors")
    })

    it("should have alt text for all sponsor images", () => {
      const props = {
        ...defaultProps,
        community: [createMockSponsor("Accessible Sponsor")],
      }

      renderWithRouter(<SponsorsSection {...props} />)

      expect(screen.getByAltText("Accessible Sponsor")).toBeInTheDocument()
    })
  })
})
