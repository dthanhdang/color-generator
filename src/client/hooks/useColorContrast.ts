import { useState, useCallback, useMemo } from "react"
import chroma from "chroma-js"

//import { ContrastResult, ColorPair } from './contrastTypes';
import { calculateContrastResult } from "#components/contrast_checker/contrastUtils.ts"
import {
  ColorPair,
  ContrastResult,
} from "#components/contrast_checker/contrastTypes.ts"

export const useColorContrast = (
  initialBackgroundColor: string = "#2F61A6",
  initialTextColor: string = "#FFFFFF"
) => {
  const [backgroundColor, setBackgroundColor] = useState<chroma.Color>(
    chroma(initialBackgroundColor)
  )
  const [textColor, setTextColor] = useState<chroma.Color>(
    chroma(initialTextColor)
  )

  const updateBackgroundColor = useCallback((color: string) => {
    try {
      setBackgroundColor(chroma(color))
    } catch {
      // Garde la couleur existante si la nouvelle est invalide
    }
  }, [])

  const updateTextColor = useCallback((color: string) => {
    try {
      setTextColor(chroma(color))
    } catch {
      // Garde la couleur existante si la nouvelle est invalide
    }
  }, [])

  const swapColors = useCallback(() => {
    const bgColor = backgroundColor
    const txtColor = textColor
    setBackgroundColor(txtColor)
    setTextColor(bgColor)
  }, [backgroundColor, textColor])

  const contrastResult: ContrastResult = useMemo(() => {
    return calculateContrastResult(backgroundColor, textColor)
  }, [backgroundColor, textColor])

  const colorPair: ColorPair = useMemo(() => {
    return {
      backgroundColor,
      textColor,
    }
  }, [backgroundColor, textColor])

  return {
    backgroundColor,
    textColor,
    updateBackgroundColor,
    updateTextColor,
    swapColors,
    contrastResult,
    colorPair,
  }
}
