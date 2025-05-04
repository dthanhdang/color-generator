import { checkPermissions } from "#server/auth/jwt"
import { buildHono } from "#server/hono"
import { customResponse, dbProps } from "@meow-meow-dev/server-utilities/hono"

import { listRegisteredUsersHandler } from "./listRegisteredUsersHandler.js"

export const adminRegisteredUserRoute = buildHono().get(
  "/",
  checkPermissions("registered_users:read"),
  (c) =>
    customResponse(c, listRegisteredUsersHandler(dbProps(c)), (users) =>
      c.json({ users }, 200)
    )
)

export type AdminRegisteredUserType = typeof adminRegisteredUserRoute
