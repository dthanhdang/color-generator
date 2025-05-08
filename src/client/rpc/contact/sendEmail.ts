import type { InferRequestType } from "hono"
import { handleError } from "#client/rpc/custom_fetch"

import { apiClient } from "./apiClient.js"

const route = apiClient["index"].$post

export type SendEmailProps = InferRequestType<typeof route>["json"]

export async function sendEmail(json: SendEmailProps): Promise<undefined> {
  try {
    await route({ json })
  } catch (error) {
    handleError(error, "An unexpected error occured while sending the email")
  }
}
