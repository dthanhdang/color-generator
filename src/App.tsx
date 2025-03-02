//import { Form } from "./Form"

import { ColorPalette } from "./ColorPalette"
import { useState } from "react"
import chroma from "chroma-js"

import { MantineProvider } from "@mantine/core"
import { Select } from "@mantine/core"
import { FormHsl } from "./components/FormHsl"
import { FormOklch } from "./components/FormOklch"
import { Form } from "./Form"

type ColorMode = "hex" | "hsl" | "oklch"
//Il faut transformer ce tableau de chaines en un tableau qui contient des objets avec des champs id(nanoid), color et bientot name
// Il faut utiliser .map
function getColorScale(color: string, count: number): string[] {
  return chroma.scale(["white", color]).mode("lch").colors(count)
}

export function App() {
  //const [palette, setPalette] = useState(chroma.scale(["white", color]).mode("lch").colors(10));
  const [color, setColor] = useState<string>("#b4f2ce")
  const [colorMode, setColorMode] = useState<ColorMode>("hex")
  const [palette, setPalette] = useState(() => getColorScale(color, 11))

  const handleColorSubmit = (newColor: string) => {
    //const newPalette = getColorScale(newColor, 10)
    setColor(newColor)
    setPalette(getColorScale(newColor, 11))
  }

  const handleModeChange = (value: string | null) => {
    if (value === "hex" || value === "hsl" || value === "oklch")
      setColorMode(value)
  }

  return (
    <MantineProvider>
      <main>
        <Select
          data={[
            { value: "hex", label: "HEX" },
            { value: "hsl", label: "HSL" },
            { value: "oklch", label: "OKLCH" },
          ]}
          value={colorMode}
          onChange={handleModeChange}
        />
        {colorMode === "hex" && (
          <Form onSubmit={handleColorSubmit} initialColor={color} />
        )}

        {colorMode === "hsl" && (
          <FormHsl initialColor={color} onSubmit={handleColorSubmit} />
        )}
        {colorMode === "oklch" && (
          <FormOklch initialColor={color} onSubmit={handleColorSubmit} />
        )}
        {/*<FormHsl onSubmit={handleColorSubmit} initialColor="#b4f2ce" />*/}
        {/*<FormOklch onSubmit={handleColorSubmit} initialColor="#b4f2ce" />*/}
        <ColorPalette palette={palette} />
      </main>
    </MantineProvider>
  )
}
