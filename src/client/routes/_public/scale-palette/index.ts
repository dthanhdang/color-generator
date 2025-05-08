import { ScalePaletteGenerator } from "#pages/scale_palette"
import { buildPublicPageProps } from "#utils/buildPageProps.ts"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/_public/scale-palette/")({
  component: ScalePaletteGenerator,
  loader: () =>
    buildPublicPageProps("Your *Scale Palette* Generator", {
      seoDescription:
        "Quickly and easily create a beautiful scale palette using our generator",
    }),
})
