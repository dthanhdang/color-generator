import { useMemo } from "react";
import chroma from "chroma-js";

import { nanoid } from "nanoid";

import { type ColorPaletteItem } from "../../ColorPalette";
import { getColorName } from "#utils/getColorName.ts";
import { type Color } from "chroma-js";
import type { FavoriteScalePalette } from "#client/types";
import { buildColorFromComponentsDto } from "#client/conversions";
import { getColorScale } from "./getColorScale.ts";

type ColorMode = "hex" | "hsl" | "oklch";
//type PaletteMode = "scale" | "harmony" | "image" | "random"

type UseInitialGeneratorStateProps = {
  favoritePalette: FavoriteScalePalette | undefined;
};

type UseInitialGeneratorStateReturn = {
  initialColor: Color;
  initialColorMode: ColorMode;
  initialPalette: ColorPaletteItem[];
};

export function useInitialGeneratorState({
  favoritePalette,
}: UseInitialGeneratorStateProps): UseInitialGeneratorStateReturn {
  return useMemo(() => {
    if (favoritePalette) {
      const {
        generator: { baseColor },
        generatedColors,
      } = favoritePalette;

      const initialPalette = generatedColors.colorsComponents.map(
        (components, index) => {
          const color = buildColorFromComponentsDto({
            colorSpace: generatedColors.colorSpace,
            components,
          });
          const colorNameResult = getColorName(color);

          return {
            color,
            id: nanoid(),
            name: colorNameResult?.name ?? "",
            weight: index === 0 ? 50 : index === 10 ? 950 : index * 100,
          };
        }
      );
      const initialColor = buildColorFromComponentsDto({
        colorSpace: baseColor.colorSpace,
        components: baseColor.colorComponents,
      });
      const initialColorMode =
        baseColor.colorSpace === "rgb" ? "hex" : baseColor.colorSpace;

      return {
        initialColor,
        initialColorMode,
        initialPalette,
      };
    } else {
      const initialColor = chroma("#3b82f6");

      return {
        initialColor,
        initialColorMode: "hex",
        initialPalette: getColorScale({ baseColor: initialColor, count: 11 }),
      };
    }
  }, [favoritePalette]);
}
