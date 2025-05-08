import { listPublicPalettes } from "#server/queries/public_palette"
import type { PublicPalette } from "#server/types"
import type { HandlerDBProps } from "@meow-meow-dev/server-utilities/hono"
import type { ResultAsync } from "neverthrow"

type ListPublicPalettesHandlerProps = HandlerDBProps

export function listPublicPalettesHandler({
  db,
}: ListPublicPalettesHandlerProps): ResultAsync<
  PublicPalette[],
  "internal_server_error"
> {
  return listPublicPalettes({ db })
}
