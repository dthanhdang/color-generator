import { apiClient } from "./apiClient.js"
import type { ColorPaletteItem } from "../../../ColorPalette.js"
import type { Color } from "chroma-js"
import { InferRequestType, InferResponseType } from "hono"
import { extractFavoritePaletteComponents } from "#client/conversions"
import type { ColorSpace } from "#client/types"
import type { HarmonyType } from "#utils/colorHarmony.js"

const route = apiClient["favorite-palette"].$post

export type AddUserFavoritePaletteProps = {
  generatedColors: ColorPaletteItem[]
  generator:
    | { type: "color_picker" }
    | {
        baseColor: Color
        colorSpace: ColorSpace
        harmonyType: HarmonyType
        type: "harmony"
      }
    | { baseColor: Color; colorSpace: ColorSpace; type: "scale" }
    | { type: "random" }
  userId: number
}

export type AddUserFavoritePaletteOutput = InferResponseType<typeof route, 200>

function convertGenerator(
  generator: AddUserFavoritePaletteProps["generator"]
): InferRequestType<typeof route>["json"]["generator"] {
  switch (generator.type) {
    case "harmony":
      return {
        baseColor: {
          colorComponents: extractFavoritePaletteComponents({
            color: generator.baseColor,
            colorSpace: generator.colorSpace,
          }),
          colorSpace: generator.colorSpace,
        },
        harmonyType: generator.harmonyType,
        type: generator.type,
      }
    case "scale":
      return {
        ...generator,
        baseColor: {
          colorComponents: extractFavoritePaletteComponents({
            color: generator.baseColor,
            colorSpace: generator.colorSpace,
          }),
          colorSpace: generator.colorSpace,
        },
        type: generator.type,
      }
    case "color_picker":
    case "random":
      return generator
  }
}

export async function addUserFavoritePalette({
  generator,
  generatedColors,
  userId,
}: AddUserFavoritePaletteProps): Promise<AddUserFavoritePaletteOutput> {
  try {
    const colorSpace =
      generator.type === "random" || generator.type === "color_picker"
        ? "rgb"
        : generator.colorSpace

    const response = await route({
      json: {
        generator: convertGenerator(generator),
        generatedColors: {
          colorsComponents: generatedColors.map(({ color }) =>
            extractFavoritePaletteComponents({
              color,
              colorSpace,
            })
          ),
          colorSpace,
        },
        userId,
      },
    })

    return await response.json()
  } catch (error) {
    throw new Error("An unexpected error occured while saving the palette", {
      cause: error,
    })
  }
}
