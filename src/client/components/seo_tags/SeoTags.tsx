import type { JSX } from "react"
import { useSeoTags } from "#client/hooks"

export function SeoTags(): JSX.Element | null {
  const tags = useSeoTags()
  if (!tags) return null

  const { seoDescription, seoTitle } = tags

  const mode = import.meta.env.MODE

  const displayedTitle = seoTitle
    ? mode === "production"
      ? `${seoTitle} | Ucolorr`
      : `${seoTitle} | Ucolorr [${mode}]`
    : undefined

  return (
    <>
      {seoDescription ? (
        <meta name="description" content={seoDescription} />
      ) : null}
      {displayedTitle ? <title>{displayedTitle}</title> : null}
    </>
  )
}
