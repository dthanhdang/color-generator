import type { JSX, ReactNode } from "react"

import { useAuthentication } from "#client/hooks"

type UnauthenticatedProps = {
  children: ReactNode
}

export function Unauthenticated({
  children,
}: UnauthenticatedProps): JSX.Element | null {
  const { user } = useAuthentication()

  return user === null ? <>{children}</> : null
}
