import type { ColorPaletteItem } from "./ColorPalette.tsx"

export const allSwatchesRoles = ["primary", "secondary", "tertiary"] as const

export type SwatchRole = (typeof allSwatchesRoles)[number]
export type SwatchIdByRole = Record<SwatchRole, ColorPaletteItem>

export const swatchRoleLabel = {
  primary: "Primary",
  secondary: "Secondary",
  tertiary: "Tertiary",
}
