import * as v from "valibot"
import { colorSchema } from "./colorSchema.ts"
import { favoritePaletteSchema } from "./favoritePaletteSchema.ts"
import { integerSchema } from "@meow-meow-dev/server-utilities/validation"
import { identitySchema } from "./identitySchema.ts"
import { registeredUserRoleSchema } from "./userRoleSchema.ts"

export const registeredUserSchema = v.strictObject({
  email: v.pipe(v.string(), v.email()),
  favoriteColors: v.array(colorSchema),
  favoritePalettes: v.array(favoritePaletteSchema),
  id: integerSchema,
  identity: identitySchema,
  role: registeredUserRoleSchema,
})
