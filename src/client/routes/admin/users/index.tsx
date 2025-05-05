import { ListUsersPage } from "#client/pages/admin/list_users"
import { listUsersQuery } from "#client/tanstack/query/queries/admin"
import { useSuspenseQuery } from "@tanstack/react-query"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/admin/users/")({
  component: PageWrapper,
  loader: async ({ context: { queryClient } }) => {
    const query = listUsersQuery()

    await queryClient.ensureQueryData(query)

    return { query, seoTitle: "Users" }
  },
})

function PageWrapper() {
  const { query } = Route.useLoaderData()
  const {
    data: { users },
  } = useSuspenseQuery(query)

  return <ListUsersPage users={users} />
}
