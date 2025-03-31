import chroma, { type Color } from "chroma-js"

export type HarmonyType =
  | "monochromatic"
  | "complementary"
  | "split-complementary"
  | "triadic"
  | "analogous"
  | "tetradic"

export function getMonochromatic(baseColor: Color, count: number): Color[] {
  return chroma
    .scale([
      chroma(baseColor).brighten(1),
      baseColor,

      chroma(baseColor).darken(1),
    ])
    .mode("lch")
    .colors(count, undefined)
}

export function getComplementary(baseColor: Color, count: number): Color[] {
  const baseChroma = chroma(baseColor)
  const complement = baseChroma.set("hsl.h", "+180")

  // Génère des variations entre la couleur de base et sa complémentaire
  const firstHalf = chroma
    .scale([baseColor, baseChroma.brighten(1)])
    .mode("lch")
    .colors(count / 2, undefined)
  const secondHalf = chroma
    .scale([complement, complement.brighten(1)])
    .mode("lch")
    .colors(count / 2, undefined)

  return [...firstHalf, ...secondHalf]
}

export function getAnalogous(baseColor: Color, count: number): Color[] {
  const [h, s, l] = chroma(baseColor).hsl()
  const colors: Color[] = []
  const angle = 30
  const startAngle = (h - (angle * (count - 1)) / 2 + 360) % 360
  for (let i = 0; i < count; i++) {
    const newH = (startAngle + angle * i) % 360
    colors.push(chroma.hsl(newH, s, l))
  }
  return colors
}

export function getTriadic(baseColor: Color, count: number = 3): Color[] {
  const color = chroma(baseColor)
  const [h, s, l] = color.hsl()

  const h1 = h
  const h2 = (h + 120) % 360
  const h3 = (h + 240) % 360

  const color1 = chroma.hsl(h1, s, l)
  const color2 = chroma.hsl(h2, s, l)
  const color3 = chroma.hsl(h3, s, l)

  const perGroup = Math.ceil(count / 3)

  const group1 = chroma
    .scale([color1, "white"])
    .mode("lch")
    .colors(perGroup, undefined)
  const group2 = chroma
    .scale([color2, "white"])
    .mode("lch")
    .colors(perGroup, undefined)
  const group3 = chroma
    .scale([color3, "white"])
    .mode("lch")
    .colors(perGroup, undefined)

  return [...group1, ...group2, ...group3].slice(0, count)
}

export function getTetradic(baseColor: Color, count: number = 8): Color[] {
  const color = chroma(baseColor)
  const [h, s, l] = color.hsl()

  const h1 = h
  const h2 = (h + 90) % 360
  const h3 = (h + 180) % 360
  const h4 = (h + 270) % 360

  const color1 = chroma.hsl(h1, s, l)
  const color2 = chroma.hsl(h2, s, l)
  const color3 = chroma.hsl(h3, s, l)
  const color4 = chroma.hsl(h4, s, l)

  const perGroup = Math.ceil(count / 4)

  // Au lieu d'utiliser white, on ajuste la luminosité
  const group1 = chroma
    .scale([color1.darken(1), color1, color1.brighten(1)])
    .mode("lch")
    .colors(perGroup, undefined)
  const group2 = chroma
    .scale([color2.darken(1), color2, color2.brighten(1)])
    .mode("lch")
    .colors(perGroup, undefined)
  const group3 = chroma
    .scale([color3.darken(1), color3, color3.brighten(1)])
    .mode("lch")
    .colors(perGroup, undefined)
  const group4 = chroma
    .scale([color4.darken(1), color4, color4.brighten(1)])
    .mode("lch")
    .colors(perGroup, undefined)

  return [...group1, ...group2, ...group3, ...group4].slice(0, count)
}

export function getSplitComplementary(
  baseColor: Color,
  count: number
): Color[] {
  const color = chroma(baseColor)
  const hue = color.hsl()[0]
  const splitOffset = 30
  const hues = [hue, (hue + splitOffset) % 360, (hue - splitOffset + 360) % 360]
  const splitPalette = []
  for (let i = 0; i < count; i++) {
    const adjustedHue = hues[i % hues.length]
    const lightness = 50 + i * 10
    const newColor = chroma.hsl(adjustedHue, color.hsl()[1], lightness / 100)
    splitPalette.push(newColor)
  }
  return splitPalette
}

export function getHarmonyColor(
  baseColor: Color,
  harmonyType: HarmonyType,
  count: number
): Color[] {
  switch (harmonyType) {
    case "monochromatic":
      return getMonochromatic(baseColor, count)
    case "complementary":
      return getComplementary(baseColor, count)
    case "split-complementary":
      return getSplitComplementary(baseColor, count)
    case "analogous":
      return getAnalogous(baseColor, count)
    case "triadic":
      return getTriadic(baseColor, (count = 3))
    case "tetradic":
      return getTetradic(baseColor, (count = 4))
    default:
      return getMonochromatic(baseColor, count)
  }
}
