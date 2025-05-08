import chroma, { type Color } from "chroma-js"

export type HarmonyType =
  | "monochromatic"
  | "complementary"
  | "split-complementary"
  | "triadic"
  | "analogous"
  | "tetradic"

export function getMonochromatic(baseColor: Color, count: number): Color[] {
  return chroma
    .scale([
      chroma(baseColor).brighten(1),
      baseColor,

      chroma(baseColor).darken(1),
    ])
    .mode("lch")
    .colors(count, undefined)
}

function getComplementary(baseColor: Color, count: number = 5): Color[] {
  const color = chroma(baseColor)
  const [h, s, l] = color.hsl()

  // Couleur complémentaire (opposée sur le cercle chromatique)
  const complementaryHue = (h + 180) % 360

  // Si count est pair, diviser également entre les deux couleurs
  // Si count est impair, la couleur de base aura une couleur de plus
  const firstGroupCount = Math.ceil(count / 2)
  const secondGroupCount = count - firstGroupCount

  const result: Color[] = []

  // Générer des variations autour de la couleur de base
  if (firstGroupCount > 0) {
    const lightnessStep = 0.15
    for (let i = 0; i < firstGroupCount; i++) {
      const adjustedLightness = Math.max(
        0.25,
        Math.min(
          0.75,
          l + (i - Math.floor(firstGroupCount / 2)) * lightnessStep
        )
      )
      result.push(chroma.hsl(h, s, adjustedLightness) as Color)
    }
  }

  // Générer des variations autour de la couleur complémentaire
  if (secondGroupCount > 0) {
    const lightnessStep = 0.15
    for (let i = 0; i < secondGroupCount; i++) {
      const adjustedLightness = Math.max(
        0.25,
        Math.min(
          0.75,
          l + (i - Math.floor(secondGroupCount / 2)) * lightnessStep
        )
      )
      result.push(chroma.hsl(complementaryHue, s, adjustedLightness) as Color)
    }
  }

  return result
}

export function getAnalogous(baseColor: Color, count: number): Color[] {
  const [h, s, l] = chroma(baseColor).hsl()
  const colors: Color[] = []
  const angle = 30
  const startAngle = (h - (angle * (count - 1)) / 2 + 360) % 360
  for (let i = 0; i < count; i++) {
    const newH = (startAngle + angle * i) % 360
    colors.push(chroma.hsl(newH, s, l))
  }
  return colors
}

export function getTriadic(baseColor: Color, count: number = 3): Color[] {
  const color = chroma(baseColor)
  const [h, s, l] = color.hsl()

  // S'assurer que les valeurs HSL sont définies
  if (h === undefined || s === undefined || l === undefined) return []

  // Calculer les angles triadiques
  const h1 = h
  const h2 = (h + 120) % 360
  const h3 = (h + 240) % 360

  // Créer les trois couleurs principales de la triade
  const color1 = chroma.hsl(h1, s, l)
  const color2 = chroma.hsl(h2, s, l)
  const color3 = chroma.hsl(h3, s, l)

  // Si count <= 3, retourner simplement les couleurs principales
  if (count <= 3) {
    return [color1, color2, color3].slice(0, count)
  }

  // Pour count > 3, calculer combien de variations additionnelles par groupe
  const remainingCount = count - 3
  const extraPerGroup = Math.floor(remainingCount / 3)
  const remainder = remainingCount % 3

  // Créer les groupes avec les variations de luminosité
  const createVariations = (baseColor: Color, num: number): Color[] => {
    if (num === 0) return []
    return chroma
      .scale([baseColor, chroma.mix(baseColor, "white", 0.8, "lch")])
      .mode("lch")
      .colors(num + 1, undefined) // +1 car on enlèvera la couleur de base
      .slice(1) // Enlever la couleur de base pour éviter les doublons
  }

  // Générer les variations pour chaque couleur
  const variations1 = createVariations(
    color1,
    extraPerGroup + (remainder > 0 ? 1 : 0)
  )
  const variations2 = createVariations(
    color2,
    extraPerGroup + (remainder > 1 ? 1 : 0)
  )
  const variations3 = createVariations(
    color3,
    extraPerGroup + (remainder > 2 ? 1 : 0)
  )

  // Assembler la palette finale en commençant par les trois couleurs principales
  // puis en ajoutant les variations de manière équilibrée
  return [
    color1,
    color2,
    color3,
    ...variations1,
    ...variations2,
    ...variations3,
  ].slice(0, count)
}

export function getTetradic(baseColor: Color, count: number = 8): Color[] {
  const color = chroma(baseColor)
  const [h, s, l] = color.hsl()

  // Teintes tétradiques (à 90° d'intervalle)
  const hues = [h, (h + 90) % 360, (h + 180) % 360, (h + 270) % 360]

  // Nombre de couleurs par groupe
  const perGroup = Math.ceil(count / 4)

  // Plages ajustées pour la luminosité et la saturation
  const minLightness = 0.25
  const maxLightness = 0.55
  const minSaturation = 0.55
  const maxSaturation = 0.85

  // Fonction pour créer des couleurs avec des saturations et luminosités variées mais contrôlées
  const createColorVariant = (
    hue: number,
    saturationOffset: number,
    lightnessOffset: number
  ): chroma.Color => {
    // Calculer la saturation et la luminosité pour cette variante
    const adjustedSaturation = Math.min(
      maxSaturation,
      Math.max(minSaturation, s + saturationOffset)
    )
    const adjustedLightness = Math.min(
      maxLightness,
      Math.max(minLightness, l + lightnessOffset)
    )

    return chroma.hsl(hue, adjustedSaturation, adjustedLightness)
  }

  // Génère des variantes pour chaque teinte de base
  const generateGroup = (hue: number): Color[] => {
    const variants: chroma.Color[] = []

    // Créer des variantes avec différentes combinaisons de saturation et luminosité
    for (let i = 0; i < perGroup; i++) {
      // Répartir les offsets de manière stratégique
      const satOffset = i % 2 === 0 ? -0.1 : 0.1
      const lightOffset = i % 3 === 0 ? -0.1 : i % 3 === 1 ? 0 : 0.1

      variants.push(createColorVariant(hue, satOffset, lightOffset))
    }

    return variants as Color[]
  }

  // Générer toutes les couleurs et les limiter au nombre demandé
  const colors = hues.flatMap(generateGroup).slice(0, count)
  return colors
}

export function getSplitComplementary(
  baseColor: Color,
  count: number
): Color[] {
  const color = chroma(baseColor)
  let [hue, sat, light] = color.hsl()

  // Protection contre les valeurs undefined
  if (hue === undefined) hue = 0
  if (sat === undefined) sat = 0.5
  if (light === undefined) light = 0.5

  // Amélioration: ajouter plus de variation dans les angles
  // pour les couleurs complémentaires
  const angle1 = Math.floor(Math.random() * 20) + 140 // entre 140° et 160°
  const angle2 = Math.floor(Math.random() * 20) + 200 // entre 200° et 220°

  // Calcul des teintes principales avec plus de variation
  const mainHues = [hue, (hue + angle1) % 360, (hue + angle2) % 360]

  const splitPalette: Color[] = []

  // Amélioration: variation de saturation et luminosité pour chaque couleur principale
  for (let i = 0; i < mainHues.length; i++) {
    // Variation de saturation selon la position
    const satVariation = Math.min(1, sat * (0.85 + i * 0.1))

    // Variation de luminosité selon la position
    // Couleur principale reste proche de l'original, les autres varient plus
    const lightVariation = i === 0 ? light : light * (0.7 + Math.random() * 0.5)

    splitPalette.push(chroma.hsl(mainHues[i], satVariation, lightVariation))
  }

  // Ajout de couleur neutre améliorée
  // Choix aléatoire entre une couleur claire ou foncée pour plus de contraste
  const neutralType = Math.random() > 0.5
  const neutral = neutralType
    ? chroma.mix(color, "#ffffff", 0.85, "lab") // claire
    : chroma.mix(color, "#333333", 0.7, "lab") // foncée

  splitPalette.push(neutral)

  // Si on demande plus de couleurs que les 4 de base
  if (count > 4) {
    // Amélioration: génération de couleurs plus diversifiées
    let counter = 4

    while (counter < count) {
      // Choisir une teinte de base aléatoirement
      const baseHueIndex = counter % mainHues.length
      const baseHue = mainHues[baseHueIndex]

      // Créer des variations plus prononcées
      let newHue = (baseHue + (Math.random() * 30 - 15)) % 360 // variation de ±15°
      let newSat = Math.min(1, Math.max(0.1, sat * (0.6 + Math.random() * 0.8))) // plus de variation
      let newLight = Math.min(
        0.9,
        Math.max(0.1, light * (0.5 + Math.random() * 1))
      ) // plus de variation

      // Éviter que les couleurs soient trop similaires aux précédentes
      if (counter > 4) {
        // Vérifier la distance avec les couleurs existantes
        const minDistance = 0.15 // distance minimale en LAB
        let tooClose = true
        let attempts = 0

        while (tooClose && attempts < 10) {
          tooClose = false
          const testColor = chroma.hsl(newHue, newSat, newLight)

          for (const existingColor of splitPalette) {
            const distance = chroma.distance(testColor, existingColor, "lab")
            if (distance < minDistance) {
              tooClose = true
              newHue = (newHue + 30) % 360 // décaler la teinte
              newSat = Math.min(
                1,
                Math.max(0.1, newSat + (Math.random() * 0.4 - 0.2))
              )
              newLight = Math.min(
                0.9,
                Math.max(0.1, newLight + (Math.random() * 0.4 - 0.2))
              )
              break
            }
          }
          attempts++
        }
      }

      const variationColor = chroma.hsl(newHue, newSat, newLight)
      splitPalette.push(variationColor)

      counter++
    }
  }

  // Si on demande moins de couleurs que les 4 de base, on tronque
  return splitPalette.slice(0, count)
}

export function getHarmonyColor(
  baseColor: Color,
  harmonyType: HarmonyType,
  count: number
): Color[] {
  switch (harmonyType) {
    case "monochromatic":
      return getMonochromatic(baseColor, count)
    case "complementary":
      return getComplementary(baseColor, count)
    case "split-complementary":
      return getSplitComplementary(baseColor, count)
    case "analogous":
      return getAnalogous(baseColor, count)
    case "triadic":
      return getTriadic(baseColor, (count = 3))
    case "tetradic":
      return getTetradic(baseColor, (count = 4))
    default:
      return getAnalogous(baseColor, count)
  }
}
