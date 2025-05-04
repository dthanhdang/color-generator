import type { SignUpOutput, SignUpProps } from "#client/rpc/auth"
import type { UseMutateAsyncFunction } from "@tanstack/react-query"

import { signUp } from "#client/rpc/auth"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export function useSignUpMutation(): UseMutateAsyncFunction<
  SignUpOutput,
  Error,
  SignUpProps
> {
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: signUp,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["CURRENT_USER"] }),
  })

  return mutation.mutateAsync
}
