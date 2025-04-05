import chroma from "chroma-js";

import { nanoid } from "nanoid";

import { type ColorPaletteItem } from "../../ColorPalette";
import { getColorName } from "#utils/getColorName.ts";
import { type Color } from "chroma-js";

type GetColorScaleProps = {
  baseColor: Color;
  count: number;
};

export function getColorScale({
  baseColor,
  count,
}: GetColorScaleProps): ColorPaletteItem[] {
  const lightColor = chroma(baseColor).brighten(2);
  const darkColor = chroma(baseColor).darken(1.5);
  return (
    chroma
      //.scale(["white", baseColor])
      .scale([lightColor, baseColor, darkColor])
      .mode("lch")
      .colors(count, undefined)
      .map((color, index) => {
        const weight = index === 0 ? 50 : index === 10 ? 950 : index * 100;
        //const colorObject = chroma(color)
        const colorNameResult = getColorName(color);

        console.log("getColorName result:", colorNameResult);
        return {
          id: nanoid(),
          color,
          weight,
          name: colorNameResult ? colorNameResult.name : "",
        };
      }) as ColorPaletteItem[]
  );
}
