import type { DB, Otp } from "#server/types/database"
import type { Insertable, Selectable } from "kysely"

import { createQuery } from "@meow-meow-dev/server-utilities/queries"

export type StoreOTPProps = {
  otp: Insertable<Otp>
}

export const storeOTP = createQuery<DB, StoreOTPProps, Selectable<Otp>>(
  ({ db, otp }) =>
    db
      .insertInto("otp")
      .values(otp)
      .onConflict((oc) =>
        oc
          .column("email")
          .doUpdateSet({ code: otp.code, validity: otp.validity })
      )
      .returning("email")
      .executeTakeFirst()
      .then((row) => (row ? otp : undefined))
)
