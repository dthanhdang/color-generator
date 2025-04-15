import { useState, useCallback } from "react"
import { Paper, Text, Button, Group, Stack, Box } from "@mantine/core"
import { ImageUploader } from "./ImageUploader"
import { ImageCanvas } from "./ImageCanvas"

import { getDominantColors } from "../utils/colorExtraction"

import { ColorPickerComponent } from "./ColorPicker"

type ImageColorPickerProps = {
  //onColorSelect: (color: string) => void
  onColorsExtracted?: (colors: string[]) => void
}

export function ImageColorPicker({
  //onColorSelect,
  onColorsExtracted,
}: ImageColorPickerProps) {
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [selectedColor, setSelectedColor] = useState<string | null>(null)
  const [extractedColors, setExtractedColors] = useState<string[]>([])
  //const [paletteSize, setPaletteSize] = useState<number>(5)
  const [selectedColorIndex, setSelectedColorIndex] = useState<number | null>(
    null
  )

  const extractColorsFromImage = useCallback(
    async (file: File) => {
      try {
        //setIsExtracting(true)

        const img = new Image()
        img.crossOrigin = "Anonymous"

        const loadImage = new Promise<void>((resolve, reject) => {
          img.onload = () => resolve()
          img.onerror = () => reject(new Error("Failed to load image"))
          img.src = URL.createObjectURL(file)
        })

        await loadImage

        const colors = await getDominantColors(img, 10)
        setExtractedColors(colors)

        if (onColorsExtracted) {
          onColorsExtracted(colors)
        }

        URL.revokeObjectURL(img.src)
      } catch (error) {
        console.error("Error extracting colors:", error)
      }
    },
    [onColorsExtracted]
  )
  const handleImageUpload = (file: File | string) => {
    if (typeof file === "string") {
      console.warn("URLs are not supported yet")
      return
    } else {
      setImageFile(file)
      setSelectedColor(null)
      setSelectedColorIndex(null)
      extractColorsFromImage(file)
    }
  }

  const handleColorChange = (newColor: string, index: number) => {
    if (index !== null && index >= 0 && index < extractedColors.length) {
      const newColors = [...extractedColors]
      newColors[index] = newColor
      setExtractedColors(newColors)

      if (selectedColorIndex === index) {
        setSelectedColor(newColor)
      }

      if (onColorsExtracted) {
        onColorsExtracted(newColors)
      }
    }
  }

  const handleColorSelect = (color: string) => {
    setSelectedColor(color)
    // Rechercher si la couleur existe déjà dans la palette
    const colorIndex = extractedColors.findIndex((c) => c === color)
    if (colorIndex >= 0) {
      setSelectedColorIndex(colorIndex)
    } else {
      setSelectedColorIndex(null)
    }
  }

  {
    /*const handleUseColor = () => {
    if (selectedColor) {
      onColorSelect(selectedColor)
    }
  }*/
  }

  {
    /*const exportPalette = () => {
    const colorValues = displayColors.join(", ")
    navigator.clipboard.writeText(colorValues)
    alert("Palette copied to clipboard!")
  }*/
  }

  return (
    <Stack gap="md">
      {!imageFile ? (
        <ImageUploader onImageUpload={handleImageUpload} />
      ) : (
        <>
          <Group justify="space-between" align="center">
            <Text fw={500}>Select a color from the image</Text>
            <Button
              variant="subtle"
              onClick={() => {
                setImageFile(null)
                setSelectedColor(null)
                setExtractedColors([])
              }}
            >
              {" "}
              Browse image
            </Button>
          </Group>

          <ImageCanvas
            imageFile={imageFile}
            onColorSelect={handleColorSelect}
          />

          {selectedColor && (
            <Paper p="md" withBorder>
              <Group justify="space-between" align="center">
                <Group gap="md" align="center">
                  <Box
                    style={{
                      width: 40,
                      height: 40,
                      backgroundColor: selectedColor,
                      borderRadius: 4,
                      border: "1px solid #e0e0e0",
                    }}
                  />
                  <div>
                    <Text fw={500}>Selected color</Text>
                    <Text size="sm" c="dimmed" className="font-mono">
                      {selectedColor}
                    </Text>
                  </div>
                </Group>
              </Group>

              {selectedColorIndex !== null && (
                <div className="mt-4">
                  <Text size="sm" fw={500} mb="xs">
                    Adjust Color
                  </Text>
                  <ColorPickerComponent
                    color={extractedColors[selectedColorIndex]}
                    onChange={(color) => setSelectedColor(color)}
                    onApply={(color) =>
                      handleColorChange(color, selectedColorIndex)
                    }
                  />
                </div>
              )}
            </Paper>
          )}
        </>
      )}
    </Stack>
  )
}
