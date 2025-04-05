import type { FavoritePalette, DB } from "#server/types/database"
import type { Insertable, Selectable } from "kysely"

import { createQuery } from "@meow-meow-dev/server-utilities/queries"

type CreateFavoritePaletteProps = {
  palette: Omit<Insertable<FavoritePalette>, "id">
}

export const createPalette = createQuery<
  DB,
  CreateFavoritePaletteProps,
  Selectable<FavoritePalette>
>(({ palette, db }) =>
  db
    .insertInto("favoritePalette")
    .values(palette)
    .returning("id")
    .executeTakeFirst()
    .then((row) => (row ? { ...palette, id: row.id } : undefined))
)
