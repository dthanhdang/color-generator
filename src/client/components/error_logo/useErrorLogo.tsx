import { useState } from "react"
import { ErrorLogo } from "./ErrorLogo.jsx"
import { getRandomBaseColor } from "#components/getRandomBaseColor.ts"
import { getHarmonyColor } from "#utils/colorHarmony.ts"
import type { HarmonyType } from "#utils/colorHarmony.ts"
import type { Color } from "chroma-js"

type GenerateRandomPaletteProps = {
  colorsCount: number
  harmonyType: HarmonyType
}

function generateRandomPalette({
  colorsCount,
  harmonyType,
}: GenerateRandomPaletteProps): Color[] {
  const baseColor = getRandomBaseColor()
  return getHarmonyColor(baseColor, harmonyType, colorsCount)
}

type UseErrorLogoProps = {
  buttonLabel: string
  errorMessage: string
  harmonyType: HarmonyType
}

export function useErrorLogo({
  buttonLabel,
  errorMessage,
  harmonyType,
}: UseErrorLogoProps) {
  const [colors, setColors] = useState(() =>
    generateRandomPalette({ colorsCount: errorMessage.length, harmonyType })
  )

  const handleRegeneratePalette = (): void => {
    setColors(
      generateRandomPalette({ colorsCount: errorMessage.length, harmonyType })
    )
  }

  return {
    logo: <ErrorLogo colors={colors} message={errorMessage} />,
    regenerateButton: (
      <button
        className="underline text-[var(--primary-color)] decoration-dotted font-bold"
        onClick={handleRegeneratePalette}
      >
        {buttonLabel}
      </button>
    ),
  }
}
