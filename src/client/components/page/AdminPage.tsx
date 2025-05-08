import { SeoTags } from "#components/seo_tags/SeoTags.tsx"
import { Title } from "@mantine/core"
import type { JSX, ReactNode } from "react"
import { useTitles } from "#client/hooks"
import { Breadcrumbs } from "#client/breadcrumbs"

type AdminPageProps = {
  children: ReactNode
}

export function AdminPage({ children }: AdminPageProps): JSX.Element {
  const titles = useTitles()
  const pageTitle = titles?.pageTitle

  return (
    <main className="mt-20 p-5 lg:mx-auto">
      <SeoTags />

      <Breadcrumbs className="mb-10" />

      {pageTitle ? (
        <Title className="text-center mb-10" order={1}>
          {pageTitle}
        </Title>
      ) : undefined}

      {children}
    </main>
  )
}
