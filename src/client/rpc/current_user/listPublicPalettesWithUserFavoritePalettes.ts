import { apiClient } from "./apiClient.js"
import type { PublicPalette } from "#client/types"
import { parseChromaPalette } from "#utils/parseChromaPalette.js"
import { handleError } from "#client/rpc/custom_fetch"

const route = apiClient.palette.public.$get

export async function listPublicPalettesWithUserFavoritePalettes(): Promise<
  PublicPalette[]
> {
  try {
    const response = await route()

    const { palettes } = await response.json()

    return palettes.map(({ colors, ...palette }) => ({
      ...palette,
      colors: parseChromaPalette(colors),
    }))
  } catch (error) {
    handleError(
      error,
      "An unexpected error occured while fetching the palettes"
    )
  }
}
