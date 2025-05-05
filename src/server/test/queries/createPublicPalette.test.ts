import { env } from "cloudflare:test"
import { describe, it } from "vitest"
import {
  createPublicPalette,
  getPublicPalette,
} from "#server/queries/public_palette"
import { unsafeUnwrap } from "@meow-meow-dev/server-utilities/neverthrow"
import { toIsoDate } from "#server/utils/date"

describe("createPublicPalette", () => {
  const createdAt = toIsoDate(new Date())

  it("Successfully creates a public palette", async ({ expect }) => {
    const palette = await unsafeUnwrap(
      createPublicPalette({
        db: env.DB,
        palette: { colors: "#abcdef", createdAt, likes: 0 },
      })
    )
    expect(palette.colors).toEqual("#abcdef")
    expect(palette.likes).toEqual(0)
  })

  it("Prevents duplicate palette creation", async ({ expect }) => {
    const palette1 = await unsafeUnwrap(
      createPublicPalette({
        db: env.DB,
        palette: { colors: "#abcdef", createdAt, likes: 3 },
      })
    )

    const palette2 = await unsafeUnwrap(
      createPublicPalette({
        db: env.DB,
        palette: { colors: "#abcdef", createdAt, likes: 2 },
      })
    )

    expect(palette1.id).toEqual(palette2.id)

    const palette = await unsafeUnwrap(
      getPublicPalette({ db: env.DB, id: palette1.id })
    )
    expect(palette).toEqual(palette1) // # of likes must not be overridden
  })
})
