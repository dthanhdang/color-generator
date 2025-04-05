import { useState } from "react";
import chroma from "chroma-js";

import { Select } from "@mantine/core";

import { nanoid } from "nanoid";

import { ColorPalette, type ColorPaletteItem } from "../../ColorPalette";
import { getHarmonyColor, HarmonyType } from "#utils/colorHarmony.ts";
import { HarmonySelector } from "../../components/HarmonySelector";
import { getColorName } from "#utils/getColorName.ts";
import { Form } from "../../Form";
import { FormOklch } from "../../components/FormOklch";
import { FormHsl } from "../../components/FormHsl";
import { type Color } from "chroma-js";
import { PageStyle } from "#components/PageStyle.tsx";
import type { RegisteredUser } from "#client/types";
import { useGetFavoritePalette } from "#client/hooks";
import { ToggleFavoritePaletteButton } from "#components/toggle_favorite_palette_button/ToggleFavoritePaletteButton.tsx";
import { useInitialGeneratorState } from "./useInitialGeneratorState.ts";

function getHarmonyPalette(
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

type HarmonyPaletteProps = {
  paletteId: number | undefined;
  user: RegisteredUser | undefined;
};

export function HarmonyPalette({ paletteId, user }: HarmonyPaletteProps) {
  const favoritePalette = useGetFavoritePalette({
    generatorType: "harmony",
    paletteId,
    user,
  });
  const { initialColor, initialColorMode, initialHarmonyType, initialPalette } =
    useInitialGeneratorState({
      favoritePalette,
    });

  const [paletteWasModified, setPaletteWasModified] = useState(false);
  const [harmonyType, setHarmonyType] =
    useState<HarmonyType>(initialHarmonyType);
  const [colorMode, setColorMode] = useState(initialColorMode);
  const [palette, setPalette] = useState(initialPalette);
  const [color, setColor] = useState(initialColor);

  const handleColorSubmit = (newColor: Color) => {
    if (chroma.valid(newColor)) {
      setColor(newColor);
      setPalette(getHarmonyPalette(newColor, harmonyType, 5));
      setPaletteWasModified(true);
    } else {
      console.error(`Invalid color: ${newColor}`);
    }
  };

  const handleModeChange = (value: string | null) => {
    if (value === "hex" || value === "hsl" || value === "oklch")
      setColorMode(value);
  };

  const handleHarmonyChange = (value: HarmonyType) => {
    setHarmonyType(value);

    setPalette(getHarmonyPalette(color, value, 5));
    setPaletteWasModified(true);
  };

  return (
    <PageStyle titleHighlight="Harmony Palette">
      {" "}
      <div className="mb-4">
        <Select
          data={[
            { value: "hex", label: "HEX" },
            { value: "hsl", label: "HSL" },
            { value: "oklch", label: "OKLCH" },
          ]}
          value={colorMode}
          onChange={handleModeChange}
        />
      </div>
      <div className="mt-4">
        <HarmonySelector value={harmonyType} onChange={handleHarmonyChange} />
      </div>
      <div className="mt-4">
        {" "}
        {colorMode === "hex" && (
          <Form onSubmit={handleColorSubmit} initialColor={color} />
        )}
        {colorMode === "hsl" && (
          <FormHsl color={color} onChange={handleColorSubmit} />
        )}
        {colorMode === "oklch" && (
          <FormOklch initialColor={color} onSubmit={handleColorSubmit} />
        )}
      </div>
      <div className="mt-8 relative">
        <ToggleFavoritePaletteButton
          className="absolute top-0 right-0"
          fromRoute="/harmony-palette"
          initialFavoritePaletteId={paletteWasModified ? undefined : paletteId}
          generator={{
            baseColor: color,
            colorSpace: colorMode === "hex" ? "rgb" : colorMode,
            harmonyType,
            type: "harmony",
          }}
          palette={palette}
          userId={user?.id}
        />

        <h2 className="text-xl font-bold mb-4">{harmonyType}</h2>
        <ColorPalette palette={palette} />
      </div>
    </PageStyle>
  );
}
