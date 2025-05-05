import { apiClient } from "./apiClient.js"
import { PublicPalette } from "#client/types"
import { parseChromaPalette } from "#utils/parseChromaPalette.js"
import { handleError } from "#client/rpc/custom_fetch"

const route = apiClient["palette"]["favorite"].$get

export async function listCurrentUserFavoritePalettes(
  filter?: { paletteId: number } | { colors: string }
): Promise<PublicPalette[]> {
  try {
    const response = await route({
      query:
        filter && "paletteId" in filter
          ? { palette_id: filter.paletteId }
          : (filter ?? {}),
    })

    const { palettes } = await response.json()
    return palettes.map(({ colors, ...palette }) => ({
      ...palette,
      colors: parseChromaPalette(colors),
      isFavorite: true,
    }))
  } catch (error) {
    handleError(
      error,
      "An unexpected error occured while fetching the palette status"
    )
  }
}
