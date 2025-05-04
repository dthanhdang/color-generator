import type { UserRole } from "#server/types"
import type { DB, User } from "#server/types/database"
import type { Selectable } from "kysely"

import { getQuery } from "@meow-meow-dev/server-utilities/queries"

type GetUserByEmailAndRoleProps = {
  email: string
  role: UserRole
}

export const getUserByEmailAndRole = getQuery<
  DB,
  GetUserByEmailAndRoleProps,
  Selectable<User>
>(({ db, email, role }) =>
  db
    .selectFrom("user")
    .select(["email", "id", "firstName", "lastName", "role"])
    .where("email", "=", email)
    .where("role", "=", role)
    .executeTakeFirst()
)
