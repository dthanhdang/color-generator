import type {
  CreateAdministratorOutput,
  CreateAdministratorProps,
} from "#client/rpc/admin"
import type { UseMutationResult } from "@tanstack/react-query"

import { createAdministrator } from "#client/rpc/admin"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import {
  showErrorNotification,
  showSuccessNotification,
} from "#components/notifications/showNotification.ts"

export function useCreateAdministratorMutation(): UseMutationResult<
  CreateAdministratorOutput,
  Error,
  CreateAdministratorProps
> {
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: createAdministrator,
    onSuccess: (response) => {
      if ("user" in response) {
        queryClient.invalidateQueries({ queryKey: ["ADMIN", "USER"] })

        showSuccessNotification("Administrator successfully created")
      } else {
        showErrorNotification(
          "An administrator with this e-mail already exists"
        )
      }
    },
  })

  return mutation
}
