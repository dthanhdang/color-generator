//import React from "react"
import { Paper, ActionIcon } from "@mantine/core"
import { ColorPair } from "./contrastTypes"

import { ArrowRightLeft } from "lucide-react"

type PreviewCardProps = {
  colorPair: ColorPair
  onSwapColors: () => void
  className?: string
}

export function PreviewCard({
  colorPair,
  onSwapColors,
  className,
}: PreviewCardProps) {
  const { backgroundColor, textColor } = colorPair

  return (
    <div className={`relative ${className}`}>
      <Paper
        className="w-full aspect-video md:aspect-auto md:h-80 flex items-center justify-center p-4"
        style={{
          backgroundColor: backgroundColor.hex(),
          color: textColor.hex(),
        }}
        radius="md"
        shadow="sm"
      >
        <div className="text-2xl font-medium">
          Keep Building, Keep Creating.
        </div>
      </Paper>

      <ActionIcon
        className="absolute top-2 right-2 bg-white/80 hover:bg-white"
        variant="light"
        onClick={onSwapColors}
        title="Swap Colors"
        size="sm"
      >
        <ArrowRightLeft size={16} />
      </ActionIcon>
    </div>
  )
}
