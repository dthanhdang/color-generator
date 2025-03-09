import { useState } from "react"
import { Paper, Text, Button, Group, Stack, Box } from "@mantine/core"
import { ImageUploader } from "./ImageUploader"
import { ImageCanvas } from "./ImageCanvas"
import { ColorExtractor } from "./ColorExtractor"

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

  const handleImageUpload = (file: File | string) => {
    if (typeof file === "string") {
      console.warn("URLs are not supported yet")
      return
    } else {
      setImageFile(file)
      setSelectedColor(null)
    }
  }

  const handleColorSelect = (color: string) => {
    setSelectedColor(color)
  }

  const handleUseColor = () => {
    if (selectedColor) {
      onColorSelect(selectedColor)
    }
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
              }}
            >
              Upload another image
            </Button>
          </Group>

          <ImageCanvas
            imageFile={imageFile}
            onColorSelect={handleColorSelect}
          />

          <ColorExtractor
            imageFile={imageFile}
            onColorSelect={handleColorSelect}
            onColorsExtracted={(colors) => {
              if (onColorsExtracted) {
                onColorsExtracted(colors)
              }
            }}
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
                <Button onClick={handleUseColor}>Use this color</Button>
              </Group>
            </Paper>
          )}
        </>
      )}
    </Stack>
  )
}
