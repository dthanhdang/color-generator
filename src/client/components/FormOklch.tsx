import type { JSX } from "react"
import { Slider, Group, Stack, Text, Paper } from "@mantine/core"
import type { Color } from "chroma-js"
import type { ColorFormProps } from "./ColorFormProps.ts"

type OKLCHColor = {
  l: number
  c: number
  h: number
}

export function FormOklch({
  color,
  onChange,
  onChangeEnd,
}: ColorFormProps): JSX.Element {
  //const [previewColor, setPreviewColor] = useState(initialColor)

  const handleOklchChange = (
    key: keyof OKLCHColor,
    value: number,
    callback: undefined | ((color: Color) => void)
  ): void => {
    if (!callback) return

    const divider = key === "l" ? 100 : 1
    const newColor = color.set(`oklch.${key}`, value / divider)

    callback(newColor)
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
              {`(${color.oklch()[0].toFixed(2)} ${color.oklch()[1].toFixed(3)} ${Math.round(color.oklch()[2])}°)`}
            </span>
          </div>
        </Group>
        <div>
          <div className="flex justify-between mb-2">
            <Text className="text-sm font-medium text-gray-700">Luminance</Text>
            <span className="text-blue-600 font-semibold">
              {Math.round(color.oklch()[0] * 100)}%
            </span>
          </div>

          <Slider
            min={0}
            max={100}
            label={(value: number) => `${Math.round(value)}%`}
            value={color.oklch()[0] * 100}
            onChange={(value: number) =>
              handleOklchChange("l", value, onChange)
            }
            onChangeEnd={(value: number) =>
              handleOklchChange("l", value, onChangeEnd)
            }
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
              {color.oklch()[1].toFixed(3)}
            </span>
          </div>
          {/*<Text>Chroma : {oklchValues.oklch()[1].toFixed(3)}</Text>*/}
          <Slider
            min={0}
            max={0.4}
            step={0.001}
            label={(value: number) => value.toFixed(3)} //il faut afficher la valeur arrondie
            value={color.oklch()[1]}
            onChange={(value: number) =>
              handleOklchChange("c", value, onChange)
            }
            onChangeEnd={(value: number) =>
              handleOklchChange("c", value, onChangeEnd)
            }
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
              {Math.round(color.oklch()[2])}°
            </span>
          </div>
          <Slider
            min={0}
            max={360}
            label={(value: number) => `${Math.round(value)}°`}
            value={color.oklch()[2]}
            onChange={(value: number) =>
              handleOklchChange("h", value, onChange)
            }
            onChangeEnd={(value: number) =>
              handleOklchChange("h", value, onChangeEnd)
            }
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
