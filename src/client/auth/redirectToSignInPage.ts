import { redirect } from "@tanstack/react-router"
import { UserRole } from "#server/types"

export function redirectToSignInPage(role?: UserRole): never {
  console.log({ role })
  throw redirect({
    to: "/auth/sign-in",
    search: { role, redirect_to: window.location.pathname },
  })
}
