import type { HandlerResendApiKeyProps, UserSummary } from "#server/types"
import type {
  HandlerAuthenticationProps,
  HandlerDBProps,
} from "@meow-meow-dev/server-utilities/hono"

import { fromDatabaseUser } from "#server/conversion"
import { createUser, getUserById } from "#server/queries/user"
import { nonEmptyStringSchema } from "@meow-meow-dev/server-utilities/validation"
import { okAsync, ResultAsync } from "neverthrow"
import * as v from "valibot"
import type { AccessToken } from "#server/auth/jwt"
import { sendEmail } from "#server/utils/email"
import { toIsoDate } from "#server/utils/date"

export const createAdministratorJSONSchema = v.strictObject({
  email: v.pipe(v.string(), v.email()),
  firstName: nonEmptyStringSchema,
  lastName: nonEmptyStringSchema,
})

type CreateAdministratorHandlerProps = HandlerDBProps &
  HandlerAuthenticationProps<AccessToken> &
  HandlerResendApiKeyProps & { contactEmail: string } & v.InferOutput<
    typeof createAdministratorJSONSchema
  >

export function createAdministratorHandler({
  accessToken: { userId },
  contactEmail,
  db,
  email,
  firstName,
  lastName,
  resendApiKey,
}: CreateAdministratorHandlerProps): ResultAsync<
  UserSummary,
  "internal_server_error" | "not_found" | "user_already_exists"
> {
  const date = toIsoDate(new Date())
  return ResultAsync.combine([
    createUser({
      db,
      user: {
        email,
        firstName,
        lastName,
        lastSignInDate: date,
        role: "administrator",
        signUpDate: date,
      },
    }),
    getUserById({ db, id: userId }),
  ]).andThen(([user, administrator]) => {
    const subject = `[Ucolorr] You're invited !`
    const body = `<p>Hello ${firstName},</p><p>${administrator.firstName} (${administrator.email}) has invited you to become an administrator.</p><p>Please visit <a href="https://ucolorr.app/admin" target="_blank">Ucolorr's admin area</a> to sign-in !</p>`

    return sendEmail({
      body,
      resendApiKey,
      subject,
      sender: contactEmail,
      recipient: email,
    }).andThen(() => okAsync(fromDatabaseUser(user)))
  })
}
