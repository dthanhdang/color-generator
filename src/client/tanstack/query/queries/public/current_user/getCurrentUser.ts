import type { UseSuspenseQueryOptions } from "@tanstack/react-query"
import { getCurrentUser } from "#client/rpc/current_user"
import { RegisteredUser } from "#client/types"
import { parseChromaPalette } from "#utils/parseChromaPalette.ts"
import { redirectToSignInPage } from "#client/auth"

export function getCurrentUserQuery(): UseSuspenseQueryOptions<RegisteredUser> {
  return {
    queryFn: async () => {
      const { user } = await getCurrentUser()

      if (!user) redirectToSignInPage()

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
