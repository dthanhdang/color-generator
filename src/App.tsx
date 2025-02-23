import { Form } from "./Form"
import { ColorPalette } from "./ColorPalette"
import { useState } from "react"
import chroma from "chroma-js"

function getColorScale(color: string, count: number): string[] {
  return chroma.scale(["white", color]).mode("lch").colors(count)
}

export function App() {
  //const [palette, setPalette] = useState(chroma.scale(["white", color]).mode("lch").colors(10));
  const [palette, setPalette] = useState(() => getColorScale("#b4f2ce", 10))

  const handleColorSubmit = (newColor: string) => {
    const newPalette = getColorScale(newColor, 10)
    setPalette(newPalette)
  }

  return (
    <main>
      <Form onSubmit={handleColorSubmit} initialColor="#b4f2ce" />
      <ColorPalette palette={palette} />
    </main>
  )
}
