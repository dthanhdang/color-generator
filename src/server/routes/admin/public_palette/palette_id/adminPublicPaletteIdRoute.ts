import { checkPermissions } from "#server/auth/jwt"
import { buildHono } from "#server/hono"
import { dbProps, defaultResponse } from "@meow-meow-dev/server-utilities/hono"
import { vValidator } from "@meow-meow-dev/server-utilities/validation"
import {
  deletePublicPaletteHandler,
  deletePublicPaletteParamsSchema,
} from "./deletePublicPaletteHandler.js"

export const adminPublicPaletteIdRoute = buildHono().delete(
  "/",
  checkPermissions("public_palette:delete"),
  vValidator("param", deletePublicPaletteParamsSchema),
  (c) =>
    defaultResponse(
      c,
      deletePublicPaletteHandler({
        ...dbProps(c),
        ...c.req.valid("param"),
      })
    )
)
