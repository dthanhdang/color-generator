import type { InferRequestType } from "hono"

import { apiClient } from "./apiClient.js"

const route = apiClient["request-otp"].$post

export type RequesOTPProps = InferRequestType<typeof route>["json"]

export async function requestOTP(json: RequesOTPProps): Promise<undefined> {
  try {
    await route({ json })
  } catch (error) {
    throw new Error("An unexpected error occured while sending the code", {
      cause: error,
    })
  }
}
