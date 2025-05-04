import { getUserFromLocalStorage } from "#client/auth"
import { MyPalettesPage } from "#client/pages/my-palettes"
import { getCurrentUserQuery } from "#client/tanstack/query/queries/public/current_user"
import { useSuspenseQuery } from "@tanstack/react-query"
import { createFileRoute, redirect } from "@tanstack/react-router"
import type { JSX } from "react"

export const Route = createFileRoute("/my-palettes/")({
  component: PageWrapper,
  beforeLoad: () => {
    const user = getUserFromLocalStorage("registered_user")
    if (!user)
      throw redirect({
        to: "/auth/sign-in",
        search: { redirect_to: window.location.href },
      })
  },
  loader: async ({ context: { queryClient } }) => {
    const query = getCurrentUserQuery()

    await queryClient.ensureQueryData(query)

    return { query, seoTitle: "My palettes" }
  },
})

function PageWrapper(): JSX.Element {
  const { query } = Route.useLoaderData()
  const { data: user } = useSuspenseQuery(query)

  return <MyPalettesPage palettes={user.favoritePalettes} />
}
