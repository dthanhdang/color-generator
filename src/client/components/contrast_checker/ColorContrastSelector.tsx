import React, { useEffect, useState } from "react"
import { Stack, Text, Group, ActionIcon } from "@mantine/core"
import { ColorInput } from "@mantine/core"

import { ArrowLeftRight } from "lucide-react"
import { toHex } from "./contrastUtils"
import chroma from "chroma-js"
//import { value } from "valibot"
//import { R } from "vitest/dist/chunks/environment.d8YfPkTm.js"

type ColorContrastSelectorProps = {
  backgroundColor: chroma.Color
  textColor: chroma.Color
  onBackgroundColorChange: (color: string) => void
  onTextColorChange: (color: string) => void
  onSwapColors: () => void
}

export function ColorContrastSelector({
  backgroundColor,
  textColor,
  onBackgroundColorChange,
  onTextColorChange,
  onSwapColors,
}: ColorContrastSelectorProps): React.JSX.Element {
  const [bgInputValue, setBgInputValue] = useState(toHex(backgroundColor))
  const [textInputValue, setTextInputValue] = useState(toHex(textColor))

  useEffect(() => {
    setBgInputValue(toHex(backgroundColor))
  }, [backgroundColor])
  useEffect(() => {
    setTextInputValue(toHex(textColor))
  }, [textColor])
  return (
    <Stack gap="md">
      <div>
        <Text size="sm" mb={4} fw={500}>
          Background Color
        </Text>
        <ColorInput
          value={bgInputValue}
          onChange={(value) => {
            setBgInputValue(value)
            if (chroma.valid(value)) {
              onBackgroundColorChange(value)
            }
          }}
          format="hex"
          swatches={[
            "#2F61A6",
            "#1C7ED6",
            "#4263EB",
            "#7048E8",
            "#BE4BDB",
            "#F03E3E",
            "#E8590C",
            "#F59F00",
            "#74B816",
            "#087F5B",
            "#000000",
            "#212529",
            "#495057",
            "#868E96",
            "#FFFFFF",
          ]}
        />
      </div>

      <div>
        <Group justify="space-between" align="center" mb={4}>
          <Text size="sm" fw={500}>
            Text Color
          </Text>

          <ActionIcon
            variant="subtle"
            onClick={onSwapColors}
            title="Swap Colors"
            size="sm"
          >
            <ArrowLeftRight size={16} />
          </ActionIcon>
        </Group>

        <ColorInput
          value={textInputValue}
          onChange={(value) => {
            setTextInputValue(value)
            if (chroma.valid(value)) {
              onTextColorChange(value)
            }
          }}
          format="hex"
          swatches={[
            "#FFFFFF",
            "#F8F9FA",
            "#E9ECEF",
            "#DEE2E6",
            "#212529",
            "#000000",
            "#FA5252",
            "#94D82D",
            "#4C6EF5",
            "#BE4BDB",
          ]}
        />
      </div>
    </Stack>
  )
}
