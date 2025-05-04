import type { DB, User } from "#server/types/database"
import type { Selectable } from "kysely"

import { getQuery } from "@meow-meow-dev/server-utilities/queries"

type GetUserByIdProps = {
  id: number
}

export const getUserById = getQuery<DB, GetUserByIdProps, Selectable<User>>(
  ({ db, id }) =>
    db
      .selectFrom("user")
      .select(["email", "id", "firstName", "lastName", "role"])
      .where("id", "=", id)
      .executeTakeFirst()
)
