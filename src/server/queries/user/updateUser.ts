import type { DB, User } from "#server/types/database"
import type { Selectable, Updateable } from "kysely"

import { updateQuery } from "@meow-meow-dev/server-utilities/queries"
import { allFields } from "./allFields.ts"

type UpdateableRegisteredUser = Required<Selectable<User>>

type UpdateRegisteredUserProps = {
  user: Required<Pick<Updateable<User>, "id">> & Omit<Updateable<User>, "id">
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
    .returning(allFields)
    .executeTakeFirst()
    .then((row) => (row ? { ...row, id } : undefined))
)
