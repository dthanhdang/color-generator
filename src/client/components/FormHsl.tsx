//import { hexToHsl, hslToHex } from "#utils/colorConverters.ts"
import { Slider, Group, Stack, Text, Paper } from "@mantine/core"
import type { JSX } from "react"
import { type Color } from "chroma-js"
import type { ColorFormProps } from "./ColorFormProps.ts"

type HSLColor = {
  h: number
  s: number
  l: number
}

export function FormHsl({
  color,
  onChange,
  onChangeEnd,
}: ColorFormProps): JSX.Element {
  //const [previewColor, setPreviewColor] = useState(initialColor)

  const handleHSLChange = (
    key: keyof HSLColor,
    value: number,
    callback: undefined | ((color: Color) => void)
  ): void => {
    if (!callback) return

    const divider = key === "h" ? 1 : 100
    const newColor = color.set(`hsl.${key}`, value / divider)

    callback(newColor)
  }

  return (
    <Paper className="bg-white p-6 rounded-md shadow-md">
      <Stack className="flex flex-col space-y-4">
        <Group className="flex justify-between items-center">
          {/*<Text className="text-lg font-medium">HSL</Text>
          <p>{hslValues.hex()}</p>*/}
          <div className="flex justify-between">
            <span className="text-sm font-medium text-gray-500">HSL</span>
            <span className="font-mono text-sm">
              {`(${Math.round(color.hsl()[0])}° ${Math.round(color.hsl()[1] * 100)}% ${Math.round(color.hsl()[2] * 100)}%)`}
            </span>
          </div>
          <div style={{ backgroundColor: color.hex() }} />
        </Group>
        <div>
          <div className="flex justify-between mb-2">
            <Text className="text-sm font-medium text-gray-700">Hue</Text>
            <span className="text-blue-600 font-semibold">
              {Math.round(color.hsl()[0])}°
            </span>
          </div>

          <Slider
            min={0}
            max={360}
            label={(value: number) => `${Math.round(value)}°`}
            value={color.hsl()[0]}
            onChange={(value: number) => handleHSLChange("h", value, onChange)}
            onChangeEnd={(value: number) =>
              handleHSLChange("h", value, onChangeEnd)
            }
            marks={[
              { value: 0, label: "0°" },
              { value: 180, label: "180°" },
              { value: 360, label: "360°" },
            ]}
          />
        </div>
        <div>
          <div className="flex justify-between mb-2">
            <Text className="text-sm font-medium text-gray-700">
              Saturation
            </Text>
            <span className="text-blue-600 font-semibold">
              {Math.round(color.hsl()[1] * 100)}%
            </span>
          </div>

          {/*<Text>Saturation: {Math.round(hslValues.hsl()[1] * 100)}%</Text>*/}
          <Slider
            min={0}
            max={100}
            label={(value: number) => `${Math.round(value)}%`}
            value={color.hsl()[1] * 100}
            onChange={(value: number) => handleHSLChange("s", value, onChange)}
            onChangeEnd={(value: number) =>
              handleHSLChange("s", value, onChangeEnd)
            }
            marks={[
              { value: 0, label: "0%" },
              { value: 50, label: "50%" },
              { value: 100, label: "100%" },
            ]}
          />
        </div>

        <div>
          <div className="flex justify-between mb-2">
            <Text className="text-sm font-medium text-gray-700">Lightness</Text>
            <span className="text-blue-600 font-semibold">
              {Math.round(color.hsl()[2] * 100)}%
            </span>
          </div>

          <Slider
            min={0}
            max={100}
            label={(value: number) => `${Math.round(value)}%`}
            value={color.hsl()[2] * 100}
            onChange={(value: number) => handleHSLChange("l", value, onChange)}
            onChangeEnd={(value: number) =>
              handleHSLChange("l", value, onChangeEnd)
            }
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
