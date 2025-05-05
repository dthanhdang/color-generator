import { ActionIcon, Group, Stack } from "@mantine/core"
import type { JSX } from "react"
import { Link } from "@tanstack/react-router"
import { Heart } from "lucide-react"
import type { PublicPalette } from "#client/types"
import { stringifyChromaPalette } from "#utils/stringifyChromaPalette.ts"
import { useToggleFavoritePalette } from "#client/hooks"

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
            {palette.colors.map((color, index) => (
              <div
                className="grow"
                key={index}
                style={{ backgroundColor: color.hex() }}
              />
            ))}
          </Link>
          <Group className="items-center gap-2 bold justify-between">
            <Group>
              <ActionIcon
                className="disabled:bg-transparent"
                onClick={() => {
                  handleToggleFavorite(palette.colors)
                }}
                variant="transparent"
              >
                <Heart
                  fill={palette.favoritePaletteId ? "currentColor" : "white"}
                />
              </ActionIcon>
              <p className="font-bold">{(palette.likes ?? 0).toString()}</p>
            </Group>
          </Group>
        </Stack>
      ))}
    </div>
  )
}
