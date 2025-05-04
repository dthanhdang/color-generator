import type { AccessToken } from "#server/auth/jwt"
import { listUserPrivatePalettes } from "#server/queries/user_private_palette"
import type { PrivatePalette } from "#server/types/database"
import type {
  HandlerAuthenticationProps,
  HandlerDBProps,
} from "@meow-meow-dev/server-utilities/hono"
import type { Selectable } from "kysely"
import { okAsync, ResultAsync } from "neverthrow"

type ListUserPrivatePalettesHandlerProps = HandlerDBProps &
  HandlerAuthenticationProps<AccessToken>

export function listUserPrivatePalettesHandler({
  accessToken: { userId },
  db,
}: ListUserPrivatePalettesHandlerProps): ResultAsync<
  Selectable<PrivatePalette>[],
  "bad_request" | "internal_server_error" | "not_found"
> {
  return listUserPrivatePalettes({ db, userId }).andThen((palettes) =>
    okAsync(palettes)
  )
}
