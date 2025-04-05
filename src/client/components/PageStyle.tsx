import { ReactNode } from "react"
import { SeoTags } from "#client/components/seo_tags"

type PageStyleProps = {
  titleStart?: string
  titleHighlight: string
  titleEnd?: string
  children: ReactNode
}

export function PageStyle({
  titleStart = "Your",
  titleHighlight,
  titleEnd = "Generator",
  children,
}: PageStyleProps) {
  return (
    <main className="container mx-auto p-4">
      <SeoTags />

      <h1 className="text-center text-5xl font-bold mb-14 mt-8">
        {titleStart}{" "}
        <span style={{ color: "oklch(0.511 0.262 276.966)" }}>
          {titleHighlight}
        </span>{" "}
        {titleEnd}
      </h1>
      {children}
    </main>
  )
}
