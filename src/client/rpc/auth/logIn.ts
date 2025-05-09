import type { InferRequestType } from "hono"
import { handleError } from "#client/rpc/custom_fetch"

import { apiClient } from "./apiClient.js"

const route = apiClient["log-in"].$post

export type LogInOutput =
  | { error: "invalid_or_expired_code" | "user_does_not_exist" }
  | { idToken: string }
export type LogInProps = InferRequestType<typeof route>["json"]

export async function logIn(props: LogInProps): Promise<LogInOutput> {
  try {
    const response = await route({ json: props })

    return await response.json()
  } catch (error) {
    handleError(error, "An unexpected error occured while logging-in")
  }
}
