import { integerSchema } from "@meow-meow-dev/server-utilities/validation"
import * as v from "valibot"

const paletteColorsSchema = v.pipe(
  v.string(),
  v.regex(/[0-9a-f]{6}(-:?[0-9a-f]{6})*/)
)

export const publicPaletteSchema = v.strictObject({
  colors: paletteColorsSchema,
  favoritePaletteId: v.optional(integerSchema), // Filled is the user is logged-in and the color is a favorite
  id: integerSchema,
  likes: integerSchema,
})

export const privatePaletteSchema = v.strictObject({
  colors: paletteColorsSchema,
  id: integerSchema,
  userId: integerSchema,
})
