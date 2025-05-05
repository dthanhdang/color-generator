import { checkPermissions } from "#server/auth/jwt"
import { buildHono } from "#server/hono"
import { customResponse, dbProps } from "@meow-meow-dev/server-utilities/hono"

import { listUsersHandler } from "./listUsersHandler.js"
import { adminAdministratorRoute } from "./administrator/adminAdministratorRoute.js"

export const adminUserRoute = buildHono()
  .route("/administrator", adminAdministratorRoute)
  .get("/", checkPermissions("users:read"), (c) =>
    customResponse(c, listUsersHandler(dbProps(c)), (users) =>
      c.json({ users }, 200)
    )
  )

export type AdminUserType = typeof adminUserRoute
