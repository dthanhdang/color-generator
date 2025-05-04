import type { DB, PrivatePalette } from "#server/types/database"
import type { Selectable } from "kysely"

import { listQuery } from "@meow-meow-dev/server-utilities/queries"
import { allFields } from "./allFields.ts"

type ListUserPalettesProps = { userId: number }

export const listUserPrivatePalettes = listQuery<
  DB,
  ListUserPalettesProps,
  Selectable<PrivatePalette>
>(({ db, userId }) =>
  db
    .selectFrom("privatePalette")
    .select(allFields)
    .where("userId", "=", userId)
    .execute()
)
