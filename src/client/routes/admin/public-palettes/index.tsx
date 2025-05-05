import { PublicPalettesPage } from "#client/pages/admin/public_palettes"
import { listPublicPalettesQuery } from "#client/tanstack/query/queries/admin"
import { useSuspenseQuery } from "@tanstack/react-query"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/admin/public-palettes/")({
  component: PageWrapper,
  loader: async ({ context: { queryClient } }) => {
    const query = listPublicPalettesQuery()

    await queryClient.ensureQueryData(query)

    return { query, seoTitle: "Public palettes" }
  },
})

function PageWrapper() {
  const { query } = Route.useLoaderData()
  const { data: palettes } = useSuspenseQuery(query)

  return <PublicPalettesPage palettes={palettes} />
}
