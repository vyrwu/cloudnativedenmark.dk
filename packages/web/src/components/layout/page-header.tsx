import React from "react"
import Section from "../ui/section"

interface PageHeaderProps {
  title: string
  description?: string
  variant?: "default" | "dark"
  size?: "medium" | "large"
}

const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  description,
  variant = "dark",
  size = "large",
}) => {
  const titleSizeClasses = {
    medium: "text-4xl lg:text-5xl",
    large: "text-6xl",
  }

  const descriptionSizeClasses = {
    medium: "text-lg lg:text-xl",
    large: "text-2xl",
  }

  const textColorClasses = variant === "dark" ? "text-white" : "text-gray-900"

  return (
    <Section
      className={`${variant === "dark" ? "bg-background-dark" : "bg-white"} pt-20 pb-8 sm:pt-24 sm:pb-12 lg:pt-24 lg:pb-12`}
    >
      <div className="text-center">
        <h1
          className={`${titleSizeClasses[size]} font-bold ${textColorClasses} mb-4`}
        >
          {title}
        </h1>
        {description && (
          <p
            className={`${descriptionSizeClasses[size]} font-light ${textColorClasses} leading-normal`}
          >
            {description}
          </p>
        )}
      </div>
    </Section>
  )
}

export default PageHeader
