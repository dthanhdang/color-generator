import type { UseMutationResult } from "@tanstack/react-query"

import { importPublicPalettes } from "#client/rpc/admin"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export function useImportPublicPalettesMutation(): UseMutationResult<
  undefined,
  Error,
  Parameters<typeof importPublicPalettes>[0]
> {
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: importPublicPalettes,
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
