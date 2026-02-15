import React from "react"
import { Helmet } from "react-helmet-async"

interface SEOProps {
  title?: string
  description?: string
  pathname?: string
  keywords?: string[]
  image?: string
}

const defaultTitle = "Cloud Native Denmark"
const defaultDescription =
  "Cloud Native Denmark shares knowledge about Cloud Native Technologies and creates community networks in Denmark within this area."
const defaultUrl = "https://cloudnativedenmark.dk"

const SEOHead: React.FC<SEOProps> = ({
  title,
  description = defaultDescription,
  pathname = "",
  keywords = [],
  image = "/images/icon.png",
}) => {
  const fullTitle = title ? `${title} | ${defaultTitle}` : defaultTitle
  const fullUrl = `${defaultUrl}${pathname}`

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords.join(", ")} />

      {/* OpenGraph */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:image" content={image} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Canonical URL */}
      <link rel="canonical" href={fullUrl} />
    </Helmet>
  )
}

export default SEOHead
