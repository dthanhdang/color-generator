import { useState } from "react"
import chroma from "chroma-js"

import { Select, Group } from "@mantine/core"

import { nanoid } from "nanoid"

import { getHarmonyColor, HarmonyType } from "#utils/colorHarmony.ts"
import { HarmonySelector } from "../../components/HarmonySelector"
import { getColorName } from "#utils/getColorName.ts"
import { Form } from "../../components/Form"
import { FormOklch } from "../../components/FormOklch"
import { FormHsl } from "../../components/FormHsl"
import { type Color } from "chroma-js"
import { PageStyle } from "#components/PageStyle.tsx"
import { ColorPaletteItem, ColorPalette } from "#components/ColorPalette.tsx"

import { PaletteVisualizer } from "#components/PaletteVisualizer.tsx"
import {
  GenerateRandomPaletteButton,
  OpenPaletteEditorButton,
} from "#components/PaletteGeneratorButtons.tsx"

type ColorMode = "hex" | "hsl" | "oklch"

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

function getCountForHarmonyType(harmonyType: HarmonyType): number {
  const harmonyCounts: Record<HarmonyType, number> = {
    monochromatic: 5,
    analogous: 5,
    complementary: 5,
    triadic: 3,
    tetradic: 4,
    "split-complementary": 5,
  }
  return harmonyCounts[harmonyType] || 5
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
    <PageStyle title="Your *Harmony Palette* Generator">
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
        <GenerateRandomPaletteButton
          className="ml-auto"
          onClick={handleRandomHarmonyPalette}
        >
          Generate Random Harmony Palette
        </GenerateRandomPaletteButton>

        <OpenPaletteEditorButton palette={palette}>
          Open Harmony Palette in Editor
        </OpenPaletteEditorButton>
      </Group>

      <div className="mt-4">
        {" "}
        {colorMode === "hex" && (
          <Form color={color} onChange={handleColorSubmit} />
        )}
        {colorMode === "hsl" && (
          <FormHsl color={color} onChange={handleColorSubmit} />
        )}
        {colorMode === "oklch" && (
          <FormOklch color={color} onChange={handleColorSubmit} />
        )}
      </div>
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
