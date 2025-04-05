import { buildHono } from "#server/hono";
import {
  authProps,
  customResponse,
  dbProps,
} from "@meow-meow-dev/server-utilities/hono";
import { vValidator } from "@meow-meow-dev/server-utilities/validation";
import {
  addUserFavoritePaletteHandler,
  addUserFavoritePaletteJsonSchema,
} from "./addUserFavoritePaletteHandler.ts";
import { checkPermissions } from "#server/auth/jwt";
import { currentUserPaletteIdRoute } from "./:palette-id/currentUserPaletteIdRoute.ts";

export const userFavoritePaletteRoute = buildHono()
  .route(":palette-id", currentUserPaletteIdRoute)
  .post(
    "/",
    vValidator("json", addUserFavoritePaletteJsonSchema),
    checkPermissions("current_user:write"),
    (c) =>
      customResponse(
        c,
        addUserFavoritePaletteHandler({
          ...authProps(c),
          ...dbProps(c),
          palette: c.req.valid("json"),
        }),
        ({ id }) => c.json({ id })
      )
  );
