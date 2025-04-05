import {
  administratorRoleSchema,
  identitySchema,
  idTokenSchema,
  registeredUserRoleSchema,
  userRoleSchema,
  colorSchema,
  userSchema,
  colorSpaceSchema,
  rgbColorComponentsSchema,
  hslColorComponentsSchema,
  favoritePaletteSchema,
  favoritePaletteGeneratorSchema,
  favoriteScalePaletteSchema,
  favoriteHarmonyPaletteSchema,
  favoriteRandomPaletteSchema,
} from "#server/schemas"
import * as v from "valibot"

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

export type RegisteredUser = {
  email: string
  favoriteColors: Color[]
  favoritePalettes: FavoritePalette[]
  id: number
  identity: Identity
  role: RegisteredUserRole
}

export type RegisteredUserRole = v.InferOutput<typeof registeredUserRoleSchema>

export type UserRole = v.InferOutput<typeof userRoleSchema>

export type Color = v.InferOutput<typeof colorSchema>

export type FavoritePalette = v.InferOutput<typeof favoritePaletteSchema>

export type FavoritePaletteGenerator = v.InferOutput<
  typeof favoritePaletteGeneratorSchema
>

export type User = v.InferOutput<typeof userSchema>

export type ColorSpace = v.InferOutput<typeof colorSpaceSchema>

export type RgbColorcomponents = v.InferOutput<typeof rgbColorComponentsSchema>

export type HslColorComponents = v.InferOutput<typeof hslColorComponentsSchema>

export type FavoriteHarmonyPalette = v.InferOutput<
  typeof favoriteHarmonyPaletteSchema
>

export type FavoriteRandomPalette = v.InferOutput<
  typeof favoriteRandomPaletteSchema
>

export type FavoriteScalePalette = v.InferOutput<
  typeof favoriteScalePaletteSchema
>
