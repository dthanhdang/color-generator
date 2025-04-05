import type { RegisteredUser } from "#client/types";
import type { JSX } from "react";
import { Stack } from "@mantine/core";
import { Palette } from "./Palette.jsx";

type FavoritePalettesPageProps = {
  user: RegisteredUser;
};

export function FavoritePalettesPage({
  user,
}: FavoritePalettesPageProps): JSX.Element {
  return (
    <main>
      {user.favoritePalettes.length === 0 ? (
        "No favorite palette"
      ) : (
        <Stack>
          {user.favoritePalettes.map((palette) => (
            <Palette key={palette.id} palette={palette} />
          ))}
        </Stack>
      )}
    </main>
  );
}
