import type { Color } from "chroma-js"

import type { ColorSpace } from "#client/types"

type ExtractFavoritePaletteComponentsProps = {
  color: Color
  colorSpace: ColorSpace
}

function fromColor({
  color,
  colorSpace,
}: ExtractFavoritePaletteComponentsProps): [number, number, number] {
  switch (colorSpace) {
    case "hsl":
      return color.hsl()
    case "oklch":
      return color.oklch()
    case "rgb":
      return color.rgb(false)
  }
}

function nanToNull(value: number): number | null {
  return Number.isNaN(value) ? null : value
}

export function extractFavoritePaletteComponents(
  props: ExtractFavoritePaletteComponentsProps
): [number | null, number | null, number | null] {
  const [c1, c2, c3] = fromColor(props)

  return [nanToNull(c1), nanToNull(c2), nanToNull(c3)]
}
