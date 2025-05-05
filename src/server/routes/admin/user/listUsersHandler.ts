import type { HandlerDBProps } from "@meow-meow-dev/server-utilities/hono"
import type { ResultAsync } from "neverthrow"
import * as v from "valibot"
import { listUsersByRole } from "#server/queries/user"
import type { UserSummary } from "#server/types"
import { okAsync } from "neverthrow"
import { userRoleSchema, userSummarySchema } from "#server/schemas"

export const listUsersQuerySchema = v.strictObject({
  role: v.optional(userRoleSchema),
})

type ListUsersHandlerHandlerProps = HandlerDBProps &
  v.InferOutput<typeof listUsersQuerySchema>

export function listUsersHandler({
  ...props
}: ListUsersHandlerHandlerProps): ResultAsync<
  UserSummary[],
  "internal_server_error" | "not_found"
> {
  return listUsersByRole(props).andThen((users) =>
    okAsync(
      users
        .map(({ firstName, lastName, ...user }) => ({
          ...user,
          identity: { firstName, lastName },
        }))
        .map((user) => v.parse(userSummarySchema, user))
    )
  )
}
