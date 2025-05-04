import type { JSX } from "react"
import { useEffect, useState } from "react"
import { ColorInput } from "@mantine/core"
import chroma from "chroma-js"
import type { Color } from "chroma-js"
import type { ColorFormProps } from "./ColorFormProps.ts"

export function FormHex({
  className,
  color,
  onChange,
  onChangeEnd,
}: ColorFormProps): JSX.Element {
  const [inputValue, setInputValue] = useState(color.hex())
  const [error, setError] = useState<string | null>(null)
  useEffect(() => {
    setInputValue(color.hex())
  }, [color])

  const handleColorChange = (
    value: string,
    callback: undefined | ((color: Color) => void)
  ) => {
    if (!callback) return

    setInputValue(value)

    if (chroma.valid(value)) {
      const newColor = chroma(value)
      setError(null)
      callback(newColor)
    } else if (value.length >= 7) {
      setError(`${value} is not a valid color`)
    }
  }
  return (
    <ColorInput
      className={className}
      value={inputValue}
      onChange={(value) => handleColorChange(value, onChange)}
      onChangeEnd={(value) => handleColorChange(value, onChangeEnd)}
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
  )
}
