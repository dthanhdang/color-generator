import { ScalePaletteGenerator } from "#pages/scale_palette"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/scale-palette/")({
  component: ScalePaletteGenerator,
  loader: () => ({
    crumb: "Scale palette",
    seoDescription:
      "Quickly and easily create a beautiful scale palette using our generator",
    seoTitle: "Your Scale Palette generator",
  }),
})
