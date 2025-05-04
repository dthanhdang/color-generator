import type { LocalStorageUser } from "#client/types"

import { localStorageKey } from "./localStorageKey.js"

export function storeUserInLocalStorage(user: LocalStorageUser): void {
  globalThis.localStorage.setItem(localStorageKey, JSON.stringify(user))
}
