import type { InferRequestType } from "hono"

import { apiClient } from "./apiClient.js"
import { handleError } from "#client/rpc/custom_fetch"

const route = apiClient["request-otp"].$post

export type RequesOTPProps = InferRequestType<typeof route>["json"]

export async function requestOTP(json: RequesOTPProps): Promise<undefined> {
  try {
    await route({ json })
  } catch (error) {
    handleError(error, "An unexpected error occured while sending the code")
  }
}
