import { rpcFactory } from "./rpcFactory.js"
import type { RPCFactoryOutput } from "./rpcFactory.js"
import { describe, it } from "vitest"
import type { ExpectStatic } from "vitest"
import { generateTestSpecificEmail } from "../generators/generateTestSpecificEmail.js"
import { registerWrapper } from "./registerWrapper.js"
import type { PublicPalette } from "#server/types"

async function toggleFavoritePalette(
  expect: ExpectStatic,
  { currentUser: { toggleFavoritePalette } }: RPCFactoryOutput,
  colors: string
): Promise<number | undefined> {
  const response = await toggleFavoritePalette({
    json: { colors },
  })

  expect(response.status).toEqual(200)
  const { favoritePaletteId } = await response.json()

  return favoritePaletteId
}

async function getPublicPalette(
  expect: ExpectStatic,
  { publicPalette: { getPublicPalette } }: RPCFactoryOutput,
  id: number
): Promise<PublicPalette> {
  const response = await getPublicPalette({
    param: { "palette-id": id.toString() },
  })

  expect(response.status).toEqual(200)
  const { palette } = await response.json()

  return palette
}

describe("userFavoritePalettes endpoint", () => {
  it("rejects a request to add a favorite from an unauthenticated user", async ({
    expect,
  }) => {
    const {
      currentUser: { toggleFavoritePalette },
    } = rpcFactory()
    await expect(
      toggleFavoritePalette({ json: { colors: "#abcdef" } })
    ).toBeHTTPUnauthorized()
  })

  it("successfully creates a new palette when an authenticated user adds a non-existent favorite palette by color", async ({
    expect,
  }) => {
    const rpc = rpcFactory()
    const {
      currentUser: { listFavoritePalettes },
    } = rpc
    await registerWrapper(expect, rpc, generateTestSpecificEmail(expect))

    const colors = "#abcdef"

    const favoritePaletteId = await toggleFavoritePalette(expect, rpc, colors)

    if (favoritePaletteId === undefined) {
      expect.fail()
    } else {
      const palette = await getPublicPalette(expect, rpc, favoritePaletteId)
      expect(palette).toEqual(
        expect.objectContaining({ colors, id: palette.id, likes: 1 })
      )

      await expect(listFavoritePalettes({ query: {} })).toBeHTTPOk({
        palettes: expect.arrayContaining([
          expect.objectContaining({ colors, id: palette.id, likes: 1 }),
        ]),
      })

      await expect(
        listFavoritePalettes({ query: { palette_id: palette.id.toString() } })
      ).toBeHTTPOk({
        palettes: expect.arrayContaining([
          expect.objectContaining({ colors, likes: 1, id: palette.id }),
        ]),
      })

      await expect(listFavoritePalettes({ query: { colors } })).toBeHTTPOk({
        palettes: expect.arrayContaining([
          expect.objectContaining({ colors, likes: 1, id: palette.id }),
        ]),
      })

      await expect(
        listFavoritePalettes({ query: { palette_id: "999999" } })
      ).toBeHTTPOk({
        palettes: [],
      })

      await expect(
        listFavoritePalettes({ query: { colors: "#123456" } })
      ).toBeHTTPOk({
        palettes: [],
      })
    }
  })
})
