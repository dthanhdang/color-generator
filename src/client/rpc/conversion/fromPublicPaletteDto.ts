import type { PublicPalette, PublicPaletteDto } from "#client/types"
import { parseChromaPalette } from "#utils/parseChromaPalette.ts"

export function fromPublicPaletteDto({
  colors,
  createdAt,
  ...palette
}: PublicPaletteDto): PublicPalette {
  return {
    ...palette,
    createdAt: new Date(createdAt),
    colors: parseChromaPalette(colors),
  }
}
