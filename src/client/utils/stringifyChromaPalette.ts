import type { Color } from "chroma-js"

export function stringifyChromaPalette(colors: readonly Color[]): string {
  return colors.map((color) => color.hex().slice(1)).join("-")
}
