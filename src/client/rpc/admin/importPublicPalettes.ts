import { apiClient } from "./apiClient.js"
import { handleError } from "#client/rpc/custom_fetch"

const route = apiClient["public-palette"].$post

export async function importPublicPalettes(
  palettes: string[]
): Promise<undefined> {
  try {
    await route({ json: { palettes } })
  } catch (error) {
    handleError(
      error,
      "An unexpected error occured while importing the palettes"
    )
  }
}
