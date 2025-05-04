import * as v from "valibot"
import { integerSchema } from "@meow-meow-dev/server-utilities/validation"
import { identitySchema } from "./identitySchema.ts"
import { registeredUserRoleSchema } from "./userRoleSchema.ts"
import { privatePaletteSchema, publicPaletteSchema } from "./paletteSchema.ts"

export const registeredUserSchema = v.strictObject({
  email: v.pipe(v.string(), v.email()),
  favoritePalettes: v.array(publicPaletteSchema),
  id: integerSchema,
  identity: identitySchema,
  privatePalettes: v.array(privatePaletteSchema),
  role: registeredUserRoleSchema,
})
