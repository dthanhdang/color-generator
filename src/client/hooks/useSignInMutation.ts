import type { SignInOutput, SignInProps } from "#client/rpc/auth"
import type { UseMutateAsyncFunction } from "@tanstack/react-query"

import { signIn } from "#client/rpc/auth"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export function useSignInMutation(): UseMutateAsyncFunction<
  SignInOutput,
  Error,
  SignInProps
> {
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: signIn,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["CURRENT_USER"] }),
  })

  return mutation.mutateAsync
}
