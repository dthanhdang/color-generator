import type { AccessToken } from "#server/auth/jwt"
import { createPrivatePalette } from "#server/queries/user_private_palette"
import { privatePaletteSchema } from "#server/schemas"
import type { PrivatePalette } from "#server/types/database"
import type {
  HandlerAuthenticationProps,
  HandlerDBProps,
} from "@meow-meow-dev/server-utilities/hono"
import type { Selectable } from "kysely"
import { okAsync, ResultAsync } from "neverthrow"
import * as v from "valibot"

export const createPrivatePaletteHandlerSchema = v.strictObject({
  palette: v.omit(privatePaletteSchema, ["id", "userId"]),
})

type CreatePrivatePaletteHandlerProps = HandlerDBProps &
  HandlerAuthenticationProps<AccessToken> &
  v.InferOutput<typeof createPrivatePaletteHandlerSchema>

export function createPrivatePaletteHandler({
  accessToken: { userId },
  db,
  palette,
}: CreatePrivatePaletteHandlerProps): ResultAsync<
  Selectable<PrivatePalette>,
  "bad_request" | "internal_server_error"
> {
  return createPrivatePalette({ db, palette: { ...palette, userId } }).andThen(
    (palette) => okAsync(palette)
  )
}
