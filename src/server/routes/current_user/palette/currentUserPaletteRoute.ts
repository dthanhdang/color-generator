import { buildHono } from "#server/hono"
import { userFavoritePaletteRoute } from "./favorite/userFavoritePaletteRoute.ts"
import { userPrivatePaletteRoute } from "./private/userPrivatePaletteRoute.ts"
import { userPublicPaletteRoute } from "./public/userPublicPaletteRoute.ts"

export const currentUserPaletteRoute = buildHono()
  .route("/favorite", userFavoritePaletteRoute)
  .route("/private", userPrivatePaletteRoute)
  .route("/public", userPublicPaletteRoute)
