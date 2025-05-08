import { apiClient } from "./apiClient.js"
import { handleError } from "#client/rpc/custom_fetch"

const route = apiClient["public-palette"][":palette-id"].$delete

export async function deletePublicPalette(id: number): Promise<undefined> {
  try {
    await route({ param: { "palette-id": id.toString() } })
  } catch (error) {
    handleError(error, "An unexpected error occured while deleting the palette")
  }
}
