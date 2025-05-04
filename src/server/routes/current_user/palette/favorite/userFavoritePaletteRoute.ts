import { buildHono } from "#server/hono"
import {
  toggleUserFavoritePaletteHandler,
  toggleUserFavoritePaletteJsonSchema,
} from "./toggleUserFavoritePaletteHandler.js"
import { checkPermissions } from "#server/auth/jwt"
import { vValidator } from "@meow-meow-dev/server-utilities/validation"
import {
  authProps,
  customResponse,
  dbProps,
} from "@meow-meow-dev/server-utilities/hono"
import {
  listUserFavoritePalettesHandler,
  listUserFavoritePalettesQuerySchema,
} from "./listUserFavoritePalettesHandler.ts"

export const userFavoritePaletteRoute = buildHono()
  .get(
    "/",
    vValidator("query", listUserFavoritePalettesQuerySchema),
    checkPermissions("current_user:read"),
    (c) =>
      customResponse(
        c,
        listUserFavoritePalettesHandler({
          ...authProps(c),
          ...dbProps(c),
          filter: c.req.valid("query"),
        }),
        (palettes) => c.json({ palettes }, 200)
      )
  )
  .post(
    "/",
    checkPermissions("current_user:write"),
    vValidator("json", toggleUserFavoritePaletteJsonSchema),
    (c) =>
      customResponse(
        c,
        toggleUserFavoritePaletteHandler({
          ...authProps(c),
          ...dbProps(c),
          ...c.req.valid("json"),
        }),
        ({ favoritePaletteId }) => c.json({ favoritePaletteId }, 200)
      )
  )
