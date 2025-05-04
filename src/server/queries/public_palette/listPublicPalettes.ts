import type { DB, PublicPalette } from "#server/types/database"
import type { Selectable } from "kysely"

import { listQuery } from "@meow-meow-dev/server-utilities/queries"
import { allFields } from "./allFields.ts"

export const listPublicPalettes = listQuery<
  DB,
  Record<string, unknown>,
  Selectable<PublicPalette>
>(({ db }) => db.selectFrom("publicPalette").select(allFields).execute())
