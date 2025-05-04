import { useToggleFavoritePaletteMutation } from "#client/tanstack/query/mutations"
import { useEffect, useState } from "react"
import { useAuthentication } from "#client/hooks"
import type { Color } from "chroma-js"
import { useQueryClient } from "@tanstack/react-query"
import { stringifyChromaPalette } from "#utils/stringifyChromaPalette.ts"

type UseToggleFavoritePaletteProps = {
  defaultIsFavorite?: boolean
}

type UseToggleFavoritePaletteReturn = {
  isFavorite: boolean
  isUpdatePending: boolean
  toggleFavorite: (colors: readonly Color[]) => void
}

export function useToggleFavoritePalette({
  defaultIsFavorite,
}: UseToggleFavoritePaletteProps = {}): UseToggleFavoritePaletteReturn {
  const [isFavorite, setIsFavorite] = useState(defaultIsFavorite ?? false)
  useEffect(() => {
    setIsFavorite(defaultIsFavorite ?? false)
  }, [defaultIsFavorite])
  const { user } = useAuthentication()
  const queryClient = useQueryClient()

  const handleMutationSuccess = (isFavorite: boolean): void => {
    setIsFavorite(isFavorite)
  }

  const toggleFavoritePaletteMutation = useToggleFavoritePaletteMutation(
    handleMutationSuccess
  )
  const toggleFavorite = (colors: readonly Color[]): void => {
    if (!user) {
      alert("You must be sign-in in order to add a favorite palette")
      return
    }

    toggleFavoritePaletteMutation.mutate({
      colors: stringifyChromaPalette(colors),
    })

    queryClient.invalidateQueries({ queryKey: ["CURRENT_USER"] })
  }

  return {
    isFavorite,
    isUpdatePending: toggleFavoritePaletteMutation.isPending,
    toggleFavorite,
  }
}
