import { InferResponseType } from "hono"

import { apiClient } from "./apiClient.js"

const route = apiClient.index.$get

type GetCurrentUserActiveSubscriptionOutput = InferResponseType<
  typeof route,
  200
>

export async function getCurrentUser(): Promise<GetCurrentUserActiveSubscriptionOutput> {
  try {
    const response = await route()

    return await response.json()
  } catch (error) {
    throw new Error("An unexpected error occured while fetching the user", {
      cause: error,
    })
  }
}
