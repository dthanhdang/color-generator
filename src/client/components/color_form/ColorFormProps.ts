import type { Color } from "chroma-js"

export type ColorFormProps = {
  className?: string
  color: Color
  onChange: (color: Color) => void
  onChangeEnd?: (color: Color) => void
}
