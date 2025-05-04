import type { Otp } from "#server/types"

import { storeOTP as storeOTPBase } from "#server/queries/otp"
import { okAsync, ResultAsync } from "neverthrow"

export type StoreOTPProps = {
  db: D1Database
  otp: Otp
}

export function storeOTP({
  db,
  otp: { validity, ...otp },
}: StoreOTPProps): ResultAsync<void, "internal_server_error"> {
  return storeOTPBase({
    db,
    otp: { ...otp, validity: validity.toISOString() },
  }).andThen(() => okAsync())
}
