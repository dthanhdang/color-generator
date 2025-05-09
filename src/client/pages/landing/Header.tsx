import { useState, useEffect } from "react"
import { cn } from "../../lib/utils"
import { Link } from "@tanstack/react-router"
import { Unauthenticated } from "#components/unauthenticated/Unauthenticated.tsx"
import { Authenticated } from "#components/authenticated/Authenticated.tsx"
import { LogOutButton } from "#components/log_out_button/LogOutButton.tsx"
import { useAuthentication } from "#client/hooks"

export const Header = () => {
  const [scrolled, setScrolled] = useState(false)
  const { user } = useAuthentication()

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
        "z-50 py-2 px-4 md:px-8 transition-all duration-300",
        scrolled
          ? "bg-white/80 backdrop-blur-md shadow-sm"
          : "py-4 px-6 md:px-12 bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link
          to={user?.role === "administrator" ? "/admin" : "/"}
          className="text-2xl font-semibold tracking-wide flex items-center space-x-2"
        >
          <img
            src="/ucolorr.svg"
            alt="ucolorr logo"
            className="w-8 h-8 object-contain"
          />
          <span>ucolorr</span>
        </Link>

        {user?.role === "administrator" ? null : (
          <nav className="text-sm font-bold text-gray-600 flex flex-col gap-4 md:flex-row md:items-center md:gap-8">
            <a
              href="/#features"
              className="text-sm font-medium hover:text-black/70 transition-colors"
            >
              Features
            </a>

            <a
              href="/#how-it-works"
              className="text-sm font-medium hover:text-black/70 transition-colors"
            >
              How It Works
            </a>
            <a
              href="/#pricing"
              className="text-sm font-medium hover:text-black/70 transition-colors"
            >
              Pricing
            </a>
          </nav>
        )}

        <div className="flex items-center space-x-4">
          <Authenticated>
            <LogOutButton />
          </Authenticated>
          <Unauthenticated>
            <Link
              to="/auth/log-in"
              className="text-sm font-medium hover:text-black/70 transition-colors hidden md:block"
            >
              Log in
            </Link>
          </Unauthenticated>
          <Unauthenticated>
            <a
              href="/harmony-palette"
              className="bg-[var(--primary-color)] text-sm font-medium text-white px-4 py-2 rounded-full transition-all hover:bg-opacity-90"
              //style={{ backgroundColor: "oklch(0.511 0.262 276.966)" }}
            >
              Start It Free
            </a>
          </Unauthenticated>
        </div>
      </div>
    </header>
  )
}
