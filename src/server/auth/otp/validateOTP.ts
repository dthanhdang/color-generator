import type { ResultAsync } from "neverthrow"

import { deleteOTP, getOTP } from "#server/queries/otp"
import { err, errAsync, okAsync } from "neverthrow"

type ValidateOTPProps = {
  code: string
  db: D1Database
  email: string
}

export function validateOTP({
  code,
  db,
  email,
}: ValidateOTPProps): ResultAsync<
  undefined,
  "internal_server_error" | "invalid_or_expired_code"
> {
  return getOTP({ db, email })
    .andThen((otp) => {
      const validity = new Date(otp.validity)
      const isOutdated = validity < new Date()

      const deleteOTPResult =
        isOutdated || otp.code === code
          ? deleteOTP({ db, email }).orElse((error) => err(error))
          : okAsync(undefined)

      return deleteOTPResult.andThen(() =>
        otp.code === code && validity >= new Date()
          ? okAsync(undefined)
          : errAsync("invalid_or_expired_code" as const)
      )
    })
    .orElse((error) =>
      error === "not_found" ? err("invalid_or_expired_code") : err(error)
    )
}
