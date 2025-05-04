import { env } from "cloudflare:test"
import { describe, it } from "vitest"
import { createPublicPalette } from "#server/queries/public_palette"
import { unsafeUnwrap } from "@meow-meow-dev/server-utilities/neverthrow"

describe("createPublicPalette", () => {
  it("Successfully creates a public palette", async ({ expect }) => {
    const palette = await unsafeUnwrap(
      createPublicPalette({
        db: env.DB,
        palette: { colors: "#abcdef", likes: 0 },
      })
    )
    expect(palette.colors).toEqual("#abcdef")
    expect(palette.likes).toEqual(0)
  })

  it("Prevents duplicate palette creation", async ({ expect }) => {
    const palette1 = await unsafeUnwrap(
      createPublicPalette({
        db: env.DB,
        palette: { colors: "#abcdef", likes: 0 },
      })
    )

    const palette2 = await unsafeUnwrap(
      createPublicPalette({
        db: env.DB,
        palette: { colors: "#abcdef", likes: 0 },
      })
    )

    expect(palette1.id).toEqual(palette2.id)
  })
})
