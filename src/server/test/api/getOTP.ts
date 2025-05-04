import { getOTP as getOTPBase } from "#server/queries/otp"
import { env } from "cloudflare:test"

export function getOTP(email: string): Promise<string> {
  return getOTPBase({ db: env.DB, email }).match(
    ({ code }) => code,
    () => {
      throw new Error("Unable to retrieve OTP")
    }
  )
}
