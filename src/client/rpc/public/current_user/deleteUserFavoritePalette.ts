import { apiClient } from "./apiClient.js";

const route = apiClient["favorite-palette"][":palette-id"].$delete;

export type DeleteUserFavoritePaletteProps = { paletteId: number };

export async function deleteUserFavoritePalette({
  paletteId,
}: DeleteUserFavoritePaletteProps): Promise<undefined> {
  try {
    await route({
      param: { "palette-id": paletteId.toString() },
    });
  } catch (error) {
    throw new Error("An unexpected error occured while deleting the palette", {
      cause: error,
    });
  }
}
