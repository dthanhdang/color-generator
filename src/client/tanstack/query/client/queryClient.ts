import { showErrorNotification } from "#client/components/notifications"
import { MutationCache, QueryClient } from "@tanstack/react-query"

export const queryClient = new QueryClient({
  mutationCache: new MutationCache({
    onError: (error): void => {
      showErrorNotification(error.message)
    },
  }),
})
