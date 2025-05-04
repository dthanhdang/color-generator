import { ActionIcon, Group, Stack } from "@mantine/core"
import type { JSX } from "react"
import { Link } from "@tanstack/react-router"
import { Heart } from "lucide-react"
import { useToggleFavoritePalette } from "#client/hooks"
import type { PublicPalette } from "#client/types"
import { stringifyChromaPalette } from "#utils/stringifyChromaPalette.ts"

type PalettesListProps = {
  palettes: PublicPalette[]
}

export function PalettesList({ palettes }: PalettesListProps): JSX.Element {
  const toggleFavorite = useToggleFavoritePalette()

  return (
    <div className="grid grid-cols-4 gap-x-6 gap-y-10">
      {palettes.map((palette) => (
        <Stack className="gap-2" key={palette.id}>
          <Link
            className="flex flex-row"
            search={{ colors: stringifyChromaPalette(palette.colors) }}
            to="/palette-editor"
          >
            {palette.colors.map((color, index) => (
              <div
                className="size-16 grow"
                key={index}
                style={{ backgroundColor: color.hex() }}
              />
            ))}
          </Link>
          <Group className="items-center gap-2 bold">
            <ActionIcon
              onClick={() => toggleFavorite.toggleFavorite(palette.colors)}
              variant="transparent"
            >
              <Heart
                fill={palette.favoritePaletteId ? "currentColor" : "white"}
              />
            </ActionIcon>
            {(palette.likes ?? 0).toString()}
          </Group>
        </Stack>
      ))}
    </div>
  )
}
