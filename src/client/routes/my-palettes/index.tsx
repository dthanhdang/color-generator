import { createFileRoute, Navigate } from "@tanstack/react-router"
import { FavoritePalettesPage } from "#client/pages/favorite_palettes"
import { getCurrentUserQuery } from "#client/tanstack/query/queries/public/current_user"
import type { JSX } from "react"
import { useSuspenseQuery } from "@tanstack/react-query"

export const Route = createFileRoute("/my-palettes/")({
  loader: async ({ context: { queryClient } }) => {
    const query = getCurrentUserQuery

    await queryClient.ensureQueryData(query)

    return { query }
  },
  component: PageWrapper,
})

function PageWrapper(): JSX.Element {
  const { query } = Route.useLoaderData()

  const {
    data: { user },
  } = useSuspenseQuery(query)

  if (!user) return <Navigate to="/" />

  return <FavoritePalettesPage user={user} />
}
