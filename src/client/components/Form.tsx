import React, { useEffect, useState } from "react"
import { ColorInput, Stack, Group } from "@mantine/core"
import chroma, { type Color } from "chroma-js"
//import { hexToHsl } from "#utils/colorConverters.ts"

//type ColorMode = "hex" | "hsl" | "oklch"

type FormProps = {
  initialColor: Color
  onSubmit: (color: Color) => void
}

export function Form({
  initialColor,
  onSubmit,
  //colorMode,
  //onModeChange,
}: FormProps): React.JSX.Element {
  const [inputValue, setInputValue] = useState(initialColor.hex())
  const [error, setError] = useState<string | null>(null)
  //const [currentColor, setCurrentColor] = useState<Color>(initialColor)
  useEffect(() => {
    setInputValue(initialColor.hex())
  }, [initialColor])

  const handleColorChange = (value: string) => {
    setInputValue(value)

    if (chroma.valid(value)) {
      const newColor = chroma(value)
      setError(null)
      onSubmit(newColor)
    } else if (value.length >= 7) {
      setError(`${value} is not a valid color`)
    }
  }
  return (
    <Stack>
      <Group>
        <ColorInput
          value={inputValue}
          onChange={handleColorChange}
          format="hex"
          swatches={[
            "#25262b",
            "#868e96",
            "#fa5252",
            "#e64980",
            "#be4bdb",
            "#7950f2",
            "#4c6ef5",
            "#228be6",
            "#15aabf",
            "#12b886",
            "#40c057",
            "#82c91e",
            "#fab005",
            "#fd7e14",
          ]}
          error={error}
        />
      </Group>
    </Stack>
  )
}
