import { localStorageUserSchema } from "#client/schemas"
import * as v from "valibot"

import type {
  PublicPalette as ServerPublicPalette,
  RegisteredUser as ServerRegisteredUser,
} from "#server/types"
import type { Color } from "chroma-js"
import type { Simplify } from "type-fest"

export type LocalStorageUser = v.InferOutput<typeof localStorageUserSchema>

export type PublicPalette = Simplify<
  Omit<ServerPublicPalette, "colors"> & {
    colors: Color[]
  }
>

export type RegisteredUser = Simplify<
  Omit<ServerRegisteredUser, "favoritePalettes">
> & { favoritePalettes: PublicPalette[] }

export type ColorMode = "hex" | "hsl" | "oklch"
