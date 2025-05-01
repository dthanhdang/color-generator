import chroma from "chroma-js"

export type ContrastLevel = "AAA" | "AA" | "FAIL"

export interface ContrastResult {
  ratio: number
  normalText: ContrastLevel
  largeText: ContrastLevel
  isAccessible: boolean
}

export interface ColorPair {
  backgroundColor: chroma.Color
  textColor: chroma.Color
}

{
  /*import chroma from "chroma-js"

export type ColorPair = {
  textColor: chroma.Color
  bgColor: chroma.Color
}

export type ContrastResult = {
  ratio: number
  smallText: boolean
  largeText: boolean
  rating: number
  status: "poor" | "good" | "excellent"
}

export const CONTRAST_THRESHOLDS = {
  largeText: 3.0,
  smallText: 4.5,
  good: 7.0,
  excellent: 10.0,
}

export const DEFAULT_COLORS = {
  text: chroma("#254926"),
  background: chroma("#ACC8E5"),
}

export const COLOR_SWATCHES = {
  text: ["#254926", "#000000", "#333333", "#555555", "#777777"],
  background: ["#ACC8E5", "#FFFFFF", "#F0F0F0", "#E0E0E0", "#D0D0D0"],
}

export const RESULT_COLORS = {
  poor: "#F8D7DA",
  good: "#D4EDDA",
  excellent: "#C3E6CB",
}*/
}
