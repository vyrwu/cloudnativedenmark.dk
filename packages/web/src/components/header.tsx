import React, { useState, useEffect } from "react"
import Logo from "../images/logo.svg"
import { Link, useLocation } from "react-router-dom"
import { useScrollVisibility } from "../hooks/use-scroll-visibility"
import HamburgerMenu from "../images/hamburger-menu.inline.svg"
import CloseMenu from "../images/close-menu.inline.svg"

interface HeaderProps {
  menuLinks: {
    name: string
    link: string
  }[]
}

const Header = ({ menuLinks }: HeaderProps) => {
  const [isMenuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const isHomePage = location.pathname === "/"
  const showLogo = useScrollVisibility({ threshold: 600, enabled: isHomePage })

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "unset"
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isMenuOpen])

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen)
  }

  return (
    <header
      className={
        "bg-white safe-paddings transition-200 z-50 transition-colors sticky top-0" +
        (isMenuOpen ? " h-screen flex flex-col" : "")
      }
    >
      <div className="flex items-center justify-between p-4 w-full">
        <div
          className={`transition-opacity duration-300 ${
            isHomePage && !showLogo ? "opacity-0" : "opacity-100"
          }`}
        >
          <Link to="/">
            <img
              src={Logo}
              width={44}
              height="auto"
              loading="eager"
              alt="Cloud Native Denmark"
            />
          </Link>
        </div>
        <nav className="hidden md:flex mr-4">
          {menuLinks.map((link) => (
            <Link
              key={link.name}
              to={link.link}
              className="text-gray-800 hover:text-gray-600 text-base font-semibold pl-4"
            >
              {link.name}
            </Link>
          ))}
        </nav>
        <div className="md:hidden">
          <button onClick={toggleMenu}>
            {isMenuOpen ? <CloseMenu /> : <HamburgerMenu />}
          </button>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden flex-grow">
          <nav className="flex flex-col items-center justify-start h-full">
            {menuLinks.map((link) => (
              <Link
                key={link.name}
                to={link.link}
                className="text-gray-800 hover:text-gray-600 text-2xl font-semibold my-4"
                onClick={toggleMenu}
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}

export default Header
