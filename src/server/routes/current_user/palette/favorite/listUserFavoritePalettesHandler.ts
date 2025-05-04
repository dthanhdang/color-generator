import type { AccessToken } from "#server/auth/jwt"
import { listUserFavoritePublicPalettes } from "#server/queries/user_favorite_public_palette"
import type { PublicPalette } from "#server/types/database"
import type {
  HandlerAuthenticationProps,
  HandlerDBProps,
} from "@meow-meow-dev/server-utilities/hono"
import {
  nonEmptyStringSchema,
  queryIntegerIdSchema,
} from "@meow-meow-dev/server-utilities/validation"
import type { Selectable } from "kysely"
import { okAsync, ResultAsync } from "neverthrow"
import * as v from "valibot"

export const listUserFavoritePalettesQuerySchema = v.union([
  v.strictObject({
    colors: nonEmptyStringSchema,
  }),
  v.strictObject({
    palette_id: queryIntegerIdSchema,
  }),
  v.strictObject({}),
])

type ListUserFavoritePalettesHandlerProps = HandlerDBProps &
  HandlerAuthenticationProps<AccessToken> & {
    filter: v.InferOutput<typeof listUserFavoritePalettesQuerySchema>
  }

export function listUserFavoritePalettesHandler({
  accessToken: { userId },
  db,
  filter,
}: ListUserFavoritePalettesHandlerProps): ResultAsync<
  Selectable<PublicPalette>[],
  "bad_request" | "internal_server_error" | "not_found"
> {
  const filterProps =
    "colors" in filter
      ? { filter }
      : "palette_id" in filter
        ? { filter: { paletteId: filter.palette_id } }
        : {}

  return listUserFavoritePublicPalettes({ ...filterProps, db, userId }).andThen(
    (palettes) => okAsync(palettes)
  )
}
