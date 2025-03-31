//import { hexToHsl, hslToHex } from "#utils/colorConverters.ts"
import { Slider, Group, Stack, Text, Paper } from "@mantine/core"
import React, { useState } from "react"
import { type Color } from "chroma-js"

type HSLColor = {
  h: number
  s: number
  l: number
}

type FormHslProps = {
  initialColor: Color
  onSubmit: (color: Color) => void
}

export function FormHsl({
  initialColor,
  onSubmit,
}: FormHslProps): React.JSX.Element {
  const [hslValues, setHslValues] = useState(initialColor)

  //const [previewColor, setPreviewColor] = useState(initialColor)

  const handleHSLChange = (key: keyof HSLColor, value: number): void => {
    console.log(value)
    const divider = key === "h" ? 1 : 100
    const newColor = hslValues.set(`hsl.${key}`, value / divider)
    setHslValues(newColor)

    onSubmit(newColor)
  }

  return (
    <Paper className="bg-white p-4 rounded-md shadow-md">
      <Stack className="flex flex-col space-y-4">
        <Group className="flex justify-between items-center">
          <Text className="text-lg font-medium">HSL</Text>
          <p>{hslValues.hex()}</p>
          <div style={{ backgroundColor: hslValues.hex() }} />
        </Group>
        <div>
          <Text>Hue : {Math.round(hslValues.hsl()[0])}°</Text>
          <Slider
            min={0}
            max={360}
            label={(value: number) => `${Math.round(value)}°`}
            value={hslValues.hsl()[0]}
            onChange={(value: number) => handleHSLChange("h", value)}
            marks={[
              { value: 0, label: "0°" },
              { value: 180, label: "180°" },
              { value: 360, label: "360°" },
            ]}
          />
        </div>
        <div>
          <Text>Saturation: {Math.round(hslValues.hsl()[1] * 100)}%</Text>
          <Slider
            min={0}
            max={100}
            label={(value: number) => `${Math.round(value)}%`}
            value={hslValues.hsl()[1] * 100}
            onChange={(value: number) => handleHSLChange("s", value)}
            marks={[
              { value: 0, label: "0%" },
              { value: 50, label: "50%" },
              { value: 100, label: "100%" },
            ]}
          />
        </div>

        <div>
          <Text>Lightness: {Math.round(hslValues.hsl()[2] * 100)}%</Text>
          <Slider
            min={0}
            max={100}
            label={(value: number) => `${Math.round(value)}%`}
            value={hslValues.hsl()[2] * 100}
            onChange={(value: number) => handleHSLChange("l", value)}
            marks={[
              { value: 0, label: "0%" },
              { value: 50, label: "50%" },
              { value: 100, label: "100%" },
            ]}
          />
        </div>
      </Stack>
    </Paper>
  )
}
