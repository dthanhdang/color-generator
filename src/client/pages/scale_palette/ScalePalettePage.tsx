import { useState } from "react"
import chroma, { type Color } from "chroma-js"
import { Select, Group } from "@mantine/core"

import { nanoid } from "nanoid"

import { getColorName } from "#utils/getColorName.ts"
import { PageStyle } from "#components/PageStyle.tsx"
import { ColorPalette, ColorPaletteItem } from "#components/ColorPalette.tsx"
import { PaletteVisualizer } from "#components/PaletteVisualizer.tsx"
import { PaletteGeneratorButtons } from "#components/palette_generator_buttons/index.js"
import { ColorForm } from "#components/color_form/index.ts"
import type { ColorMode } from "#client/types"

type GetColorScaleProps = {
  baseColor: Color
  count: number
}

function getColorScale({
  baseColor,
  count,
}: GetColorScaleProps): ColorPaletteItem[] {
  const lightColor = chroma(baseColor).brighten(2)
  const darkColor = chroma(baseColor).darken(1)
  return (
    chroma
      //.scale(["white", baseColor])
      .scale([lightColor, baseColor, darkColor])
      .mode("lch")
      .colors(count, undefined)
      .map((color, index) => {
        const weight = index === 0 ? 50 : index === 10 ? 950 : index * 100
        const colorNameResult = getColorName(color)

        return {
          id: nanoid(),
          color,
          weight,
          name: colorNameResult ? colorNameResult.name : "",
        }
      })
  )
}

function generateRandomColor(): Color {
  return chroma.random()
}

export function ScalePaletteGenerator() {
  const [color, setColor] = useState(chroma("#3b82f6"))
  const [colorMode, setColorMode] = useState<ColorMode>("hex")
  const [primaryColorId, setPrimaryColorId] = useState<string | undefined>(
    undefined
  )

  const [palette, setPalette] = useState<ColorPaletteItem[]>(() => {
    const initialPalette = getColorScale({ baseColor: color, count: 11 })
    if (initialPalette.length > 5) {
      setPrimaryColorId(initialPalette[5].id)
    }
    return initialPalette
  })

  const handleColorSubmit = (newColor: Color) => {
    if (chroma.valid(newColor)) {
      setColor(newColor)

      const newPalette = getColorScale({ baseColor: newColor, count: 11 })
      setPalette(newPalette)
    } else {
      console.error(`Invalid color : ${newColor}`)
    }
  }

  const handleModeChange = (value: string | null) => {
    if (value === "hex" || value === "hsl" || value === "oklch")
      setColorMode(value)
  }

  const handleGenerateRandomScalePalette = () => {
    const RandomColor = generateRandomColor()
    setColor(RandomColor)
    const newPalette = getColorScale({ baseColor: RandomColor, count: 11 })
    setPalette(newPalette)

    if (newPalette.length > 5) {
      setPrimaryColorId(newPalette[5].id)
    }
  }

  return (
    <PageStyle>
      <Group justify="space-between" mb="md">
        <Select
          data={[
            { value: "hex", label: "HEX" },
            { value: "hsl", label: "HSL" },
            { value: "oklch", label: "OKLCH" },
          ]}
          value={colorMode}
          onChange={handleModeChange}
        />

        <PaletteGeneratorButtons
          onGeneratePalette={handleGenerateRandomScalePalette}
          colors={palette.map(({ color }) => color)}
        />
      </Group>

      <ColorForm
        className="mt-4"
        color={color}
        colorMode={colorMode}
        onChange={handleColorSubmit}
      />

      <div className="mt-8">
        <ColorPalette palette={palette} />
      </div>
      <div className="mt-12">
        <PaletteVisualizer palette={palette} primaryColorId={primaryColorId} />
      </div>
    </PageStyle>
  )
}
