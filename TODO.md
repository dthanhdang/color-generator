Dans App : changer le type de baseColor en chroma(color) au lieu de string pour ne pas perdre de données en reconversion de couleurs

Tanstack Router : installer => fait

Créer pages / landing_page / LandingPage.tsx, Scale.tsx...

Test unitaire sur utilitaires

A expliquer promise => ColorExtractor, ImageUploader

Changer de fontes

15/03/2025 :

- Modifier ImageCanva.tsx => ok fait

- Revoir ImageColorPicker.tsx => fait

- Revoir RandomPalette
- Nettoyer les doubles palettes

16/03/2025:

17/03/2025:

- Faire une fonction pour générer les couleurs en mode split-complementary
- Pour ne pas perdre de valeurs en reconversion, il faut stocker la couleur dans un objet Chroma.color et non color.
- Mettre la fonction getColorScale dans un utilitaire
- Créer une fonctionnalité qui permet de render une collection de palette (c.f: colormagic.app)

29/03/2025:

- Faire une fonction pour color, index) => {
  const weight = index === 0 ? 50 : index === 10 ? 950 : index \* 100
  const colorObject = chroma(color)
  const colorNameResult = getColorName(colorObject)

      console.log("getColorName result:", colorNameResult)
      return {
        id: nanoid(),
        color,
        weight,
        name: colorNameResult ? colorNameResult.name : "",
      }

  }) as ColorPaletteItem[] => declarer un type de retour donc plus besoin de as ...
