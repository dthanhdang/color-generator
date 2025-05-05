import { createPublicPalette } from "#server/queries/public_palette"
import { paletteColorsSchema } from "#server/schemas"
import { toIsoDate } from "#server/utils/date"
import type { HandlerDBProps } from "@meow-meow-dev/server-utilities/hono"
import { okAsync, ResultAsync } from "neverthrow"
import * as v from "valibot"

export const importPublicPalettesJsonSchema = v.strictObject({
  palettes: v.array(paletteColorsSchema),
})

type ListPublicPalettesHandlerProps = HandlerDBProps &
  v.InferOutput<typeof importPublicPalettesJsonSchema>

export function importPublicPalettesHandler({
  db,
  palettes,
}: ListPublicPalettesHandlerProps): ResultAsync<
  undefined,
  "internal_server_error"
> {
  return ResultAsync.combine(
    palettes.map((colors) =>
      createPublicPalette({
        db,
        palette: { colors, createdAt: toIsoDate(new Date()), likes: 0 },
      })
    )
  ).andThen(() => okAsync(undefined))
}
