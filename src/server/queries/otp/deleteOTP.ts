import type { DB } from "#server/types/database"
import type { Query } from "@meow-meow-dev/server-utilities/queries"

import { resultAsyncFromPromise } from "@meow-meow-dev/server-utilities/neverthrow"
import { buildKysely } from "@meow-meow-dev/server-utilities/queries"

type DeleteOTPProps = { email: string }

// Not using deleteQuery as still want to succeed when deleting a non-existent row

export const deleteOTP: Query<
  DeleteOTPProps,
  undefined,
  "internal_server_error"
> = ({ db, email }) => {
  const kysely = buildKysely<DB>(db)

  return resultAsyncFromPromise(
    kysely
      .deleteFrom("otp")
      .where("email", "=", email)
      .execute()
      .then(() => undefined)
  )
}
