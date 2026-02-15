import React from "react"

interface ExternalLinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string
  children: React.ReactNode
  openInNewTab?: boolean
}

const ExternalLink: React.FC<ExternalLinkProps> = ({
  href,
  children,
  openInNewTab = true,
  className = "",
  ...props
}) => {
  const linkProps = openInNewTab
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {}

  return (
    <a href={href} className={className} {...linkProps} {...props}>
      {children}
    </a>
  )
}

export default ExternalLink
