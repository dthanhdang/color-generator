import { RandomPalette } from "#pages/random"
import { buildPublicPageProps } from "#utils/buildPageProps.ts"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/random-palette/")({
  component: RandomPalette,
  loader: () =>
    buildPublicPageProps("Your *Random Palette* Generator", {
      seoDescription:
        "Feel like experimenting ? Quickly and easily generate a color palette using our random generator",
    }),
})
