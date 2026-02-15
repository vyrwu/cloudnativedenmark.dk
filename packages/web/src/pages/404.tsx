import React from "react"
import { Link } from "react-router-dom"
import SEOHead from "../components/seo-head"
import Logo from "../images/logo.svg"

const NotFoundPage: React.FC = () => {
  return (
    <>
      <SEOHead title="Page Not Found" />
      <main className="min-h-[70vh] flex flex-col items-center justify-center px-6 py-16 text-center">
        <img
          src={Logo}
          alt="Cloud Native Denmark"
          className="w-24 h-24 mb-8 opacity-50"
        />
        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Page Not Found
        </h2>
        <p className="text-lg text-gray-600 mb-8 max-w-md">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/"
          className="bg-background text-white px-8 py-3 text-lg rounded-full font-medium hover:bg-background/90 transition-colors"
        >
          Back to Home
        </Link>
      </main>
    </>
  )
}

export default NotFoundPage
