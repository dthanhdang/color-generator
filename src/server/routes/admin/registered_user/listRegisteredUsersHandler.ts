import type { HandlerDBProps } from "@meow-meow-dev/server-utilities/hono"
import type { ResultAsync } from "neverthrow"

import { listUsersByRole } from "#server/queries/user"
import type { User } from "#server/types"
import { okAsync } from "neverthrow"

type ListRegisteredUsersHandlerHandlerProps = HandlerDBProps

export function listRegisteredUsersHandler({
  ...props
}: ListRegisteredUsersHandlerHandlerProps): ResultAsync<
  User[],
  "internal_server_error" | "not_found"
> {
  return listUsersByRole({ ...props, role: "registered_user" }).andThen(
    (users) =>
      okAsync(
        users.map(({ firstName, lastName, ...user }) => ({
          ...user,
          identity: { firstName, lastName },
          role: "registered_user" as const,
        }))
      )
  )
}
