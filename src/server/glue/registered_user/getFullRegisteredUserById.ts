import type { RegisteredUser } from "#server/types"
import { okAsync, ResultAsync } from "neverthrow"
import { getUserById } from "#server/queries/user"
import { listUserFavoritePublicPalettes } from "#server/queries/user_favorite_public_palette"
import { fromDatabaseFullRegisteredUser } from "#server/conversion"
import { listUserPrivatePalettes } from "#server/queries/user_private_palette"

type GetRegisteredUserByIdProps = { db: D1Database; userId: number }

export function getFullRegisteredUserById({
  db,
  userId,
}: GetRegisteredUserByIdProps): ResultAsync<
  RegisteredUser,
  "internal_server_error" | "not_found"
> {
  return ResultAsync.combine([
    getUserById({ db, id: userId }),
    listUserFavoritePublicPalettes({ db, userId }),
    listUserPrivatePalettes({ db, userId }),
  ])
    .andThen(([user, favoritePalettes, privatePalettes]) =>
      fromDatabaseFullRegisteredUser({
        favoritePalettes,
        privatePalettes,
        user,
      })
    )
    .andThen((user) => okAsync(user))
}
