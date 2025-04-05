import type { DeleteUserFavoritePaletteProps } from "#client/rpc/public/current_user";
import type { UseMutateAsyncFunction } from "@tanstack/react-query";
import { deleteUserFavoritePalette } from "#client/rpc/public/current_user";

import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useDeleteFavoritePaletteMutation(
  handleMutationSuccess?: () => void
): UseMutateAsyncFunction<undefined, Error, DeleteUserFavoritePaletteProps> {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: deleteUserFavoritePalette,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["CURRENT_USER"] });

      const url = new URL(window.location.toString());
      url.searchParams.delete("palette_id");

      if (handleMutationSuccess) handleMutationSuccess();
    },
  });

  return mutation.mutateAsync;
}
