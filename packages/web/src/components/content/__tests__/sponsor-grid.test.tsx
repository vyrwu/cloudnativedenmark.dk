import React from "react"
import { render, screen } from "@testing-library/react"
import SponsorGrid from "../sponsor-grid"

const createMockSponsor = (title: string, overrides = {}) => ({
  title,
  url: `https://${title.toLowerCase().replace(/\s/g, "")}.com`,
  logo: {
    publicURL: `/assets/${title.toLowerCase().replace(/\s/g, "-")}.svg`,
  },
  ...overrides,
})

describe("SponsorGrid", () => {
  describe("rendering", () => {
    it("should render the title", () => {
      const sponsors = [createMockSponsor("Test Sponsor")]

      render(<SponsorGrid sponsors={sponsors} title="Community Sponsors" />)

      expect(screen.getByText("Community Sponsors")).toBeInTheDocument()
    })

    it("should render sponsor images with correct alt text", () => {
      const sponsors = [createMockSponsor("Online City")]

      render(<SponsorGrid sponsors={sponsors} title="Community Sponsors" />)

      const img = screen.getByAltText("Online City")
      expect(img).toBeInTheDocument()
      expect(img).toHaveAttribute("src", "/assets/online-city.svg")
    })

    it("should render sponsor links with correct href", () => {
      const sponsors = [
        createMockSponsor("Online City", { url: "https://onlinecity.io/" }),
      ]

      render(<SponsorGrid sponsors={sponsors} title="Community Sponsors" />)

      const link = screen.getByRole("link")
      expect(link).toHaveAttribute("href", "https://onlinecity.io/")
    })

    it("should render multiple sponsors", () => {
      const sponsors = [
        createMockSponsor("Sponsor One"),
        createMockSponsor("Sponsor Two"),
        createMockSponsor("Sponsor Three"),
      ]

      render(<SponsorGrid sponsors={sponsors} title="Test Sponsors" />)

      expect(screen.getByAltText("Sponsor One")).toBeInTheDocument()
      expect(screen.getByAltText("Sponsor Two")).toBeInTheDocument()
      expect(screen.getByAltText("Sponsor Three")).toBeInTheDocument()
    })
  })

  describe("empty state", () => {
    it("should return null when sponsors array is empty", () => {
      const { container } = render(
        <SponsorGrid sponsors={[]} title="Empty Sponsors" />
      )

      expect(container.firstChild).toBeNull()
    })

    it("should return null when sponsors is undefined", () => {
      const { container } = render(
        <SponsorGrid
          sponsors={undefined as unknown as []}
          title="No Sponsors"
        />
      )

      expect(container.firstChild).toBeNull()
    })
  })

  describe("scale property", () => {
    it("should apply scale width to sponsor image", () => {
      const sponsors = [createMockSponsor("Scaled Sponsor", { scale: "120%" })]

      render(<SponsorGrid sponsors={sponsors} title="Sponsors" />)

      const img = screen.getByAltText("Scaled Sponsor")
      expect(img).toHaveAttribute("width", "120%")
    })

    it("should handle sponsors without scale property", () => {
      const sponsors = [createMockSponsor("No Scale Sponsor")]

      render(<SponsorGrid sponsors={sponsors} title="Sponsors" />)

      const img = screen.getByAltText("No Scale Sponsor")
      expect(img).not.toHaveAttribute("width")
    })
  })

  describe("sizes", () => {
    it("should apply large size styling", () => {
      const sponsors = [createMockSponsor("Large Sponsor")]

      const { container } = render(
        <SponsorGrid sponsors={sponsors} title="Sponsors" size="large" />
      )

      const gridContainer = container.firstChild
      expect(gridContainer).toHaveClass("mt-16")
      expect(gridContainer).toHaveClass("mb-20")
    })

    it("should apply small size styling", () => {
      const sponsors = [createMockSponsor("Small Sponsor")]

      const { container } = render(
        <SponsorGrid sponsors={sponsors} title="Sponsors" size="small" />
      )

      const gridContainer = container.firstChild
      expect(gridContainer).toHaveClass("mt-12")
      expect(gridContainer).toHaveClass("mb-16")
    })

    it("should use medium size when not specified", () => {
      const sponsors = [createMockSponsor("Default Sponsor")]

      const { container } = render(
        <SponsorGrid sponsors={sponsors} title="Sponsors" />
      )

      const gridContainer = container.firstChild
      expect(gridContainer).toHaveClass("mt-14")
      expect(gridContainer).toHaveClass("mb-18")
    })
  })

  describe("accessibility", () => {
    it("should have accessible links for all sponsors", () => {
      const sponsors = [
        createMockSponsor("Accessible Sponsor One"),
        createMockSponsor("Accessible Sponsor Two"),
      ]

      render(<SponsorGrid sponsors={sponsors} title="Accessible Sponsors" />)

      const links = screen.getAllByRole("link")
      expect(links).toHaveLength(2)
    })

    it("should have proper alt text for images", () => {
      const sponsors = [createMockSponsor("Alt Text Sponsor")]

      render(<SponsorGrid sponsors={sponsors} title="Sponsors" />)

      expect(screen.getByAltText("Alt Text Sponsor")).toBeInTheDocument()
    })

    it("should open links in new tab by default", () => {
      const sponsors = [createMockSponsor("New Tab Sponsor")]

      render(<SponsorGrid sponsors={sponsors} title="Sponsors" />)

      const link = screen.getByRole("link")
      expect(link).toHaveAttribute("target", "_blank")
      expect(link).toHaveAttribute("rel", "noopener noreferrer")
    })
  })

  describe("logo handling", () => {
    it("should render image when logo is present", () => {
      const sponsors = [createMockSponsor("Logo Sponsor")]

      render(<SponsorGrid sponsors={sponsors} title="Sponsors" />)

      expect(screen.getByRole("img")).toBeInTheDocument()
    })

    it("should handle missing logo gracefully", () => {
      const sponsors = [
        {
          title: "No Logo Sponsor",
          url: "https://example.com",
          logo: null as unknown as { publicURL: string },
        },
      ]

      const { container } = render(
        <SponsorGrid sponsors={sponsors} title="Sponsors" />
      )

      // Component should still render but without an image
      expect(screen.getByText("Sponsors")).toBeInTheDocument()
      expect(container.querySelector("img")).toBeNull()
    })
  })

  describe("unique keys", () => {
    it("should handle sponsors with duplicate titles", () => {
      const sponsors = [
        createMockSponsor("Same Name", { url: "https://first.com" }),
        createMockSponsor("Same Name", { url: "https://second.com" }),
      ]

      // Should not throw error about duplicate keys
      expect(() => {
        render(<SponsorGrid sponsors={sponsors} title="Sponsors" />)
      }).not.toThrow()

      const images = screen.getAllByAltText("Same Name")
      expect(images).toHaveLength(2)
    })
  })
})
