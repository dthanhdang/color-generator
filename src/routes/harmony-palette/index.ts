import { HarmonyPalette } from "#pages/harmony_palette"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/harmony-palette/")({
  component: HarmonyPalette,
})
