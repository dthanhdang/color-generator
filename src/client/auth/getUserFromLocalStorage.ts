import type { LocalStorageUser } from "#client/types"

import { localStorageUserSchema } from "#client/schemas"
import * as v from "valibot"

import { localStorageKey } from "./localStorageKey.js"

export function getUserFromLocalStorage(
  role?: LocalStorageUser["role"]
): LocalStorageUser | undefined {
  let user: LocalStorageUser | undefined
  const { localStorage } = globalThis

  const item = localStorage.getItem(localStorageKey)
  if (item) {
    try {
      user = v.parse(localStorageUserSchema, JSON.parse(item))
    } catch {
      localStorage.removeItem(localStorageKey)
    }
  }

  if (role && user?.role !== role) return undefined

  return user
}
