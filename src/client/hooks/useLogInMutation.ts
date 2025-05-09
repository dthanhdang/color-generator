import type { LogInOutput, LogInProps } from "#client/rpc/auth"
import type { UseMutateAsyncFunction } from "@tanstack/react-query"

import { logIn } from "#client/rpc/auth"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export function useLogInMutation(): UseMutateAsyncFunction<
  LogInOutput,
  Error,
  LogInProps
> {
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: logIn,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["CURRENT_USER"] }),
  })

  return mutation.mutateAsync
}
