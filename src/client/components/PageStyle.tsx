import type { ReactNode } from "react"
import { SeoTags } from "#client/components/seo_tags"
import { clsx } from "clsx"

type PageStyleProps = {
  children: ReactNode
  title: string
}

export function PageStyle({ title, children }: PageStyleProps) {
  const parts = title.split("*").filter((part) => part !== "")
  const highlightedModulo = title[0] === "*" ? 0 : 1

  return (
    <main className="container mx-auto p-4">
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
