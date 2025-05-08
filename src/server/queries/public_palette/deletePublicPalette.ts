import type { DB } from "#server/types/database"

import { deleteQuery } from "@meow-meow-dev/server-utilities/queries"

type DeletePublicPaletteProps = { id: number }

export const deletePublicPalette = deleteQuery<DB, DeletePublicPaletteProps>(
  ({ db, id }) =>
    db
      .deleteFrom("publicPalette")
      .where("id", "=", id)
      .where("likes", "=", 0)
      .returning("id")
      .executeTakeFirst()
      .then((row) => row?.id)
)
