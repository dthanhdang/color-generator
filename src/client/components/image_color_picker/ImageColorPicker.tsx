import { useEffect, useRef, useState } from "react"
import { Text, Button, Group, Stack } from "@mantine/core"
import { ImageUploader } from "./ImageUploader"
import type { JSX } from "react"
import ColorThief from "colorthief"
import type { RGB } from "colorthief"
import clsx from "clsx"
import chroma from "chroma-js"
import { computeEuclidianDistance } from "#utils/computeEuclidianDistance.ts"
import type { Swatch } from "./Swatch.ts"
import { useDndHandlers } from "./useDndHandlers.ts"
import type { Position } from "./Position.ts"

function computeCanvasSize(
  image: HTMLImageElement,
  maxImageHeight: number
): {
  width: number
  height: number
} {
  const { naturalHeight, naturalWidth } = image
  const aspectRatio = naturalWidth / naturalHeight

  const height = Math.floor(Math.min(maxImageHeight, naturalHeight))

  return {
    width: Math.floor(height * aspectRatio),
    height,
  }
}

function extractColors(
  image: HTMLImageElement,
  ctx: OffscreenCanvasRenderingContext2D
): Swatch[] {
  const palette = new ColorThief().getPalette(image, 5)
  drawImage(ctx, image)

  const pixels = ctx.getImageData(
    0,
    0,
    ctx.canvas.width,
    ctx.canvas.height
  ).data

  const getColor = ({ x, y }: Position): [number, number, number] => {
    const index = (y * ctx.canvas.width + x) * 4

    return [pixels[index], pixels[index + 1], pixels[index + 2]]
  }

  const findColor = (color: RGB): Swatch => {
    let match = {
      color: getColor({ x: 0, y: 0 }),
      position: { x: 0, y: 0 },
    }
    let minDistance: undefined | number
    for (let j = 0; j < ctx.canvas.height; ++j)
      for (let i = 0; i < ctx.canvas.width; ++i) {
        const position = { x: i, y: j }
        const currentColor = getColor(position)
        const distance = computeEuclidianDistance([
          [color[0], currentColor[0]],
          [color[1], currentColor[1]],
          [color[2], currentColor[2]],
        ])
        if (minDistance === undefined || distance < minDistance) {
          match = { color, position }
          minDistance = distance
        }
      }

    const { color: matchColor } = match

    return {
      ...match,
      color: chroma.rgb(matchColor[0], matchColor[1], matchColor[2]).hex(),
    }
  }

  return palette.map((color) => findColor(color))
}

function drawImage(
  ctx: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D,
  image: HTMLImageElement
): void {
  ctx.drawImage(
    image,
    0,
    0,
    image.naturalWidth,
    image.naturalHeight,
    0,
    0,
    ctx.canvas.width,
    ctx.canvas.height
  )
}

const circleRadius = 20
const zoomScale = 4

function drawSwatch(
  ctx: CanvasRenderingContext2D,
  { color, position: { x, y } }: Swatch,
  isDragging: boolean
): void {
  if (isDragging) {
    ctx.save()

    ctx.beginPath()
    ctx.arc(x, y, circleRadius, 0, 2 * Math.PI)
    ctx.clip()

    const sourceRadius = circleRadius / zoomScale

    ctx.drawImage(
      ctx.canvas,
      x - sourceRadius,
      y - sourceRadius,
      sourceRadius * 2,
      sourceRadius * 2,
      x - circleRadius,
      y - circleRadius,
      circleRadius * 2,
      circleRadius * 2
    )

    ctx.beginPath()
    ctx.strokeStyle = "white"
    ctx.lineWidth = 2
    ctx.rect(x - 2, y - 2, 5, 5)
    ctx.stroke()

    ctx.restore()
  } else {
    // Cercle interne avec la couleur sélectionnée
    ctx.beginPath()
    ctx.arc(x, y, circleRadius * 0.9, 0, 2 * Math.PI)
    ctx.fillStyle = color
    ctx.fill()
  }

  // Cercle externe blanc
  ctx.save()
  ctx.beginPath()
  ctx.strokeStyle = "white"
  ctx.arc(x, y, circleRadius, 0, 2 * Math.PI)
  ctx.lineWidth = 5
  ctx.stroke()
  ctx.restore()
}

type ImageColorPickerProps = {
  onColorSelect: (color: string) => void
  onColorsExtracted?: (colors: string[]) => void
}

export function ImageColorPicker({
  onColorsExtracted,
}: ImageColorPickerProps): JSX.Element {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const imgRef = useRef<HTMLImageElement>(null)
  const [swatches, setSwatches] = useState<readonly Swatch[]>([])
  const [offscreenCanvasContext, setOffscreenCanvasContext] =
    useState<OffscreenCanvasRenderingContext2D>()
  const onSwatchesChange = (swatches: readonly Swatch[]): void => {
    setSwatches(swatches)
    if (onColorsExtracted) onColorsExtracted(swatches.map(({ color }) => color))
  }
  const { draggedIndex, ...dndHandlers } = useDndHandlers({
    circleRadius,
    offscreenCanvasContext,
    onSwatchesChange,
    swatches,
  })

  useEffect(() => {
    const canvas = canvasRef.current
    const img = imgRef.current
    const ctx = canvas?.getContext("2d")
    if (ctx && img) {
      drawImage(ctx, img)

      // Draw dragged swatch first so that we can zoom on the freshly painted image
      if (draggedIndex !== undefined)
        drawSwatch(ctx, swatches[draggedIndex], true)

      swatches.forEach((swatch, index) => {
        if (index !== draggedIndex) drawSwatch(ctx, swatch, false)
      })
    }
  }, [draggedIndex, swatches])

  const handleLoad = (): void => {
    const canvas = canvasRef.current
    const img = imgRef.current

    if (canvas && img) {
      const { width, height } = computeCanvasSize(img, 400)

      // TODO check if we actually need to resize image
      canvas.height = img.height = height
      canvas.width = img.width = width

      const offscreenCanvas = new OffscreenCanvas(width, height)
      const ctx = offscreenCanvas.getContext("2d", {
        willReadFrequently: true,
      })
      if (ctx) {
        setOffscreenCanvasContext(ctx)

        onSwatchesChange(extractColors(img, ctx))
      }
    }
  }

  const canvasSize = imgRef.current?.complete
    ? computeCanvasSize(imgRef.current, 400)
    : undefined

  return (
    <Stack gap="md">
      <img
        className="hidden"
        crossOrigin="anonymous"
        onLoad={handleLoad}
        ref={imgRef}
      />

      {swatches.length === 0 ? (
        <ImageUploader imgRef={imgRef} />
      ) : (
        <Group justify="space-between" align="center">
          <Text fw={500}>Select a color from the image</Text>
          <Button
            variant="subtle"
            onClick={() => {
              onSwatchesChange([])
            }}
          >
            {" "}
            Browse image
          </Button>
        </Group>
      )}

      <div className="relative inline-flex mx-auto">
        <canvas
          {...dndHandlers}
          className={clsx(
            draggedIndex !== undefined && "cursor-none",
            swatches.length === 0 && "hidden"
          )}
          ref={canvasRef}
          style={{
            width: canvasSize?.width,
            height: canvasSize?.height,
          }}
        />

        {draggedIndex === undefined ? null : (
          <div
            className="absolute left-0 top-full h-16"
            style={{
              backgroundColor: swatches[draggedIndex].color,
              width: canvasSize?.width,
            }}
          />
        )}
      </div>
    </Stack>
  )
}
