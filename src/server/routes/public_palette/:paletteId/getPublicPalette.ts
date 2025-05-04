import { getPublicPalette } from "#server/queries/public_palette"
import type { PublicPalette } from "#server/types"
import type { HandlerDBProps } from "@meow-meow-dev/server-utilities/hono"
import { queryIntegerIdSchema } from "@meow-meow-dev/server-utilities/validation"
import type { ResultAsync } from "neverthrow"
import * as v from "valibot"

export const pathParams = v.strictObject({ "palette-id": queryIntegerIdSchema })

type GetPublicPaletteHandlerProps = HandlerDBProps &
  v.InferOutput<typeof pathParams>

export function getPublicPaletteHandler({
  db,
  "palette-id": paletteId,
}: GetPublicPaletteHandlerProps): ResultAsync<
  PublicPalette,
  "internal_server_error" | "not_found"
> {
  return getPublicPalette({ db, id: paletteId })
}
