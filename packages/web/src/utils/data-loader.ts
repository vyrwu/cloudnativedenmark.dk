import yaml from "js-yaml"

export interface SponsorData {
  title: string
  url: string
  scale?: string
  logo: {
    publicURL: string
  }
}

export interface SponsorYamlData {
  title: string
  url: string
  logo: string
  scale?: string
  enabled?: boolean
}

export interface HotelData {
  name: string
  website?: string
  description?: string
  image?: string
  address?: string
  phone?: string
}

export interface TeamMember {
  name: string
  position: string
  image: string
  linkedin: string
}

export const siteMetadata = {
  title: "Cloud Native Denmark",
  description:
    "Cloud Native Denmark shares knowledge about Cloud Native Technologies and creates community networks in Denmark within this area.",
  siteUrl: "https://cloudnativedenmark.dk",
  menuLinks: [
    {
      name: "Talk Archive",
      link: "/talk-archive",
    },
    {
      name: "Venue Plan",
      link: "/venue-plan",
    },
    {
      name: "Convince Your Boss",
      link: "/convince-your-boss",
    },
    {
      name: "Team",
      link: "/team",
    },
  ],
  team: [
    {
      name: "Camilla Larsen",
      position: "",
      image: "team/organizer-camilla-larsen.jpg",
      linkedin: "camilla-larsen-tux",
    },
    {
      name: "Jinhong Brejnholt",
      position:
        "Chief Cloud Architect & Global Head of Cloud and Container Platform Engineering @ Saxo Bank A/S",
      image: "team/organizer-jinhong-brejnholt.jpg",
      linkedin: "jbrejnholt",
    },
    {
      name: "Kasper Borg Nissen",
      position: "Developer Relations @ Dash0",
      image: "team/organizer-kasper-nissen.jpg",
      linkedin: "kaspernissen",
    },
    {
      name: "Per Hedegaard Christiansen",
      position: "Chief Container Platform Engineer @ Saxo Bank A/S",
      image: "team/organizer-per-christiansen.jpg",
      linkedin: "perhchristiansen",
    },
    {
      name: "Ryan Gough",
      position: "Technical Product Owner @ JYSK",
      image: "team/organizer-ryan-gough.jpg",
      linkedin: "ryanjgough",
    },
    {
      name: "Thor Anker Kvisgård Lange",
      position: "Team Lead Platform Development @ Netic",
      image: "team/organizer-thor-lange.jpg",
      linkedin: "thor-lange-26b388",
    },
    {
      name: "Nikita Hald Sørensen",
      position: "OPEN TO WORK ✨",
      image: "team/organizer-nikita-hald.jpg",
      linkedin: "nikitahald",
    },
    {
      name: "Allan Højgaard Jensen",
      position: "Platform Development Specialist @ Netic",
      image: "team/organizer-allan.jpg",
      linkedin: "allanhoejgaardjensen/",
    },
    {
      name: "Søren Boss Jacobsen",
      position: "Regional Sales Manager @ EDB",
      image: "team/organizer-soren.jpg",
      linkedin: "sorenbossjacobsen",
    },
    {
      name: "Mads Høgstedt Danquah",
      position: "Lead Engineer @ the LEGO Group",
      image: "team/organizer-mads.jpg",
      linkedin: "danquah",
    },
    {
      name: "Aditya Sundaramurthy",
      position: "Platform Engineer @ Novo Nordisk",
      image: "team/organizer-aditya.jpg",
      linkedin: "aditya-sundaramurthy",
    },
    {
      name: "Aleksander Nowak",
      position: "Senior Platform Engineer @ wawa fertility",
      image: "team/organizer-alek.jpg",
      linkedin: "aleknowak",
    },
  ],
}

async function loadYamlFile<T>(path: string): Promise<T> {
  try {
    const response = await fetch(path)
    if (!response.ok) {
      throw new Error(`Failed to fetch ${path}: ${response.statusText}`)
    }
    const yamlText = await response.text()
    return yaml.load(yamlText) as T
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(`Error loading YAML file ${path}:`, error)
    throw error
  }
}

export async function loadSponsors() {
  const sponsors: Record<string, SponsorData[]> = {}

  // Use Vite's import.meta.glob to dynamically discover all sponsor YAML files at build time
  const sponsorFiles = import.meta.glob("/src/data/sponsors/**/*.yaml", {
    query: "?raw",
    import: "default",
  })

  // Load all sponsor images and create a lookup map
  const imageFiles = import.meta.glob("/src/data/sponsors/**/images/*", {
    query: "?url",
    import: "default",
  })

  // Build image URL lookup in parallel
  const imagePaths = Object.keys(imageFiles)
  const imageResults = await Promise.all(
    imagePaths.map((path) => imageFiles[path]())
  )

  const imageUrlMap: Record<string, string> = {}
  imagePaths.forEach((path, index) => {
    const parts = path.split("/")
    const category = parts[4]
    const filename = parts[6]
    const key = `${category}/images/${filename}`
    imageUrlMap[key] = imageResults[index] as string
  })

  // Load all YAML files in parallel
  const yamlPaths = Object.keys(sponsorFiles)
  const yamlResults = await Promise.all(
    yamlPaths.map((path) => sponsorFiles[path]())
  )

  yamlPaths.forEach((path, index) => {
    try {
      const parts = path.split("/")
      const category = parts[4]

      if (!sponsors[category]) {
        sponsors[category] = []
      }

      const rawContent = yamlResults[index] as string
      const sponsorYaml = yaml.load(rawContent) as SponsorYamlData

      // Skip disabled sponsors
      if (!sponsorYaml.enabled) {
        return
      }

      // Validate required fields
      if (!sponsorYaml.title || !sponsorYaml.url || !sponsorYaml.logo) {
        return
      }

      // Get the bundled image URL
      const imageKey = `${category}/${sponsorYaml.logo}`
      const imageUrl = imageUrlMap[imageKey]

      if (!imageUrl) {
        // eslint-disable-next-line no-console
        console.warn(
          `Image not found for sponsor ${sponsorYaml.title}: ${imageKey}`
        )
        return
      }

      // Transform YAML data to component interface
      const sponsor: SponsorData = {
        title: sponsorYaml.title,
        url: sponsorYaml.url,
        scale: sponsorYaml.scale,
        logo: {
          publicURL: imageUrl,
        },
      }
      sponsors[category].push(sponsor)
    } catch (error) {
      // eslint-disable-next-line no-console
      console.warn(`Failed to load sponsor from ${path}:`, error)
    }
  })

  return sponsors
}

export async function loadHotels() {
  try {
    const hotels: HotelData[] = []
    const hotelNames = ["scandic_city", "scandic_mayor"]

    for (const hotelName of hotelNames) {
      try {
        const hotel = await loadYamlFile<HotelData>(
          `/data/hotels/${hotelName}.yaml`
        )
        hotels.push(hotel)
      } catch (error) {
        // eslint-disable-next-line no-console
        console.warn(`Failed to load hotel ${hotelName}:`, error)
      }
    }

    return hotels
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Error loading hotels:", error)
    return []
  }
}

export function getTeamMembers(): TeamMember[] {
  return siteMetadata.team
}
