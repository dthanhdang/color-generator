import type { FavoriteColor, DB } from "#server/types/database";
import type { Selectable } from "kysely";

import { listQuery } from "@meow-meow-dev/server-utilities/queries";
import { allFields } from "./allFields.ts";

type ListFavoriteColorsProps = { userId: number };

export const listFavoriteColors = listQuery<
  DB,
  ListFavoriteColorsProps,
  Selectable<FavoriteColor>
>(({ db, userId }) =>
  db
    .selectFrom("favoriteColor")
    .select(allFields)
    .where("userId", "=", userId)
    .execute()
);
