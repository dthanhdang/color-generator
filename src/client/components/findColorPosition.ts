import type { Color } from "chroma-js"

import { computeDistance } from "./computeDistance.js"

export const findColorPosition = (
  canvas: OffscreenCanvas | null,
  img: HTMLImageElement | null,
  color: Color
): { x: number; y: number } => {
  const ctx = canvas?.getContext("2d")
  if (!canvas || !ctx || !img) return { x: 0, y: 0 }

  ctx.drawImage(img, 0, 0)

  const [r, g, b] = color.rgb(false)

  let matchX = 0
  let matchY = 0
  let minDistance = NaN
  for (let i = 0; i < canvas.width; i += 5)
    for (let j = 0; j < canvas.height; j += 5) {
      const pixel = ctx.getImageData(i, j, 1, 1).data

      const distance = computeDistance([
        [pixel[0], r],
        [pixel[1], g],
        [pixel[2], b],
      ])

      if (Number.isNaN(minDistance) || distance < minDistance) {
        matchX = i
        matchY = j
        minDistance = distance
      }
    }

  return { x: matchX, y: matchY }
}
