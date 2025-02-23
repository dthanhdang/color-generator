import React, { FormEvent, useState } from 'react'

type ColorMode = "hex" | "hsl" | "oklch";

type FormProps = {
    initialColor: string;
    onSubmit: (color: string) => void 
   
}

type HSLColor = {
    h: number;
    s: number;
    l: number;
}

type OKLCHColor = {
    l: number;
    c: number;
    h: number;
}



export function Form ({ initialColor, onSubmit } : FormProps) : React.JSX.Element  {
    const [color, setColor] = useState(initialColor)
    const [ColorMode, setColorMode] = useState<ColorMode>("hex")

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault()
        onSubmit(color)
    }

    const handleColorModeChange = (newMode: ColorMode) => {
        setColorMode(newMode)
    }
 
  return (
     <form onSubmit={handleSubmit} className="ml-6 fle gap-4 items-center p-4">
        <input 
        type="text"
        value={color}
        onChange={(event) => setColor(event.target.value)}
        
        className="mt-6 p-2 w-60 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-400 focus:border-indigo-500"
        />

        <button type="submit" className="mt-6 p-2 px-4 rounded-lg shadow-md transition-all" style={{ backgroundColor: color }}  >
             Submit
        </button>
     </form>
  )
}

 