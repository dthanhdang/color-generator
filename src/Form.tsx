import React, { useEffect, useState } from "react"
import { ColorInput, Stack, Group } from "@mantine/core"
import chroma from "chroma-js"

//type ColorMode = "hex" | "hsl" | "oklch"

type FormProps = {
  initialColor: string
  onSubmit: (color: string) => void
  //colorMode: ColorMode
  //onModeChange: (mode: string | null) => void
}

export function Form({
  initialColor,
  onSubmit,
  //colorMode,
  //onModeChange,
}: FormProps): React.JSX.Element {
  const [currentColor, setCurrentColor] = useState<string>(initialColor)
  useEffect(() => setCurrentColor(initialColor), [initialColor])

  const [error, setError] = useState<string | null>(null)

  const handleColorChange = (value: string) => {
    setCurrentColor(value)

    if (chroma.valid(value)) {
      setError(null)
      onSubmit(value)
    } else {
      setError(`${value} is not a valid color`)
    }
  }
  return (
    <Stack>
      <Group>
        <ColorInput
          value={currentColor}
          onChange={handleColorChange}
          format="hex"
          swatches={["#25262b", "#868e96", "#fa5252", "#e64980", "#be4bdb"]}
          error={error}
        />
      </Group>

      {
        //const [color, setColor] = useState(initialColor)
        //const [ColorMode, setColorMode] = useState<ColorMode>("hex")
        /*const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    onSubmit(color)
  }

  const handleColorChange = (newColor: string) => {
    setColor(newColor)
    onSubmit(newColor)
  }

  const handleModeChange = (value: string | null): void => {
    if (value) {
      setColorMode(value as ColorMode)
    }
  }*/
        /*<form onSubmit={handleSubmit} className="ml-6 fle gap-4 items-center p-4">
      <input
        type="text"
        value={color}
        onChange={(event) => setColor(event.target.value)}
        className="mt-6 p-2 w-60 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-400 focus:border-indigo-500"
      />

      <button
        type="submit"
        className="mt-6 p-2 px-4 rounded-lg shadow-md transition-all"
        style={{ backgroundColor: color }}
      >
        Submit
      </button>
    </form>*/
      }
    </Stack>
  )
}
