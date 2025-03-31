import { useState } from "react"
import chroma, { type Color } from "chroma-js"

import { nanoid } from "nanoid"

import { RandomColor } from "#components/RandomColor.tsx"
import { getHarmonyColor, HarmonyType } from "#utils/colorHarmony.ts"
import { getColorName } from "#utils/getColorName.ts"
import { ColorPalette, ColorPaletteItem } from "../../ColorPalette"

export function RandomPalette() {
  const [palette, setPalette] = useState<ColorPaletteItem[]>([])

  function getHarmonyPalette(
    baseColor: Color,
    harmonyType: HarmonyType,
    count: number
  ): ColorPaletteItem[] {
    return getHarmonyColor(baseColor, harmonyType, count).map(
      (color, index) => {
        const colorObject = chroma(color)
        const colorNameResult = getColorName(colorObject)

        return {
          id: nanoid(),
          color,
          weight: index * 100 + 100,
          name: colorNameResult ? colorNameResult.name : "",
        }
      }
    )
  }

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-center text-5xl font-bold my-8">
        Your{" "}
        <span style={{ color: "oklch(0.511 0.262 276.966)" }}>
          Random Palette
        </span>{" "}
        Generator
      </h1>

      <RandomColor
        onPaletteGenerated={setPalette}
        getHarmonyPalette={getHarmonyPalette}
      />

      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4"></h2>
        <ColorPalette palette={palette} />
      </div>
    </main>
  )
}
