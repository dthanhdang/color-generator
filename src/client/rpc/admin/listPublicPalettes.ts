import { apiClient } from "./apiClient.js"
import { PublicPalette } from "#client/types"
import { handleError } from "#client/rpc/custom_fetch"
import { fromPublicPaletteDto } from "../conversion/fromPublicPaletteDto.js"

const route = apiClient["public-palette"].$get

export async function listPublicPalettes(): Promise<PublicPalette[]> {
  try {
    const response = await route()

    const { palettes } = await response.json()

    return palettes.map((palette) => fromPublicPaletteDto(palette))
  } catch (error) {
    handleError(
      error,
      "An unexpected error occured while fetching the palettes"
    )
  }
}
