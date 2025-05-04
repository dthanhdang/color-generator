import { checkPermissions } from "#server/auth/jwt"
import { buildHono } from "#server/hono"
import {
  authProps,
  customResponse,
  dbProps,
} from "@meow-meow-dev/server-utilities/hono"

import { getCurrentUserHandler } from "./getCurrentUserHandler.js"
import { currentUserPaletteRoute } from "./palette/currentUserPaletteRoute.js"

export const currentUserRoute = buildHono()
  .get("/", checkPermissions("current_user:read"), (c) =>
    customResponse(
      c,
      getCurrentUserHandler({ ...authProps(c), ...dbProps(c) }),
      (user) => c.json({ user })
    )
  )
  .route("/palette", currentUserPaletteRoute)

export type CurrentUserType = typeof currentUserRoute
