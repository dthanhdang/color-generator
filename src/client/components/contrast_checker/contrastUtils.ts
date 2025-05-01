import chroma from "chroma-js"
import { ContrastLevel, ContrastResult } from "./contrastTypes"

/**
 * Calcule le niveau de contraste selon les critères WCAG
 */
export const getContrastLevel = (
  ratio: number,
  isLargeText: boolean
): ContrastLevel => {
  if (isLargeText) {
    if (ratio >= 4.5) return "AAA"
    if (ratio >= 3) return "AA"
    return "FAIL"
  } else {
    if (ratio >= 7) return "AAA"
    if (ratio >= 4.5) return "AA"
    return "FAIL"
  }
}

/**
 * Calcule le ratio de contraste et les niveaux WCAG
 */
export const calculateContrastResult = (
  backgroundColor: chroma.Color,
  textColor: chroma.Color
): ContrastResult => {
  const ratio = chroma.contrast(backgroundColor, textColor)
  const normalTextLevel = getContrastLevel(ratio, false)
  const largeTextLevel = getContrastLevel(ratio, true)

  return {
    ratio,
    normalText: normalTextLevel,
    largeText: largeTextLevel,
    isAccessible: normalTextLevel !== "FAIL" || largeTextLevel !== "FAIL",
  }
}

/**
 * Formate le ratio de contraste pour l'affichage
 */
export const formatContrastRatio = (ratio: number): string => {
  return `${ratio.toFixed(1)}:1`
}

/**
 * Vérifie si une chaîne est une couleur valide
 */
export const isValidColor = (color: string): boolean => {
  try {
    chroma(color)
    return true
  } catch {
    return false
  }
}

/**
 * Convertit une couleur au format hexadécimal
 */
export const toHex = (color: chroma.Color): string => {
  return color.hex().toUpperCase()
}
