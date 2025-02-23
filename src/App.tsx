import { Form } from "./Form"
import { ColorPalette } from "./ColorPalette"
import { useState } from "react"
import chroma from "chroma-js"
// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports

import { MantineProvider } from "@mantine/core"

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
    <MantineProvider>
      <main>
        <Form onSubmit={handleColorSubmit} initialColor="#b4f2ce" />
        <ColorPalette palette={palette} />
      </main>
    </MantineProvider>
  )
}
