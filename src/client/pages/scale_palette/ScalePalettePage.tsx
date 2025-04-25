import { useState } from "react"
import chroma, { type Color } from "chroma-js"
import { Select, Group } from "@mantine/core"

import { nanoid } from "nanoid"

//import { ColorPalette, ColorPaletteItem } from "../../ColorPalette"
import { Form } from "../../components/Form"
import { FormHsl } from "../../components/FormHsl"
import { FormOklch } from "../../components/FormOklch"
import { getColorName } from "#utils/getColorName.ts"
import { PageStyle } from "#components/PageStyle.tsx"
import { ColorPalette, ColorPaletteItem } from "#components/ColorPalette.tsx"
import { PaletteVisualizer } from "#components/PaletteVisualizer.tsx"
import {
  GenerateRandomPaletteButton,
  OpenPaletteEditorButton,
} from "#components/PaletteGeneratorButtons.tsx"

type ColorMode = "hex" | "hsl" | "oklch"
//type PaletteMode = "scale" | "harmony" | "image" | "random"

type GetColorScaleProps = {
  baseColor: Color
  count: number
}

function getColorScale({
  baseColor,
  count,
}: GetColorScaleProps): ColorPaletteItem[] {
  const lightColor = chroma(baseColor).brighten(2)
  const darkColor = chroma(baseColor).darken(1)
  return (
    chroma
      //.scale(["white", baseColor])
      .scale([lightColor, baseColor, darkColor])
      .mode("lch")
      .colors(count, undefined)
      .map((color, index) => {
        const weight = index === 0 ? 50 : index === 10 ? 950 : index * 100
        //const colorObject = chroma(color)
        const colorNameResult = getColorName(color)

        console.log("getColorName result:", colorNameResult)
        return {
          id: nanoid(),
          color,
          weight,
          name: colorNameResult ? colorNameResult.name : "",
        }
      }) as ColorPaletteItem[]
  )
}

function generateRandomColor(): Color {
  return chroma.random()
}

export function ScalePaletteGenerator() {
  const [color, setColor] = useState(chroma("#3b82f6"))
  const [colorMode, setColorMode] = useState<ColorMode>("hex")
  const [primaryColorId, setPrimaryColorId] = useState<string | undefined>(
    undefined
  )

  const [palette, setPalette] = useState<ColorPaletteItem[]>(() => {
    const initialPalette = getColorScale({ baseColor: color, count: 11 })
    if (initialPalette.length > 5) {
      setPrimaryColorId(initialPalette[5].id)
    }
    return initialPalette
  })

  const handleColorSubmit = (newColor: Color) => {
    //const newPalette = getColorScale(newColor, 10)
    if (chroma.valid(newColor)) {
      setColor(newColor)
      //if (paletteMode === "scale") {
      const newPalette = getColorScale({ baseColor: newColor, count: 11 })
      setPalette(newPalette)
    } else {
      console.error(`Invalid color : ${newColor}`)
    }
  }

  const handleModeChange = (value: string | null) => {
    if (value === "hex" || value === "hsl" || value === "oklch")
      setColorMode(value)
  }

  const handleGenerateRandomScalePalette = () => {
    const RandomColor = generateRandomColor()
    setColor(RandomColor)
    const newPalette = getColorScale({ baseColor: RandomColor, count: 11 })
    setPalette(newPalette)

    if (newPalette.length > 5) {
      setPrimaryColorId(newPalette[5].id)
    }
  }

  return (
    <PageStyle title="Your *Scale Palette* Generator">
      <Group justify="space-between" mb="md">
        <Select
          data={[
            { value: "hex", label: "HEX" },
            { value: "hsl", label: "HSL" },
            { value: "oklch", label: "OKLCH" },
          ]}
          value={colorMode}
          onChange={handleModeChange}
        />

        <GenerateRandomPaletteButton
          className="ml-auto"
          onClick={handleGenerateRandomScalePalette}
        >
          Generate Random Scale Palette
        </GenerateRandomPaletteButton>

        <OpenPaletteEditorButton palette={palette}>
          Open Scale Palette in Editor
        </OpenPaletteEditorButton>
      </Group>

      <div className="mt-4">
        {" "}
        {colorMode === "hex" && (
          <Form color={color} onChange={handleColorSubmit} />
        )}
        {colorMode === "hsl" && (
          <FormHsl color={color} onChange={handleColorSubmit} />
        )}
        {colorMode === "oklch" && (
          <FormOklch color={color} onChange={handleColorSubmit} />
        )}
      </div>
      <div className="mt-8">
        <ColorPalette palette={palette} />
      </div>
      <div className="mt-12">
        <PaletteVisualizer palette={palette} primaryColorId={primaryColorId} />
      </div>
    </PageStyle>
  )
}
