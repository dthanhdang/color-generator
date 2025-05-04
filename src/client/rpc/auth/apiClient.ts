import type { AuthType } from "#server/routes"

import { customFetch } from "#client/rpc/custom_fetch"
import { hc } from "hono/client"

export const apiClient = hc<AuthType>(
  `${import.meta.env.CF_PAGES_URL ?? window.location.origin}/api/v1/auth/`,
  {
    fetch: customFetch,
  }
)
