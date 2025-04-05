import { useMemo } from "react"
import chroma from "chroma-js"

import { nanoid } from "nanoid"

import { type ColorPaletteItem } from "../../ColorPalette"
import { HarmonyType } from "#utils/colorHarmony.ts"
import { getColorName } from "#utils/getColorName.ts"
import { type Color } from "chroma-js"
import type { FavoriteHarmonyPalette } from "#client/types"
import { buildColorFromComponentsDto } from "#client/conversions"
import { getHarmonyPalette } from "./getHarmonyPalette.ts"

type ColorMode = "hex" | "hsl" | "oklch"
//type PaletteMode = "scale" | "harmony" | "image" | "random"

type UseInitialGeneratorStateProps = {
  favoritePalette: FavoriteHarmonyPalette | undefined
}

type UseInitialGeneratorStateReturn = {
  initialColor: Color
  initialColorMode: ColorMode
  initialHarmonyType: HarmonyType
  initialPalette: ColorPaletteItem[]
}

export function useInitialGeneratorState({
  favoritePalette,
}: UseInitialGeneratorStateProps): UseInitialGeneratorStateReturn {
  return useMemo(() => {
    if (favoritePalette) {
      const {
        generator: { baseColor },
        generatedColors,
      } = favoritePalette

      const initialPalette = generatedColors.colorsComponents.map(
        (components, index) => {
          const color = buildColorFromComponentsDto({
            colorSpace: generatedColors.colorSpace,
            components,
          })
          const colorNameResult = getColorName(color)

          return {
            color,
            id: nanoid(),
            name: colorNameResult?.name ?? "",
            weight: index * 100 + 100,
          }
        }
      )
      const initialColor = buildColorFromComponentsDto({
        colorSpace: baseColor.colorSpace,
        components: baseColor.colorComponents,
      })
      const initialColorMode =
        baseColor.colorSpace === "rgb" ? "hex" : baseColor.colorSpace
      const initialHarmonyType = favoritePalette.generator.harmonyType

      return {
        initialColor,
        initialColorMode,
        initialHarmonyType,
        initialPalette,
      }
    } else {
      const initialColor = chroma("#b4f2ce")

      return {
        initialColor,
        initialColorMode: "hex",
        initialHarmonyType: "monochromatic",
        initialPalette: getHarmonyPalette(initialColor, "monochromatic", 5),
      }
    }
  }, [favoritePalette])
}
