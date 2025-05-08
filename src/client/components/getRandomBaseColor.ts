import chroma, { Color } from "chroma-js"

export function getRandomBaseColor(): Color {
  // Générer une teinte aléatoire (0-360)
  const hue = Math.random() * 360

  // Définir une saturation dans une plage intermédiaire (ni trop grise, ni trop vive)
  const saturation = 0.6 + Math.random() * 0.2 // Entre 0.6 et 0.8

  // Définir une luminosité moyenne (ni trop claire, ni trop foncée)
  const lightness = 0.4 + Math.random() * 0.2 // Entre 0.4 et 0.6

  return chroma.hsl(hue, saturation, lightness) as Color
}
