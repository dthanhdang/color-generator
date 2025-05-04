//import React from "react"
import { Box, Grid, Container, Paper } from "@mantine/core"
import { ColorContrastSelector } from "./ColorContrastSelector"
import { PreviewCard } from "./PreviewCard"
import { ContrastResultCard } from "./ContrastResultCard"
import { useColorContrast } from "../../hooks/useColorContrast"
//import { useColorContrast } from './useColorContrast';

export function MainResultDisplay() {
  const {
    backgroundColor,
    textColor,
    updateBackgroundColor,
    updateTextColor,
    swapColors,
    contrastResult,
    colorPair,
  } = useColorContrast()

  return (
    <Container size="md" py="xl">
      <Paper withBorder p="xl" radius="md" shadow="sm">
        <Grid gutter="xl">
          <Grid.Col span={{ xs: 12, sm: 6 }}>
            <Box mb="lg">
              <PreviewCard colorPair={colorPair} onSwapColors={swapColors} />
            </Box>
          </Grid.Col>

          <Grid.Col span={{ xs: 12, sm: 6 }}>
            <Box mb="lg">
              <ColorContrastSelector
                backgroundColor={backgroundColor}
                textColor={textColor}
                onBackgroundColorChange={updateBackgroundColor}
                onTextColorChange={updateTextColor}
                onSwapColors={swapColors}
              />
            </Box>

            <ContrastResultCard result={contrastResult} />
          </Grid.Col>
        </Grid>
      </Paper>
    </Container>
  )
}
