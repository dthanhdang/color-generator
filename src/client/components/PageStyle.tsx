import type { JSX, ReactNode } from "react"
import { SeoTags } from "#client/components/seo_tags"
import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

type PageStyleProps = {
  children: ReactNode
  className?: string
  title: string
}

export function PageStyle({
  children,
  className,
  title,
}: PageStyleProps): JSX.Element {
  const parts = title.split("*").filter((part) => part !== "")
  const highlightedModulo = title[0] === "*" ? 0 : 1

  return (
    <main className={twMerge("container mx-auto p-4", className)}>
      <SeoTags />

      <h1 className="text-center text-5xl font-bold mb-14 mt-8">
        {parts.map((part, index) => (
          <span
            className={clsx({
              "text-[oklch(0.511_0.262_276.966)]":
                index % 2 === highlightedModulo,
            })}
            key={index}
          >
            {part}
          </span>
        ))}
      </h1>
      {children}
    </main>
  )
}
