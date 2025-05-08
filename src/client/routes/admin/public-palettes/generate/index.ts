import { GeneratePublicPalettesPage } from "#client/pages/admin/generate_public_palettes"
import type { PageProps } from "#client/types"
import { buildAdminPageProps } from "#utils/buildPageProps.ts"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/admin/public-palettes/generate/")({
  component: GeneratePublicPalettesPage,
  loader: (): PageProps =>
    buildAdminPageProps("Generate random palettes", { crumb: "Generate" }),
})
