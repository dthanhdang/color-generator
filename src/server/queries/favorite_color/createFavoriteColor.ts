import type { FavoriteColor, DB } from "#server/types/database";
import type { Insertable, Selectable } from "kysely";

import { createQuery } from "@meow-meow-dev/server-utilities/queries";

type CreateColorProps = {
  color: Omit<Insertable<FavoriteColor>, "id">;
};

export const createFavoriteColor = createQuery<
  DB,
  CreateColorProps,
  Selectable<FavoriteColor>
>(({ color, db }) =>
  db
    .insertInto("favoriteColor")
    .values(color)
    .returning("id")
    .executeTakeFirst()
    .then((row) => (row ? { ...color, id: row.id } : undefined))
);
