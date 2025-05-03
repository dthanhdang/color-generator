import type { Color } from "chroma-js"

type BasicColorFormats = {
  hexCode: string
  rgbCode: string
  hslCode: string
  oklchCode: string
}

export type ExtendedColorFormats = BasicColorFormats & {
  cssVariables: string
  cssClasses: string
  tailwindConfig: string
}

export function getColorFormats(color: Color): BasicColorFormats
export function getColorFormats(
  color: Color,
  includeCss: false
): BasicColorFormats
export function getColorFormats(
  color: Color,
  includeCss: true
): ExtendedColorFormats

export function getColorFormats(
  color: Color,
  includeCss: boolean = false
): BasicColorFormats | ExtendedColorFormats {
  const hexCode = color.hex()
  const [r, g, b] = color.rgb()
  const rgbCode = `rgb(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)})`
  const [h, s, l] = color.hsl()
  const hslCode = `hsl(${Math.round(h) || 0}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`
  const [lOklch, cOklch, hOklch] = color.oklch()
  const oklchCode = `oklch(${Math.round(lOklch * 100)}% ${cOklch.toFixed(2)} ${Math.round(hOklch) || 0})`
  const basicFormats: BasicColorFormats = {
    hexCode,
    rgbCode,
    hslCode,
    oklchCode,
  }

  //Il faut ajouter les options CSS dans le render
  if (includeCss) {
    const cssVariables = `--color: ${hexCode};\n--color-rgb: ${r}, ${g}, ${b};\n--color-hsl: ${Math.round(h) || 0}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%;`

    const cssClasses = `.bg-color { background-color: ${hexCode}; }\n.text-color { color: ${hexCode}; }\n.border-color { border-color: ${hexCode}; }`

    const tailwindConfig = `'color': {\n  DEFAULT: '${hexCode}',\n  rgb: '${rgbCode}',\n  hsl: '${hslCode}'\n}`

    return {
      ...basicFormats,
      cssVariables,
      cssClasses,
      tailwindConfig,
    }
  }
  return basicFormats
}
