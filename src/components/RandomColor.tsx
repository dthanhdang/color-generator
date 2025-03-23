import { useState, useEffect, useCallback } from "react"
import { Button } from "@mantine/core"
import { generateRandomColor } from "../utils/colorExtraction"
import { ColorDisplay } from "./ColorDisplay"
//import { HarmonyType } from "../utils/colorHarmony"
import { ColorPaletteItem } from "../ColorPalette"

type RandomColorProps = {
  onColorSelect: (color: string) => void

  getHarmonyPalette: (
    baseColor: string,
    harmonyType: "split-complementary",
    count: number
  ) => ColorPaletteItem[]
}

export function RandomColor({
  onColorSelect,
  //getColorScale,
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
    const newColors = getHarmonyPalette(newColor, "split-complementary", 5)
    setRandomColors(newColors.map((item) => item.color))
  }, [getHarmonyPalette])

  {
    /*const generateRandomPalette = useCallback(() => {
    const newColor = chroma.random().hex(); // Générer une couleur aléatoire
    const newPalette = generateSplitComplementaryPalette(newColor, 5); // Générer la palette
    setRandomColors(newPalette); // Mettre à jour les couleurs affichées
    onPaletteGenerated(newPalette); // Renvoyer la palette à App
    onColorSelect(newColor); // Notifier la sélection de couleur
  }, [onColorSelect, onPaletteGenerated]);*/
  }

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
