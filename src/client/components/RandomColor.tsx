import { useCallback, useEffect } from "react"
import { Button, Stack, Box, Text } from "@mantine/core"
//import { generateRandomColor } from "../utils/colorExtraction"
//import { ColorDisplay } from "./ColorDisplay"
//import { ColorPaletteItem } from "../ColorPalette"

import chroma, { type Color } from "chroma-js"

type RandomColorProps = {
  onGeneratePalette: (
    baseColor: Color,
    harmonyType: "analogous",
    count: number
  ) => void
}

export function RandomColor({ onGeneratePalette }: RandomColorProps) {
  //const [palette, setPalette] = useState<ColorPaletteItem[]>([])

  const handleClick = useCallback(() => {
    const baseColor = chroma.random()
    onGeneratePalette(baseColor, "analogous", 5)
  }, [onGeneratePalette])

  useEffect(() => {
    handleClick()
  }, [handleClick])

  return (
    <Stack>
      <Box p="md" bg="gray.0">
        <Stack>
          <Text size="xl">Generate Random Palette</Text>

          <Button onClick={handleClick} variant="filled" fullWidth>
            Get New Palette
          </Button>
        </Stack>
      </Box>
    </Stack>
  )
}
