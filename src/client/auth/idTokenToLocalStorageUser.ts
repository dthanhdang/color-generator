import type { LocalStorageUser } from "#client/types"

import { idTokenSchema } from "#client/schemas"
import { unsafeExtractUserIdFromSubject } from "@meow-meow-dev/server-utilities/auth"
import { jwtDecode } from "jwt-decode"
import * as v from "valibot"

export function idTokenToLocalStorageUser(
  idToken: string
): LocalStorageUser | undefined {
  try {
    const payload = jwtDecode(idToken)
    const { email, family_name, given_name, status, sub } = v.parse(
      idTokenSchema,
      payload
    )

    const id = unsafeExtractUserIdFromSubject(sub)
    if (id === undefined) return undefined

    const identity = { firstName: given_name, lastName: family_name }

    return {
      email,
      id,
      identity,
      role: status.role,
    }
  } catch {
    return undefined
  }
}
