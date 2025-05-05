import type { UseSuspenseQueryOptions } from "@tanstack/react-query"

import { listUsers } from "#client/rpc/admin"

export function listUsersQuery(): UseSuspenseQueryOptions<
  Awaited<ReturnType<typeof listUsers>>
> {
  return {
    queryFn: listUsers,
    queryKey: ["ADMIN", "USER"],
  } as const
}
