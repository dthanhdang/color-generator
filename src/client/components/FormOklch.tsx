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
    <Paper className="bg-white p-6 rounded-lg shadow-md">
      <Stack className="flex flex-col space-y-4">
        <Group className="flex justify-between items-center">
          {/*<Text className="text-lg font-medium">OKLCH</Text>
          <p>{oklchValues.hex()}</p>*/}
          <div className="flex justify-between">
            <span className="text-sm font-medium text-gray-500">OKLCH</span>
            <span className="font-mono text-sm">
              {`(${oklchValues.oklch()[0].toFixed(2)} ${oklchValues.oklch()[1].toFixed(3)} ${Math.round(oklchValues.oklch()[2])}°)`}
            </span>
          </div>
        </Group>
        <div>
          <div className="flex justify-between mb-2">
            <Text className="text-sm font-medium text-gray-700">Luminance</Text>
            <span className="text-blue-600 font-semibold">
              {Math.round(oklchValues.oklch()[0] * 100)}%
            </span>
          </div>

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
            className="h-2 bg-gradient-to-r from-gray-300 to-white rounded-full"
          />
        </div>

        <div>
          <div className="flex justify-between mb-2">
            <Text className="text-sm font-medium text-gray-700">Chroma</Text>
            <span className="text-blue-600 font-semibold">
              {oklchValues.oklch()[1].toFixed(3)}
            </span>
          </div>
          {/*<Text>Chroma : {oklchValues.oklch()[1].toFixed(3)}</Text>*/}
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
          <div className="flex justify-between mb-2">
            <Text className="text-sm font-medium text-gray-700">Hue</Text>
            <span className="text-blue-600 font-semibold">
              {Math.round(oklchValues.oklch()[2])}°
            </span>
          </div>
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
