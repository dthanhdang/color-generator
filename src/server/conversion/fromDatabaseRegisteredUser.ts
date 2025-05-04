import type { RegisteredUser } from "#server/types"
import type { User as DatabaseUser } from "#server/types/database"
import type { Selectable } from "kysely"

export function fromDatabaseRegisteredUser({
  firstName,
  lastName,
  ...user
}: Selectable<DatabaseUser>): RegisteredUser {
  const identity = { firstName, lastName }

  return {
    ...user,
    favoritePalettes: [],
    identity,
    privatePalettes: [],
    role: "registered_user",
  }
}
