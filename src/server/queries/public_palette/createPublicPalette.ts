import type { PublicPalette, DB } from "#server/types/database"
import type { Insertable, Selectable } from "kysely"

import { createQuery } from "@meow-meow-dev/server-utilities/queries"
import { allFields } from "./allFields.ts"

type CreatePublicPaletteProps = {
  palette: Omit<Insertable<PublicPalette>, "id">
}

export const createPublicPalette = createQuery<
  DB,
  CreatePublicPaletteProps,
  Selectable<PublicPalette>
>(({ palette, db }) =>
  db
    .insertInto("publicPalette")
    .values(palette)
    // don't actually update anything but still return rows
    .onConflict((cb) =>
      cb.column("colors").doUpdateSet({ colors: palette.colors })
    )
    .returning(allFields)
    .executeTakeFirst()
)
