import { apiClient } from "./apiClient.js"
import { PublicPalette } from "#client/types"
import { parseChromaPalette } from "#utils/parseChromaPalette.js"

const route = apiClient["index"].$get

export async function listPublicPalettes(): Promise<PublicPalette[]> {
  try {
    const response = await route()

    const { palettes } = await response.json()

    return palettes.map(({ colors, ...palette }) => ({
      ...palette,
      colors: parseChromaPalette(colors),
    }))
  } catch (error) {
    throw new Error("An unexpected error occured while listing the palettes", {
      cause: error,
    })
  }
}
