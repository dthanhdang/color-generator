import React from "react"
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
  return (
    <a
      href={href}
      onClick={onClick}
      className={cn(
        "inline-block relative overflow-hidden font-medium rounded-full transition-all duration-300 text-center",
        "transform hover:-translate-y-1 active:translate-y-0",
        variant === "primary"
          ? "bg-black text-white px-6 py-3 shadow-sm hover:shadow-md hover:bg-opacity-90"
          : "bg-white text-black border border-black/10 px-6 py-3 shadow-sm hover:shadow-md hover:bg-gray-50",
        className
      )}
    >
      <span className="relative z-10">{children}</span>
    </a>
  )
}
