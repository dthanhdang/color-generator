import type { InferRequestType } from "hono"
import { handleError } from "#client/rpc/custom_fetch"

import { apiClient } from "./apiClient.js"

const route = apiClient["sign-up"].$post

export type SignUpOutput =
  | {
      error:
        | "administrator_already_exists"
        | "invalid_or_expired_code"
        | "user_already_exists"
    }
  | { idToken: string }
export type SignUpProps = InferRequestType<typeof route>["json"]

export async function signUp(props: SignUpProps): Promise<SignUpOutput> {
  try {
    const response = await route({ json: props })
    const output = await response.json()

    return output
  } catch (error) {
    handleError(error, "An unexpected error occured while signing-up")
  }
}
