import type { UserSummary } from "#server/types"
import type { HandlerDBProps } from "@meow-meow-dev/server-utilities/hono"

import { validateOTP } from "#server/auth/otp"
import { fromDatabaseUser } from "#server/conversion"
import { createUser } from "#server/queries/user"
import { nonEmptyStringSchema } from "@meow-meow-dev/server-utilities/validation"
import { okAsync, type ResultAsync } from "neverthrow"
import * as v from "valibot"
import { toIsoDate } from "#server/utils/date"

const codeSchema = v.pipe(v.string(), v.regex(/^\d{6}$/))

export const registerJsonSchema = v.strictObject({
  code: codeSchema,
  email: v.pipe(v.string(), v.email()),
  firstName: nonEmptyStringSchema,
  lastName: nonEmptyStringSchema,
})

type registerHandlerProps = HandlerDBProps &
  v.InferOutput<typeof registerJsonSchema>

export function registerHandler({
  code,
  db,
  email,
  firstName,
  lastName,
}: registerHandlerProps): ResultAsync<
  UserSummary,
  | "administrator_already_exists"
  | "internal_server_error"
  | "invalid_or_expired_code"
  | "user_already_exists"
> {
  return validateOTP({
    code,
    db,
    email,
  }).andThen(() => {
    const date = toIsoDate(new Date())
    return createUser({
      db,
      user: {
        email,
        firstName,
        lastName,
        lastSignInDate: date,
        role: "registered_user",
        signUpDate: date,
      },
    }).andThen((user) => okAsync(fromDatabaseUser(user)))
  })
}
