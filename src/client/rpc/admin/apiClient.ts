import type { AdminType } from "#server/routes"

import { customFetch } from "#client/rpc/custom_fetch"
import { hc } from "hono/client"

export const apiClient = hc<AdminType>(
  `${import.meta.env.CF_PAGES_URL ?? window.location.origin}/api/v1/admin/`,
  {
    fetch: customFetch,
  }
)
