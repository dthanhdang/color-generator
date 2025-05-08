import { HTTPError } from "./HTTPError.js"

export function customFetch(
  request: RequestInfo | URL,
  init?: RequestInit
): Promise<Response> {
  return fetch(request, {
    ...init,
    credentials: "include",
  }).then((response) => {
    if (response.ok) return response
    else throw new HTTPError(response)
  })
}
