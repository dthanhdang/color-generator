import { apiClient } from "./apiClient.js"

import { handleError } from "#client/rpc/custom_fetch"

const route = apiClient["log-out"].$post

export async function logOut(): Promise<void> {
  try {
    await route()
  } catch (error) {
    handleError(error, "An error occured while logging-out")
  }
}
