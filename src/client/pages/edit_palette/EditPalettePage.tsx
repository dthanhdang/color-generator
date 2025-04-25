import { PageStyle } from "#components/PageStyle.tsx"
import { PaletteEditor } from "#components/palette_editor/PaletteEditor.tsx"
import type { JSX } from "react"
import chroma from "chroma-js"

type EditPalettePageProps = {
  palette: string[]
}

export function EditPalettePage({
  palette,
}: EditPalettePageProps): JSX.Element {
  return (
    <PageStyle className="flex flex-col h-lvh" title="Your *Palette* Editor">
      <PaletteEditor
        className="grow"
        palette={palette.map((color) => chroma(color))}
      />
    </PageStyle>
  )
}
