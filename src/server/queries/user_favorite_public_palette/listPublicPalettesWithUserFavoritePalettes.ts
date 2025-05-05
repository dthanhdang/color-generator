import type { DB, PublicPalette } from "#server/types/database"
import type { Selectable } from "kysely"

import { listQuery } from "@meow-meow-dev/server-utilities/queries"

type ListPublicPalettesWithUserFavoritePalettesProps = {
  userId: number
}

export const listPublicPalettesWithUserFavoritePalettes = listQuery<
  DB,
  ListPublicPalettesWithUserFavoritePalettesProps,
  Selectable<PublicPalette> & { favoritePaletteId: number | undefined }
>(({ db, userId }) =>
  db
    .selectFrom("publicPalette")
    .leftJoin("userFavoritePalette", (join) =>
      join
        .onRef("userFavoritePalette.paletteId", "=", "publicPalette.id")
        .on("userFavoritePalette.userId", "=", userId)
    )
    .select([
      "colors",
      "likes",
      "userFavoritePalette.id as favoritePaletteId",
      "publicPalette.id as id",
    ])
    .orderBy("likes desc")
    .execute()
    .then((palettes) =>
      palettes.map(({ favoritePaletteId, ...palette }) => ({
        ...palette,
        favoritePaletteId: favoritePaletteId ?? undefined,
      }))
    )
)
