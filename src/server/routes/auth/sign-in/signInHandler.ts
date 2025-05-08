import type { UserSummary } from "#server/types"
import type { HandlerDBProps } from "@meow-meow-dev/server-utilities/hono"

import { validateOTP } from "#server/auth/otp"
import {
  getUserByEmailAndRole,
  updateRegisteredUser,
} from "#server/queries/user"
import { okAsync, type ResultAsync } from "neverthrow"
import * as v from "valibot"
import { fromDatabaseUser } from "#server/conversion"
import { toIsoDate } from "#server/utils/date"

const codeSchema = v.pipe(v.string(), v.regex(/^\d{6}$/))

export const signInJSONSchema = v.strictObject({
  code: codeSchema,
  email: v.pipe(v.string(), v.email()),
  role: v.optional(v.literal("administrator")),
})

type SignInHandlerProps = HandlerDBProps &
  v.InferOutput<typeof signInJSONSchema>

export function signInHandler({
  code,
  db,
  email,
  role,
}: SignInHandlerProps): ResultAsync<
  UserSummary,
  "internal_server_error" | "invalid_or_expired_code" | "not_found"
> {
  const lastSignInDate = toIsoDate(new Date())

  return validateOTP({ code, db, email })
    .andThen(() =>
      getUserByEmailAndRole({
        db,
        email,
        role: role ?? "registered_user",
      })
    )
    .andThen((user) =>
      updateRegisteredUser({ db, user: { id: user.id, lastSignInDate } })
    )
    .andThen((user) => okAsync(fromDatabaseUser(user)))
}
