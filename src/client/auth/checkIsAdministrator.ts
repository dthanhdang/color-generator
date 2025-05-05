import { checkIsRole } from "./checkIsRole.ts"

export function checkIsAdministrator(): void {
  return checkIsRole("administrator")
}
