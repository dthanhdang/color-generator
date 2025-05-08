import { apiClient } from "./apiClient.js"
import { PublicPalette } from "#client/types"
import { handleError } from "#client/rpc/custom_fetch"
import { fromPublicPaletteDto } from "../conversion/fromPublicPaletteDto.js"

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

    return palettes.map((palette) => fromPublicPaletteDto(palette))
  } catch (error) {
    handleError(
      error,
      "An unexpected error occured while fetching the palette status"
    )
  }
}
