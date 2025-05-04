import type { DB } from "#server/types/database"

import { deleteQuery } from "@meow-meow-dev/server-utilities/queries"

type DeleteUserProps = { userId: number }

export const deleteRegisteredUser = deleteQuery<DB, DeleteUserProps>(
  ({ db, userId }) =>
    db
      .deleteFrom("user")
      .where("id", "=", userId)
      .returning("id")
      .executeTakeFirst()
      .then((row) => row?.id)
)
