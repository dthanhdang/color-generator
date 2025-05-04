import { buildHono } from "#server/hono"
import {
  authProps,
  customResponse,
  dbProps,
  defaultResponse,
} from "@meow-meow-dev/server-utilities/hono"
import {
  createPrivatePaletteHandler,
  createPrivatePaletteHandlerSchema,
} from "./createPrivatePaletteHandler.ts"
import { vValidator } from "@meow-meow-dev/server-utilities/validation"
import { checkPermissions } from "#server/auth/jwt"
import { listUserPrivatePalettesHandler } from "./listUserPrivatePalettesHandler.ts"

export const userPrivatePaletteRoute = buildHono()
  .get("/", checkPermissions("current_user:read"), (c) =>
    customResponse(
      c,
      listUserPrivatePalettesHandler({ ...authProps(c), ...dbProps(c) }),
      (palettes) => c.json({ palettes }, 200)
    )
  )
  .post(
    "/",
    vValidator("json", createPrivatePaletteHandlerSchema),
    checkPermissions("current_user:write"),
    (c) =>
      defaultResponse(
        c,
        createPrivatePaletteHandler({
          ...authProps(c),
          ...dbProps(c),
          ...c.req.valid("json"),
        })
      )
  )
