import type { Color } from "chroma-js"
import { JSX } from "react"

type PaletteColorsProps = {
  colors: Color[]
}

export function PaletteColors({ colors }: PaletteColorsProps): JSX.Element {
  return (
    <>
      {colors.map((color, index) => (
        <div
          className="grow"
          key={index}
          style={{ backgroundColor: color.hex() }}
        />
      ))}
    </>
  )
}
