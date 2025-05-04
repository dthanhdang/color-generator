import { deleteUserFromLocalStorage } from "#client/auth"
import { HTTPError } from "./HTTPError.js"
import { redirect } from "@tanstack/react-router"

export function customFetch(
  request: RequestInfo | URL,
  init?: RequestInit
): Promise<Response> {
  return fetch(request, {
    ...init,
    credentials: "include",
  }).then((response) => {
    if (response.ok) {
      return response
    } else {
      if (response.status === 401) {
        deleteUserFromLocalStorage()

        throw redirect({
          search: { redirect_to: window.location.href },
          to: "/auth/sign-in",
        })
      } else {
        throw new HTTPError(response)
      }
    }
  })
}
