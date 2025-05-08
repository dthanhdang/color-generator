import { apiClient } from "./apiClient.js"
import { handleError } from "#client/rpc/custom_fetch"
import { fromUserSummaryDto } from "../conversion/fromUserSummaryDto.js"
import type { UserSummary } from "#client/types"

const route = apiClient["user"].$get

type ListUsersOutput = { users: UserSummary[] }

export async function listUsers(): Promise<ListUsersOutput> {
  try {
    const response = await route()

    const { users } = await response.json()

    return { users: users.map((user) => fromUserSummaryDto(user)) }
  } catch (error) {
    handleError(error, "An unexpected error occured while fetching the users")
  }
}
