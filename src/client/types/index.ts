import { localStorageUserSchema } from "#client/schemas"
import * as v from "valibot"

import type {
  PublicPalette as PublicPaletteDto,
  RegisteredUser as RegisteredUserDto,
  UserRole,
} from "#server/types"
import type { Color } from "chroma-js"
import type { Simplify } from "type-fest"

export type LocalStorageUser = v.InferOutput<typeof localStorageUserSchema>

export type PublicPalette = Simplify<
  Omit<PublicPaletteDto, "colors" | "createdAt"> & {
    colors: Color[]
    createdAt: Date
  }
>

export type RegisteredUser = Simplify<
  Omit<RegisteredUserDto, "favoritePalettes">
> & { favoritePalettes: PublicPalette[] }

export type ColorMode = "hex" | "hsl" | "oklch"

export type {
  UserRole,
  UserSummary as UserSummaryDto,
  PublicPalette as PublicPaletteDto,
} from "#server/types"

export type UserSummary = {
  email: string
  id: number
  identity: {
    firstName: string
    lastName: string
  }
  lastSignInDate: Date
  role: UserRole
  signUpDate: Date
}

export type PageProps = {
  crumb: string | undefined
  pageTitle: string
  seoDescription: string | undefined
  seoTitle: string
}
