import { Stack } from "@mantine/core"
import type { JSX } from "react"
import { Link } from "@tanstack/react-router"
import type { PublicPalette } from "#client/types"
import { stringifyChromaPalette } from "#utils/stringifyChromaPalette.ts"
import { useToggleFavoritePalette } from "#client/hooks"
import { PaletteColors } from "#components/palette_colors/index.js"
import { LikesCounter } from "#components/likes_counter/index.js"

type PalettesListProps = {
  palettes: PublicPalette[]
}

export function PalettesList({ palettes }: PalettesListProps): JSX.Element {
  const { toggleFavorite: handleToggleFavorite } = useToggleFavoritePalette()

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
            onToggleFavorite={() => handleToggleFavorite(palette.colors)}
          />
        </Stack>
      ))}
    </div>
  )
}
