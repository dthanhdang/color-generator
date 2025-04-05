import type { AccessToken } from "#server/auth/jwt"
import { createPalette } from "#server/queries/favorite_palette"
import { favoritePaletteSchema } from "#server/schemas"
import type { FavoritePalette } from "#server/types/database"
import type {
  HandlerAuthenticationProps,
  HandlerDBProps,
} from "@meow-meow-dev/server-utilities/hono"
import type { Selectable } from "kysely"
import type { ResultAsync } from "neverthrow"
import * as v from "valibot"

export const addUserFavoritePaletteJsonSchema = v.omit(favoritePaletteSchema, [
  "id",
])

type AddUserFavoritePaletteHandlerProps = HandlerDBProps &
  HandlerAuthenticationProps<AccessToken> & {
    palette: v.InferOutput<typeof addUserFavoritePaletteJsonSchema>
  }

export function addUserFavoritePaletteHandler({
  accessToken: { userId },
  db,
  palette: { generatedColors, generator, ...palette },
}: AddUserFavoritePaletteHandlerProps): ResultAsync<
  Selectable<FavoritePalette>,
  "internal_server_error"
> {
  return createPalette({
    db,
    palette: {
      ...palette,
      jsonGenerator: JSON.stringify(generator, null, 2),
      jsonGeneratedColors: JSON.stringify(generatedColors, null, 2),
      userId,
    },
  })
}
