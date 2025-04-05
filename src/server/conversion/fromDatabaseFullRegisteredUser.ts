import type { RegisteredUser } from "#server/types"
import type {
  FavoriteColor,
  FavoritePalette,
  User,
} from "#server/types/database"
import type { Selectable } from "kysely"
import { err, ok, Result } from "neverthrow"
import * as v from "valibot"
import { colorSchema, favoritePaletteSchema } from "#server/schemas"

type FromDatabaseRegisteredUserProps = {
  favoriteColors: Selectable<FavoriteColor>[]
  favoritePalettes: Selectable<FavoritePalette>[]
  user: Selectable<User>
}
export function fromDatabaseFullRegisteredUser({
  favoriteColors,
  favoritePalettes,
  user: { firstName, lastName, role, ...user },
}: FromDatabaseRegisteredUserProps): Result<RegisteredUser, "not_found"> {
  if (role !== "registered_user") return err("not_found")

  const identity = { firstName, lastName }

  return ok({
    ...user,
    favoriteColors: favoriteColors.map(({ jsonComponents, ...color }) =>
      v.parse(colorSchema, {
        ...color,
        components: JSON.parse(jsonComponents),
      })
    ),
    favoritePalettes: favoritePalettes.map(
      ({ jsonGeneratedColors, jsonGenerator, ...color }) =>
        v.parse(favoritePaletteSchema, {
          ...color,
          generatedColors: JSON.parse(jsonGeneratedColors),
          generator: JSON.parse(jsonGenerator),
        })
    ),
    identity,
    role,
  })
}
