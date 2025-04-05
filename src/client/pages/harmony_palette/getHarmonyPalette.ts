import chroma from "chroma-js";

import { nanoid } from "nanoid";

import { type ColorPaletteItem } from "../../ColorPalette";
import { getHarmonyColor, HarmonyType } from "#utils/colorHarmony.ts";
import { getColorName } from "#utils/getColorName.ts";
import { type Color } from "chroma-js";

export function getHarmonyPalette(
  baseColor: Color,
  harmonyType: HarmonyType,
  count: number
): ColorPaletteItem[] {
  return getHarmonyColor(baseColor, harmonyType, count).map((color, index) => {
    const colorObject = chroma(color);
    const colorNameResult = getColorName(colorObject);

    return {
      id: nanoid(),
      color,
      weight: index * 100 + 100,
      name: colorNameResult ? colorNameResult.name : "",
    };
  });
}
