import type { DB } from "#server/types/database"

import { getQuery } from "@meow-meow-dev/server-utilities/queries"

type getPublicPaletteByColorsProps = {
  colors: string
  userId: number
}

export const getUserFavoritePublicPaletteByColors = getQuery<
  DB,
  getPublicPaletteByColorsProps,
  {
    colors: string
    id: number
    likes: number
    favoritePaletteId: number | undefined
  }
>(({ colors, db, userId }) =>
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
      "publicPalette.id as id",
      "userFavoritePalette.id as favoritePaletteId",
    ])
    .where("colors", "=", colors)
    .executeTakeFirst()
    .then((palette) => {
      return palette
        ? {
            ...palette,
            favoritePaletteId: palette.favoritePaletteId ?? undefined,
          }
        : palette
    })
)
