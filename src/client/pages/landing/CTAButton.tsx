import React from "react"
import { Link } from "@tanstack/react-router"
import { cn } from "../../lib/utils"

type CTAButtonProps = {
  children: React.ReactNode
  href: string
  variant?: "primary" | "secondary"
  className?: string
  onClick?: () => void
}

export const CTAButton = ({
  children,
  href,
  variant = "primary",
  className,
  onClick,
}: CTAButtonProps) => {
  const primaryColor = "rgb(123, 97, 255)"
  const primaryColorOKLCH = "oklch(0.511 0.262 276.966)"
  //const hoverColor = "rgb(219, 39, 119)";

  return (
    <Link
      to={href}
      onClick={onClick}
      className={cn(
        "inline-block relative overflow-hidden font-medium rounded-full transition-all duration-300 text-center",
        "transform hover:-translate-y-1 active:translate-y-0",
        "px-6 py-3 shadow-sm hover:shadow-md",
        variant === "primary"
          ? "hover:bg-pink-600 hover:border-pink-600"
          : "hover:text-pink-600 hover:border-pink-600",
        className
      )}
      style={{
        backgroundColor: variant === "primary" ? primaryColor : "white",
        ...(typeof CSS !== "undefined" && CSS.supports("color", "oklch(0% 0 0)")
          ? {
              backgroundColor:
                variant === "primary" ? primaryColorOKLCH : "white",
            }
          : {}),
        color: variant === "primary" ? "white" : primaryColor,
        borderColor: variant === "primary" ? "transparent" : primaryColor,
        borderWidth: "1px",
        borderStyle: "solid",
      }}
    >
      <span className="relative z-10">{children}</span>
    </Link>
  )
}

{
  /*import React from "react"
import { cn } from "../../lib/utils"

type CTAButtonProps = {
  children: React.ReactNode
  href: string
  variant?: "primary" | "secondary"
  className?: string
  onClick?: () => void
}

export const CTAButton = ({
  children,
  href,
  variant = "primary",
  className,
  onClick,
}: CTAButtonProps) => {
  const primaryColor = "rgb(123, 97, 255)"
  const primaryColorOKLCH = "oklch(0.511 0.262 276.966)"

  return (
    <a
      href={href}
      onClick={onClick}
      className={cn(
        "inline-block relative overflow-hidden font-medium rounded-full transition-all duration-300 text-center",
        "transform hover:-translate-y-1 active:translate-y-0",
        "px-6 py-3 shadow-sm hover:shadow-md",
        variant === "primary" ? "hover:bg-opacity-90" : "hover:bg-gray-50",
        className
      )}
      style={{
        backgroundColor: variant === "primary" ? primaryColor : "white",
        ...(typeof CSS !== "undefined" && CSS.supports("color", "oklch(0% 0 0)")
          ? {
              backgroundColor:
                variant === "primary" ? primaryColorOKLCH : "white",
            }
          : {}),
        color: variant === "primary" ? "white" : primaryColor,
        borderColor: variant === "primary" ? "transparent" : primaryColor,
        borderWidth: "1px",
        borderStyle: "solid",
      }}
    >
      <span className="relative z-10">{children}</span>
    </a>
  )
}*/
}
