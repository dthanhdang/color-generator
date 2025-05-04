import { buildHono } from "#server/hono"
import { vValidator } from "@meow-meow-dev/server-utilities/validation"
import { pathParams } from "./getPublicPalette.ts"
import { customResponse, dbProps } from "@meow-meow-dev/server-utilities/hono"
import { getPublicPalette } from "#server/queries/public_palette"

export const paletteIdRoute = buildHono().get(
  "/",
  vValidator("param", pathParams),
  (c) => {
    const { "palette-id": id } = c.req.valid("param")
    return customResponse(
      c,
      getPublicPalette({
        ...dbProps(c),
        id,
      }),
      (palette) => c.json({ palette }, 200)
    )
  }
)
