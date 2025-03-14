import { useState, useEffect, useCallback } from "react"
import { Button } from "@mantine/core"
import {
  generateRandomColor,
  getRandomPaletteMode,
} from "../utils/colorExtraction"
import { ColorDisplay } from "./ColorDisplay"
import { HarmonyType } from "../utils/colorHarmony"
import { ColorPaletteItem } from "../ColorPalette"

type RandomColorProps = {
  onColorSelect: (color: string) => void
  getColorScale: (props: {
    baseColor: string
    count: number
  }) => ColorPaletteItem[]
  getHarmonyPalette: (
    baseColor: string,
    harmonyType: HarmonyType,
    count: number
  ) => ColorPaletteItem[]
}

export function RandomColor({
  onColorSelect,
  getColorScale,
  getHarmonyPalette,
}: RandomColorProps) {
  const [randomColors, setRandomColors] = useState<string[]>([
    "#FF5733",
    "#33FF57",
    "#3357FF",
    "#F3FF33",
    "#FF33F3",
  ])

  const generateRandomPalette = useCallback(() => {
    const newColor = generateRandomColor()
    const randomMode = getRandomPaletteMode()

    if (randomMode === "scale") {
      // Générer une palette de type scale
      const newColors = getColorScale({ baseColor: newColor, count: 11 })
      setRandomColors(newColors.map((item) => item.color))
    } else {
      // Choisir aléatoirement un type d'harmonie
      const harmonyTypes: HarmonyType[] = [
        "monochromatic",
        "complementary",
        "analogous",
        "triadic",
        "tetradic",
      ]
      const randomHarmonyType =
        harmonyTypes[Math.floor(Math.random() * harmonyTypes.length)]

      // Générer une palette de type harmony avec le type d'harmonie aléatoire
      const newColors = getHarmonyPalette(newColor, randomHarmonyType, 6)
      setRandomColors(newColors.map((item) => item.color))
    }
  }, [getColorScale, getHarmonyPalette])

  // Générer une palette aléatoire au chargement du composant
  useEffect(() => {
    generateRandomPalette()
  }, [generateRandomPalette])

  return (
    <div className="mt-4">
      <h2 className="text-xl font-semibold mb-3">Get Random Palette</h2>

      <Button onClick={generateRandomPalette} className="mb-6" fullWidth>
        Generate New Palette
      </Button>

      <ColorDisplay colors={randomColors} onColorSelect={onColorSelect} />
    </div>
  )
}
