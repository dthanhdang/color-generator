import React, { useEffect, useRef } from "react"
import { cn } from "../../lib/utils"

type FeatureCardProps = {
  title: string
  description: string
  icon: React.ReactNode
  color?: "red" | "orange" | "green" | "blue" | "purple"
  delay?: number
}

export const FeatureCard = ({
  title,
  description,
  icon,
  color = "blue",
  delay = 0,
}: FeatureCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add("visible")
          }, delay)
        }
      },
      { threshold: 0.1 }
    )

    if (cardRef.current) {
      observer.observe(cardRef.current)
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current)
      }
    }
  }, [delay])

  const colorClasses = {
    red: {
      background: "bg-red-50",
      hover: "hover:bg-red-100 hover:shadow-red-100/30",
      border: "border-red-100",
    },
    orange: {
      background: "bg-orange-50",
      hover: "hover:bg-orange-100 hover:shadow-orange-100/30",
      border: "border-orange-100",
    },
    green: {
      background: "bg-emerald-50",
      hover: "hover:bg-emerald-100 hover:shadow-emerald-100/30",
      border: "border-emerald-100",
    },
    blue: {
      background: "bg-blue-50",
      hover: "hover:bg-blue-100 hover:shadow-blue-100/30",
      border: "border-blue-100",
    },
    purple: {
      background: "bg-violet-50",
      hover: "hover:bg-violet-100 hover:shadow-violet-100/30",
      border: "border-violet-100",
    },
  }

  return (
    <div
      ref={cardRef}
      className={cn(
        "animate-on-scroll transition-all duration-300",
        "bg-white rounded-xl shadow-sm h-full",
        "group hover:-translate-y-1 hover:shadow-lg",
        colorClasses[color].hover
      )}
    >
      <div
        className={cn(
          "w-full h-64 rounded-t-xl flex items-center justify-center",
          colorClasses[color].background
        )}
      >
        <div className="text-gray-800 transform transition-transform group-hover:scale-110">
          {icon}
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold mb-3">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  )
}
