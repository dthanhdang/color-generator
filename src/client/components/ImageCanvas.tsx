import { MouseEvent, RefObject, useEffect, useState } from "react"
import { computeDistance } from "./computeDistance.js"

export type Position = { x: number; y: number }

type SelectedPoint = Position & {
  color: string
}

function eventPositionToCanvasPosition(
  { clientX, clientY }: MouseEvent<Element>,
  canvas: HTMLCanvasElement,
  image: HTMLImageElement
): Position {
  const rect = canvas.getBoundingClientRect()

  const scaleX = image.naturalWidth / rect.width
  const scaleY = image.naturalHeight / rect.height

  return {
    x: (clientX - rect.left) * scaleX,
    y: (clientY - rect.top) * scaleY,
  }
}

// Dessiner un cercle de sélection

function drawSelectionCircle(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  color: string
): void {
  // Cercle externe blanc
  ctx.beginPath()
  ctx.arc(x, y, 20, 0, 2 * Math.PI)
  ctx.strokeStyle = "white"
  ctx.lineWidth = 2
  ctx.stroke()

  // Cercle interne avec la couleur sélectionnée
  ctx.beginPath()
  ctx.arc(x, y, 10, 0, 2 * Math.PI)
  ctx.fillStyle = color
  ctx.fill()
}

function redrawCanvas(
  canvas: HTMLCanvasElement | null,
  img: HTMLImageElement | null,
  selectedPoints: SelectedPoint[]
): void {
  const ctx = canvas?.getContext("2d")

  if (!canvas || !ctx || !img) return

  // Redessiner l'image de base
  ctx.drawImage(img, 0, 0)

  // Dessiner tous les points précédemment sélectionnés en utilisant la ref
  selectedPoints.forEach((point) =>
    drawSelectionCircle(ctx, point.x, point.y, point.color)
  )
}

type ImageCanvasProps = {
  colors: SelectedPoint[]
  canvasRef: RefObject<HTMLCanvasElement | null>
  getColor: (position: Position) => string | undefined
  imageRef: RefObject<HTMLImageElement | null>
  onColorsChange: (colors: SelectedPoint[]) => void
}

export function ImageCanvas({
  imageRef,
  canvasRef,
  getColor,
  colors,
  onColorsChange,
}: ImageCanvasProps) {
  const [draggedPointIndex, setDraggedPointIndex] = useState<
    number | undefined
  >(undefined)

  const handleMouseDown = (event: MouseEvent): void => {
    const canvas = canvasRef.current
    const img = imageRef.current

    if (!img || !canvas) return

    const { x, y } = eventPositionToCanvasPosition(event, canvas, img)

    const index = colors.findIndex(
      (point) =>
        computeDistance([
          [point.x, x],
          [point.y, y],
        ]) < 10
    )

    if (index !== -1) {
      setDraggedPointIndex(index)
    }
  }

  const handleMouseMove = (event: MouseEvent): void => {
    if (draggedPointIndex === undefined) return

    const canvas = canvasRef.current
    const img = imageRef.current

    if (!canvas || !img) return

    const position = eventPositionToCanvasPosition(event, canvas, img)

    const newSelectedPoints = [...colors]
    newSelectedPoints[draggedPointIndex] = {
      ...position,
      color: getColor(position) ?? newSelectedPoints[draggedPointIndex].color,
    }

    onColorsChange(newSelectedPoints)
  }

  const handleMouseUp = (): void => {
    setDraggedPointIndex(undefined)
  }

  const img = imageRef.current
  const canvas = canvasRef.current
  useEffect(() => {
    if (!canvas || !img) return

    canvas.width = img.naturalWidth
    canvas.height = img.naturalHeight

    redrawCanvas(canvas, img, colors)
  }, [img, colors, canvas])

  return (
    <div className="relative w-full flex justify-center mt-4">
      <canvas
        className="max-w-full max-h-[400px] rounded-lg shadow-md cursor-pointer"
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        ref={canvasRef}
      />
    </div>
  )
}
