import { type Color } from "chroma-js"
import { Copy, Check } from "lucide-react"
import {
  Card,
  Text,
  CopyButton,
  ActionIcon,
  Tooltip,
  Divider,
} from "@mantine/core"
import { ExtendedColorFormats, getColorFormats } from "./getColorFormats.ts"
import { getColorName } from "#utils/getColorName.ts"

type ColorDetailsProps = {
  className?: string
  color: Color
}

export function ColorDetails({ className, color }: ColorDetailsProps) {
  const colorName = getColorName(color)?.name ?? color.hex()

  const getExtendedFormats = (color: Color): ExtendedColorFormats => {
    return getColorFormats(color, true)
  }

  return (
    //mt-4 transition-transform duration-200 hover:scale-[1.01] mx-auto max-w-xs sm:max-w-sm md:max-w-md
    <div className={className}>
      <Card
        shadow="sm"
        padding={0}
        radius="lg"
        withBorder
        className="overflow-hidden border-gray-100 hover:shadow-md mx-4"
      >
        <div
          style={{
            backgroundColor: color.hex(),
            height: "150px",
            borderTopLeftRadius: "0.375rem",
            borderTopRightRadius: "0.375rem",
            position: "relative",
          }}
        >
          <div className="absolute top-3 left-3 bg-white bg-opacity-90 px-2 py-1 rounded text-xs font-medium">
            {colorName}
          </div>
        </div>

        <div className="p-3 space-y-2">
          <div className="flex items-center justify-between">
            <Text size="sm" className="font-mono">
              {getColorFormats(color).hexCode}
            </Text>
            <CopyButton value={getColorFormats(color).hexCode} timeout={2000}>
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
              {getColorFormats(color).rgbCode}
            </Text>
            <CopyButton value={getColorFormats(color).rgbCode} timeout={2000}>
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
              {getColorFormats(color).hslCode}
            </Text>
            <CopyButton value={getColorFormats(color).hslCode} timeout={2000}>
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
              {getColorFormats(color).oklchCode}
            </Text>
            <CopyButton value={getColorFormats(color).oklchCode} timeout={2000}>
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
        <Divider my="sm" />

        <Text fw={600} size="sm" className="mb-2">
          CSS
        </Text>
        <div className="space-y-4">
          <div>
            <Text size="sm" className="font-mono">
              CSS Variables
            </Text>
            <div className="p-2 bg-gray-50 rounded-md">
              <div className="flex items-start justify-between">
                <Text size="sm" className="font-mono whitespace-pre-wrap">
                  {getExtendedFormats(color).cssVariables}
                </Text>
                <CopyButton
                  value={getExtendedFormats(color).cssVariables}
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
          </div>

          <div>
            <Text size="sm" className="font-mono">
              CSS Classes
            </Text>
            <div className="p-2 bg-gray-50 rounded-md">
              <div className="flex items-start justify-between">
                <Text size="sm" className="font-mono whitespace-pre-wrap">
                  {getExtendedFormats(color).cssClasses}
                </Text>
                <CopyButton
                  value={getExtendedFormats(color).cssClasses}
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
          </div>

          <div>
            <Text size="sm" className="font-mono">
              Tailwind Config
            </Text>
            <div className="p-2 bg-gray-50 rounded-md">
              <div className="flex items-start justify-between">
                <Text size="sm" className="font-mono whitespace-pre-wrap">
                  {getExtendedFormats(color).tailwindConfig}
                </Text>
                <CopyButton
                  value={getExtendedFormats(color).tailwindConfig}
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
          </div>
        </div>
      </Card>
    </div>
  )
}
