//import { Form } from "./Form"

//import { ColorPalette, type ColorPaletteItem } from "./ColorPalette"

import { useState } from "react"
import chroma from "chroma-js"

//import { MantineProvider, Tabs } from "@mantine/core"
import { Select } from "@mantine/core"
//import { FormHsl } from "./components/FormHsl"
//import { FormOklch } from "./components/FormOklch"
//import { Form } from "./Form"
import { nanoid } from "nanoid"
//import { getColorName } from "./utils/getColorName"
//import { HarmonySelector } from "./components/HarmonySelector"
//import { HarmonyType, getHarmonyColor } from "./utils/colorHarmony"
import { ColorPalette, type ColorPaletteItem } from "../../ColorPalette"
import { getHarmonyColor, HarmonyType } from "#utils/colorHarmony.ts"
import { HarmonySelector } from "../../components/HarmonySelector"
import { getColorName } from "#utils/getColorName.ts"
import { Form } from "../../Form"
import { FormOklch } from "../../components/FormOklch"
import { FormHsl } from "../../components/FormHsl"

type ColorMode = "hex" | "hsl" | "oklch"
//type PaletteMode = "scale" | "harmony" | "image" | "random"

function getHarmonyPalette(
  baseColor: string,
  harmonyType: HarmonyType,
  count: number
): ColorPaletteItem[] {
  return getHarmonyColor(baseColor, harmonyType, count).map((color, index) => {
    const colorObject = chroma(color)
    const colorNameResult = getColorName(colorObject)

    return {
      id: nanoid(),
      color,
      weight: index * 100 + 100,
      name: colorNameResult ? colorNameResult.name : "",
    }
  })
}

export function HarmonyPalette() {
  const [color, setColor] = useState<string>("#b4f2ce")
  const [colorMode, setColorMode] = useState<ColorMode>("hex")

  //const [paletteMode, setPaletteMode] = useState<PaletteMode>("scale")
  const [harmonyType, setHarmonyType] = useState<HarmonyType>("monochromatic")

  const [palette, setPalette] = useState<ColorPaletteItem[]>(() =>
    getHarmonyPalette(color, harmonyType, 5)
  )

  const handleColorSubmit = (newColor: string) => {
    //const newPalette = getColorScale(newColor, 10)
    if (chroma.valid(newColor)) {
      setColor(newColor)
      setPalette(getHarmonyPalette(newColor, harmonyType, 5))
    } else {
      console.error(`Invalid color: ${newColor}`)
    }
  }

  const handleModeChange = (value: string | null) => {
    if (value === "hex" || value === "hsl" || value === "oklch")
      setColorMode(value)
  }

  const handleHarmonyChange = (value: HarmonyType) => {
    setHarmonyType(value)

    setPalette(getHarmonyPalette(color, value, 5))
  }

  {
    /*const handlePaletteModeChange = (value: PaletteMode) => {
    setPaletteMode(value)

    if (value === "scale") {
      setPalette(getColorScale({ baseColor: color, count: 11 }))
    } else if (value === "harmony") {
      setPalette(getHarmonyPalette(color, harmonyType, 6))
    } else if (value === "image" && extractedImageColors.length > 0) {
      setPalette(
        extractedImageColors.map((color, index) => ({
          id: nanoid(),
          color,
          weight: index * 100 + 100,
          name: getColorName(chroma(color))?.name || "",
        }))
      )
    }
  }

  const handleImageColorsExtracted = (colors: string[]) => {
    setExtractedImageColors(colors)
    if (paletteMode === "image") {
      setPalette(
        colors.map((color, index) => ({
          id: nanoid(),
          color,
          weight: index * 100 + 100,
          name: getColorName(chroma(color))?.name || "",
        }))
      )
    }
  }*/
  }

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-center text-5xl font-bold my-8">
        Your{" "}
        <span style={{ color: "oklch(0.511 0.262 276.966)" }}>
          Harmony Palette
        </span>{" "}
        Generator
      </h1>
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
        <HarmonySelector value={harmonyType} onChange={handleHarmonyChange} />
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
        <h2 className="text-xl font-bold mb-4">{harmonyType}</h2>
        <ColorPalette palette={palette} />
      </div>
    </main>
  )
}
