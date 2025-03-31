import chroma from "chroma-js"
import names from "./names.json"

const entries = names.map(([hex, name]) => ({
  color: chroma(hex),
  name,
}))

export function getColorName(
  color: chroma.Color
):
  | undefined
  | { color: chroma.Color; exact: true; name: string }
  | { color: chroma.Color; distance: number; exact: false; name: string } {
  const [r, g, b] = color.rgb()
  const [h, s, l] = color.hsl()
  let matchingEntry: undefined | (typeof entries)[number]
  let distance = 0

  for (const entry of entries) {
    const { color: entryColor, name: entryName } = entry

    if (color.hex().toLowerCase() == entryColor.hex("rgb").toLowerCase())
      return { color: entryColor, name: entryName, exact: true }

    const [r2, g2, b2] = chroma(entryColor).rgb()
    const [h2, s2, l2] = chroma(entryColor).hsl()

    const ndf1 =
      Math.pow((r - r2) / 255, 2) +
      Math.pow((g - g2) / 255, 2) +
      Math.pow((b - b2) / 255, 2)
    const ndf2 =
      Math.pow((h || 0) / 360 - (h2 || 0) / 360, 2) +
      Math.pow(s - s2, 2) +
      Math.pow(l - l2, 2)
    const ndf = ndf1 + ndf2 * 2
    if (matchingEntry === undefined || ndf < distance) {
      distance = ndf
      matchingEntry = entry
    }
  }

  return matchingEntry
    ? {
        color: matchingEntry.color,
        distance,
        exact: false,
        name: matchingEntry.name,
      }
    : undefined
}
