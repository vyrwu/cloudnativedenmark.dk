import { useState, useEffect } from "react"

interface UseScrollVisibilityOptions {
  threshold?: number
  enabled?: boolean
}

export const useScrollVisibility = ({
  threshold = 600,
  enabled = true,
}: UseScrollVisibilityOptions = {}) => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (!enabled || typeof window === "undefined") {
      return
    }

    const handleScroll = () => {
      setIsVisible(window.scrollY > threshold)
    }

    // Set initial state
    handleScroll()

    window.addEventListener("scroll", handleScroll, { passive: true })

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [threshold, enabled])

  return isVisible
}
