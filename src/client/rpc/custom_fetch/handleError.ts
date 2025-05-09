import { deleteUserFromLocalStorage, redirectToLogInPage } from "#client/auth"
import { HTTPError } from "./HTTPError.ts"

export function handleError(error: unknown, errorMessage: string): never {
  if (error instanceof HTTPError && error.status === 401) {
    deleteUserFromLocalStorage()

    redirectToLogInPage()
  }

  throw new Error(errorMessage, {
    cause: error,
  })
}
