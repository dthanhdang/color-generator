import { integerSchema } from "@meow-meow-dev/server-utilities/validation"
import * as v from "valibot"

export const publicPaletteSchema = v.strictObject({
  id: integerSchema,
  likes: integerSchema,
  paletteId: integerSchema,
})
