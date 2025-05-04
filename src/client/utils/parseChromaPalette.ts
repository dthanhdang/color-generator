import type { Color } from "chroma-js"
import chroma from "chroma-js"

function isValidHexColor(value: string): boolean {
  return /^[a-f0-9]{6}$/i.test(value)
}

export function parseChromaPalette(palette: string): Color[] {
  const tokens = palette.split("-")
  if (tokens.every((token) => isValidHexColor(token)))
    return tokens.map((hex) => chroma(hex))

  throw new Error(`Invalid palette ${palette}`)
}
