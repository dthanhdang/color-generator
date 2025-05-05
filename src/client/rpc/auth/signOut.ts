import { apiClient } from "./apiClient.js"

import { handleError } from "#client/rpc/custom_fetch"

const route = apiClient["sign-out"].$post

export async function signOut(): Promise<void> {
  try {
    await route()
  } catch (error) {
    handleError(error, "An error occured while signing-out")
  }
}
