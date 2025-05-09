import type { UseSuspenseQueryOptions } from "@tanstack/react-query"
import { getCurrentUser } from "#client/rpc/current_user"
import { RegisteredUser } from "#client/types"
import { redirectToLogInPage } from "#client/auth"
import { fromPublicPaletteDto } from "#client/rpc/conversion"

export function getCurrentUserQuery(): UseSuspenseQueryOptions<RegisteredUser> {
  return {
    queryFn: async () => {
      const { user } = await getCurrentUser()

      if (!user) redirectToLogInPage()

      return {
        ...user,
        favoritePalettes: user.favoritePalettes.map((palette) =>
          fromPublicPaletteDto(palette)
        ),
      }
    },
    queryKey: ["CURRENT_USER", "USER"],
  } as const
}
