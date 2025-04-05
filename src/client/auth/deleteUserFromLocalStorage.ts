import { localStorageKey } from "./localStorageKey.js"

export function deleteUserFromLocalStorage(): void {
  window.localStorage.removeItem(localStorageKey)
}
