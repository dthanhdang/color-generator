import { InferResponseType } from "hono"

import { handleError } from "#client/rpc/custom_fetch"
import { apiClient } from "./apiClient.js"

const route = apiClient.index.$get

type GetCurrentUserOutput = InferResponseType<typeof route, 200>

export async function getCurrentUser(): Promise<GetCurrentUserOutput> {
  try {
    const response = await route()

    return await response.json()
  } catch (error) {
    handleError(error, "An unexpected error occured while fetching the user")
  }
}
