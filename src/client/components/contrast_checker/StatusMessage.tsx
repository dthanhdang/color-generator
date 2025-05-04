import React from "react"
import { ContrastLevel } from "./contrastTypes"
import { Badge, Tooltip } from "@mantine/core"
import { Check, X } from "lucide-react"

interface StatusMessageProps {
  level: ContrastLevel
  isLargeText?: boolean
}

export function StatusMessage({
  level,
  isLargeText = false,
}: StatusMessageProps): React.JSX.Element {
  const getColorByLevel = (level: ContrastLevel): string => {
    switch (level) {
      case "AAA":
        return "green"
      case "AA":
        return "blue"
      case "FAIL":
        return "red"
      default:
        return "gray"
    }
  }

  const getIconByLevel = (level: ContrastLevel) => {
    switch (level) {
      case "AAA":
      case "AA":
        return <Check size={14} />
      case "FAIL":
        return <X size={14} />
      default:
        return null
    }
  }

  const getTooltipText = (
    level: ContrastLevel,
    isLargeText: boolean
  ): string => {
    const textType = isLargeText ? "Large text" : "Normal text"
    switch (level) {
      case "AAA":
        return `${textType} meets enhanced accessibility standards (Level AAA)`
      case "AA":
        return `${textType} meets minimum accessibility standards (Level AA)`
      case "FAIL":
        return `${textType} fails accessibility standards`
      default:
        return ""
    }
  }

  return (
    <Tooltip label={getTooltipText(level, isLargeText)}>
      <Badge
        color={getColorByLevel(level)}
        leftSection={getIconByLevel(level)}
        variant={level === "FAIL" ? "filled" : "light"}
      >
        {level}
      </Badge>
    </Tooltip>
  )
}
