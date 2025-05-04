import { PageStyle } from "#components/PageStyle.tsx"
import type { JSX } from "react"
import type { PublicPalette } from "#client/types"
import {
  EmptyPalettesList,
  PalettesList,
} from "#components/palettes_list/index.ts"

type MyPalettesPageProps = {
  palettes: PublicPalette[]
}
export function MyPalettesPage({ palettes }: MyPalettesPageProps): JSX.Element {
  return (
    <PageStyle title="My palettes">
      {palettes.length === 0 ? (
        <EmptyPalettesList />
      ) : (
        <PalettesList palettes={palettes} />
      )}
    </PageStyle>
  )
}
