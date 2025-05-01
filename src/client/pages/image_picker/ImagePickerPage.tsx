import { useState } from "react"
import chroma /*type Color */ from "chroma-js"

import { nanoid } from "nanoid"

import { ImageColorPicker } from "#components/image_color_picker/ImageColorPicker.jsx"
import { getColorName } from "#utils/getColorName.ts"

import { PageStyle } from "#components/PageStyle.tsx"
import { ColorPalette, ColorPaletteItem } from "#components/ColorPalette.tsx"
import { PaletteVisualizer } from "#components/PaletteVisualizer.tsx"
import { Group } from "@mantine/core"
import { OpenPaletteEditorButton } from "#components/PaletteGeneratorButtons.tsx"

export function ImagePicker() {
  const [palette, setPalette] = useState<ColorPaletteItem[]>([])

  const primaryColorId = palette[0]?.id

  const handleImageColorsExtracted = (colors: string[]) => {
    setPalette(
      colors.map((color, index) => ({
        id: nanoid(),
        color: chroma(color),
        weight: index * 100 + 100,
        name: getColorName(chroma(color))?.name || "",
      }))
    )
  }

  return (
    <PageStyle title="Your *Color From Image* Extractor">
      <div className="mt-4">
        <ImageColorPicker onColorsExtracted={handleImageColorsExtracted} />
      </div>

      {palette.length > 0 && (
        <>
          <Group className="mt-8 justify-end">
            <OpenPaletteEditorButton palette={palette}>
              Open Palette in Editor
            </OpenPaletteEditorButton>
          </Group>

          <div className="mt-8">
            <h2 className="text-xl font-bold mb-4">Extracted Colors</h2>
            <ColorPalette palette={palette} />
          </div>
        </>
      )}

      <div className="mt-12">
        <PaletteVisualizer palette={palette} primaryColorId={primaryColorId} />
      </div>
    </PageStyle>
  )
}
