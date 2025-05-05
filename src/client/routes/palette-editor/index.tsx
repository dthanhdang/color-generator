import { createFileRoute } from "@tanstack/react-router"
import * as v from "valibot"
import { EditPalettePage } from "#pages/edit_palette"
import { useSuspenseQuery } from "@tanstack/react-query"
import { listCurrentUserFavoritePalettes } from "#client/rpc/current_user"
import { useAuthentication } from "#client/hooks"
import { parseChromaPalette } from "#utils/parseChromaPalette.ts"
import { getUserFromLocalStorage } from "#client/auth"
import { buildPublicPageProps } from "#utils/buildPageProps.ts"

const searchSchema = v.strictObject({ colors: v.optional(v.string()) })

export const Route = createFileRoute("/palette-editor/")({
  component: PageWrapper,
  loaderDeps: ({ search }) => {
    const isAuthenticated =
      getUserFromLocalStorage("registered_user") !== undefined

    return { isAuthenticated, search }
  },
  loader: async ({
    context: { queryClient },
    deps: { isAuthenticated, search },
  }) => {
    const query = getQuery(search, isAuthenticated)

    await queryClient.ensureQueryData(query)

    return { ...buildPublicPageProps("Your *Palette* Editor"), query }
  },
  validateSearch: searchSchema,
})

function getQuery(
  search: v.InferOutput<typeof searchSchema>,
  isAuthenticated: boolean
) {
  const { colors } = search
  return colors !== undefined && isAuthenticated === true
    ? {
        queryFn: () => listCurrentUserFavoritePalettes({ colors }),
        queryKey: ["CURRENT_USER", "PALETTE", "FAVORITE", "COLORS", colors],
      }
    : {
        queryFn: async () => [],
        queryKey: ["CURRENT_USER", "PALETTE", "FAVORITE", "EMPTY"],
      }
}

function AuthenticatedPageWrapper() {
  const { query } = Route.useLoaderData()
  const { colors } = Route.useSearch()

  const { data: palettes } = useSuspenseQuery(query)

  const palette = palettes.length === 1 ? palettes[0] : undefined

  return (
    <EditPalettePage
      favoritePalette={palette}
      palette={
        // TODO simplify this crap
        (colors ? parseChromaPalette(colors) : undefined) ?? palette?.colors
      }
    />
  )
}

function UnauthenticatedPageWrapper() {
  const { colors } = Route.useSearch()

  const palette = colors ? parseChromaPalette(colors) : undefined

  return <EditPalettePage palette={palette} />
}

function PageWrapper() {
  const { user } = useAuthentication()
  if (user && user.role === "registered_user")
    return <AuthenticatedPageWrapper />
  else return <UnauthenticatedPageWrapper />
}
