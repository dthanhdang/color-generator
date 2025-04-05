import type { AccessToken } from "#server/auth/jwt";
import { deleteFavoritePalette } from "#server/queries/favorite_palette";
import type {
  HandlerAuthenticationProps,
  HandlerDBProps,
} from "@meow-meow-dev/server-utilities/hono";
import { queryIntegerIdSchema } from "@meow-meow-dev/server-utilities/validation";
import { errAsync, okAsync, type ResultAsync } from "neverthrow";
import * as v from "valibot";

export const deleteUserFavoritePaletteParamsSchema = v.strictObject({
  "palette-id": queryIntegerIdSchema,
});

type DeleteUserFavoritePaletteHandlerProps = HandlerDBProps &
  HandlerAuthenticationProps<AccessToken> &
  v.InferOutput<typeof deleteUserFavoritePaletteParamsSchema>;

export function deleteUserFavoritePaletteHandler({
  accessToken: { userId },
  db,
  "palette-id": id,
}: DeleteUserFavoritePaletteHandlerProps): ResultAsync<
  undefined,
  "internal_server_error"
> {
  return deleteFavoritePalette({
    db,
    id,
    userId,
  })
    .orElse((error) =>
      error === "not_found" ? okAsync(undefined) : errAsync(error)
    )
    .andThen(() => okAsync(undefined));
}
