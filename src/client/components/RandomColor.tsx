import { useEffect } from "react"
import { Button, Stack, Box, Text } from "@mantine/core"
//import { generateRandomColor } from "../utils/colorExtraction"
//import { ColorDisplay } from "./ColorDisplay"
import { ColorPaletteItem } from "../ColorPalette"
//import { ColorPalette } from "../ColorPalette"

import chroma, { type Color } from "chroma-js"

type RandomColorProps = {
  onPaletteGenerated: (palette: ColorPaletteItem[]) => void
  getHarmonyPalette: (
    baseColor: Color,
    harmonyType: "analogous",
    count: number
  ) => ColorPaletteItem[]
}

export function RandomColor({
  onPaletteGenerated,
  getHarmonyPalette,
}: RandomColorProps) {
  //const [palette, setPalette] = useState<ColorPaletteItem[]>([])

  const generateRandomPalette = () => {
    const baseColor = chroma.random()
    const paletteItems = getHarmonyPalette(baseColor, "analogous", 5)
    //const newPalette = paletteItems.map((item) => chroma(item.color))

    //setPalette(paletteItems)
    onPaletteGenerated(paletteItems)
  }

  useEffect(() => {
    generateRandomPalette()
  })

  return (
    <Stack>
      <Box p="md" bg="gray.0">
        <Stack>
          <Text size="xl">Generate Random Palette</Text>

          <Button onClick={generateRandomPalette} variant="filled" fullWidth>
            Get New Palette
          </Button>
        </Stack>
      </Box>

      {/*{palette.length > 0 && (
        <Box>
          <ColorPalette palette={palette} />
        </Box>
      )}*/}
    </Stack>
  )
}
