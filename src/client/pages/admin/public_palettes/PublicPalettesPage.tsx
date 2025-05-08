import type { PublicPalette } from "#client/types"
import { EmptyPalettesList } from "#components/palettes_list/EmptyPalettesList.tsx"
import { ActionIcon, Button, Group, Stack } from "@mantine/core"
import { Link } from "@tanstack/react-router"
import { Shuffle, Trash } from "lucide-react"
import type { JSX } from "react"
import { useDeletePublicPaletteMutation } from "./useDeletePublicPaletteMutation.ts"
import { LikesCounter } from "#components/likes_counter/LikesCounter.tsx"
import { AdminPage } from "#components/page/AdminPage.tsx"
import { PaletteColors } from "#components/palette_colors/PaletteColors.tsx"

type PublicPalettesPageProps = { palettes: PublicPalette[] }

export function PublicPalettesPage({
  palettes,
}: PublicPalettesPageProps): JSX.Element {
  const deletePublicPaletteMutation = useDeletePublicPaletteMutation()

  const handleDelete = (id: number): void => {
    deletePublicPaletteMutation.mutate(id)
  }

  return (
    <AdminPage>
      <Stack className="gap-10">
        <Button.Group className="ml-auto">
          <Button
            component={Link}
            leftSection={<Shuffle />}
            to="/admin/public-palettes/generate"
            variant="light"
          >
            Generate random palettes
          </Button>
        </Button.Group>

        {palettes.length === 0 ? (
          <EmptyPalettesList />
        ) : (
          <div className="grid grid-cols-4 gap-x-6 gap-y-10">
            {palettes.map((palette) => (
              <Stack className="gap-2" key={palette.id}>
                <div className="h-16 flex flex-row relative group">
                  <PaletteColors colors={palette.colors} />

                  <ActionIcon
                    className="absolute right-5 top-1/2 -translate-y-1/2 hidden group-hover:inline"
                    disabled={palette.likes > 0}
                    onClick={() => handleDelete(palette.id)}
                    variant="transparent"
                  >
                    <Trash />
                  </ActionIcon>
                </div>

                <Group className="items-center justify-between">
                  <LikesCounter likes={palette.likes} />
                  {palette.createdAt.toDateString()}
                </Group>
              </Stack>
            ))}
          </div>
        )}
      </Stack>
    </AdminPage>
  )
}
