import { ScalePaletteGenerator } from "#pages/scale_palette"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/scale-palette/")({
  component: ScalePaletteGenerator,
})
