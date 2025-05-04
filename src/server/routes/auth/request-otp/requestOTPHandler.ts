import type { HandlerDBProps } from "@meow-meow-dev/server-utilities/hono"

import { generateOTP } from "#server/auth/otp"
import { storeOTP } from "#server/queries/otp"
import { okAsync, type ResultAsync } from "neverthrow"
import * as v from "valibot"

export const requestOTPJSONSchema = v.strictObject({
  email: v.pipe(v.string(), v.email()),
})

type RequestOTPHandlerProps = HandlerDBProps &
  v.InferOutput<typeof requestOTPJSONSchema>

export function requestOTPHandler({
  db,
  email,
}: RequestOTPHandlerProps): ResultAsync<void, "internal_server_error"> {
  const code = generateOTP({ length: 6 })

  console.log({ code })

  const validity = new Date()
  validity.setTime(validity.getTime() + 5 * 60 * 1000)

  return storeOTP({
    db,
    otp: { code, email, validity: validity.toISOString() },
  }).andThen(() => okAsync(undefined))
}
