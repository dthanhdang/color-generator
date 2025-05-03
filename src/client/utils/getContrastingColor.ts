import type { Color } from "chroma-js"

type Options = { darkColor?: string; lightColor?: string; revert?: boolean }

export function getContrastingColor(
  color: Color,
  { darkColor = "#000", lightColor = "#fff", revert = false }: Options = {}
): string {
  let isLightColor = color.luminance() > 0.5
  if (revert) isLightColor = !isLightColor

  return isLightColor ? darkColor : lightColor
}
