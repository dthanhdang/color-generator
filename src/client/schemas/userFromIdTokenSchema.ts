import { identitySchema } from "#client/schemas"
import { userRoleSchema } from "#server/schemas"
import * as v from "valibot"

export const localStorageUserSchema = v.strictObject({
  email: v.pipe(v.string(), v.email()),
  id: v.number(),
  identity: identitySchema,
  role: userRoleSchema,
})
