import { useState } from "react"
import type { ComponentProps, MouseEventHandler } from "react"
import type { Position } from "./Position.ts"
import chroma from "chroma-js"
import type { Swatch } from "./Swatch.ts"
import { computeEuclidianDistance } from "#utils/computeEuclidianDistance.ts"

function eventPosition(
  event: React.MouseEvent<HTMLCanvasElement, MouseEvent>
): Position {
  const rect = event.currentTarget.getBoundingClientRect()

  return { x: event.clientX - rect.left, y: event.clientY - rect.top }
}

function getColor(
  ctx: OffscreenCanvasRenderingContext2D,
  { x, y }: Position
): string {
  const [r, g, b] = ctx.getImageData(x, y, 1, 1).data

  return chroma.rgb(r, g, b).hex()
}

type UseDndHandlersProps = {
  circleRadius: number
  offscreenCanvasContext: OffscreenCanvasRenderingContext2D | undefined
  onSwatchesChange: (
    swatches: readonly Swatch[],
    draggedIndex: number | undefined
  ) => void
  swatches: readonly Swatch[]
}

export function useDndHandlers({
  circleRadius,
  offscreenCanvasContext,
  onSwatchesChange,
  swatches,
}: UseDndHandlersProps): ComponentProps<"canvas"> & {
  draggedSwatchColor: string | undefined
} {
  const [draggedIndex, setDraggedIndex] = useState<number>()

  const onMouseDown: MouseEventHandler<HTMLCanvasElement> = (event) => {
    if (event.button !== 0) return

    const { x, y } = eventPosition(event)

    const matchIndex = swatches.findIndex(
      ({ position }) =>
        computeEuclidianDistance([
          [position.x, x],
          [position.y, y],
        ]) < circleRadius
    )
    if (matchIndex !== -1) {
      setDraggedIndex(matchIndex)
      onSwatchesChange(swatches, matchIndex)
    } else {
      setDraggedIndex(swatches.length)
      onSwatchesChange(
        [...swatches, { color: "", position: { x, y } }],
        swatches.length
      )
    }
  }

  const onMouseMove: MouseEventHandler<HTMLCanvasElement> = (event) => {
    if (!(offscreenCanvasContext && draggedIndex !== undefined)) return

    const position = eventPosition(event)

    onSwatchesChange(
      swatches.toSpliced(draggedIndex, 1, {
        color: getColor(offscreenCanvasContext, position),
        position,
      }),
      draggedIndex
    )
  }

  const onMouseUp: MouseEventHandler<HTMLCanvasElement> = (event) => {
    if (!(offscreenCanvasContext && draggedIndex !== undefined)) return

    const position = eventPosition(event)

    const currentSwatch = swatches[draggedIndex]
    onSwatchesChange(
      swatches.toSpliced(draggedIndex, 1, {
        ...currentSwatch,
        color: getColor(offscreenCanvasContext, position),
      }),
      undefined
    )
    setDraggedIndex(undefined)
  }

  const onMouseLeave: MouseEventHandler<HTMLCanvasElement> = () => {
    setDraggedIndex(undefined)
  }

  return {
    draggedSwatchColor:
      draggedIndex === undefined || draggedIndex >= swatches.length
        ? undefined
        : swatches[draggedIndex].color,
    onMouseLeave,
    onMouseDown,
    onMouseMove: onMouseMove,
    onMouseUp,
  }
}
