import { env } from "cloudflare:test"
import {
  createUserFavoritePublicPalette,
  deleteUserFavoritePublicPalette,
  listUserFavoritePublicPalettes,
} from "#server/queries/user_favorite_public_palette"
import { describe, it } from "vitest"
import { createPublicPalette } from "#server/queries/public_palette"
import { unsafeUnwrap } from "@meow-meow-dev/server-utilities/neverthrow"
import type { Insertable, Selectable } from "kysely"
import type {
  PublicPalette,
  User,
  UserFavoritePalette,
} from "#server/types/database"
import { okAsync, ResultAsync } from "neverthrow"
import { createTestUser } from "./createTestUser.ts"

function createPalette(
  user: Selectable<User>,
  palette: Omit<Insertable<PublicPalette>, "id">
): ResultAsync<
  {
    favoritePalette: Selectable<UserFavoritePalette>
    palette: Selectable<PublicPalette>
  },
  "internal_server_error" | "user_already_exists"
> {
  return createPublicPalette({
    db: env.DB,
    palette,
  }).andThen((palette) =>
    createUserFavoritePublicPalette({
      db: env.DB,
      palette: { paletteId: palette.id, userId: user.id },
    }).andThen((favoritePalette) => okAsync({ favoritePalette, palette, user }))
  )
}

describe("deleteUserFavoritePalette", () => {
  it("Successfully deletes favorite palette", async ({ expect }) => {
    const user = await unsafeUnwrap(createTestUser(expect))

    const { favoritePalette: deletedFavoritePalette } = await unsafeUnwrap(
      createPalette(user, { colors: "#123456", likes: 0 })
    )
    const { palette: remainingPalette } = await unsafeUnwrap(
      createPalette(user, { colors: "#abcdef", likes: 0 })
    )

    await expect(
      deleteUserFavoritePublicPalette({
        db: env.DB,
        id: deletedFavoritePalette.id,
        userId: user.id,
      })
    ).toBeNeverthrowOk()

    const favoritePalettes = await unsafeUnwrap(
      listUserFavoritePublicPalettes({ db: env.DB, userId: user.id })
    )

    expect(favoritePalettes).toEqual(
      expect.arrayContaining([expect.objectContaining(remainingPalette)])
    )
    expect(favoritePalettes).toHaveLength(1)
  })
})
