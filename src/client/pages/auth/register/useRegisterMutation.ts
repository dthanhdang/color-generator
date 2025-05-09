import type { RegisterOutput, RegisterProps } from "#client/rpc/auth"
import type { UseMutateAsyncFunction } from "@tanstack/react-query"

import { register } from "#client/rpc/auth"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export function useRegisterMutation(): UseMutateAsyncFunction<
  RegisterOutput,
  Error,
  RegisterProps
> {
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: register,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["CURRENT_USER"] }),
  })

  return mutation.mutateAsync
}
