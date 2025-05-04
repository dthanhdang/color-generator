import { nonEmptyStringSchema } from "@meow-meow-dev/server-utilities/validation"
import * as v from "valibot"

export const identitySchema = v.strictObject({
  firstName: nonEmptyStringSchema,
  lastName: nonEmptyStringSchema,
})
