import React, { useEffect, useState } from "react"
import { ColorInput, Stack, Group } from "@mantine/core"
import chroma, { type Color } from "chroma-js"

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
  const [currentColor, setCurrentColor] = useState<Color>(initialColor)
  useEffect(() => setCurrentColor(initialColor), [initialColor])

  const [error, setError] = useState<string | null>(null)

  const handleColorChange = (value: string) => {
    setCurrentColor(chroma(value))

    if (chroma.valid(value)) {
      setError(null)
      onSubmit(chroma(value))
    } else {
      setError(`${value} is not a valid color`)
    }
  }
  return (
    <Stack>
      <Group>
        <ColorInput
          value={currentColor.hex()}
          onChange={handleColorChange}
          format="hex"
          swatches={["#25262b", "#868e96", "#fa5252", "#e64980", "#be4bdb"]}
          error={error}
        />
      </Group>
    </Stack>
  )
}
