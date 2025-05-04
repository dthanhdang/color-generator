import { SeoTags } from "#components/seo_tags/SeoTags.tsx"
import { Card, Title } from "@mantine/core"
import type { JSX, ReactNode } from "react"

type AuthPageProps = {
  children: ReactNode
  pageTitle: string
}

export function AuthPage({ children, pageTitle }: AuthPageProps): JSX.Element {
  return (
    <Card
      className="mx-5 lg:mx-auto mt-[10%] lg:w-2/5"
      component="main"
      padding="lg"
      radius="md"
      shadow="sm"
      withBorder
    >
      <SeoTags />

      <Title className="text-center" order={1}>
        {pageTitle}
      </Title>

      {children}
    </Card>
  )
}
