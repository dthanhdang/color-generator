import { env } from "cloudflare:test"
import {
  createUserFavoritePublicPalette,
  listUserFavoritePublicPalettes,
} from "#server/queries/user_favorite_public_palette"
import { describe, it } from "vitest"
import { createUser } from "#server/queries/user"
import { createPublicPalette } from "#server/queries/public_palette"
import { unsafeUnwrap } from "@meow-meow-dev/server-utilities/neverthrow"
import type { Insertable, Selectable } from "kysely"
import type {
  PublicPalette,
  User,
  UserFavoritePalette,
} from "#server/types/database"
import { okAsync, ResultAsync } from "neverthrow"

function createPalette(
  palette: Omit<Insertable<PublicPalette>, "id">
): ResultAsync<
  {
    favoritePalette: Selectable<UserFavoritePalette>
    palette: Selectable<PublicPalette>
    user: Selectable<User>
  },
  "internal_server_error" | "user_already_exists"
> {
  return createUser({
    db: env.DB,
    user: {
      email: "test@test.com",
      firstName: "Test",
      lastName: "Test",
      role: "registered_user",
    },
  }).andThen((user) =>
    createPublicPalette({
      db: env.DB,
      palette,
    }).andThen((palette) =>
      createUserFavoritePublicPalette({
        db: env.DB,
        palette: { paletteId: palette.id, userId: user.id },
      }).andThen((favoritePalette) =>
        okAsync({ favoritePalette, palette, user })
      )
    )
  )
}

describe("createUserFavoritePublicPalette", () => {
  it("Successfully prevents duplicate favorite palette creation", async ({
    expect,
  }) => {
    const { favoritePalette, palette, user } = await unsafeUnwrap(
      createPalette({ colors: "#abcdef", likes: 0 })
    )

    expect(favoritePalette.paletteId).toEqual(palette.id)
    expect(favoritePalette.userId).toEqual(user.id)

    const favoritePalette2 = await unsafeUnwrap(
      createUserFavoritePublicPalette({
        db: env.DB,
        palette: { paletteId: palette.id, userId: user.id },
      })
    )

    expect(favoritePalette2).toEqual(favoritePalette)
  })

  describe("createUserFavoritePublicPalette", () => {
    it("Correctly lists favorite palettes", async ({ expect }) => {
      const { palette, user } = await unsafeUnwrap(
        createPalette({ colors: "#abcdef", likes: 0 })
      )

      const favoritePalettes = await unsafeUnwrap(
        listUserFavoritePublicPalettes({ db: env.DB, userId: user.id })
      )

      expect(favoritePalettes).toEqual(
        expect.arrayContaining([expect.objectContaining(palette)])
      )
    })
  })
})
