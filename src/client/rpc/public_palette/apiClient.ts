import type { PublicPaletteType } from "#server/routes"

import { customFetch } from "#client/rpc/custom_fetch"
import { hc } from "hono/client"

export const apiClient = hc<PublicPaletteType>(
  `${import.meta.env.CF_PAGES_URL ?? window.location.origin}/api/v1/public-palette/`,
  {
    fetch: customFetch,
  }
)
