//import { hexToHsl, hslToHex } from "#utils/colorConverters.ts"
import { Slider, Group, Stack, Text, Paper } from "@mantine/core";
import type { JSX } from "react";
import { type Color } from "chroma-js";

type HSLColor = {
  h: number;
  s: number;
  l: number;
};

type FormHslProps = {
  color: Color;
  onChange: (color: Color) => void;
};

export function FormHsl({ color, onChange }: FormHslProps): JSX.Element {
  //const [previewColor, setPreviewColor] = useState(initialColor)

  const handleHSLChange = (key: keyof HSLColor, value: number): void => {
    const newColor = color.set(`hsl.${key}`, value);

    onChange(newColor);
  };

  return (
    <Paper className="bg-white p-4 rounded-md shadow-md">
      <Stack className="flex flex-col space-y-4">
        <Group className="flex justify-between items-center">
          <Text className="text-lg font-medium">HSL</Text>
          <p>{color.hex()}</p>
          <div style={{ backgroundColor: color.hex() }} />
        </Group>
        <div>
          <Text>Hue : {Math.round(color.hsl()[0])}°</Text>
          <Slider
            min={0}
            max={360}
            label={(value: number) => `${Math.round(value)}°`}
            value={color.hsl()[0]}
            onChange={(value: number) => handleHSLChange("h", value)}
            marks={[
              { value: 0, label: "0°" },
              { value: 180, label: "180°" },
              { value: 360, label: "360°" },
            ]}
          />
        </div>
        <div>
          <Text>Saturation: {Math.round(color.hsl()[1] * 100)}%</Text>
          <Slider
            min={0}
            max={100}
            label={(value: number) => `${Math.round(value)}%`}
            value={color.hsl()[1] * 100}
            onChange={(value: number) => handleHSLChange("s", value / 100)}
            marks={[
              { value: 0, label: "0%" },
              { value: 50, label: "50%" },
              { value: 100, label: "100%" },
            ]}
          />
        </div>

        <div>
          <Text>Lightness: {Math.round(color.hsl()[2] * 100)}%</Text>
          <Slider
            min={0}
            max={100}
            label={(value: number) => `${Math.round(value)}%`}
            value={color.hsl()[2] * 100}
            onChange={(value: number) => handleHSLChange("l", value / 100)}
            marks={[
              { value: 0, label: "0%" },
              { value: 50, label: "50%" },
              { value: 100, label: "100%" },
            ]}
          />
        </div>
      </Stack>
    </Paper>
  );
}
