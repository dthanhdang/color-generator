import {
  deleteUserFromLocalStorage,
  getUserFromLocalStorage,
} from "#client/auth"
import { getCurrentUser } from "#client/rpc/current_user"
import { RegisteredUser } from "#client/types"
import { parseChromaPalette } from "#utils/parseChromaPalette.ts"
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
              favoritePalettes: user.favoritePalettes.map(
                ({ colors, ...palette }) => ({
                  ...palette,
                  colors: parseChromaPalette(colors),
                })
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
