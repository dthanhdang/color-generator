import chroma /*type Color */ from "chroma-js"

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
  try {
    const color = chroma(hex)
    const [l, c, h] = color.oklch()
    return {
      l: isNaN(l) ? 0 : Math.min(1, Math.max(0, parseFloat(l.toFixed(3)))),
      c: isNaN(c) ? 0 : parseFloat(c.toFixed(3)),
      h: isNaN(h) ? 0 : Math.round(h),
    }
  } catch (error) {
    console.log("Error converting hex to OKLCH:", error)
    return { l: 0, c: 0, h: 0 }
  }
}

type Percentage = number
type Normalized = number
export function oklchToHex(
  l: Percentage | Normalized,
  c: number,
  h: number
): string {
  const normalizedL = l > 1 ? l / 100 : l
  return chroma.oklch(normalizedL, c, h).hex()
}

export function rgbToHex(r: number, g: number, b: number): string {
  return chroma.rgb(r, g, b).hex()
}
