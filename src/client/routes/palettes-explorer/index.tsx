import { ExplorePalettesPage } from "#client/pages/explore_palettes"
import { createFileRoute } from "@tanstack/react-router"
import { listPublicPalettesQuery } from "#client/tanstack/query/queries/public/public_palette"
import type { JSX } from "react"
import { useSuspenseQuery } from "@tanstack/react-query"
import { getUserFromLocalStorage } from "#client/auth"
import { listPublicPalettesWithUserFavoritePalettesQuery } from "#client/tanstack/query/queries/public/current_user"
import { buildPublicPageProps } from "#utils/buildPageProps.ts"

export const Route = createFileRoute("/palettes-explorer/")({
  component: PageWrapper,
  loader: async ({ context: { queryClient } }) => {
    const query = getUserFromLocalStorage()
      ? listPublicPalettesWithUserFavoritePalettesQuery()
      : listPublicPalettesQuery()
    await queryClient.ensureQueryData(query)

    return {
      ...buildPublicPageProps("Your *Palettes* Explorer"),
      query,
    }
  },
})

function PageWrapper(): JSX.Element {
  const { query } = Route.useLoaderData()
  const { data: palettes } = useSuspenseQuery(query)

  return <ExplorePalettesPage palettes={palettes} />
}
