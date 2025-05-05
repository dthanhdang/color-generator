import { checkPermissions } from "#server/auth/jwt"
import { buildHono } from "#server/hono"
import {
  customResponse,
  dbProps,
  defaultResponse,
} from "@meow-meow-dev/server-utilities/hono"
import { listPublicPalettesHandler } from "./listPublicPalettesHandler.ts"
import { vValidator } from "@meow-meow-dev/server-utilities/validation"
import {
  importPublicPalettesHandler,
  importPublicPalettesJsonSchema,
} from "./importPublicPalettesHandler.ts"

export const adminPublicPaletteRoute = buildHono()
  .get("/", checkPermissions("public_palette:read"), (c) =>
    customResponse(
      c,
      listPublicPalettesHandler({
        ...dbProps(c),
      }),
      (palettes) => c.json({ palettes }, 200)
    )
  )
  .post(
    "/",
    checkPermissions("public_palette:write"),
    vValidator("json", importPublicPalettesJsonSchema),
    (c) =>
      defaultResponse(
        c,
        importPublicPalettesHandler({
          ...dbProps(c),
          ...c.req.valid("json"),
        })
      )
  )
