import type { InferRequestType } from "hono"

import { apiClient } from "./apiClient.js"

const route = apiClient["sign-in"].$post

export type SignInOutput =
  | { error: "invalid_or_expired_code" | "user_does_not_exist" }
  | { idToken: string }
export type SignInProps = InferRequestType<typeof route>["json"]

export async function signIn(props: SignInProps): Promise<SignInOutput> {
  try {
    const response = await route({ json: props })

    return await response.json()
  } catch (error) {
    throw new Error("An unexpected error occured while signing-in", {
      cause: error,
    })
  }
}
