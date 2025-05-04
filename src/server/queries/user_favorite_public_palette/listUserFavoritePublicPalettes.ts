import type { DB, PublicPalette } from "#server/types/database"
import type { Selectable } from "kysely"

import { listQuery } from "@meow-meow-dev/server-utilities/queries"

type ListUserFavoritePublicPalettesProps = {
  filter?: { paletteId: number } | { colors: string }
  userId: number
}

export const listUserFavoritePublicPalettes = listQuery<
  DB,
  ListUserFavoritePublicPalettesProps,
  Selectable<PublicPalette>
>(({ db, userId, filter }) => {
  const query = db
    .selectFrom("userFavoritePalette")
    .innerJoin(
      "publicPalette",
      "publicPalette.id",
      "userFavoritePalette.paletteId"
    )
    .select([
      "colors",
      "likes",
      "publicPalette.id as id",
      "userId",
      "userFavoritePalette.id as favoritePaletteId",
    ])
    .where("userFavoritePalette.userId", "=", userId)
  if (!filter) return query.execute()
  else if ("paletteId" in filter)
    return query
      .where("userFavoritePalette.paletteId", "=", filter.paletteId)
      .execute()
  else return query.where("publicPalette.colors", "=", filter.colors).execute()
})
