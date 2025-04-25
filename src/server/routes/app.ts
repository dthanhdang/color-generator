import { buildHono } from "#server/hono"
import { getEnvironmentVariable } from "@meow-meow-dev/server-utilities/context"
import { cors } from "hono/cors"

import { contactRoute } from "./contact/contactRoute.js"

const apiRoute = buildHono().route("/contact", contactRoute)

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
