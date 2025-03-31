import { useState } from "react"
import chroma from "chroma-js"

import { Select } from "@mantine/core"

import { nanoid } from "nanoid"

import { ColorPalette, type ColorPaletteItem } from "../../ColorPalette"
import { getHarmonyColor, HarmonyType } from "#utils/colorHarmony.ts"
import { HarmonySelector } from "../../components/HarmonySelector"
import { getColorName } from "#utils/getColorName.ts"
import { Form } from "../../Form"
import { FormOklch } from "../../components/FormOklch"
import { FormHsl } from "../../components/FormHsl"
import { type Color } from "chroma-js"

type ColorMode = "hex" | "hsl" | "oklch"
//type PaletteMode = "scale" | "harmony" | "image" | "random"

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

export function HarmonyPalette() {
  const [color, setColor] = useState<Color>(chroma("#b4f2ce"))
  const [colorMode, setColorMode] = useState<ColorMode>("hex")

  const [harmonyType, setHarmonyType] = useState<HarmonyType>("monochromatic")

  const [palette, setPalette] = useState<ColorPaletteItem[]>(() =>
    getHarmonyPalette(color, harmonyType, 5)
  )

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

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-center text-5xl font-bold my-8">
        Your{" "}
        <span style={{ color: "oklch(0.511 0.262 276.966)" }}>
          Harmony Palette
        </span>{" "}
        Generator
      </h1>
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
        <HarmonySelector value={harmonyType} onChange={handleHarmonyChange} />
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

      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">{harmonyType}</h2>
        <ColorPalette palette={palette} />
      </div>
    </main>
  )
}
