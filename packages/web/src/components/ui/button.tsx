import React from "react"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  variant?: "primary" | "secondary"
}

const Button: React.FC<ButtonProps> = ({
  children,
  className = "",
  variant = "primary",
  disabled = false,
  ...props
}) => {
  const defaultClasses = {
    primary: disabled
      ? "bg-gray-400 text-white px-8 py-3 text-lg rounded-full font-medium cursor-not-allowed"
      : "bg-background text-white px-8 py-3 text-lg rounded-full font-medium hover:bg-background/90 transition-colors cursor-pointer",
    secondary: disabled
      ? "border-2 border-gray-400 text-gray-400 px-8 py-3 text-lg rounded-full font-medium cursor-not-allowed"
      : "border-2 border-background text-background px-8 py-3 text-lg rounded-full font-medium hover:bg-background hover:text-white transition-colors cursor-pointer",
  }

  const baseClasses = defaultClasses[variant]
  const combinedClasses = className
    ? `${baseClasses} ${className}`
    : baseClasses

  return (
    <button className={combinedClasses} disabled={disabled} {...props}>
      {children}
    </button>
  )
}

export default Button
