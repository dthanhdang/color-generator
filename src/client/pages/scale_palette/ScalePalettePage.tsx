//import { Form } from "./Form"

import { useState } from "react"
import chroma, { type Color } from "chroma-js"
import { Select } from "@mantine/core"

import { nanoid } from "nanoid"

import { ColorPalette, ColorPaletteItem } from "../../ColorPalette"
import { Form } from "../../Form"
import { FormHsl } from "../../components/FormHsl"
import { FormOklch } from "../../components/FormOklch"
import { getColorName } from "#utils/getColorName.ts"
import { PageStyle } from "#components/PageStyle.tsx"

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
  const darkColor = chroma(baseColor).darken(1.5)
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

export function ScalePaletteGenerator() {
  const [color, setColor] = useState(chroma("#3b82f6"))
  const [colorMode, setColorMode] = useState<ColorMode>("hex")

  const [palette, setPalette] = useState<ColorPaletteItem[]>(
    getColorScale({ baseColor: color, count: 11 })
  )

  const handleColorSubmit = (newColor: Color) => {
    //const newPalette = getColorScale(newColor, 10)
    if (chroma.valid(newColor)) {
      setColor(newColor)
      //if (paletteMode === "scale") {
      setPalette(getColorScale({ baseColor: newColor, count: 11 }))
    } else {
      console.error(`Invalid color : ${newColor}`)
    }
  }

  const handleModeChange = (value: string | null) => {
    if (value === "hex" || value === "hsl" || value === "oklch")
      setColorMode(value)
  }

  return (
    <PageStyle titleHighlight="Scale Palette">
      <div className="mb-4">
        <Select
          data={[
            { value: "hex", label: "HEX" },
            { value: "hsl", label: "HSL" },
            { value: "oklch", label: "OKLCH" },
          ]}
          value={colorMode}
          onChange={handleModeChange}
        />
      </div>
      <div className="mt-4">
        {" "}
        {colorMode === "hex" && (
          <Form onSubmit={handleColorSubmit} initialColor={color} />
        )}
        {colorMode === "hsl" && (
          <FormHsl initialColor={color} onSubmit={handleColorSubmit} />
        )}
        {colorMode === "oklch" && (
          <FormOklch initialColor={color} onSubmit={handleColorSubmit} />
        )}
      </div>
      <div className="mt-8">
        <ColorPalette palette={palette} />
      </div>
    </PageStyle>
  )
}
