import {
  administratorRoleSchema,
  identitySchema,
  idTokenSchema,
  registeredUserRoleSchema,
  userRoleSchema,
  privatePaletteSchema,
  publicPaletteSchema,
} from "#server/schemas"
import * as v from "valibot"
import { registeredUserSchema } from "../schemas/registeredUserSchema.js"

export * from "./Otp.js"

export type Administrator = {
  email: string
  id: number
  identity: Identity
  role: AdministratorRole
}

export type AdministratorRole = v.InferOutput<typeof administratorRoleSchema>

export type Identity = v.InferOutput<typeof identitySchema>

export type IdToken = v.InferOutput<typeof idTokenSchema>

export type RegisteredUser = v.InferOutput<typeof registeredUserSchema>

export type RegisteredUserRole = v.InferOutput<typeof registeredUserRoleSchema>

export type UserRole = v.InferOutput<typeof userRoleSchema>

export type PrivatePalette = v.InferOutput<typeof privatePaletteSchema>

export type PublicPalette = v.InferOutput<typeof publicPaletteSchema>

export type UserSummary<Role extends UserRole = UserRole> = {
  email: string
  id: number
  identity: {
    firstName: string
    lastName: string
  }
  lastSignInDate: string
  role: Role
  signUpDate: string
}

export type HandlerResendApiKeyProps = {
  resendApiKey: string
}
