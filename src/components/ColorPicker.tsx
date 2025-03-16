import { useState, useEffect } from "react"
import { ColorPicker, Group, Button, Text, Paper, Box } from "@mantine/core"

type ColorPickerProps = {
  color: string
  onChange: (color: string) => void
  onApply: (color: string) => void
}

export function ColorPickerComponent({
  color,
  onChange,
  onApply,
}: ColorPickerProps) {
  const [selectedColor, setSelectedColor] = useState(color)

  useEffect(() => {
    setSelectedColor(color)
  }, [color])

  const handleChange = (color: string) => {
    setSelectedColor(color)
    onChange(color)
  }

  const handleApply = () => {
    onApply(selectedColor)
  }

  return (
    <Paper p="md" withBorder>
      <Text size="sm" fw={500} mb="xs">
        Adjust Color
      </Text>

      <Group align="flex-start" gap="lg">
        <ColorPicker
          format="hex"
          value={selectedColor}
          onChange={handleChange}
          swatches={[
            "#25262b",
            "#868e96",
            "#fa5252",
            "#e64980",
            "#be4bdb",
            "#7950f2",
            "#4c6ef5",
            "#228be6",
            "#15aabf",
            "#12b886",
            "#40c057",
            "#82c91e",
            "#fab005",
            "#fd7e14",
          ]}
        />

        <div>
          <Box
            style={{
              width: 80,
              height: 80,
              backgroundColor: selectedColor,
              borderRadius: 4,
              marginBottom: 10,
              border: "1px solid #e0e0e0",
            }}
          />

          <Text size="sm" className="font-mono">
            {selectedColor}
          </Text>

          <Button onClick={handleApply} fullWidth mt="md">
            Apply
          </Button>
        </div>
      </Group>
    </Paper>
  )
}
