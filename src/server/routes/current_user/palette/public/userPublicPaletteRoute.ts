import { buildHono } from "#server/hono"
import {
  authProps,
  customResponse,
  dbProps,
} from "@meow-meow-dev/server-utilities/hono"
import { checkPermissions } from "#server/auth/jwt"
import { listPublicPalettesHandler } from "./listPublicPalettesHandler.ts"

export const userPublicPaletteRoute = buildHono().get(
  "/",
  checkPermissions("current_user:read"),
  (c) =>
    customResponse(
      c,
      listPublicPalettesHandler({ ...authProps(c), ...dbProps(c) }),
      (palettes) => c.json({ palettes }, 200)
    )
)
