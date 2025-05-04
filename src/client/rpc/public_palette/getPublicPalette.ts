import type { InferResponseType } from "hono"
import { apiClient } from "./apiClient.js"

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
    throw new Error("An unexpected error occured while fetching the palette", {
      cause: error,
    })
  }
}
