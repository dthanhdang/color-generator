import {
  useAddFavoritePaletteMutation,
  useDeleteFavoritePaletteMutation,
} from "#client/tanstack/query/mutations"
import { ActionIcon } from "@mantine/core"
import { IconHeart, IconHeartFilled } from "@tabler/icons-react"
import { useNavigate } from "@tanstack/react-router"
import { useEffect, useState, type JSX } from "react"
import type { ColorPaletteItem } from "../../ColorPalette.tsx"
import type { AddUserFavoritePaletteProps } from "#client/rpc/public/current_user"

type ToggleFavoritePaletteButtonProps = {
  className?: string
  fromRoute: "/harmony-palette" | "/scale-palette" | undefined
  generator: AddUserFavoritePaletteProps["generator"]
  initialFavoritePaletteId: number | undefined
  palette: ColorPaletteItem[]
  userId: number | undefined
}

export function ToggleFavoritePaletteButton({
  className,
  fromRoute,
  generator,
  initialFavoritePaletteId,
  palette,
  userId,
}: ToggleFavoritePaletteButtonProps): JSX.Element {
  const [favoritePaletteId, setFavoritePaletteId] = useState(
    initialFavoritePaletteId
  )
  useEffect(() => {
    setFavoritePaletteId(initialFavoritePaletteId)
  }, [initialFavoritePaletteId])

  const navigate = useNavigate({ from: fromRoute })

  const handleMutationSuccess = (id: number | undefined) => {
    setFavoritePaletteId(id)

    if (fromRoute === undefined) return

    const url = new URL(window.location.toString())
    if (id === undefined) url.searchParams.delete("palette_id")
    else url.searchParams.set("palette_id", id.toString())

    navigate({ search: { palette_id: id } })
  }

  const addFavoritePaletteMutation = useAddFavoritePaletteMutation(
    handleMutationSuccess
  )
  const deleteFavoritePaletteMutation = useDeleteFavoritePaletteMutation(() =>
    handleMutationSuccess(undefined)
  )

  const handleClick = (): void => {
    if (userId === undefined) return

    if (favoritePaletteId !== undefined)
      deleteFavoritePaletteMutation({ paletteId: favoritePaletteId })
    else
      addFavoritePaletteMutation({
        generatedColors: palette,
        generator,
        userId,
      })
  }

  return (
    <ActionIcon
      className={className}
      disabled={userId === undefined}
      variant="transparent"
      onClick={handleClick}
    >
      {favoritePaletteId === undefined ? <IconHeart /> : <IconHeartFilled />}
    </ActionIcon>
  )
}
