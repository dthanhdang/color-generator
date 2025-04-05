import { RandomPalette } from "#pages/random"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/random-palette/")({
  component: RandomPalette,
  loader: () => ({
    crumb: "Random palette",
    seoDescription:
      "Feel like experimenting ? Quickly and easily generate a color palette using our random generator",
    seoTitle: "Your Random Palette Generator",
  }),
})
