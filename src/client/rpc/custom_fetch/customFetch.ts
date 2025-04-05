import {
  deleteUserFromLocalStorage,
  getUserFromLocalStorage,
} from "#client/auth"
import { HTTPError } from "#client/rpc/error"
import { redirect } from "@tanstack/react-router"

export function customFetch(
  request: RequestInfo | URL,
  init?: RequestInit
): Promise<Response> {
  return fetch(request, {
    ...init,
    credentials: "include",
  }).then((response) => {
    const user = getUserFromLocalStorage()

    if (response.ok) {
      return response
    } else if (user && response.status === 401) {
      deleteUserFromLocalStorage()
      // TODO add a parameter in order to display an extra message (you've been disconnected for security reasons...)
      throw redirect({
        to: "/auth/sign-in",
        search: { role: user.role === "administrator" ? user.role : undefined },
      })
    } else {
      throw new HTTPError(response)
    }
  })
}
