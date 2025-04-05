import { databaseUserSchema } from "#server/schemas"
import type { User } from "#server/types"
import type { User as DatabaseUser } from "#server/types/database"
import type { Selectable } from "kysely"
import * as v from "valibot"

export function fromDatabaseUser(databaseUser: Selectable<DatabaseUser>): User {
  const { firstName, lastName, role, ...user } = v.parse(
    databaseUserSchema,
    databaseUser
  )

  const identity = { firstName, lastName }

  return {
    ...user,
    identity,
    role,
  }
}
