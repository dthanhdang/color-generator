import { env } from "cloudflare:test"
import { describe, it } from "vitest"
import {
  createPublicPalette,
  listPublicPalettes,
} from "#server/queries/public_palette"
import { unsafeUnwrap } from "@meow-meow-dev/server-utilities/neverthrow"

describe("listPublicPalettes", () => {
  it("Successfully lists public palettes", async ({ expect }) => {
    const palette1 = await unsafeUnwrap(
      createPublicPalette({
        db: env.DB,
        palette: { colors: "#abcdef", likes: 0 },
      })
    )
    const palette2 = await unsafeUnwrap(
      createPublicPalette({
        db: env.DB,
        palette: { colors: "#012345", likes: 0 },
      })
    )

    const palettes = await unsafeUnwrap(
      listPublicPalettes({
        db: env.DB,
      })
    )

    expect(palettes).toHaveLength(2)
    expect(palettes).toEqual(expect.arrayContaining([palette1, palette2]))
  })
})
