import type {
  ToggleUserFavoritePaletteOutput,
  ToggleUserFavoritePaletteProps,
} from "#client/rpc/current_user"
import type { UseMutationResult } from "@tanstack/react-query"
import { toggleUserFavoritePalette } from "#client/rpc/current_user"

import { useMutation, useQueryClient } from "@tanstack/react-query"

export function useToggleFavoritePaletteMutation(
  callback?: (isFavorite: boolean) => void
): UseMutationResult<
  ToggleUserFavoritePaletteOutput,
  Error,
  ToggleUserFavoritePaletteProps
> {
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: toggleUserFavoritePalette,
    onSuccess: async ({ favoritePaletteId }) => {
      await queryClient.invalidateQueries({ queryKey: ["CURRENT_USER"] })

      if (callback) callback(favoritePaletteId !== undefined)
    },
  })

  return mutation
}
