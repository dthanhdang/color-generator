import type { JSX } from "react"
import { useTitles } from "#client/hooks"

export function SeoTags(): JSX.Element | null {
  const titles = useTitles()
  if (!titles) return null

  const { seoDescription, seoTitle } = titles

  return (
    <>
      {seoDescription ? (
        <meta name="description" content={seoDescription} />
      ) : null}
      {seoTitle ? <title>{seoTitle}</title> : null}
    </>
  )
}
