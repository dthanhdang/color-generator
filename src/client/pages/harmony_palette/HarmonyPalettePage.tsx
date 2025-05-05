import { useState } from "react"
import chroma from "chroma-js"

import { Select, Group } from "@mantine/core"

import { nanoid } from "nanoid"

import { getHarmonyColor, HarmonyType } from "#utils/colorHarmony.ts"
import { HarmonySelector } from "../../components/HarmonySelector"
import { getColorName } from "#utils/getColorName.ts"
import { type Color } from "chroma-js"
import { PageStyle } from "#components/PageStyle.tsx"
import { ColorPaletteItem, ColorPalette } from "#components/ColorPalette.tsx"

import { PaletteVisualizer } from "#components/PaletteVisualizer.tsx"
import type { ColorMode } from "#client/types"
import { ColorForm } from "#components/color_form/ColorForm.tsx"
import { PaletteGeneratorButtons } from "#components/palette_generator_buttons/PaletteGeneratorButtons.tsx"
import { getCountForHarmonyType } from "#utils/getCountForHarmonyType.ts"

function getHarmonyPalette(
  baseColor: Color,
  harmonyType: HarmonyType,
  count: number
): ColorPaletteItem[] {
  return getHarmonyColor(baseColor, harmonyType, count).map((color, index) => {
    const colorObject = chroma(color)
    const colorNameResult = getColorName(colorObject)

    return {
      id: nanoid(),
      color,
      weight: index * 100 + 100,
      name: colorNameResult ? colorNameResult.name : "",
    }
  })
}

function generateRandomColor(): Color {
  return chroma.random()
}

export function HarmonyPalette() {
  const [color, setColor] = useState<Color>(chroma("#b4f2ce"))
  const [colorMode, setColorMode] = useState<ColorMode>("hex")

  const [harmonyType, setHarmonyType] = useState<HarmonyType>("monochromatic")

  const [palette, setPalette] = useState<ColorPaletteItem[]>(() =>
    getHarmonyPalette(color, harmonyType, getCountForHarmonyType(harmonyType))
  )

  const primaryColorId = palette[0]?.id

  const handleColorSubmit = (newColor: Color) => {
    if (chroma.valid(newColor)) {
      setColor(newColor)
      setPalette(getHarmonyPalette(newColor, harmonyType, 5))
    } else {
      console.error(`Invalid color: ${newColor}`)
    }
  }

  const handleModeChange = (value: string | null) => {
    if (value === "hex" || value === "hsl" || value === "oklch")
      setColorMode(value)
  }

  const handleHarmonyChange = (value: HarmonyType) => {
    setHarmonyType(value)

    setPalette(getHarmonyPalette(color, value, 5))
  }

  const handleRandomHarmonyPalette = () => {
    const randomColor = generateRandomColor()
    setColor(randomColor)
    setPalette(
      getHarmonyPalette(
        randomColor,
        harmonyType,
        getCountForHarmonyType(harmonyType)
      )
    )
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
          onGeneratePalette={handleRandomHarmonyPalette}
          colors={palette.map(({ color }) => color)}
        />
      </Group>

      <ColorForm
        className="mt-4"
        color={color}
        colorMode={colorMode}
        onChange={handleColorSubmit}
      />

      <div className="mt-4">
        <HarmonySelector value={harmonyType} onChange={handleHarmonyChange} />
      </div>
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">{harmonyType}</h2>
        <ColorPalette palette={palette} />
      </div>
      <div className="mt-12">
        <PaletteVisualizer palette={palette} primaryColorId={primaryColorId} />
      </div>
    </PageStyle>
  )
}
