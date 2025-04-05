import { buildHono } from "#server/hono"
import { vValidator } from "@meow-meow-dev/server-utilities/validation"
import {
  deleteUserFavoritePaletteHandler,
  deleteUserFavoritePaletteParamsSchema,
} from "./deleteUserFavoritePaletteHandler.ts"
import { checkPermissions } from "#server/auth/jwt"
import {
  authProps,
  dbProps,
  defaultResponse,
} from "@meow-meow-dev/server-utilities/hono"

export const currentUserPaletteIdRoute = buildHono().delete(
  "/",
  checkPermissions("current_user:write"),
  vValidator("param", deleteUserFavoritePaletteParamsSchema),
  (c) =>
    defaultResponse(
      c,
      deleteUserFavoritePaletteHandler({
        ...authProps(c),
        ...dbProps(c),
        ...c.req.valid("param"),
      })
    )
)
