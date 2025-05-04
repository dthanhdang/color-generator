import type { CurrentUserType } from "#server/routes"

import { customFetch } from "#client/rpc/custom_fetch"
import { hc } from "hono/client"

export const apiClient = hc<CurrentUserType>(
  `${import.meta.env.CF_PAGES_URL ?? window.location.origin}/api/v1/current-user/`,
  {
    fetch: customFetch,
  }
)
