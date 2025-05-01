import { useState } from "react"
import chroma from "chroma-js"

import { nanoid } from "nanoid"

import { ImageColorPicker } from "#components/image_color_picker/ImageColorPicker.jsx"
import { getColorName } from "#utils/getColorName.ts"

import { PageStyle } from "#components/PageStyle.tsx"
import { ColorPalette, ColorPaletteItem } from "#components/ColorPalette.tsx"
import { PaletteVisualizer } from "#components/PaletteVisualizer.tsx"

export function ImagePicker() {
  const [extractedImageColors, setExtractedImageColors] = useState<string[]>([])

  const [palette, setPalette] = useState<ColorPaletteItem[]>([])

  const primaryColorId = palette[0]?.id

  const handleImageColorsExtracted = (colors: string[]) => {
    setExtractedImageColors(colors)

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
    <PageStyle titleHighlight="Color From Image">
      <div className="mt-4">
        <ImageColorPicker onColorsExtracted={handleImageColorsExtracted} />
      </div>
      {extractedImageColors.length > 0 && (
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">Extracted Colors</h2>
          <ColorPalette palette={palette} />
        </div>
      )}

      {/*<ColorPalette palette={palette} />*/}
      <div className="mt-12">
        <PaletteVisualizer palette={palette} primaryColorId={primaryColorId} />
      </div>
    </PageStyle>
  )
}
