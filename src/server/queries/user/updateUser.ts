import type { DB, User } from "#server/types/database"
import type { Selectable, Updateable } from "kysely"

import { updateQuery } from "@meow-meow-dev/server-utilities/queries"

type UpdateableRegisteredUser = Required<Selectable<User>>

type UpdateRegisteredUserProps = {
  user: Required<Pick<Updateable<User>, "firstName" | "id" | "lastName">>
}

export const updateRegisteredUser = updateQuery<
  DB,
  UpdateRegisteredUserProps,
  UpdateableRegisteredUser
>(({ db, user: { id, ...user } }) =>
  db
    .updateTable("user")
    .set(user)
    .where("id", "=", id)
    .returning(["email", "id", "firstName", "lastName", "role"])
    .executeTakeFirst()
    .then((row) => (row ? { ...row, id } : undefined))
)
