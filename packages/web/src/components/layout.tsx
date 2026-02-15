import React, { useEffect } from "react"
import { Outlet, useLocation } from "react-router-dom"
import Header from "./header"
import Footer from "./footer"

const menuLinks = [
  // {
  //   name: "Talk Archive",
  //   link: "/talk-archive",
  // },
  // {
  //   name: "Venue Plan",
  //   link: "/venue-plan",
  // },
  {
    name: "Become a Sponsor",
    link: "/become-a-sponsor",
  },
  {
    name: "Convince Your Boss",
    link: "/convince-your-boss",
  },
  {
    name: "Team",
    link: "/team",
  },
]

const Layout = () => {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <div className="flex min-h-screen flex-col">
      <Header menuLinks={menuLinks} />
      <main className="relative isolate grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default Layout
