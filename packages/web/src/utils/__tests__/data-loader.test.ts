import yaml from "js-yaml"
import type { SponsorYamlData, SponsorData } from "../data-loader"

// Helper function that mirrors the filtering/validation logic in loadSponsors
function processSponsorYaml(
  sponsorYaml: Partial<SponsorYamlData>,
  category: string,
  imageUrlMap: Record<string, string>
): SponsorData | null {
  // Skip disabled sponsors
  if (!sponsorYaml.enabled) {
    return null
  }

  // Validate required fields
  if (!sponsorYaml.title || !sponsorYaml.url || !sponsorYaml.logo) {
    return null
  }

  // Get the bundled image URL
  const imageKey = `${category}/${sponsorYaml.logo}`
  const imageUrl = imageUrlMap[imageKey]

  if (!imageUrl) {
    return null
  }

  // Transform YAML data to component interface
  return {
    title: sponsorYaml.title,
    url: sponsorYaml.url,
    scale: sponsorYaml.scale,
    logo: {
      publicURL: imageUrl,
    },
  }
}

describe("data-loader sponsor processing", () => {
  const mockImageUrlMap: Record<string, string> = {
    "community/images/online-city.svg": "/assets/online-city-abc123.svg",
    "platinum/images/sponsor.png": "/assets/sponsor-def456.png",
    "gold/images/gold-sponsor.svg": "/assets/gold-sponsor-ghi789.svg",
  }

  describe("sponsor enabled filtering", () => {
    it("should include sponsors with enabled: true", () => {
      const sponsorYaml: SponsorYamlData = {
        title: "Online City",
        url: "https://onlinecity.io/",
        logo: "images/online-city.svg",
        scale: "120%",
        enabled: true,
      }

      const result = processSponsorYaml(
        sponsorYaml,
        "community",
        mockImageUrlMap
      )

      expect(result).not.toBeNull()
      expect(result?.title).toBe("Online City")
      expect(result?.url).toBe("https://onlinecity.io/")
      expect(result?.scale).toBe("120%")
      expect(result?.logo.publicURL).toBe("/assets/online-city-abc123.svg")
    })

    it("should exclude sponsors with enabled: false", () => {
      const sponsorYaml: SponsorYamlData = {
        title: "Disabled Sponsor",
        url: "https://example.com/",
        logo: "images/online-city.svg",
        enabled: false,
      }

      const result = processSponsorYaml(
        sponsorYaml,
        "community",
        mockImageUrlMap
      )

      expect(result).toBeNull()
    })

    it("should exclude sponsors without enabled field (undefined)", () => {
      const sponsorYaml: Partial<SponsorYamlData> = {
        title: "No Enabled Field Sponsor",
        url: "https://example.com/",
        logo: "images/online-city.svg",
      }

      const result = processSponsorYaml(
        sponsorYaml,
        "community",
        mockImageUrlMap
      )

      expect(result).toBeNull()
    })
  })

  describe("sponsor field validation", () => {
    it("should exclude sponsors missing title", () => {
      const sponsorYaml: Partial<SponsorYamlData> = {
        url: "https://example.com/",
        logo: "images/online-city.svg",
        enabled: true,
      }

      const result = processSponsorYaml(
        sponsorYaml,
        "community",
        mockImageUrlMap
      )

      expect(result).toBeNull()
    })

    it("should exclude sponsors missing url", () => {
      const sponsorYaml: Partial<SponsorYamlData> = {
        title: "Sponsor",
        logo: "images/online-city.svg",
        enabled: true,
      }

      const result = processSponsorYaml(
        sponsorYaml,
        "community",
        mockImageUrlMap
      )

      expect(result).toBeNull()
    })

    it("should exclude sponsors missing logo", () => {
      const sponsorYaml: Partial<SponsorYamlData> = {
        title: "Sponsor",
        url: "https://example.com/",
        enabled: true,
      }

      const result = processSponsorYaml(
        sponsorYaml,
        "community",
        mockImageUrlMap
      )

      expect(result).toBeNull()
    })

    it("should exclude sponsors when image is not found", () => {
      const sponsorYaml: SponsorYamlData = {
        title: "Sponsor",
        url: "https://example.com/",
        logo: "images/nonexistent.svg",
        enabled: true,
      }

      const result = processSponsorYaml(
        sponsorYaml,
        "community",
        mockImageUrlMap
      )

      expect(result).toBeNull()
    })
  })

  describe("sponsor data transformation", () => {
    it("should correctly transform YAML data to SponsorData", () => {
      const sponsorYaml: SponsorYamlData = {
        title: "Platinum Sponsor",
        url: "https://platinum.example.com/",
        logo: "images/sponsor.png",
        scale: "150%",
        enabled: true,
      }

      const result = processSponsorYaml(
        sponsorYaml,
        "platinum",
        mockImageUrlMap
      )

      expect(result).toEqual({
        title: "Platinum Sponsor",
        url: "https://platinum.example.com/",
        scale: "150%",
        logo: {
          publicURL: "/assets/sponsor-def456.png",
        },
      })
    })

    it("should handle sponsors without scale field", () => {
      const sponsorYaml: SponsorYamlData = {
        title: "Gold Sponsor",
        url: "https://gold.example.com/",
        logo: "images/gold-sponsor.svg",
        enabled: true,
      }

      const result = processSponsorYaml(sponsorYaml, "gold", mockImageUrlMap)

      expect(result).not.toBeNull()
      expect(result?.scale).toBeUndefined()
    })
  })

  describe("YAML parsing", () => {
    it("should correctly parse sponsor YAML content", () => {
      const yamlContent = `
logo: images/online-city.svg
title: Online City
url: https://onlinecity.io/
scale: 120%
enabled: true
`
      const parsed = yaml.load(yamlContent) as SponsorYamlData

      expect(parsed.logo).toBe("images/online-city.svg")
      expect(parsed.title).toBe("Online City")
      expect(parsed.url).toBe("https://onlinecity.io/")
      expect(parsed.scale).toBe("120%")
      expect(parsed.enabled).toBe(true)
    })

    it("should parse disabled sponsor YAML correctly", () => {
      const yamlContent = `
logo: images/sponsor.svg
title: Disabled Sponsor
url: https://example.com/
enabled: false
`
      const parsed = yaml.load(yamlContent) as SponsorYamlData

      expect(parsed.enabled).toBe(false)
    })

    it("should handle YAML without enabled field", () => {
      const yamlContent = `
logo: images/sponsor.svg
title: Old Sponsor
url: https://example.com/
`
      const parsed = yaml.load(yamlContent) as SponsorYamlData

      expect(parsed.enabled).toBeUndefined()
    })
  })

  describe("category-based image lookup", () => {
    it("should find images in the correct category path", () => {
      const sponsorYaml: SponsorYamlData = {
        title: "Community Sponsor",
        url: "https://community.example.com/",
        logo: "images/online-city.svg",
        enabled: true,
      }

      const result = processSponsorYaml(
        sponsorYaml,
        "community",
        mockImageUrlMap
      )

      expect(result?.logo.publicURL).toBe("/assets/online-city-abc123.svg")
    })

    it("should not find images in wrong category", () => {
      const sponsorYaml: SponsorYamlData = {
        title: "Sponsor",
        url: "https://example.com/",
        logo: "images/online-city.svg",
        enabled: true,
      }

      // Looking in 'platinum' category but image is in 'community'
      const result = processSponsorYaml(
        sponsorYaml,
        "platinum",
        mockImageUrlMap
      )

      expect(result).toBeNull()
    })
  })
})
