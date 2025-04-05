import * as v from "valibot"
import {
  integerSchema,
  nonEmptyStringSchema,
} from "@meow-meow-dev/server-utilities/validation"
import { userRoleSchema } from "./userRoleSchema.ts"

export const databaseUserSchema = v.strictObject({
  email: v.pipe(v.string(), v.email()),
  firstName: nonEmptyStringSchema,
  id: integerSchema,
  lastName: nonEmptyStringSchema,
  role: userRoleSchema,
})
