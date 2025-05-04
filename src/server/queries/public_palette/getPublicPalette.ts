import type { PublicPalette, DB } from "#server/types/database"
import type { Selectable } from "kysely"

import { getQuery } from "@meow-meow-dev/server-utilities/queries"
import { allFields } from "./allFields.ts"

type getPublicPaletteProps = {
  id: number
}

export const getPublicPalette = getQuery<
  DB,
  getPublicPaletteProps,
  Selectable<PublicPalette>
>(({ db, id }) =>
  db
    .selectFrom("publicPalette")
    .select(allFields)
    .where("id", "=", id)
    .executeTakeFirst()
)
