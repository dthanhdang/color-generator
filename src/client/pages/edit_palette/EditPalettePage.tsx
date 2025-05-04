import { PageStyle } from "#components/PageStyle.tsx"
import { PaletteEditor } from "#components/palette_editor/PaletteEditor.tsx"
import type { JSX } from "react"
import type { Color } from "chroma-js"
import chroma from "chroma-js"
import { getHarmonyColor } from "#utils/colorHarmony.ts"
import type { PublicPalette } from "#client/types"

type EditPalettePageProps = {
  favoritePalette?: PublicPalette
  palette: Color[] | undefined
}

export function EditPalettePage({
  favoritePalette,
  palette = getHarmonyColor(chroma.random(), "split-complementary", 5),
}: EditPalettePageProps): JSX.Element {
  return (
    <PageStyle className="flex flex-col h-lvh" title="Your *Palette* Editor">
      <PaletteEditor
        className="grow"
        palette={palette}
        favoritePalette={favoritePalette}
      />
    </PageStyle>
  )
}
