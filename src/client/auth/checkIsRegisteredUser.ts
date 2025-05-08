import { checkIsRole } from "./checkIsRole.ts"

export function checkIsRegisteredUser(): void {
  return checkIsRole("registered_user")
}
