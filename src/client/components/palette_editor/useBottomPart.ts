import { useState } from "react"
import { PaletteElement } from "./PaletteEditor.tsx"

export type BottomPart =
  | { type: "palette_visualizer" }
  | { type: "color_editor"; index: number }
  | { type: "color_details"; index: number }

type UseBottomPartReturn = {
  adjustIndex: (
    oldPalette: PaletteElement[],
    newPalette: PaletteElement[]
  ) => void
  bottomPart: BottomPart | undefined
  getIndexAction(index: number): "color_details" | "color_editor" | undefined
  onEdit: (index: number) => void
  onSelect: (index: number) => void
  onTogglePaletteVisualizer: () => void
}

export function useBottomPart(): UseBottomPartReturn {
  const [bottomPart, setBottomPart] = useState<BottomPart>()

  const adjustIndex = (
    oldPalette: PaletteElement[],
    newPalette: PaletteElement[]
  ): void => {
    if (
      bottomPart &&
      (bottomPart.type === "color_details" ||
        bottomPart.type === "color_editor")
    ) {
      const id = oldPalette[bottomPart.index].id
      const index = newPalette.findIndex((item) => item.id === id)
      setBottomPart(index === -1 ? undefined : { ...bottomPart, index })
    }
  }

  const getIndexAction = (
    index: number
  ): "color_details" | "color_editor" | undefined => {
    return bottomPart !== undefined &&
      "index" in bottomPart &&
      bottomPart.index === index
      ? bottomPart.type
      : undefined
  }

  const onEdit = (index: number): void => {
    setBottomPart((bottomPart) =>
      bottomPart !== undefined &&
      bottomPart.type === "color_editor" &&
      bottomPart.index === index
        ? undefined
        : { type: "color_editor", index }
    )
  }

  const onSelect = (index: number): void => {
    setBottomPart((bottomPart) =>
      bottomPart !== undefined &&
      bottomPart.type === "color_details" &&
      bottomPart.index === index
        ? undefined
        : { type: "color_details", index }
    )
  }

  const onTogglePaletteVisualizer = (): void => {
    setBottomPart((bottomPart) =>
      bottomPart?.type === "palette_visualizer"
        ? undefined
        : { type: "palette_visualizer" }
    )
  }

  return {
    adjustIndex,
    bottomPart,
    getIndexAction,
    onEdit,
    onSelect,
    onTogglePaletteVisualizer,
  }
}
