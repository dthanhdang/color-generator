import type { FavoritePalette, FavoritePaletteGenerator } from "#client/types"
import type { JSX } from "react"
import { ActionIcon, Group, Paper, Title } from "@mantine/core"
import { buildColorFromComponentsDto } from "#client/conversions"
import { IconPencil, IconTrash } from "@tabler/icons-react"
import { Link } from "@tanstack/react-router"
import { useDeleteFavoritePaletteMutation } from "#client/tanstack/query/mutations"

function pageRoute(
  generatorType: FavoritePaletteGenerator["type"]
): "/harmony-palette" | "/scale-palette" | undefined {
  switch (generatorType) {
    case "harmony":
      return "/harmony-palette"
    case "scale":
      return "/scale-palette"
    default:
      return undefined
  }
}

type PaletteProps = {
  palette: FavoritePalette
}

export function Palette({ palette }: PaletteProps): JSX.Element {
  const deleteFavoritePaletteMutation = useDeleteFavoritePaletteMutation()

  const handleDeletePalete = (): void => {
    deleteFavoritePaletteMutation({ paletteId: palette.id })
  }

  const to = pageRoute(palette.generator.type)

  return (
    <Paper className="p-2 flex flex-col gap-4 w-max" withBorder>
      <Group>
        <Title order={4}>{palette.generator.type}</Title>

        {to === undefined ? null : (
          <Link to={to} search={{ palette_id: palette.id }} className="ml-auto">
            <IconPencil />
          </Link>
        )}

        <ActionIcon onClick={handleDeletePalete} variant="transparent">
          <IconTrash />
        </ActionIcon>
      </Group>

      <Group>
        <div className="flex flex-row gap-2">
          {palette.generatedColors.colorsComponents.map((components) => {
            const color = buildColorFromComponentsDto({
              colorSpace: palette.generatedColors.colorSpace,
              components,
            }).hex()

            return (
              <div
                className="h-16 max-w-16 p-4 rounded-lg shadow-md grow"
                key={color}
                style={{
                  backgroundColor: color,
                }}
              />
            )
          })}
        </div>
      </Group>
    </Paper>
  )
}
