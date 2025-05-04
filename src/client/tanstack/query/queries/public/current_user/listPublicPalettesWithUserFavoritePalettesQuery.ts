import type { UseSuspenseQueryOptions } from "@tanstack/react-query"

import { listPublicPalettesWithUserFavoritePalettes } from "#client/rpc/current_user"

export function listPublicPalettesWithUserFavoritePalettesQuery(): UseSuspenseQueryOptions<
  Awaited<ReturnType<typeof listPublicPalettesWithUserFavoritePalettes>>
> {
  return {
    queryFn: listPublicPalettesWithUserFavoritePalettes,
    queryKey: ["CURRENT_USER", "PALETTE", "PUBLIC"],
  } as const
}
