import type { PublicPalette, DB } from "#server/types/database"
import type { Updateable } from "kysely"

import { updateQuery } from "@meow-meow-dev/server-utilities/queries"
import { allFields } from "./allFields.ts"

type UpdateablePublicPalette = Required<Updateable<PublicPalette>>

type UpdatePublicPaletteProps = {
  delta: 1 | -1
  id: number
}

export const updatePublicPaletteLikes = updateQuery<
  DB,
  UpdatePublicPaletteProps,
  UpdateablePublicPalette
>(({ db, delta, id }) =>
  db
    .updateTable("publicPalette")
    .set((eb) => ({ likes: eb("likes", delta === 1 ? "+" : "-", 1) }))
    .where("id", "=", id)
    .returning(allFields)
    .executeTakeFirst()
    .then((row) => (row ? { ...row, id } : undefined))
)
