import { hexToHsl, hslToHex } from "#utils/colorConverters.ts"
import { Slider, Group, Stack, Text, Paper } from "@mantine/core"
import React, { useState } from "react"

type HSLColor = {
  h: number
  s: number
  l: number
}

type FormHslProps = {
  initialColor: string
  onSubmit: (color: string) => void
}

export function FormHsl({
  initialColor,
  onSubmit,
}: FormHslProps): React.JSX.Element {
  const [hslValues, setHslValues] = useState<HSLColor>(() =>
    hexToHsl(initialColor)
  )
  const [previewColor, setPreviewColor] = useState(initialColor)

  const handleHSLChange = (key: keyof HSLColor, value: number): void => {
    const newHslValues: HSLColor = {
      ...hslValues,
      [key]: value,
    }
    setHslValues(newHslValues)

    const newHexColor: string = hslToHex(
      newHslValues.h,
      newHslValues.s,
      newHslValues.l
    )
    setPreviewColor(newHexColor)
    onSubmit(newHexColor)
  }

  return (
    <Paper className="bg-white p-4 rounded-md shadow-md">
      <Stack className="flex flex-col space-y-4">
        <Group className="flex justify-between items-center">
          <Text className="text-lg font-medium">HSL</Text>
          <input
            type="text"
            value={previewColor}
            onChange={(e) => {
              setPreviewColor(e.target.value)
              onSubmit(e.target.value)
              setHslValues(hexToHsl(e.target.value))
            }}
          />
          <div style={{ backgroundColor: previewColor }} />
        </Group>
        <div>
          <Text>Hue : {Math.round(hslValues.h)}°</Text>
          <Slider
            min={0}
            max={360}
            label={(value: number) => `${Math.round(value)}°`}
            value={hslValues.h}
            onChange={(value: number) => handleHSLChange("h", value)}
            marks={[
              { value: 0, label: "0°" },
              { value: 180, label: "180°" },
              { value: 360, label: "360°" },
            ]}
          />
        </div>
        <div>
          <Text>Saturation: {Math.round(hslValues.s)}%</Text>
          <Slider
            min={0}
            max={100}
            label={(value: number) => `${Math.round(value)}%`}
            value={hslValues.s}
            onChange={(value: number) => handleHSLChange("s", value)}
            marks={[
              { value: 0, label: "0%" },
              { value: 50, label: "50%" },
              { value: 100, label: "100%" },
            ]}
          />
        </div>

        <div>
          <Text>Lightness: {Math.round(hslValues.l)}%</Text>
          <Slider
            min={0}
            max={100}
            label={(value: number) => `${Math.round(value)}%`}
            value={hslValues.l}
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
