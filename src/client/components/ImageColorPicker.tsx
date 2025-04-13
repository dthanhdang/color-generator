import { useState, useCallback, useRef } from "react"
import { Paper, Text, Button, Group, Stack, Box } from "@mantine/core"
import { ImageUploader } from "./ImageUploader"
import { ImageCanvas, Position } from "./ImageCanvas.jsx"

import { getDominantColors } from "../utils/colorExtraction"

import chroma from "chroma-js"
import { findColorPosition } from "./findColorPosition.js"

type ImageColorPickerProps = {
  onColorSelect: (color: string) => void
  onColorsExtracted?: (colors: string[]) => void
}

export function ImageColorPicker({
  onColorSelect,
  onColorsExtracted,
}: ImageColorPickerProps) {
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [selectedColor, setSelectedColor] = useState<string | null>(null)
  const [extractedColors, setExtractedColors] = useState<
    { color: string; x: number; y: number }[]
  >([])
  const interactiveCanvasRef = useRef<HTMLCanvasElement>(null)
  const [offscreenCanvas, setOffscreenCanvas] = useState<
    OffscreenCanvas | undefined
  >() // We need a separate canvas in order to pick the image color
  const imageRef = useRef<HTMLImageElement>(null)
  //const [paletteSize, setPaletteSize] = useState<number>(5)

  const getColor = ({ x, y }: Position): string | undefined => {
    const ctx = offscreenCanvas?.getContext("2d")

    if (!ctx) return

    const pixel = ctx.getImageData(x, y, 1, 1).data
    return `rgb(${pixel[0]}, ${pixel[1]}, ${pixel[2]})`
  }

  const handleColorsChange = (
    colors: { color: string; x: number; y: number }[]
  ): void => {
    setExtractedColors(colors)
    if (onColorsExtracted) onColorsExtracted(colors.map(({ color }) => color))
  }

  const extractColorsFromImage = useCallback(
    async (file: File) => {
      try {
        //setIsExtracting(true)

        const img = imageRef.current
        if (!img) return

        img.crossOrigin = "Anonymous"

        const loadImage = new Promise<void>((resolve, reject) => {
          img.onload = () => resolve()
          img.onerror = () => reject(new Error("Failed to load image"))
          img.src = URL.createObjectURL(file)
        })

        await loadImage

        const offscreenCanvas = new OffscreenCanvas(
          img.naturalWidth,
          img.naturalHeight
        )
        setOffscreenCanvas(offscreenCanvas)

        const ctx = offscreenCanvas.getContext("2d")
        if (!ctx) return

        // Redessiner l'image de base
        ctx.drawImage(img, 0, 0)

        const colors = await getDominantColors(img, 10)

        const newExtractedColors = colors.map((color) => {
          const position = findColorPosition(
            offscreenCanvas,
            img,
            chroma(color)
          )
          return {
            ...position,
            color,
          }
        })
        setExtractedColors(newExtractedColors)

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
      extractColorsFromImage(file)
    }
  }

  const handleUseColor = () => {
    if (selectedColor) {
      onColorSelect(selectedColor)
    }
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
            canvasRef={interactiveCanvasRef}
            colors={extractedColors}
            getColor={getColor}
            imageRef={imageRef}
            onColorsChange={handleColorsChange}
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
                <Button onClick={handleUseColor} /*disabled={isExtracting*/>
                  Use this color
                </Button>
              </Group>
            </Paper>
          )}
        </>
      )}

      <img className="hidden" ref={imageRef} />
    </Stack>
  )
}
