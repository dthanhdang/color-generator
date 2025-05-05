import { HarmonyPalette } from "#pages/harmony_palette"
import { buildPublicPageProps } from "#utils/buildPageProps.ts"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/harmony-palette/")({
  component: HarmonyPalette,
  loader: () =>
    buildPublicPageProps("Your *Harmony Palette* Generator", {
      seoDescription:
        "Quickly and easily create a beautiful scale palette using our generator",
    }),
})
