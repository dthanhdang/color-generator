import { useState } from "react"
import chroma, { type Color } from "chroma-js"

import { nanoid } from "nanoid"

import { RandomColor } from "#components/RandomColor.tsx"
import { getHarmonyColor, HarmonyType } from "#utils/colorHarmony.ts"
import { getColorName } from "#utils/getColorName.ts"
import { ColorPalette, ColorPaletteItem } from "../../ColorPalette"
import { ToggleFavoritePaletteButton } from "#components/toggle_favorite_palette_button/ToggleFavoritePaletteButton.tsx"
import type { RegisteredUser } from "#client/types"

type RandomPaletteProps = {
  paletteId: number | undefined
  user: RegisteredUser | undefined
}

export function RandomPalette({ paletteId, user }: RandomPaletteProps) {
  const [palette, setPalette] = useState<ColorPaletteItem[]>([])
  const [paletteWasModified, setPaletteWasModified] = useState(false)

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

  function handlePaletteGenerated(palette: ColorPaletteItem[]): void {
    setPalette(palette)
    setPaletteWasModified(true)
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
        onPaletteGenerated={handlePaletteGenerated}
        getHarmonyPalette={getHarmonyPalette}
      />

      <div className="mt-8 relative">
        <ToggleFavoritePaletteButton
          className="absolute top-0 right-0"
          fromRoute={undefined}
          initialFavoritePaletteId={paletteWasModified ? undefined : paletteId}
          generator={{ type: "random" }}
          palette={palette}
          userId={user?.id}
        />

        <h2 className="text-xl font-bold mb-4"></h2>
        <ColorPalette palette={palette} />
      </div>
    </main>
  )
}
