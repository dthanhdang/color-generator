import React from "react"
import { SingleColor } from "./SingleColor"
import { nanoid } from "nanoid"
//import chroma  from "chroma-js";

type ColorPaletteProps = {
  palette: string[] // il faut modifier en un objet chroma => chroma.Color[]
}
/*type ColorPaletteProps = {
    palette:  {
    color: string;
    id: number;
    }
    }
    
*/
// Il faut ajouter l'argument colorMode pour afficher les valeurs en fonction de chaque mode selectionné
//const chromaColor = chroma("red");
export function ColorPalette({
  palette,
}: ColorPaletteProps): React.JSX.Element {
  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(100px,1fr))] gap-4 p-4">
      {palette.map((color: string, index: number) => (
        <SingleColor key={nanoid()} color={color} index={index} />
      ))}
    </div>
  )
}
