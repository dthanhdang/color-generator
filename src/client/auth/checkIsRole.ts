import type { UserRole } from "#client/types"
import { getUserFromLocalStorage } from "./getUserFromLocalStorage.ts"
import { redirectToSignInPage } from "./redirectToSignInPage.ts"

export function checkIsRole(role: UserRole): void {
  const user = getUserFromLocalStorage(role)
  if (!user) redirectToSignInPage(role)
}
