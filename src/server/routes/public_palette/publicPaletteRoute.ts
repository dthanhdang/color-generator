import { buildHono } from "#server/hono"
import { listPublicPalettes } from "#server/queries/public_palette"
import { customResponse, dbProps } from "@meow-meow-dev/server-utilities/hono"
import { paletteIdRoute } from "./:paletteId/paletteIdRoute.ts"

export const publicPaletteRoute = buildHono()
  .route(":palette-id", paletteIdRoute)
  .get("/", (c) =>
    customResponse(c, listPublicPalettes({ ...dbProps(c) }), (palettes) =>
      c.json({ palettes }, 200)
    )
  )

export type PublicPaletteType = typeof publicPaletteRoute
