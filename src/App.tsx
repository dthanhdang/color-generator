//import { Form } from "./Form"

import { ColorPalette, type ColorPaletteItem } from "./ColorPalette"
import { useState } from "react"
import chroma from "chroma-js"

import { MantineProvider, Tabs } from "@mantine/core"
import { Select } from "@mantine/core"
import { FormHsl } from "./components/FormHsl"
import { FormOklch } from "./components/FormOklch"
import { Form } from "./Form"
import { nanoid } from "nanoid"
import { getColorName } from "./utils/getColorName"
import { HarmonySelector } from "./components/HarmonySelector"
import { HarmonyType, getHarmonyColor } from "./utils/colorHarmony"
import { ImageColorPicker } from "./components/ImageColorPicker"
import { ColorDisplay } from "./components/ColorDisplay"
import { RandomColor } from "./components/RandomColor"

type ColorMode = "hex" | "hsl" | "oklch"
type PaletteMode = "scale" | "harmony" | "image" | "random"

type GetColorScaleProps = {
  baseColor: string
  count: number
}

function getColorScale({
  baseColor,
  count,
}: GetColorScaleProps): ColorPaletteItem[] {
  return chroma
    .scale(["white", baseColor])
    .mode("lch")
    .colors(count)
    .map((color, index) => {
      const weight = index === 0 ? 50 : index === 10 ? 950 : index * 100
      const colorObject = chroma(color)
      const colorNameResult = getColorName(colorObject)

      console.log("getColorName result:", colorNameResult)
      return {
        id: nanoid(),
        color,
        weight,
        name: colorNameResult ? colorNameResult.name : "",
      }
    }) as ColorPaletteItem[]
}

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

export function App() {
  //const [palette, setPalette] = useState(chroma.scale(["white", color]).mode("lch").colors(10));
  const [color, setColor] = useState<string>("#b4f2ce")
  const [colorMode, setColorMode] = useState<ColorMode>("hex")

  const [paletteMode, setPaletteMode] = useState<PaletteMode>("scale")
  const [harmonyType, setHarmonyType] = useState<HarmonyType>("monochromatic")
  const [extractedImageColors, setExtractedImageColors] = useState<string[]>([])

  const [palette, setPalette] = useState<ColorPaletteItem[]>(() =>
    getColorScale({ baseColor: color, count: 11 })
  )

  const handleColorSubmit = (newColor: string) => {
    //const newPalette = getColorScale(newColor, 10)
    if (chroma.valid(newColor)) {
      setColor(newColor)
      if (paletteMode === "scale") {
        setPalette(getColorScale({ baseColor: newColor, count: 11 }))
      } else {
        setPalette(getHarmonyPalette(newColor, harmonyType, 6))
      }
    } else {
      console.error(`Invalid color : ${newColor}`)
    }
  }

  const handleModeChange = (value: string | null) => {
    if (value === "hex" || value === "hsl" || value === "oklch")
      setColorMode(value)
  }

  const handleHarmonyChange = (value: HarmonyType) => {
    setHarmonyType(value)
    if (paletteMode === "harmony") {
      setPalette(getHarmonyPalette(color, value, 6))
    }
  }

  const handlePaletteModeChange = (value: PaletteMode) => {
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
  }

  return (
    <MantineProvider>
      <main className="container mx-auto p-4">
        <h1 className="text-center text-5xl font-bold my-8">
          Your{" "}
          <span style={{ color: "oklch(0.511 0.262 276.966)" }}>
            Color Palette
          </span>{" "}
          Generator
          {/*<span className="inline-block bg-gradient-to-r from-rose-100 to-rose-900 bg-clip-text text-transparent">
            Color Palette
          </span>{" "}*/}
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

        <Tabs
          value={paletteMode}
          onChange={(value) => handlePaletteModeChange(value as PaletteMode)}
        >
          <Tabs.List>
            <Tabs.Tab value="scale">Colors Scale</Tabs.Tab>
            <Tabs.Tab value="harmony">Colors Harmony</Tabs.Tab>
            <Tabs.Tab value="image">Image Picker</Tabs.Tab>
            <Tabs.Tab value="random">Random Palette</Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="scale">
            {null} <div className="mt-4"></div>
          </Tabs.Panel>

          <Tabs.Panel value="harmony">
            <div className="mt-4">
              <HarmonySelector
                value={harmonyType}
                onChange={handleHarmonyChange}
              />
            </div>
          </Tabs.Panel>
          <Tabs.Panel value="image">
            <div className="mt-4">
              <ImageColorPicker
                onColorSelect={setColor}
                onColorsExtracted={handleImageColorsExtracted}
              />
              {extractedImageColors.length > 0 && (
                <ColorDisplay
                  colors={extractedImageColors}
                  onColorSelect={setColor}
                />
              )}
            </div>
          </Tabs.Panel>

          <Tabs.Panel value="random">
            <RandomColor
              onColorSelect={(color) => {
                setColor(color)
                // Mettre à jour la palette principale en fonction du mode actuel
                if (paletteMode === "scale") {
                  setPalette(getColorScale({ baseColor: color, count: 11 }))
                } else if (paletteMode === "harmony") {
                  setPalette(getHarmonyPalette(color, harmonyType, 6))
                }
              }}
              getColorScale={getColorScale}
              getHarmonyPalette={getHarmonyPalette}
            />
          </Tabs.Panel>
        </Tabs>
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
          <h2 className="text-xl font-bold mb-4">
            {paletteMode === "scale"
              ? "Colors scale"
              : paletteMode === "harmony"
                ? `${harmonyType}`
                : paletteMode === "random"
                  ? "Random Colors Palette"
                  : "Colors Palette"}
          </h2>
          <ColorPalette palette={palette} />
        </div>
      </main>
    </MantineProvider>
  )
}
