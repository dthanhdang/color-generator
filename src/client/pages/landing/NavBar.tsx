import { useState } from "react"
import { Link } from "@tanstack/react-router"
import { Menu, X } from "lucide-react"
import { Authenticated } from "#components/authenticated/Authenticated.tsx"

type AuthenticatedLinkProps = {
  to: string
  children: React.ReactNode
  className?: string
  // Removed unused mobileClassName prop
  onClick?: () => void
}

const AuthenticatedLink = ({
  to,
  children,
  className = "hover:text-indigo-600 transition-colors",
  // Removed unused mobileClassName prop
  onClick = () => {},
}: AuthenticatedLinkProps) => {
  return (
    <Authenticated>
      <Link
        to={to}
        className={className}
        activeProps={{
          className: className.includes("block")
            ? "block py-2 text-indigo-600 font-medium"
            : "text-indigo-600 font-medium",
        }}
        onClick={onClick}
      >
        {children}
      </Link>
    </Authenticated>
  )
}
export default function Navbar() {
  const [open, setOpen] = useState(false)

  const navLinks = [
    { to: "/scale-palette", label: "Scale Palette", requireAuth: false },
    { to: "/harmony-palette", label: "Harmony Palette", requireAuth: false },
    { to: "/image-picker", label: "Image Picker", requireAuth: false },
    { to: "/random-palette", label: "Random Palette", requireAuth: false },
    { to: "/contrast-checker", label: "Contrast Checker", requireAuth: false },
    {
      to: "/palettes-explorer",
      label: "Palettes Explorer",
      requireAuth: false,
    },
    {
      to: "/my-palettes",
      label: "My Palettes",
      requireAuth: true,
    },
  ]

  const handleLinkClick = () => {
    if (open) setOpen(false)
  }

  return (
    <nav className="bg-white shadow sticky top-0 z-50">
      <div className="container mx-auto px-4 py-2 flex items-center justify-center">
        {/* Bouton burger pour mobile */}
        <button
          className="md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>

        {/* Navigation desktop */}
        <div className="hidden md:flex gap-4 bg-gray-50 px-4 py-2 rounded-full shadow-sm items-center">
          {navLinks.map((link) =>
            link.requireAuth ? (
              <AuthenticatedLink
                key={link.to}
                to={link.to}
                className="text-gray-700 hover:text-indigo-600 transition-colors text-sm"
              >
                {link.label}
              </AuthenticatedLink>
            ) : (
              <Link
                key={link.to}
                to={link.to}
                className="text-gray-700 hover:text-indigo-600 transition-colors text-sm"
                activeProps={{
                  className: "text-indigo-600 font-medium",
                }}
              >
                {link.label}
              </Link>
            )
          )}
        </div>
      </div>

      {/* Menu mobile */}
      {open && (
        <div className="md:hidden px-4 py-2 bg-gray-50 shadow-inner space-y-1">
          {navLinks.map((link) =>
            link.requireAuth ? (
              <AuthenticatedLink
                key={link.to}
                to={link.to}
                className="block py-1 text-gray-700 hover:text-indigo-600 text-sm"
                onClick={handleLinkClick}
              >
                {link.label}
              </AuthenticatedLink>
            ) : (
              <Link
                key={link.to}
                to={link.to}
                className="block py-1 text-gray-700 hover:text-indigo-600 text-sm"
                activeProps={{
                  className: "block py-1 text-indigo-600 font-medium",
                }}
                onClick={handleLinkClick}
              >
                {link.label}
              </Link>
            )
          )}
        </div>
      )}
    </nav>
  )
}
