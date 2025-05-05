import type { JSX, ReactNode } from "react"
import { SeoTags } from "#client/components/seo_tags"
import { twMerge } from "tailwind-merge"
import { useTitles } from "#client/hooks"
import { PageTitle } from "./PageTitle.jsx"

type PageStyleProps = {
  children: ReactNode
  className?: string
}

export function PageStyle({
  children,
  className,
}: PageStyleProps): JSX.Element {
  const { pageTitle } = useTitles()

  return (
    <main className={twMerge("container mx-auto p-4", className)}>
      <SeoTags />

      {pageTitle ? <PageTitle>{pageTitle}</PageTitle> : undefined}

      {children}
    </main>
  )
}
