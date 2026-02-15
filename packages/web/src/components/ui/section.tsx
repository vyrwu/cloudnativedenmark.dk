import React from "react"

interface SectionProps {
  children: React.ReactNode
  className?: string
  id?: string
}

const Section: React.FC<SectionProps> = ({ children, className = "", id }) => {
  const defaultClasses = "py-12 px-8 lg:py-16 lg:px-36"
  const combinedClasses = className
    ? `${defaultClasses} ${className}`
    : defaultClasses

  return (
    <section className={combinedClasses} id={id}>
      {children}
    </section>
  )
}

export default Section
