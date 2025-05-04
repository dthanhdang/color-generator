import type { UserFavoritePalette, DB } from "#server/types/database"
import type { Insertable, Selectable } from "kysely"

import { createQuery } from "@meow-meow-dev/server-utilities/queries"
import { allFields } from "./allFields.ts"

type CreateFavoritePaletteProps = {
  palette: Omit<Insertable<UserFavoritePalette>, "id">
}

export const createUserFavoritePublicPalette = createQuery<
  DB,
  CreateFavoritePaletteProps,
  Selectable<UserFavoritePalette>
>(({ palette, db }) =>
  db
    .insertInto("userFavoritePalette")
    .values(palette)
    .onConflict((cb) => cb.doUpdateSet(palette))
    .returning(allFields)
    .executeTakeFirst()
)
