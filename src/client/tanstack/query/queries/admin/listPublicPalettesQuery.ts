import type { UseSuspenseQueryOptions } from "@tanstack/react-query"

import { listPublicPalettes } from "#client/rpc/admin"

export function listPublicPalettesQuery(): UseSuspenseQueryOptions<
  Awaited<ReturnType<typeof listPublicPalettes>>
> {
  return {
    queryFn: listPublicPalettes,
    queryKey: ["ADMIN", "PUBLIC_PALETTE"],
  } as const
}
