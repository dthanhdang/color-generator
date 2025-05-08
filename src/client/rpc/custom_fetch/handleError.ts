import { deleteUserFromLocalStorage, redirectToSignInPage } from "#client/auth"
import { HTTPError } from "./HTTPError.ts"

export function handleError(error: unknown, errorMessage: string): never {
  if (error instanceof HTTPError && error.status === 401) {
    deleteUserFromLocalStorage()

    redirectToSignInPage()
  }

  throw new Error(errorMessage, {
    cause: error,
  })
}
