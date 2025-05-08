import type { DB, User } from "#server/types/database"
import type { Selectable } from "kysely"

import { getQuery } from "@meow-meow-dev/server-utilities/queries"
import { allFields } from "./allFields.ts"

type GetUserByIdProps = {
  id: number
}

export const getUserById = getQuery<DB, GetUserByIdProps, Selectable<User>>(
  ({ db, id }) =>
    db
      .selectFrom("user")
      .select(allFields)
      .where("id", "=", id)
      .executeTakeFirst()
)
