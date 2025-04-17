//import { Form } from "./Form"

//import { ColorPalette, type ColorPaletteItem } from "../../ColorPalette"
import { useState } from "react"
import chroma, { type Color } from "chroma-js"

import { Select } from "@mantine/core"

import { nanoid } from "nanoid"

import { ImageColorPicker } from "#components/image_color_picker/ImageColorPicker.jsx"
import { getColorName } from "#utils/getColorName.ts"
import { Form } from "../../components/Form"
import { FormOklch } from "../../components/FormOklch"
import { FormHsl } from "#components/FormHsl.tsx"
import { PageStyle } from "#components/PageStyle.tsx"
import { ColorPalette, ColorPaletteItem } from "#components/ColorPalette.tsx"
import { PaletteVisualizer } from "#components/PaletteVisualizer.tsx"
type ColorMode = "hex" | "hsl" | "oklch"

export function ImagePicker() {
  const [color, setColor] = useState(chroma("#b4f2ce"))
  const [colorMode, setColorMode] = useState<ColorMode>("hex")

  const [extractedImageColors, setExtractedImageColors] = useState<string[]>([])

  const [palette, setPalette] = useState<ColorPaletteItem[]>([])

  const primaryColorId = palette[0]?.id

  const handleColorSubmit = (newColor: Color) => {
    //const newPalette = getColorScale(newColor, 10)
    if (chroma.valid(newColor)) {
      setColor(newColor)
    } else {
      console.error(`Invalid color : ${newColor}`)
    }
  }

  const handleModeChange = (value: string | null) => {
    if (value === "hex" || value === "hsl" || value === "oklch")
      setColorMode(value)
  }

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
        <ImageColorPicker
          onColorSelect={(color) => setColor(chroma(color))}
          onColorsExtracted={handleImageColorsExtracted}
        />
      </div>
      {extractedImageColors.length > 0 && (
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">Extracted Colors</h2>
          <ColorPalette palette={palette} />
        </div>
      )}
      <div className="mb-4">
        <Select
          data={[
            { value: "hex", label: "HEX" },
            { value: "hsl", label: "HSL" },
            { value: "oklch", label: "OKLCH" },
          ]}
          value={colorMode}
          onChange={handleModeChange}
        />
      </div>
      <div className="mt-4">
        {" "}
        {colorMode === "hex" && (
          <Form onSubmit={handleColorSubmit} initialColor={color} />
        )}
        {colorMode === "hsl" && (
          <FormHsl initialColor={color} onSubmit={handleColorSubmit} />
        )}
        {colorMode === "oklch" && (
          <FormOklch initialColor={color} onSubmit={handleColorSubmit} />
        )}
      </div>

      {/*<ColorPalette palette={palette} />*/}
      <div className="mt-12">
        <PaletteVisualizer palette={palette} primaryColorId={primaryColorId} />
      </div>
    </PageStyle>
  )
}
