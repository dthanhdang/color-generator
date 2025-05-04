import type { DB, User } from "#server/types/database"
import type { Query, QueryProps } from "@meow-meow-dev/server-utilities/queries"
import type { Insertable, Selectable } from "kysely"

import { internalServerErrorFactory } from "@meow-meow-dev/server-utilities/neverthrow"
import { buildKysely } from "@meow-meow-dev/server-utilities/queries"
import { errAsync, okAsync, ResultAsync } from "neverthrow"

type CreateUserProps = {
  user: Omit<Insertable<User>, "id">
}

export const createUser: Query<
  CreateUserProps,
  Selectable<User>,
  "internal_server_error" | "user_already_exists"
> = ({ db, user }: QueryProps<D1Database, CreateUserProps>) => {
  let errorStatus: "internal_server_error" | "user_already_exists" =
    "internal_server_error"

  return ResultAsync.fromPromise(
    buildKysely<DB>(db)
      .insertInto("user")
      .values(user)
      .onConflict((oc) => {
        errorStatus = "user_already_exists"
        return oc.doNothing()
      })
      .returning(["id"])
      .executeTakeFirst()
      .then((row) => (row ? { ...user, id: row.id } : errorStatus)),
    internalServerErrorFactory
  ).andThen((userOrError) =>
    typeof userOrError === "string"
      ? errAsync(userOrError)
      : okAsync(userOrError)
  )
}
