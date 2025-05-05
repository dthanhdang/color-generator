import type { UserRole } from "#server/types"
import type { DB, User } from "#server/types/database"
import type { Selectable } from "kysely"

import { getQuery } from "@meow-meow-dev/server-utilities/queries"
import { allFields } from "./allFields.ts"

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
    .select(allFields)
    .where("email", "=", email)
    .where("role", "=", role)
    .executeTakeFirst()
)
