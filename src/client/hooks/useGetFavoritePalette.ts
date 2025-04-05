import type {
  FavoriteHarmonyPalette,
  FavoritePalette,
  FavoriteScalePalette,
  RegisteredUser,
} from "#client/types";
import { useMemo } from "react";

type UseGetFavoritePaletteProps<Type extends string> = {
  generatorType: Type;
  paletteId: number | undefined;
  user: RegisteredUser | undefined;
};

export function useGetFavoritePalette({
  generatorType,
  paletteId,
  user,
}: UseGetFavoritePaletteProps<"harmony">): FavoriteHarmonyPalette | undefined;

export function useGetFavoritePalette({
  generatorType,
  paletteId,
  user,
}: UseGetFavoritePaletteProps<"scale">): FavoriteScalePalette | undefined;

export function useGetFavoritePalette({
  generatorType,
  paletteId,
  user,
}: UseGetFavoritePaletteProps<"harmony" | "scale">):
  | FavoritePalette
  | undefined {
  return useMemo(() => {
    if (user === undefined || paletteId === undefined) return undefined;

    const palette = user.favoritePalettes.find((item) => item.id === paletteId);

    return palette?.generator.type === generatorType ? palette : undefined;
  }, [generatorType, user, paletteId]);
}
