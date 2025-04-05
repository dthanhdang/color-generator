import type {
  AddUserFavoritePaletteOutput,
  AddUserFavoritePaletteProps,
} from "#client/rpc/public/current_user";
import type { UseMutateAsyncFunction } from "@tanstack/react-query";
import { addUserFavoritePalette } from "#client/rpc/public/current_user";

import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useAddFavoritePaletteMutation(
  callback?: (paletteId: number) => void
): UseMutateAsyncFunction<
  AddUserFavoritePaletteOutput,
  Error,
  AddUserFavoritePaletteProps
> {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: addUserFavoritePalette,
    onSuccess: async ({ id }) => {
      await queryClient.invalidateQueries({ queryKey: ["CURRENT_USER"] });

      if (callback) callback(id);
    },
  });

  return mutation.mutateAsync;
}
