import type { AccessToken } from "#server/auth/jwt"
import { listPublicPalettesWithUserFavoritePalettes } from "#server/queries/user_favorite_public_palette"
import { PublicPalette } from "#server/types"
import type {
  HandlerAuthenticationProps,
  HandlerDBProps,
} from "@meow-meow-dev/server-utilities/hono"
import { okAsync, ResultAsync } from "neverthrow"

type ListPublicPalettesHandlerProps = HandlerDBProps &
  HandlerAuthenticationProps<AccessToken>

export function listPublicPalettesHandler({
  accessToken: { userId },
  db,
}: ListPublicPalettesHandlerProps): ResultAsync<
  PublicPalette[],
  "bad_request" | "internal_server_error"
> {
  return listPublicPalettesWithUserFavoritePalettes({ db, userId }).andThen(
    (palettes) => okAsync(palettes)
  )
}
