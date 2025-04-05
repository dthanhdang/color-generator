import { useState } from "react"
import chroma, { type Color } from "chroma-js"

import { nanoid } from "nanoid"

import { RandomColor } from "#components/RandomColor.tsx"
import { getHarmonyColor, HarmonyType } from "#utils/colorHarmony.ts"
import { getColorName } from "#utils/getColorName.ts"
//import { ColorPalette, ColorPaletteItem } from "../../ColorPalette"
import { PageStyle } from "#components/PageStyle.tsx"
import { ColorPalette, ColorPaletteItem } from "#components/ColorPalette.tsx"

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
    <PageStyle titleHighlight="Random Palette">
      {" "}
      <RandomColor
        onPaletteGenerated={setPalette}
        getHarmonyPalette={getHarmonyPalette}
      />
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4"></h2>
        <ColorPalette palette={palette} />
      </div>
    </PageStyle>
  )
}
