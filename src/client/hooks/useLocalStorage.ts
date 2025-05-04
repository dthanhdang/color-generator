import type { LocalStorageUser } from "#client/types"

import {
  deleteUserFromLocalStorage,
  storeUserInLocalStorage,
} from "#client/auth"
import { useQueryClient } from "@tanstack/react-query"
import { useRouter } from "@tanstack/react-router"
import { useMemo } from "react"

type UseLocalStorageOutput = {
  deleteUser: () => Promise<void>
  storeUser: (user: LocalStorageUser) => Promise<void>
}

export function useLocalStorage(): UseLocalStorageOutput {
  const queryClient = useQueryClient()
  const router = useRouter()

  return useMemo((): UseLocalStorageOutput => {
    const invalidate = async (): Promise<void> => {
      await queryClient.invalidateQueries({ queryKey: ["CURRENT_USER"] })

      await router.invalidate()
    }

    const deleteUser = async (): Promise<void> => {
      deleteUserFromLocalStorage()

      await invalidate()
    }

    const storeUser = async (user: LocalStorageUser): Promise<void> => {
      storeUserInLocalStorage(user)

      await invalidate()
    }

    return { deleteUser, storeUser }
  }, [queryClient, router])
}
