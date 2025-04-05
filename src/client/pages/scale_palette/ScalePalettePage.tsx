//import { Form } from "./Form"

import { useState } from "react";
import chroma, { type Color } from "chroma-js";
import { Button, Select } from "@mantine/core";

import { ColorPalette } from "../../ColorPalette";
import { Form } from "../../Form";
import { FormHsl } from "../../components/FormHsl";
import { FormOklch } from "../../components/FormOklch";
import { PageStyle } from "#components/PageStyle.tsx";

import type { RegisteredUser } from "#client/types";
import { useGetFavoritePalette } from "#client/hooks";
import { ToggleFavoritePaletteButton } from "#components/toggle_favorite_palette_button/ToggleFavoritePaletteButton.tsx";
import { useInitialGeneratorState } from "./useInitialGeneratorState.ts";
import { getColorScale } from "./getColorScale.ts";

type ScalePaletteGeneratorProps = {
  paletteId: number | undefined;
  user: RegisteredUser | undefined;
};

export function ScalePaletteGenerator({
  paletteId,
  user,
}: ScalePaletteGeneratorProps) {
  const favoritePalette = useGetFavoritePalette({
    generatorType: "scale",
    paletteId,
    user,
  });
  const { initialColor, initialColorMode, initialPalette } =
    useInitialGeneratorState({
      favoritePalette,
    });

  const [paletteWasModified, setPaletteWasModified] = useState(false);

  const [color, setColor] = useState(initialColor);
  const [colorMode, setColorMode] = useState(initialColorMode);

  const [palette, setPalette] = useState(initialPalette);

  const handleColorSubmit = (newColor: Color) => {
    //const newPalette = getColorScale(newColor, 10)
    if (chroma.valid(newColor)) {
      setColor(newColor);
      //if (paletteMode === "scale") {
      setPalette(getColorScale({ baseColor: newColor, count: 11 }));
      setPaletteWasModified(true);
    } else {
      console.error(`Invalid color : ${newColor}`);
    }
  };

  const handleModeChange = (value: string | null) => {
    if (value === "hex" || value === "hsl" || value === "oklch")
      setColorMode(value);
  };

  function handleGenerateRandomBaseColor(): void {
    handleColorSubmit(chroma.random());
  }

  return (
    <PageStyle titleHighlight="Scale Palette">
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
      <div className="mt-4 relative">
        <Button
          className="absolute top-0 right-0"
          onClick={handleGenerateRandomBaseColor}
          variant="subtle"
        >
          Random color
        </Button>

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
          fromRoute="/scale-palette"
          initialFavoritePaletteId={paletteWasModified ? undefined : paletteId}
          generator={{
            baseColor: color,
            colorSpace: colorMode === "hex" ? "rgb" : colorMode,
            type: "scale",
          }}
          palette={palette}
          userId={user?.id}
        />

        <ColorPalette palette={palette} />
      </div>
    </PageStyle>
  );
}
