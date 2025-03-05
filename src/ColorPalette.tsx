import React from "react"
import { SingleColor } from "./SingleColor"
//import { nanoid } from "nanoid"
//import chroma  from "chroma-js";

export type ColorPaletteItem = {
  id: string
  color: string
  weight: number
  name: string
}

type ColorPaletteProps = {
  palette: ColorPaletteItem[]
  // il faut modifier en un objet chroma => chroma.Color[]*/}
  //palette: chroma.Color[];
}

// Il faut ajouter l'argument colorMode pour afficher les valeurs en fonction de chaque mode selectionné
//const chromaColor = chroma("red");
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
