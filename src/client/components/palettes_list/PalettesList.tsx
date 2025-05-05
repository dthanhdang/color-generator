import { Stack } from "@mantine/core"
import { useState, type JSX } from "react"
import { Link } from "@tanstack/react-router"
import type { PublicPalette } from "#client/types"
import { stringifyChromaPalette } from "#utils/stringifyChromaPalette.ts"
import { useToggleFavoritePalette } from "#client/hooks"
import { PaletteColors } from "#components/palette_colors/index.js"
import { LikesCounter } from "#components/likes_counter/index.js"

type PalettesListProps = {
  palettes: PublicPalette[]
}

export function PalettesList({
  palettes: initialPalettes,
}: PalettesListProps): JSX.Element {
  const { toggleFavorite } = useToggleFavoritePalette()

  const [palettes, setPalettes] = useState(initialPalettes)

  const handleToggleFavorite = async (
    palette: PublicPalette
  ): Promise<undefined> => {
    const favoritePaletteId = await toggleFavorite(palette.colors)
    console.log({ favoritePaletteId })
    if (favoritePaletteId === null) return

    setPalettes(
      palettes.map((item) =>
        item.id === palette.id
          ? {
              ...item,
              favoritePaletteId,
              likes: item.likes + (favoritePaletteId ? 1 : -1),
            }
          : item
      )
    )
  }

  return (
    <div className="grid grid-cols-4 gap-x-6 gap-y-10">
      {palettes.map((palette) => (
        <Stack className="gap-2" key={palette.id}>
          <Link
            className="h-16 flex flex-row"
            search={{ colors: stringifyChromaPalette(palette.colors) }}
            to="/palette-editor"
          >
            <PaletteColors colors={palette.colors} />
          </Link>

          <LikesCounter
            isFavorite={palette.favoritePaletteId !== undefined}
            likes={palette.likes}
            onToggleFavorite={() => handleToggleFavorite(palette)}
          />
        </Stack>
      ))}
    </div>
  )
}
