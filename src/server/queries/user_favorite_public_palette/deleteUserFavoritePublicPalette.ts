import type { DB } from "#server/types/database"

import { deleteQuery } from "@meow-meow-dev/server-utilities/queries"

type DeleteFavoritePaletteProps = { id: number; userId: number }

export const deleteUserFavoritePublicPalette = deleteQuery<
  DB,
  DeleteFavoritePaletteProps
>(({ db, id, userId }) =>
  db
    .deleteFrom("userFavoritePalette")
    .where("id", "=", id)
    .where("userId", "=", userId)
    .returning("id")
    .executeTakeFirst()
    .then((row) => row?.id)
)
