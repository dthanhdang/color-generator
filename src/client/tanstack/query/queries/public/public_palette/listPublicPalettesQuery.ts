import type { UseSuspenseQueryOptions } from "@tanstack/react-query"

import { listPublicPalettes } from "#client/rpc/public_palette"

export function listPublicPalettesQuery(): UseSuspenseQueryOptions<
  Awaited<ReturnType<typeof listPublicPalettes>>
> {
  return {
    queryFn: listPublicPalettes,
    queryKey: ["PUBLIC_PALETTE"],
  } as const
}
