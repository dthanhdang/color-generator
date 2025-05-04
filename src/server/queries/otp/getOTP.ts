import type { DB, Otp } from "#server/types/database"
import type { Selectable } from "kysely"

import { getQuery } from "@meow-meow-dev/server-utilities/queries"

type GetOTPProps = { email: string }

export const getOTP = getQuery<DB, GetOTPProps, Selectable<Otp>>(
  ({ db, email }) =>
    db
      .selectFrom("otp")
      .select(["code", "email", "validity"])
      .where("email", "=", email)
      .executeTakeFirst()
)
