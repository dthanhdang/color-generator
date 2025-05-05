import type { UseMutationResult } from "@tanstack/react-query"

import { deletePublicPalette } from "#client/rpc/admin"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export function useDeletePublicPaletteMutation(): UseMutationResult<
  undefined,
  Error,
  Parameters<typeof deletePublicPalette>[0]
> {
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: deletePublicPalette,
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["PUBLIC_PALETTE"] }),
        queryClient.invalidateQueries({
          queryKey: ["ADMIN", "PUBLIC_PALETTE"],
        }),
      ])
    },
  })

  return mutation
}
