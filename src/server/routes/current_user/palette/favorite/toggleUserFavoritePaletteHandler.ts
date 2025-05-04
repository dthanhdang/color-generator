import type { AccessToken } from "#server/auth/jwt"
import {
  createPublicPalette,
  updatePublicPaletteLikes,
} from "#server/queries/public_palette"
import {
  createUserFavoritePublicPalette,
  deleteUserFavoritePublicPalette,
  getUserFavoritePublicPaletteByColors,
} from "#server/queries/user_favorite_public_palette"
import type {
  HandlerAuthenticationProps,
  HandlerDBProps,
} from "@meow-meow-dev/server-utilities/hono"
import { errAsync, okAsync, ResultAsync } from "neverthrow"
import * as v from "valibot"
import { nonEmptyStringSchema } from "@meow-meow-dev/server-utilities/validation"

export const toggleUserFavoritePaletteJsonSchema = v.strictObject({
  colors: nonEmptyStringSchema,
})

type ToggleUserFavoritePaletteHandlerProps = HandlerDBProps &
  HandlerAuthenticationProps<AccessToken> &
  v.InferOutput<typeof toggleUserFavoritePaletteJsonSchema>

export function toggleUserFavoritePaletteHandler({
  accessToken: { userId },
  colors,
  db,
}: ToggleUserFavoritePaletteHandlerProps): ResultAsync<
  { favoritePaletteId: number | undefined },
  "bad_request" | "internal_server_error" | "not_found"
> {
  return getUserFavoritePublicPaletteByColors({ db, colors, userId })
    .andThen(({ id, favoritePaletteId }) => {
      console.log({ id, favoritePaletteId })
      if (favoritePaletteId === undefined)
        return ResultAsync.combine([
          createUserFavoritePublicPalette({
            db,
            palette: { paletteId: id, userId },
          }),
          updatePublicPaletteLikes({
            db,
            delta: 1,
            id,
          }),
        ]).andThen(([{ id: favoritePaletteId }]) =>
          okAsync({ favoritePaletteId })
        )
      else
        return ResultAsync.combine([
          deleteUserFavoritePublicPalette({
            db,
            id: favoritePaletteId,
            userId,
          }),
          updatePublicPaletteLikes({
            db,
            delta: -1,
            id,
          }),
        ]).andThen(() => okAsync({ favoritePaletteId: undefined }))
    })
    .orElse((error) => {
      if (error === "not_found") {
        return createPublicPalette({
          db,
          palette: { colors, likes: 1 },
        }).andThen((palette) =>
          createUserFavoritePublicPalette({
            db,
            palette: { paletteId: palette.id, userId },
          }).andThen(({ id: favoritePaletteId }) =>
            okAsync({ favoritePaletteId })
          )
        )
      } else {
        return errAsync(error)
      }
    })
}
