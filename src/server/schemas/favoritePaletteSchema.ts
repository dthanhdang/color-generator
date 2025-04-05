import { integerSchema } from "@meow-meow-dev/server-utilities/validation"
import * as v from "valibot"
import {
  hslColorComponentsSchema,
  rgbColorComponentsSchema,
} from "./colorSchema.js"

const hslColorSpaceSchema = v.literal("hsl")

const oklchColorSpaceSchema = v.literal("oklch")

const rgbColorSpaceSchema = v.literal("rgb")

export const colorSpaceSchema = v.union([
  hslColorSpaceSchema,
  oklchColorSpaceSchema,
  rgbColorSpaceSchema,
])

const generatedColorsSchema = v.union([
  v.strictObject({
    colorsComponents: v.array(hslColorComponentsSchema),
    colorSpace: hslColorSpaceSchema,
  }),
  v.strictObject({
    colorsComponents: v.array(rgbColorComponentsSchema),
    colorSpace: oklchColorSpaceSchema,
  }),
  v.strictObject({
    colorsComponents: v.array(rgbColorComponentsSchema),
    colorSpace: rgbColorSpaceSchema,
  }),
])

const baseColorSchema = v.union([
  v.strictObject({
    colorComponents: hslColorComponentsSchema,
    colorSpace: hslColorSpaceSchema,
  }),
  v.strictObject({
    colorComponents: rgbColorComponentsSchema,
    colorSpace: oklchColorSpaceSchema,
  }),
  v.strictObject({
    colorComponents: rgbColorComponentsSchema,
    colorSpace: rgbColorSpaceSchema,
  }),
])

const harmonyTypeSchema = v.picklist([
  "monochromatic",
  "complementary",
  "split-complementary",
  "triadic",
  "analogous",
  "tetradic",
])

const commonPaletteFieldsSchema = v.strictObject({
  generatedColors: generatedColorsSchema,
  id: integerSchema,
  userId: integerSchema,
})

export const favoriteHarmonyPaletteGeneratorSchema = v.strictObject({
  baseColor: baseColorSchema,
  harmonyType: harmonyTypeSchema,
  type: v.literal("harmony"),
})

export const favoriteHarmonyPaletteSchema = v.strictObject({
  ...commonPaletteFieldsSchema.entries,
  generator: favoriteHarmonyPaletteGeneratorSchema,
})

export const favoriteColorPickerPaletteGeneratorSchema = v.strictObject({
  type: v.literal("color_picker"),
})

export const favoriteColorPickerPaletteSchema = v.strictObject({
  ...commonPaletteFieldsSchema.entries,
  generator: favoriteColorPickerPaletteGeneratorSchema,
})

export const favoriteRandomPaletteGeneratorSchema = v.strictObject({
  type: v.literal("random"),
})

export const favoriteRandomPaletteSchema = v.strictObject({
  ...commonPaletteFieldsSchema.entries,
  generator: favoriteRandomPaletteGeneratorSchema,
})

export const favoriteScalePaletteGeneratorSchema = v.strictObject({
  baseColor: baseColorSchema,
  type: v.literal("scale"),
})

export const favoriteScalePaletteSchema = v.strictObject({
  ...commonPaletteFieldsSchema.entries,
  generator: favoriteScalePaletteGeneratorSchema,
})

export const favoritePaletteGeneratorSchema = v.variant("type", [
  favoriteColorPickerPaletteGeneratorSchema,
  favoriteHarmonyPaletteGeneratorSchema,
  favoriteRandomPaletteGeneratorSchema,
  favoriteScalePaletteGeneratorSchema,
])

export const favoritePaletteSchema = v.strictObject({
  ...commonPaletteFieldsSchema.entries,
  generator: favoritePaletteGeneratorSchema,
})
