import { HarmonyPalette } from "#pages/harmony_palette"
import { createFileRoute } from "@tanstack/react-router"
import { getCurrentUserQuery } from "#client/tanstack/query/queries/public/current_user"
import { useSuspenseQuery } from "@tanstack/react-query"
import type { JSX } from "react"
import * as v from "valibot"

export const Route = createFileRoute("/harmony-palette/")({
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

  return <HarmonyPalette paletteId={search.palette_id} user={user} />
}
