import type { JSX } from "react"
import { useCallback, useEffect } from "react"
import { Group } from "@mantine/core"
//import { generateRandomColor } from "../utils/colorExtraction"
//import { ColorDisplay } from "./ColorDisplay"
//import { ColorPaletteItem } from "../ColorPalette"

import { type Color } from "chroma-js"
import chroma from "chroma-js"
import {
  GenerateRandomPaletteButton,
  OpenPaletteEditorButton,
} from "./PaletteGeneratorButtons.tsx"
import type { ColorPaletteItem } from "./ColorPalette.tsx"

type RandomColorProps = {
  onGeneratePalette: (
    baseColor: Color,
    harmonyType: "split-complementary",
    count: number
  ) => void
  palette: ColorPaletteItem[]
}

export function RandomColor({
  onGeneratePalette,
  palette,
}: RandomColorProps): JSX.Element {
  //const [palette, setPalette] = useState<ColorPaletteItem[]>([])

  const handleClick = useCallback(() => {
    const baseColor = chroma.random()
    onGeneratePalette(baseColor, "split-complementary", 5)
  }, [onGeneratePalette])

  useEffect(() => {
    handleClick()
  }, [handleClick])

  return (
    <Group className="justify-end">
      <GenerateRandomPaletteButton onClick={handleClick}>
        Generate Random Palette
      </GenerateRandomPaletteButton>

      <OpenPaletteEditorButton palette={palette}>
        Open Palette in Editor
      </OpenPaletteEditorButton>
    </Group>
  )
}
