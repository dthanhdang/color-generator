import { useState } from "react"
import {
  Paper,
  Text,
  Button,
  Slider,
  ActionIcon,
  Tooltip,
  Box,
} from "@mantine/core"
import { Plus, Minus, Download, Copy, Check } from "lucide-react"

type ColorDisplayProps = {
  colors: string[]
  onColorSelect?: (color: string) => void
}

export function ColorDisplay({ colors, onColorSelect }: ColorDisplayProps) {
  const [selectedColorIndex, setSelectedColorIndex] = useState<number | null>(
    null
  )
  const [paletteSize, setPaletteSize] = useState<number>(5)
  const [copied, setCopied] = useState(false)

  // Limiter le nombre de couleurs affichées selon le slider
  const displayColors = colors.slice(0, paletteSize)

  const handleColorClick = (color: string, index: number) => {
    setSelectedColorIndex(index)
    if (onColorSelect) {
      onColorSelect(color)
    }
  }

  const copyColorToClipboard = (color: string) => {
    navigator.clipboard.writeText(color)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const exportPalette = () => {
    const colorValues = displayColors.join(", ")
    navigator.clipboard.writeText(colorValues)
  }

  return (
    <Paper p="md" withBorder radius="md" className="mb-4">
      <Text size="lg" fw={500} className="mb-3">
        Color Palette{" "}
      </Text>

      <Box className="mb-4">
        <Text size="sm" c="dimmed" className="mb-2">
          Number of colors{" "}
        </Text>
        <Slider
          value={paletteSize}
          onChange={setPaletteSize}
          min={2}
          max={Math.min(10, colors.length)}
          step={1}
          marks={[
            { value: 2, label: "2" },
            { value: 5, label: "5" },
            {
              value: Math.min(10, colors.length),
              label: Math.min(10, colors.length).toString(),
            },
          ]}
          className="mb-4"
        />
      </Box>

      <Text size="sm" className="mb-2">
        Palette
      </Text>

      <div className="flex rounded-md overflow-hidden mb-4">
        {displayColors.map((color, index) => (
          <div
            key={index}
            className={`flex-1 h-16 cursor-pointer relative ${selectedColorIndex === index ? "ring-2 ring-blue-500" : ""}`}
            style={{ backgroundColor: color }}
            onClick={() => handleColorClick(color, index)}
          >
            {selectedColorIndex === index && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-2 h-2 bg-black rounded-full"></div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="flex justify-end gap-2">
        <ActionIcon
          variant="default"
          onClick={() => setPaletteSize(Math.max(2, paletteSize - 1))}
          disabled={paletteSize <= 2}
        >
          <Minus size={16} />
        </ActionIcon>

        <ActionIcon
          variant="default"
          onClick={() =>
            setPaletteSize(Math.min(colors.length, paletteSize + 1))
          }
          disabled={paletteSize >= colors.length}
        >
          <Plus size={16} />
        </ActionIcon>
      </div>

      <Button
        fullWidth
        leftSection={<Download size={16} />}
        onClick={exportPalette}
        className="mt-4"
      >
        Export palette
      </Button>

      {selectedColorIndex !== null && (
        <Paper p="xs" withBorder className="mt-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded"
                style={{ backgroundColor: displayColors[selectedColorIndex] }}
              />
              <div>
                <Text size="sm">Selected Color</Text>
                <Text size="xs" c="dimmed" className="font-mono">
                  {displayColors[selectedColorIndex]}
                </Text>
              </div>
            </div>
            <Tooltip label={copied ? "Copié !" : "Copier"}>
              <ActionIcon
                onClick={() =>
                  copyColorToClipboard(displayColors[selectedColorIndex])
                }
              >
                {copied ? <Check size={16} /> : <Copy size={16} />}
              </ActionIcon>
            </Tooltip>
          </div>
        </Paper>
      )}
    </Paper>
  )
}
