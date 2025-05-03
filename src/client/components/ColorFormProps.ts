import type { Color } from "chroma-js"

export type ColorFormProps = {
  color: Color
  onChange: (color: Color) => void
  onChangeEnd?: (color: Color) => void
}
