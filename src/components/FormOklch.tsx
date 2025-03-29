import React from "react"
import { Slider, Group, Stack, Text, Paper } from "@mantine/core"
import { useState } from "react"
//import { hexToOklch, oklchToHex } from "../utils/colorConverters"
import { type Color } from "chroma-js"

type OKLCHColor = {
  l: number
  c: number
  h: number
}

type FormOklchProps = {
  initialColor: Color
  onSubmit: (color: Color) => void
}

export function FormOklch({
  initialColor,
  onSubmit,
}: FormOklchProps): React.JSX.Element {
  const [oklchValues, setOklchValues] = useState(initialColor)

  //const [previewColor, setPreviewColor] = useState(initialColor)

  const handleOklchChange = (key: keyof OKLCHColor, value: number): void => {
    const divider = key === "l" ? 100 : 1
    const newColor = oklchValues.set(`oklch.${key}`, value / divider)
    setOklchValues(newColor)

    onSubmit(newColor)
  }

  return (
    <Paper className="bg-white p-4 rounded-md shadow-md">
      <Stack className="flex flex-col space-y-4">
        <Group className="flex justify-between items-center">
          <Text className="text-lg font-medium">OKLCH</Text>
          <p>{oklchValues.hex()}</p>
          <div style={{ backgroundColor: oklchValues.hex() }} />
        </Group>
        <div>
          <Text>Luminance : {Math.round(oklchValues.oklch()[0] * 100)}%</Text>
          <Slider
            min={0}
            max={100}
            label={(value: number) => `${Math.round(value)}%`}
            value={oklchValues.oklch()[0] * 100}
            onChange={(value: number) => handleOklchChange("l", value)}
            marks={[
              { value: 0, label: "0%" },
              { value: 50, label: "50%" },
              { value: 100, label: "100%" },
            ]}
          />
        </div>

        <div>
          <Text>Chroma : {oklchValues.oklch()[1].toFixed(3)}</Text>
          <Slider
            min={0}
            max={0.4}
            step={0.001}
            label={(value: number) => value.toFixed(3)} //il faut afficher la valeur arrondie
            value={oklchValues.oklch()[1]}
            onChange={(value: number) => handleOklchChange("c", value)}
            marks={[
              { value: 0, label: "0" },
              { value: 0.2, label: "0.2" },
              { value: 0.4, label: "0.4" },
            ]}
          />
        </div>

        <div>
          <Text>Hue : {Math.round(oklchValues.oklch()[2])}°</Text>
          <Slider
            min={0}
            max={360}
            label={(value: number) => `${Math.round(value)}°`}
            value={oklchValues.oklch()[2]}
            onChange={(value: number) => handleOklchChange("h", value)}
            marks={[
              { value: 0, label: "0°" },
              { value: 180, label: "180°" },
              { value: 360, label: "360°" },
            ]}
          />
        </div>
      </Stack>
    </Paper>
  )
}
