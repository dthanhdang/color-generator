import type { InferResponseType } from "hono"
import { apiClient } from "./apiClient.js"
import { handleError } from "#client/rpc/custom_fetch"

const route = apiClient[":palette-id"].$get

export async function getPublicPalette(
  paletteId: number
): Promise<InferResponseType<typeof route, 200>> {
  try {
    const response = await route({
      param: { "palette-id": paletteId.toString() },
    })

    return response.json()
  } catch (error) {
    handleError(error, "An unexpected error occured while fetching the palette")
  }
}
