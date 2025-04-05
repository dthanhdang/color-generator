import type { RegisteredUser } from "#server/types";
import { okAsync, ResultAsync } from "neverthrow";
import { getUserById } from "#server/queries/user";
import { listFavoriteColors } from "#server/queries/favorite_color";
import { listFavoritePalettes } from "#server/queries/favorite_palette";
import { fromDatabaseFullRegisteredUser } from "#server/conversion";

type GetRegisteredUserByIdProps = { db: D1Database; userId: number };

export function getFullRegisteredUserById({
  db,
  userId,
}: GetRegisteredUserByIdProps): ResultAsync<
  RegisteredUser,
  "internal_server_error" | "not_found"
> {
  return ResultAsync.combine([
    getUserById({ db, id: userId }),
    listFavoriteColors({ db, userId }),
    listFavoritePalettes({ db, userId }),
  ])
    .andThen(([user, favoriteColors, favoritePalettes]) =>
      fromDatabaseFullRegisteredUser({
        favoriteColors,
        favoritePalettes,
        user,
      })
    )
    .andThen((user) => okAsync(user));
}
