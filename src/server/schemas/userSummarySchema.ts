import {
  integerSchema,
  nonEmptyStringSchema,
} from "@meow-meow-dev/server-utilities/validation"
import * as v from "valibot"
import {
  administratorRoleSchema,
  registeredUserRoleSchema,
  userRoleSchema,
} from "./userRoleSchema.ts"
import { isoDateSchema } from "./isoDateSchema.ts"

export const userSummarySchema = v.strictObject({
  email: v.pipe(v.string(), v.email()),
  id: integerSchema,
  identity: v.strictObject({
    firstName: nonEmptyStringSchema,
    lastName: nonEmptyStringSchema,
  }),
  lastSignInDate: isoDateSchema,
  role: userRoleSchema,
  signUpDate: isoDateSchema,
})

export const administratorSummarySchema = v.strictObject({
  ...userSummarySchema.entries,
  role: administratorRoleSchema,
})

export const registeredUserSummarySchema = v.strictObject({
  ...userSummarySchema.entries,
  role: registeredUserRoleSchema,
})
