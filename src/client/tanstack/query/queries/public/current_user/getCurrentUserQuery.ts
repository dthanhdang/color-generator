import {
  deleteUserFromLocalStorage,
  getUserFromLocalStorage,
} from "#client/auth"
import { getCurrentUser } from "#client/rpc/public/current_user"
import { RegisteredUser } from "#client/types"
import type { UseSuspenseQueryOptions } from "@tanstack/react-query"
import { redirect } from "@tanstack/react-router"

export const getCurrentUserQuery: UseSuspenseQueryOptions<{
  user: RegisteredUser | undefined
}> = {
  queryFn: () => {
    const localStorageUser = getUserFromLocalStorage("registered_user")

    return localStorageUser
      ? getCurrentUser().then(({ user }) => {
          if (user) {
            return { user }
          } else {
            deleteUserFromLocalStorage()
            throw redirect({ to: "/auth/sign-in" })
          }
        })
      : Promise.resolve({ user: undefined })
  },
  queryKey: ["CURRENT_USER"],
} as const
