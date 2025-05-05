import type { UserRole } from "#server/types"
import type { DB, User } from "#server/types/database"
import type { Selectable, SelectQueryBuilder } from "kysely"

import { listQuery } from "@meow-meow-dev/server-utilities/queries"
import { allFields } from "./allFields.ts"

type ListUsersByRoleProps = {
  limit?: number
  role?: UserRole
}

function withOptionalLimit<DB, TB extends keyof DB, O>(
  db: SelectQueryBuilder<DB, TB, O>,
  limit: number | undefined
): SelectQueryBuilder<DB, TB, O> {
  return limit === undefined ? db : db.limit(limit)
}

export const listUsersByRole = listQuery<
  DB,
  ListUsersByRoleProps,
  Selectable<User>
>(({ db, limit, role }) => {
  const query = db.selectFrom("user").select(allFields)

  return withOptionalLimit(
    role ? query.where("role", "=", role) : query,
    limit
  ).execute()
})
