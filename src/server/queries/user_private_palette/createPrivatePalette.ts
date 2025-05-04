import type { DB, PrivatePalette } from "#server/types/database"
import type { Insertable, Selectable } from "kysely"

import { createQuery } from "@meow-meow-dev/server-utilities/queries"

type CreatePrivatePaletteProps = {
  palette: Omit<Insertable<PrivatePalette>, "id">
}

export const createPrivatePalette = createQuery<
  DB,
  CreatePrivatePaletteProps,
  Selectable<PrivatePalette>
>(({ palette, db }) =>
  db
    .insertInto("privatePalette")
    .values(palette)
    .returning("id")
    .executeTakeFirst()
    .then((row) => (row ? { ...palette, id: row.id } : undefined))
)
