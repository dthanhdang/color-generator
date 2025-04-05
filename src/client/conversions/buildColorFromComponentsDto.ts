import { type Color } from "chroma-js"
import chroma from "chroma-js"

import type { ColorSpace } from "#client/types"

function convert(value: number | null): number {
  return value === null ? NaN : value
}

type BuildColorFromDtoComponentsProps = {
  colorSpace: ColorSpace
  components: [number | null, number | null, number | null]
}

export function buildColorFromComponentsDto({
  colorSpace,
  components: [c1, c2, c3],
}: BuildColorFromDtoComponentsProps): Color {
  const nonNullComponents: [number, number, number] = [
    convert(c1),
    convert(c2),
    convert(c3),
  ]

  switch (colorSpace) {
    case "rgb":
      return chroma.rgb(...nonNullComponents)
    case "hsl":
      return chroma.hsl(...nonNullComponents)
    case "oklch":
      return chroma.oklch(...nonNullComponents)
  }
}
