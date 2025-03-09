import { useState, useEffect, useCallback } from "react"
import { Paper, Text, Button, Slider, Box } from "@mantine/core"
import { getDominantColors } from "../utils/colorExtraction"

type ColorExtractorProps = {
  imageFile: File
  onColorSelect: (color: string) => void
  onColorsExtracted?: (colors: string[]) => void
}

export function ColorExtractor({
  imageFile,
  onColorSelect,
  onColorsExtracted,
}: ColorExtractorProps) {
  const [numColors, setNumColors] = useState(5)
  const [extractedColors, setExtractedColors] = useState<string[]>([])
  const [imageUrl, setImageUrl] = useState<string>("")

  useEffect(() => {
    if (imageFile) {
      const url = URL.createObjectURL(imageFile)
      setImageUrl(url)
      return () => URL.revokeObjectURL(url)
    }
  }, [imageFile])

  const extractColors = useCallback(async () => {
    if (!imageUrl) return

    try {
      const img = new Image()
      img.crossOrigin = "Anonymous"

      img.onload = async () => {
        try {
          const colors = await getDominantColors(img, numColors)
          setExtractedColors(colors)

          if (onColorsExtracted && colors.length > 0) {
            console.log("Extracted colors:", colors)
            onColorsExtracted(colors)
          }
        } catch (error) {
          console.error("Error extracting colors:", error)
        }
      }

      img.onerror = (e) => {
        console.error("Error loading image:", e)
      }

      img.src = imageUrl
    } catch (error) {
      console.error("Unexpected error:", error)
    }
  }, [imageUrl, numColors, onColorsExtracted])

  useEffect(() => {
    if (imageUrl) {
      extractColors()
    }
  }, [imageUrl, extractColors])

  const handleColorClick = (color: string) => {
    onColorSelect(color)
  }

  return (
    <Paper p="md" withBorder>
      <Text size="lg" fw={500} mb="md">
        Dominant colors
      </Text>

      <Box mb="md">
        <Text size="sm" c="dimmed" mb="xs">
          Number of colors to extract
        </Text>
        <Slider
          value={numColors}
          onChange={setNumColors}
          min={2}
          max={10}
          step={1}
          marks={[
            { value: 2, label: "2" },
            { value: 5, label: "5" },
            { value: 10, label: "10" },
          ]}
          mb="md"
        />
      </Box>

      <Button onClick={extractColors} mb="md">
        Extract colors
      </Button>

      {extractedColors.length > 0 ? (
        <div className="flex rounded-md overflow-hidden">
          {extractedColors.map((color, index) => (
            <div
              key={index}
              className="flex-1 h-12 cursor-pointer"
              style={{ backgroundColor: color }}
              onClick={() => handleColorClick(color)}
              title={color}
            />
          ))}
        </div>
      ) : (
        <Text size="sm" c="dimmed">
          Click on extract button to see extracted colors
        </Text>
      )}
    </Paper>
  )
}
