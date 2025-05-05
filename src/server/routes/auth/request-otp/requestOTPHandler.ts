import type { HandlerDBProps } from "@meow-meow-dev/server-utilities/hono"

import { generateOTP } from "#server/auth/otp"
import { storeOTP } from "#server/queries/otp"
import { errAsync, okAsync, type ResultAsync } from "neverthrow"
import * as v from "valibot"
import { sendEmail } from "#server/utils/email"
import { getUserByEmailAndRole } from "#server/queries/user"

const otpValidityInMinutes = 5

export const requestOTPJSONSchema = v.strictObject({
  email: v.pipe(v.string(), v.email()),
})

type RequestOTPHandlerProps = HandlerDBProps & {
  developmentMode: boolean
  recipient: string
  resendApiKey: string
  sender: string
}

export function requestOTPHandler({
  db,
  developmentMode,
  recipient,
  resendApiKey,
  sender,
}: RequestOTPHandlerProps): ResultAsync<void, "internal_server_error"> {
  const code = generateOTP({ length: 6 })

  const validity = new Date()
  validity.setTime(validity.getTime() + otpValidityInMinutes * 60 * 1000)

  return storeOTP({
    db,
    otp: { code, email: recipient, validity: validity.toISOString() },
  }).andThen(() => {
    if (developmentMode) {
      console.log({ code })
      return okAsync(undefined)
    } else {
      return getUserByEmailAndRole({
        db,
        email: recipient,
        role: "registered_user",
      })
        .orElse((error) =>
          error === "not_found" ? okAsync(undefined) : errAsync(error)
        )
        .andThen((user) => {
          const subject = `[Ucolorr] Your one-time password`
          const firstName = user ? ` ${user.firstName}` : ""
          const body = `
        <p>Hello${firstName},</p>
        <p>Your one-time password for <a href="https://ucolorr.app">Ucolorr</a> is <span style="font-weight: bold">${code}</span></p>
        <br>
        <hr>
        <p>This password is valid for ${otpValidityInMinutes} minutes. Don't share it with anyone.</p>`

          return sendEmail({
            body,
            recipient,
            resendApiKey,
            sender,
            subject,
          })
          return okAsync(undefined)
        })
    }
  })
}
