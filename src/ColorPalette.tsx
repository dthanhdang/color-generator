import React from 'react'
import { SingleColor } from "./SingleColor"
import { nanoid } from "nanoid"

type ColorPaletteProps = {
    palette: string[]
}
/*type ColorPaletteProps = {
    palette:  {
    color: string;
    id: number;
    }
    }
    
*/



export function ColorPalette ({ palette} : ColorPaletteProps): React.JSX.Element {
  return (
     <section className="min-h-[calc(100vh-100px] grid grid-cols-[repeat(auto-fit,minmax(223.33px,1fr))] gap-0 mt-8">
        {palette.map((color: string, index: number) => (
            <SingleColor key={nanoid()} color={color} index={index}/>
        ))
            
        }
     </section>
  )
}
