import { useState } from "react"

import { type Color } from "chroma-js"
import { Copy, Check } from "lucide-react"
import { Card, Text, CopyButton, ActionIcon, Tooltip } from "@mantine/core"
import { SingleColor } from "../SingleColor"

export type ColorPaletteItem = {
  id: string
  color: Color
  weight: number
  name: string
}

type ColorPaletteProps = {
  palette: ColorPaletteItem[]
}

type BasicColorFormats = {
  hexCode: string
  rgbCode: string
  hslCode: string
  oklchCode: string
}

type ExtendedColorFormats = BasicColorFormats & {
  cssVariables: string
  cssClasses: string
  tailwindConfig: string
}

export function ColorPalette({ palette }: ColorPaletteProps) {
  const [selectedColor, setSelectedColor] = useState<ColorPaletteItem | null>(
    null
  )
  //const [showCssCode, setShowCssCode] = useState(false)
  const handleColorClick = (item: ColorPaletteItem) => {
    setSelectedColor(item === selectedColor ? null : item)
  }
  const getColorFormats = (
    color: Color,
    includeCss: boolean = false
  ): BasicColorFormats | ExtendedColorFormats => {
    const hexCode = color.hex()
    const [r, g, b] = color.rgb()
    const rgbCode = `rgb(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)})`
    const [h, s, l] = color.hsl()
    const hslCode = `hsl(${Math.round(h) || 0}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`
    const [lOklch, cOklch, hOklch] = color.oklch()
    const oklchCode = `oklch(${Math.round(lOklch * 100)}% ${cOklch.toFixed(2)} ${Math.round(hOklch) || 0})`
    const basicFormats: BasicColorFormats = {
      hexCode,
      rgbCode,
      hslCode,
      oklchCode,
    }

    //Il faut ajouter les options CSS dans le render
    if (includeCss) {
      const cssVariables = `--color: ${hexCode};\n--color-rgb: ${r}, ${g}, ${b};\n--color-hsl: ${Math.round(h) || 0}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%;`

      const cssClasses = `.bg-color { background-color: ${hexCode}; }\n.text-color { color: ${hexCode}; }\n.border-color { border-color: ${hexCode}; }`

      const tailwindConfig = `'color': {\n  DEFAULT: '${hexCode}',\n  rgb: '${rgbCode}',\n  hsl: '${hslCode}'\n}`

      return {
        ...basicFormats,
        cssVariables,
        cssClasses,
        tailwindConfig,
      }
    }
    return basicFormats
  }
  {
    /*const getExtendedFormats = (color: Color): ExtendedColorFormats => {
    return getColorFormats(color, true) as ExtendedColorFormats
  }*/
  }
  return (
    <div>
      <p className="text-sm text-gray-600 text-center mb-3 px-4">
        Click on any color below to view its detailed information
      </p>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(100px,1fr))] gap-4 p-4">
        {palette.map((item, index) => (
          <SingleColor
            key={item.id}
            color={item.color}
            index={index}
            name={item.name}
            weight={item.weight}
            onClick={() => handleColorClick(item)}
            selected={selectedColor?.id === item.id}
          />
        ))}
      </div>

      {selectedColor && (
        //mt-4 transition-transform duration-200 hover:scale-[1.01] mx-auto max-w-xs sm:max-w-sm md:max-w-md
        <div className="mt-4">
          <Card
            shadow="sm"
            padding={0}
            radius="lg"
            withBorder
            className="overflow-hidden border-gray-100 hover:shadow-md mx-4"
          >
            <div
              style={{
                backgroundColor: selectedColor.color.hex(),
                height: "150px",
                borderTopLeftRadius: "0.375rem",
                borderTopRightRadius: "0.375rem",
                position: "relative",
              }}
            >
              <div className="absolute top-3 left-3 bg-white bg-opacity-90 px-2 py-1 rounded text-xs font-medium">
                {selectedColor.name}
              </div>
            </div>

            <div className="p-3 space-y-2">
              <div className="flex items-center justify-between">
                <Text size="sm" className="font-mono">
                  {getColorFormats(selectedColor.color).hexCode}
                </Text>
                <CopyButton
                  value={getColorFormats(selectedColor.color).hexCode}
                  timeout={2000}
                >
                  {({ copied, copy }) => (
                    <Tooltip
                      label={copied ? "Copied !" : "Copy"}
                      withArrow
                      position="top"
                    >
                      <ActionIcon
                        size="sm"
                        color={copied ? "teal" : "gray"}
                        onClick={copy}
                      >
                        {copied ? <Check size={14} /> : <Copy size={14} />}
                      </ActionIcon>
                    </Tooltip>
                  )}
                </CopyButton>
              </div>

              <div className="flex items-center justify-between">
                <Text size="sm" className="font-mono">
                  {getColorFormats(selectedColor.color).rgbCode}
                </Text>
                <CopyButton
                  value={getColorFormats(selectedColor.color).rgbCode}
                  timeout={2000}
                >
                  {({ copied, copy }) => (
                    <Tooltip
                      label={copied ? "Copied !" : "Copy"}
                      withArrow
                      position="top"
                    >
                      <ActionIcon
                        size="sm"
                        color={copied ? "teal" : "gray"}
                        onClick={copy}
                      >
                        {copied ? <Check size={14} /> : <Copy size={14} />}
                      </ActionIcon>
                    </Tooltip>
                  )}
                </CopyButton>
              </div>

              <div className="flex items-center justify-between">
                <Text size="sm" className="font-mono">
                  {getColorFormats(selectedColor.color).hslCode}
                </Text>
                <CopyButton
                  value={getColorFormats(selectedColor.color).hslCode}
                  timeout={2000}
                >
                  {({ copied, copy }) => (
                    <Tooltip
                      label={copied ? "Copied !" : "Copy"}
                      withArrow
                      position="top"
                    >
                      <ActionIcon
                        size="sm"
                        color={copied ? "teal" : "gray"}
                        onClick={copy}
                      >
                        {copied ? <Check size={14} /> : <Copy size={14} />}
                      </ActionIcon>
                    </Tooltip>
                  )}
                </CopyButton>
              </div>

              <div className="flex items-center justify-between">
                <Text size="sm" className="font-mono">
                  {getColorFormats(selectedColor.color).oklchCode}
                </Text>
                <CopyButton
                  value={getColorFormats(selectedColor.color).oklchCode}
                  timeout={2000}
                >
                  {({ copied, copy }) => (
                    <Tooltip
                      label={copied ? "Copied !" : "Copy"}
                      withArrow
                      position="top"
                    >
                      <ActionIcon
                        size="sm"
                        color={copied ? "teal" : "gray"}
                        onClick={copy}
                      >
                        {copied ? <Check size={14} /> : <Copy size={14} />}
                      </ActionIcon>
                    </Tooltip>
                  )}
                </CopyButton>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}
