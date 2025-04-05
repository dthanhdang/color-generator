import { localStorageUserSchema } from "#client/schemas"
import * as v from "valibot"

export type {
  ColorSpace,
  FavoritePalette,
  FavoritePaletteGenerator,
  FavoriteHarmonyPalette,
  FavoriteRandomPalette,
  FavoriteScalePalette,
  HslColorComponents,
  RgbColorcomponents,
  RegisteredUser,
} from "#server/types"

export type LocalStorageUser = v.InferOutput<typeof localStorageUserSchema>
