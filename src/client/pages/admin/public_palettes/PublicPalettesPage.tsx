import type { PublicPalette } from "#client/types"
import { PageStyle } from "#components/PageStyle.tsx"
import { EmptyPalettesList } from "#components/palettes_list/EmptyPalettesList.tsx"
import { PalettesList } from "#components/palettes_list/PalettesList.tsx"
import { Button, Stack } from "@mantine/core"
import { Link } from "@tanstack/react-router"
import { Shuffle } from "lucide-react"
import type { JSX } from "react"

type PublicPalettesPageProps = { palettes: PublicPalette[] }

export function PublicPalettesPage({
  palettes,
}: PublicPalettesPageProps): JSX.Element {
  return (
    <PageStyle title="Public palettes">
      <Stack className="gap-5">
        {palettes.length === 0 ? (
          <EmptyPalettesList />
        ) : (
          <PalettesList palettes={palettes} />
        )}

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
      </Stack>
    </PageStyle>
  )
}
