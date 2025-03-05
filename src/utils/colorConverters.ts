import chroma from "chroma-js"

export function hexToHsl(hex: string): { h: number; s: number; l: number } {
  const color = chroma(hex)
  const hsl = color.hsl()
  return {
    h: hsl[0],
    s: hsl[1] * 100,
    l: hsl[2] * 100,
  }
}
export function hslToHex(h: number, s: number, l: number): string {
  //const color = chroma(h, s, l, "hsl")
  const color = chroma.hsl(h, s / 100, l / 100)
  return color.hex()
}

export function hexToOklch(hex: string): { l: number; c: number; h: number } {
  const color = chroma(hex)
  const oklch = color.lch()
  return {
    l: oklch[0],
    c: oklch[1],
    h: oklch[2],
  }
}

export function oklchToHex(l: number, c: number, h: number): string {
  const color = chroma.lch(l, c, h)
  return color.hex()
}
