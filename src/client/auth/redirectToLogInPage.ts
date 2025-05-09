import { redirect } from "@tanstack/react-router"
import { UserRole } from "#server/types"

export function redirectToLogInPage(role?: UserRole): never {
  throw redirect({
    to: "/auth/log-in",
    search: { role, redirect_to: window.location.pathname },
  })
}
