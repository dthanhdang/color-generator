import React from "react"
import { SingleColor } from "./SingleColor"
import { type Color } from "chroma-js"
//import { nanoid } from "nanoid"
//import chroma  from "chroma-js";

export type ColorPaletteItem = {
  id: string
  color: Color
  weight: number
  name: string
}

type ColorPaletteProps = {
  palette: ColorPaletteItem[]
}

export function ColorPalette({
  palette,
}: ColorPaletteProps): React.JSX.Element {
  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(100px,1fr))] gap-4 p-4">
      {palette.map(({ color, id, name, weight }, index) => (
        <SingleColor
          key={id}
          color={color}
          index={index}
          name={name}
          weight={weight}
        />
      ))}
    </div>
  )
}
