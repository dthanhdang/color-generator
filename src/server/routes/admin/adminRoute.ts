import { buildHono } from "#server/hono"

import { adminRegisteredUserRoute } from "./registered_user/adminRegisteredUserRoute.js"

export const adminRoute = buildHono().route(
  "/registered-user",
  adminRegisteredUserRoute
)
