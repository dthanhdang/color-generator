import { ColorContrastSelector } from "#components/contrast_checker/ColorContrastSelector.tsx"
import { ContrastResultCard } from "#components/contrast_checker/ContrastResultCard.tsx"
import { PreviewCard } from "#components/contrast_checker/PreviewCard.tsx"

import { useColorContrast } from "../../hooks/useColorContrast"

import { PageStyle } from "#components/PageStyle.tsx"
import { WCAGContrastCard } from "#components/contrast_checker/WCAGContrastCard.tsx"

export function ContrastCheckerPage() {
  const {
    backgroundColor,
    textColor,
    updateBackgroundColor,
    updateTextColor,
    swapColors,
    contrastResult,
    colorPair,
  } = useColorContrast("#2F61A6", "#FFFFFF")

  return (
    <PageStyle
      className="flex flex-col min-h-lvh"
      title="Your *Color Contrast* Checker"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex flex-col">
          <PreviewCard
            colorPair={colorPair}
            onSwapColors={swapColors}
            className="md:h-auto"
          />
        </div>

        <div className="flex flex-col space-y-6">
          <ColorContrastSelector
            backgroundColor={backgroundColor}
            textColor={textColor}
            onBackgroundColorChange={updateBackgroundColor}
            onTextColorChange={updateTextColor}
            onSwapColors={swapColors}
          />

          <ContrastResultCard result={contrastResult} />
        </div>
      </div>
      <div>
        <WCAGContrastCard />
      </div>
    </PageStyle>
  )
}
