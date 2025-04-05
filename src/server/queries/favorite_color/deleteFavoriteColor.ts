import type { DB } from "#server/types/database";

import { deleteQuery } from "@meow-meow-dev/server-utilities/queries";

type DeleteFavoriteColorProps = { id: number; userId: number };

export const deleteFavoriteColor = deleteQuery<DB, DeleteFavoriteColorProps>(
  ({ db, id, userId }) =>
    db
      .deleteFrom("favoriteColor")
      .where("id", "=", id)
      .where("userId", "=", userId)
      .returning("id")
      .executeTakeFirst()
      .then((row) => row?.id)
);
