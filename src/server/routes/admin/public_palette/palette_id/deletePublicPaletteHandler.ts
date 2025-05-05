import { deletePublicPalette } from "#server/queries/public_palette"
import type { HandlerDBProps } from "@meow-meow-dev/server-utilities/hono"
import { queryIntegerIdSchema } from "@meow-meow-dev/server-utilities/validation"
import { okAsync, ResultAsync } from "neverthrow"
import * as v from "valibot"

export const deletePublicPaletteParamsSchema = v.strictObject({
  "palette-id": queryIntegerIdSchema,
})

type DeletePublicPaletteHandlerProps = HandlerDBProps &
  v.InferOutput<typeof deletePublicPaletteParamsSchema>

export function deletePublicPaletteHandler({
  db,
  "palette-id": paletteId,
}: DeletePublicPaletteHandlerProps): ResultAsync<
  undefined,
  "internal_server_error" | "not_found" // TODO will return  not_found if there are likes
> {
  return deletePublicPalette({ db, id: paletteId }).andThen(() =>
    okAsync(undefined)
  )
}
