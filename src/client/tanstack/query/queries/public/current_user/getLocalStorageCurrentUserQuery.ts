import {
  deleteUserFromLocalStorage,
  getUserFromLocalStorage,
} from "#client/auth"
import { fromPublicPaletteDto } from "#client/rpc/conversion"
import { getCurrentUser } from "#client/rpc/current_user"
import { RegisteredUser } from "#client/types"
import type { UseSuspenseQueryOptions } from "@tanstack/react-query"
import { redirect } from "@tanstack/react-router"

export const getLocalStorageCurrentUserQuery: UseSuspenseQueryOptions<
  RegisteredUser | undefined
> = {
  queryFn: () => {
    const localStorageUser = getUserFromLocalStorage("registered_user")

    return localStorageUser
      ? getCurrentUser().then(({ user }) => {
          if (user) {
            return {
              ...user,
              favoritePalettes: user.favoritePalettes.map((palette) =>
                fromPublicPaletteDto(palette)
              ),
            }
          } else {
            deleteUserFromLocalStorage()
            throw redirect({ to: "/auth/sign-in" })
          }
        })
      : Promise.resolve(undefined)
  },
  queryKey: ["CURRENT_USER", "LOCAL_STORAGE_USER"],
} as const
