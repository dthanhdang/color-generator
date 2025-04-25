import { nanoid } from "nanoid"
import type { PaletteElement } from "./PaletteEditor.tsx"
import type { UniqueIdentifier } from "@dnd-kit/core"
import { arrayMove } from "@dnd-kit/sortable"
import type { Color } from "chroma-js"
import { useEffect, useState } from "react"

export type Action =
  | { type: "delete"; index: number }
  | { type: "duplicate"; index: number }
  | { type: "modify"; index: number; color: Color }
  | { type: "swap"; fromIndex: number; toIndex: number }
  | { type: "initialize"; palette: Color[] }

export const applyAction = (
  palette: PaletteElement[],
  action: Action
): PaletteElement[] => {
  switch (action.type) {
    case "delete":
      return palette.toSpliced(action.index, 1)
    case "duplicate":
      return palette.toSpliced(action.index + 1, 0, {
        ...palette[action.index],
        id: nanoid(),
      })
    case "initialize":
      return action.palette.map((color) => ({
        color,
        id: nanoid() as UniqueIdentifier,
      }))
    case "modify":
      return palette.toSpliced(action.index, 1, {
        ...palette[action.index],
        color: action.color,
      })
    case "swap":
      return arrayMove(palette, action.fromIndex, action.toIndex)
  }
}

type UseActionsReturn = {
  actionIndex: number
  actions: Action[]
  addAction: (action: Action, palette: PaletteElement[]) => PaletteElement[]
  redo: (palette: PaletteElement[]) => PaletteElement[]
  undo: () => PaletteElement[]
}

export function useActions(initialPalette: Color[]): UseActionsReturn {
  useEffect(() => {
    setActions([{ type: "initialize", palette: initialPalette }])
    setActionIndex(0)
  }, [initialPalette])
  const [actions, setActions] = useState<Action[]>(() => [
    { type: "initialize", palette: initialPalette },
  ])
  const [actionIndex, setActionIndex] = useState(0)

  const addAction = (
    action: Action,
    palette: PaletteElement[]
  ): PaletteElement[] => {
    const newActions = [...actions.slice(0, actionIndex + 1), action]
    setActions(newActions)
    setActionIndex(newActions.length - 1)

    return applyAction(palette, action)
  }

  const undo = (): PaletteElement[] => {
    const newPalette = actions
      .slice(0, actionIndex)
      .reduce<
        PaletteElement[]
      >((palette, action) => applyAction(palette, action), [])

    setActionIndex((actionIndex) => actionIndex - 1)

    return newPalette
  }

  const redo = (palette: PaletteElement[]): PaletteElement[] => {
    const newPalette = applyAction(palette, actions[actionIndex + 1])

    setActionIndex(actionIndex + 1)

    return newPalette
  }

  return { actionIndex, actions, addAction, redo, undo }
}
