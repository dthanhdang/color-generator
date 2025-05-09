import type { UserRole } from "#client/types"
import { getUserFromLocalStorage } from "./getUserFromLocalStorage.js"
import { redirectToLogInPage } from "./redirectToLogInPage.js"

export function checkIsRole(role: UserRole): void {
  const user = getUserFromLocalStorage(role)
  if (!user) redirectToLogInPage(role)
}
