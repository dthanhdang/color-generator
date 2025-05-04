import { PageStyle } from "#components/PageStyle.tsx"
import type { JSX } from "react"
import type { PublicPalette } from "#client/types"
import { PalettesList } from "#components/palettes_list/PalettesList.tsx"
import { EmptyPalettesList } from "#components/palettes_list/EmptyPalettesList.tsx"

type ExplorePalettesPageProps = {
  palettes: PublicPalette[]
}
export function ExplorePalettesPage({
  palettes,
}: ExplorePalettesPageProps): JSX.Element {
  return (
    <PageStyle title="Explore our Palettes">
      {palettes.length === 0 ? (
        <EmptyPalettesList />
      ) : (
        <PalettesList palettes={palettes} />
      )}
    </PageStyle>
  )
}
