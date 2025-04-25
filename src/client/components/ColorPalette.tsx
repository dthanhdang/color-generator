import { useState } from "react"

import { type Color } from "chroma-js"
import { SingleColor } from "../SingleColor"
import { ColorDetails } from "./ColorDetails.tsx"

export type ColorPaletteItem = {
  id: string
  color: Color
  weight: number
  name: string
}

type ColorPaletteProps = {
  palette: ColorPaletteItem[]
}

export function ColorPalette({ palette }: ColorPaletteProps) {
  const [selectedColor, setSelectedColor] = useState<ColorPaletteItem | null>(
    null
  )
  //const [showCssCode, setShowCssCode] = useState(false)
  const handleColorClick = (item: ColorPaletteItem) => {
    setSelectedColor(item === selectedColor ? null : item)
  }

  return (
    <div>
      <p className="text-sm text-indigo-700 text-center mb-3 px-4">
        Click on any color below to view its detailed information
      </p>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(100px,1fr))] gap-4 p-4">
        {palette.map((item, index) => (
          <SingleColor
            key={item.id}
            color={item.color}
            index={index}
            name={item.name}
            weight={item.weight}
            onClick={() => handleColorClick(item)}
            selected={selectedColor?.id === item.id}
          />
        ))}
      </div>

      {selectedColor && (
        <ColorDetails className="mt-4" color={selectedColor.color} />
      )}
    </div>
  )
}
