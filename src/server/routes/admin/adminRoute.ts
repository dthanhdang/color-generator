import { buildHono } from "#server/hono"
import { adminPublicPaletteRoute } from "./public_palette/adminPublicPaletteRoute.js"

import { adminUserRoute } from "./user/adminUserRoute.js"

export const adminRoute = buildHono()
  .route("/public-palette", adminPublicPaletteRoute)
  .route("/user", adminUserRoute)

export type AdminType = typeof adminRoute
