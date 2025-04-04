import { HarmonyPalette } from "#pages/harmony_palette"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/harmony-palette/")({
  component: HarmonyPalette,
  loader: () => ({
    crumb: "Harmony palette",
    seoDescription:
      "Quickly and easily create a beautiful scale palette using our generator",
    seoTitle: "Your Harmony Palette generator",
  }),
})
