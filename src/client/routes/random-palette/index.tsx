import { getCurrentUserQuery } from "#client/tanstack/query/queries/public/current_user"
import { RandomPalette } from "#pages/random"
import { useSuspenseQuery } from "@tanstack/react-query"
import { createFileRoute } from "@tanstack/react-router"
import type { JSX } from "react"
import * as v from "valibot"

export const Route = createFileRoute("/random-palette/")({
  loader: async ({ context: { queryClient } }) => {
    const query = getCurrentUserQuery

    await queryClient.ensureQueryData(query)

    return { query }
  },
  component: PageWrapper,
  validateSearch: v.looseObject({
    palette_id: v.optional(v.pipe(v.number(), v.integer())),
  }),
})

function PageWrapper(): JSX.Element {
  const { query } = Route.useLoaderData()
  const {
    data: { user },
  } = useSuspenseQuery(query)
  const search = Route.useSearch()

  return <RandomPalette paletteId={search.palette_id} user={user} />
}
