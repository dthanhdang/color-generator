import type { LocalStorageUser } from "#client/types"

import { getLocalStorageUserQuery } from "#client/tanstack/query/queries/auth"
import { useQuery } from "@tanstack/react-query"

export type UseAuthenticationReturn = {
  user: LocalStorageUser | null | undefined
}

export function useAuthentication(): UseAuthenticationReturn {
  const { data: user } = useQuery(getLocalStorageUserQuery)

  return { user }
}
