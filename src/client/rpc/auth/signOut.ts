import { apiClient } from "./apiClient.js"

const route = apiClient["sign-out"].$post

export async function signOut(): Promise<void> {
  try {
    await route()
  } catch (error) {
    throw new Error("An error occured while signing-out", {
      cause: error,
    })
  }
}
