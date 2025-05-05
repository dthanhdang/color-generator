import type { UserSummary, UserRole } from "#server/types"
import type { HandlerDBProps } from "@meow-meow-dev/server-utilities/hono"

import { validateOTP } from "#server/auth/otp"
import { fromDatabaseUser } from "#server/conversion"
import { createUser, listUsersByRole } from "#server/queries/user"
import { administratorRoleSchema } from "#server/schemas"
import { nonEmptyStringSchema } from "@meow-meow-dev/server-utilities/validation"
import { errAsync, okAsync, type ResultAsync } from "neverthrow"
import * as v from "valibot"
import { toIsoDate } from "#server/utils/date"

const codeSchema = v.pipe(v.string(), v.regex(/^\d{6}$/))

export const signUpJSONSchema = v.strictObject({
  code: codeSchema,
  email: v.pipe(v.string(), v.email()),
  firstName: nonEmptyStringSchema,
  lastName: nonEmptyStringSchema,
  role: v.optional(administratorRoleSchema),
})

type SignUpHandlerProps = HandlerDBProps &
  v.InferOutput<typeof signUpJSONSchema>

export function signUpHandler({
  code,
  db,
  email,
  firstName,
  lastName,
  ...props
}: SignUpHandlerProps): ResultAsync<
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
    const role = props.role ?? "registered_user"

    const date = toIsoDate(new Date())
    return checkAdministratorUnicity(db, role).andThen(() =>
      createUser({
        db,
        user: {
          email,
          firstName,
          lastName,
          lastSignInDate: date,
          role,
          signUpDate: date,
        },
      }).andThen((user) => okAsync(fromDatabaseUser(user)))
    )
  })
}

function checkAdministratorUnicity(
  db: D1Database,
  role: UserRole
): ResultAsync<void, "administrator_already_exists" | "internal_server_error"> {
  return role === "administrator"
    ? listUsersByRole({ db, limit: 1, role }).andThen((users) =>
        users.length
          ? errAsync("administrator_already_exists" as const)
          : okAsync()
      )
    : okAsync()
}
