import { InferResponseType } from "hono"

import { apiClient } from "./apiClient.js"

const route = apiClient.index.$get

type GetCurrentUserOutput = InferResponseType<typeof route, 200>

export async function getCurrentUser(): Promise<GetCurrentUserOutput> {
  try {
    const response = await route()

    return await response.json()
  } catch (error) {
    throw new Error("An unexpected error occured while fetching the user", {
      cause: error,
    })
  }
}
