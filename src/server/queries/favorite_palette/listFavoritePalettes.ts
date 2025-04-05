import type { FavoritePalette, DB } from "#server/types/database"
import type { Selectable } from "kysely"

import { listQuery } from "@meow-meow-dev/server-utilities/queries"
import { allFields } from "./allFields.ts"

type ListFavoritePalettesProps = { userId: number }

export const listFavoritePalettes = listQuery<
  DB,
  ListFavoritePalettesProps,
  Selectable<FavoritePalette>
>(({ db, userId }) =>
  db
    .selectFrom("favoritePalette")
    .select(allFields)
    .where("userId", "=", userId)
    .execute()
)
