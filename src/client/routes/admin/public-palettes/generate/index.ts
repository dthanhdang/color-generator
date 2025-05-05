import { GeneratePublicPalettesPage } from "#client/pages/admin/generate_public_palettes"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/admin/public-palettes/generate/")({
  component: GeneratePublicPalettesPage,
  loader: () => ({ seoTitle: "Generate random palettes" }),
})
