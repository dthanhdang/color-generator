import { buildHono } from "#server/hono"
import { getEnvironmentVariable } from "@meow-meow-dev/server-utilities/context"
import { cors } from "hono/cors"

import { adminRoute } from "./admin/adminRoute.js"
import { authRoute } from "./auth/authRoute.js"
import { contactRoute } from "./contact/contactRoute.js"
import { currentUserRoute } from "./current_user/currentUserRoute.js"
import { publicPaletteRoute } from "./public_palette/publicPaletteRoute.js"

const apiRoute = buildHono()
  .route("/admin", adminRoute)
  .route("/auth", authRoute)
  .route("/contact", contactRoute)
  .route("/current-user", currentUserRoute)
  .route("/public-palette", publicPaletteRoute)

export const app = buildHono()
  .use("*", (c, next) =>
    cors({
      credentials: true,
      origin: getEnvironmentVariable(c, "CF_PAGES_URL"),
    })(c, next)
  )
  .route("/api/v1", apiRoute)
  .get("*", (c) =>
    c.env.ASSETS ? c.env.ASSETS.fetch(c.req.raw) : c.text("Not Found", 404)
  )

export type AppType = typeof app
