import {
  jwtPayloadTimestampsSchema,
  standardIdTokenClaimsSchemas,
} from "@meow-meow-dev/server-utilities/jwt"
import * as v from "valibot"

import {
  administratorRoleSchema,
  registeredUserRoleSchema,
} from "./userRoleSchema.js"

const administratorStatusSchema = v.object({
  role: administratorRoleSchema,
})

const registeredUserStatusTokenSchema = v.object({
  role: registeredUserRoleSchema,
})

export const idTokenSchema = v.strictObject({
  ...jwtPayloadTimestampsSchema.entries,
  email: standardIdTokenClaimsSchemas.email,
  family_name: standardIdTokenClaimsSchemas.family_name,
  given_name: standardIdTokenClaimsSchemas.given_name,
  status: v.union([administratorStatusSchema, registeredUserStatusTokenSchema]),
  sub: standardIdTokenClaimsSchemas.sub,
})
