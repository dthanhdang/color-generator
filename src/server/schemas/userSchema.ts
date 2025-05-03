import * as v from "valibot"
import { integerSchema } from "@meow-meow-dev/server-utilities/validation"
import { identitySchema } from "./identitySchema.ts"
import { userRoleSchema } from "./userRoleSchema.ts"

export const userSchema = v.strictObject({
  email: v.pipe(v.string(), v.email()),
  id: integerSchema,
  identity: identitySchema,
  role: userRoleSchema,
})
