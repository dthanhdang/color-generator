import { apiClient } from "./apiClient.js"
import { InferResponseType } from "hono"

const route = apiClient["palette"]["favorite"].$post

export type ToggleUserFavoritePaletteProps = { colors: string }

export type ToggleUserFavoritePaletteOutput = InferResponseType<
  typeof route,
  200
>

export async function toggleUserFavoritePalette(
  palette: ToggleUserFavoritePaletteProps
): Promise<ToggleUserFavoritePaletteOutput> {
  try {
    const response = await route({
      json: palette,
    })

    return await response.json()
  } catch (error) {
    throw new Error("An unexpected error occured while saving the palette", {
      cause: error,
    })
  }
}
