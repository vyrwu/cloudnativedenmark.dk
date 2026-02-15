import React from "react"
import Logo from "../images/logo.svg"

const Hero = () => {
  return (
    <div className="mx-auto max-w-6xl">
      <div className="flex flex-row px-6 pt-14 py-24">
        <div className="basis-sm p-5">
          <img
            src={Logo}
            width={400}
            height="auto"
            loading="eager"
            alt="Cloud Native Denmark"
          />
        </div>
        <div className="basis-xl pl-4 pt-20">
          <h1 className="text-5xl font-semibold tracking-tight text-balance text-primary sm:text-7xl">
            Cloud Native Denmark 2025
          </h1>
          <p className="mt-8 text-lg font-medium text-pretty text-primary sm:text-xl/8">
            KCD Denmark will return as Cloud Native Denmark in 2025.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Hero
