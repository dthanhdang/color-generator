import React, { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

export const Header = () => {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [scrolled])

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 py-4 px-6 md:px-12 transition-all duration-300",
        scrolled ? "bg-white/80 backdrop-blur-md shadow-sm" : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <a
          href="#"
          className="text-xl font-semibold flex items-center space-x-2"
        >
          <div className="w-8 h-8 rounded-md bg-gradient-to-tr from-blue-500 to-teal-400"></div>
          <span>ChromaGen</span>
        </a>

        <nav className="hidden md:flex items-center space-x-8">
          <a
            href="#features"
            className="text-sm font-medium hover:text-black/70 transition-colors"
          >
            Features
          </a>
          <a
            href="#how-it-works"
            className="text-sm font-medium hover:text-black/70 transition-colors"
          >
            How It Works
          </a>
          <a
            href="#pricing"
            className="text-sm font-medium hover:text-black/70 transition-colors"
          >
            Pricing
          </a>
        </nav>

        <div className="flex items-center space-x-4">
          <a
            href="#"
            className="text-sm font-medium hover:text-black/70 transition-colors hidden md:block"
          >
            Log in
          </a>
          <a
            href="#"
            className="text-sm font-medium bg-black text-white px-4 py-2 rounded-full transition-all hover:bg-opacity-90"
          >
            Try for free
          </a>
        </div>
      </div>
    </header>
  )
}
