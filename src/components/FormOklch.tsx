import React from "react"
import { Slider, Group, Stack, Text, Paper } from "@mantine/core"
import { useState } from "react"
import { hexToOklch, oklchToHex } from "../utils/colorConverters"

type OKLCHColor = {
  l: number
  c: number
  h: number
}

type FormOklchProps = {
  initialColor: string
  onSubmit: (color: string) => void
}

export function FormOklch({
  initialColor,
  onSubmit,
}: FormOklchProps): React.JSX.Element {
  const [oklchValues, setOklchValues] = useState<OKLCHColor>(() =>
    hexToOklch(initialColor)
  )

  const [previewColor, setPreviewColor] = useState(initialColor)

  const handleOklchChange = (key: keyof OKLCHColor, value: number): void => {
    const newOklchValues: OKLCHColor = {
      ...oklchValues,
      [key]: value,
    }
    setOklchValues(newOklchValues)
    const newHexColor: string = oklchToHex(
      newOklchValues.l,
      newOklchValues.c,
      newOklchValues.h
    )
    setPreviewColor(newHexColor)
    onSubmit(newHexColor)
  }

  return (
    <Paper className="bg-white p-4 rounded-md shadow-md">
      <Stack className="flex flex-col space-y-4">
        <Group className="flex justify-between items-center">
          <Text className="text-lg font-medium">OKLCH</Text>
          <input
            type="text"
            value={previewColor}
            onChange={(e) => {
              setPreviewColor(e.target.value)
              onSubmit(e.target.value)
              setOklchValues(hexToOklch(e.target.value))
            }}
          />
          <div style={{ backgroundColor: previewColor }} />
        </Group>
        <div>
          <Text>Luminance : {Math.round(oklchValues.l)}%</Text>
          <Slider
            min={0}
            max={100}
            label={(value: number) => `${Math.round(value)}%`}
            value={oklchValues.l}
            onChange={(value: number) => handleOklchChange("l", value)}
            marks={[
              { value: 0, label: "0%" },
              { value: 50, label: "50%" },
              { value: 100, label: "100%" },
            ]}
          />
        </div>

        <div>
          <Text>Chroma : {Math.round(oklchValues.c)}%</Text>
          <Slider
            min={0}
            max={40}
            label={(value: number) => `${Math.round(value)}%`} //il faut afficher la valeur arrondie
            value={oklchValues.c}
            onChange={(value: number) => handleOklchChange("c", value)}
            marks={[
              { value: 0, label: "0%" },
              { value: 20, label: "20%" },
              { value: 40, label: "40%" },
            ]}
          />
        </div>

        <div>
          <Text>Hue : {Math.round(oklchValues.h)}°</Text>
          <Slider
            min={0}
            max={360}
            label={(value: number) => `${Math.round(value)}°`}
            value={oklchValues.h}
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
