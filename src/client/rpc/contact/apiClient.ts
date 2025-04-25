import type { ContactType } from "#server/routes"

import { customFetch } from "#client/rpc/custom_fetch"
import { hc } from "hono/client"

export const apiClient = hc<ContactType>(
  `${import.meta.env.CF_PAGES_URL ?? window.location.origin}/api/v1/contact`,
  {
    fetch: customFetch,
  }
)
