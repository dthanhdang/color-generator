import type { LocalStorageUser } from "#client/types"
import type { JSX, ReactNode } from "react"

import { useAuthentication } from "#client/hooks"

type AuthenticatedProps = {
  children: ReactNode
  role?: LocalStorageUser["role"]
}

export function Authenticated({
  children,
  role,
}: AuthenticatedProps): JSX.Element | null {
  const { user } = useAuthentication()

  return user && (role === undefined || user.role === role) ? (
    <>{children}</>
  ) : null
}
