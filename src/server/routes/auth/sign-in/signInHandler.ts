import type { User } from "#server/types"
import type { HandlerDBProps } from "@meow-meow-dev/server-utilities/hono"

import { validateOTP } from "#server/auth/otp"
import { getUserByEmailAndRole } from "#server/queries/user"
import { okAsync, type ResultAsync } from "neverthrow"
import * as v from "valibot"
import { fromDatabaseUser } from "#server/conversion"

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
  User,
  "internal_server_error" | "invalid_or_expired_code" | "not_found"
> {
  return validateOTP({ code, db, email })
    .andThen(() =>
      getUserByEmailAndRole({
        db,
        email,
        role: role ?? "registered_user",
      })
    )
    .andThen((user) => okAsync(fromDatabaseUser(user)))
}
