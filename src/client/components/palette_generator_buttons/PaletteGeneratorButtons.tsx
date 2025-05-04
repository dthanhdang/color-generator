import type { JSX } from "react"
import { GenerateRandomPaletteButton } from "./GenerateRandomPaletteButton.tsx"
import { ToggleFavoriteButton } from "./ToggleFavoriteButton.tsx"
import type { Color } from "chroma-js"
import { OpenPaletteEditorButton } from "./OpenPaletteEditorButton.tsx"

type PaletteGeneratorButtonsProps = {
  onGeneratePalette?: () => void
  colors: Color[]
}

export function PaletteGeneratorButtons({
  colors,
  onGeneratePalette: handleGeneratePalette,
}: PaletteGeneratorButtonsProps): JSX.Element {
  return (
    <>
      {handleGeneratePalette ? (
        <GenerateRandomPaletteButton
          className="ml-auto"
          onClick={handleGeneratePalette}
          variant="light"
        >
          Generate Random Palette
        </GenerateRandomPaletteButton>
      ) : undefined}

      <ToggleFavoriteButton colors={colors} variant="light" />

      <OpenPaletteEditorButton colors={colors} variant="primary">
        Open in Editor
      </OpenPaletteEditorButton>
    </>
  )
}
