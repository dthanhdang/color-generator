import { RandomPalette } from "#pages/random"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/random-palette/")({
  component: RandomPalette,
})
