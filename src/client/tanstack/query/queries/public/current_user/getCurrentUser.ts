import type { UseSuspenseQueryOptions } from "@tanstack/react-query"
import { redirect } from "@tanstack/react-router"
import { getCurrentUser } from "#client/rpc/current_user"
import { RegisteredUser } from "#client/types"
import { parseChromaPalette } from "#utils/parseChromaPalette.ts"

export function getCurrentUserQuery(): UseSuspenseQueryOptions<RegisteredUser> {
  return {
    queryFn: async () => {
      const { user } = await getCurrentUser()

      if (!user)
        throw redirect({
          to: "/auth/sign-in",
          search: { redirect_to: window.location.href },
        })

      return {
        ...user,
        favoritePalettes: user.favoritePalettes.map(
          ({ colors, ...palette }) => ({
            ...palette,
            colors: parseChromaPalette(colors),
          })
        ),
      }
    },
    queryKey: ["CURRENT_USER", "USER"],
  } as const
}
