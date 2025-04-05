import { checkPermissions } from "#server/auth/jwt";
import { buildHono } from "#server/hono";
import {
  authProps,
  customResponse,
  dbProps,
} from "@meow-meow-dev/server-utilities/hono";

import { getCurrentUserHandler } from "./getCurrentUserHandler.js";
import { userFavoritePaletteRoute } from "./favorite_palette/userFavoritePaletteRoute.js";

export const currentUserRoute = buildHono()
  .get("/", checkPermissions("current_user:read"), (c) =>
    customResponse(
      c,
      getCurrentUserHandler({ ...authProps(c), ...dbProps(c) }),
      (user) => c.json({ user })
    )
  )
  .route("/favorite-palette", userFavoritePaletteRoute);

export type PublicCurrentUserType = typeof currentUserRoute;
