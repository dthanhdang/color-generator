import type { RegisteredUser } from "#server/types"
import type {
  User,
  PrivatePalette,
  PublicPalette,
} from "#server/types/database"
import type { Selectable } from "kysely"
import { err, ok, Result } from "neverthrow"

type FromDatabaseRegisteredUserProps = {
  favoritePalettes: Selectable<PublicPalette>[]
  privatePalettes: Selectable<PrivatePalette>[]
  user: Selectable<User>
}
export function fromDatabaseFullRegisteredUser({
  favoritePalettes,
  privatePalettes,
  user: { firstName, lastName, role, ...user },
}: FromDatabaseRegisteredUserProps): Result<RegisteredUser, "not_found"> {
  if (role !== "registered_user") return err("not_found")

  const identity = { firstName, lastName }

  return ok({
    ...user,
    favoritePalettes,
    identity,
    privatePalettes,
    role,
  })
}
