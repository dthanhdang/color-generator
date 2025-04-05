import React, { useState } from "react"
import { type Color } from "chroma-js"
import { Copy, Check } from "lucide-react"
import { Tooltip } from "@mantine/core"

type SingleColorProps = {
  color: Color
  index: number
  name: string
  weight: number
  onClick?: () => void
  selected?: boolean
}

export const SingleColor = ({
  color,
  //index,
  name,
  weight,
  onClick,
  selected = false,
}: SingleColorProps): React.JSX.Element => {
  //const weight = index === 0 ? 50 : index === 10 ? 950 : index * 100
  const [copied, setCopied] = useState(false)
  const copyToClipboard = (e: React.MouseEvent) => {
    e.stopPropagation()
    navigator.clipboard.writeText(color.hex())
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  const textColor = color.luminance() > 0.5 ? "text-gray-800" : "text-gray-100"
  return (
    <div
      className={`h-96 p-4 rounded-lg shadow-md hover:scale-105 transition-transform duration-300 ${selected ? "ring-2 ring-offset-2 ring-blue-500" : ""}`}
      style={{ backgroundColor: color.hex() }}
      onClick={onClick}
    >
      <div className={`"text-center" ${textColor}`}>
        <p className="font-bold">{color.hex()}</p>
        <Tooltip
          label={copied ? "Copied!" : "Copy to clipboard"}
          position="top"
          withArrow
        >
          <button
            onClick={copyToClipboard}
            className="p-1 rounded-full hover:bg-white/20 transition-colors"
            aria-label="Copy color code"
          >
            {copied ? (
              <Check size={18} className={textColor} />
            ) : (
              <Copy size={18} className={textColor} />
            )}
          </button>
        </Tooltip>
        <p className="text-xs">{weight}</p>
        {name && <p className="text-sm">{name}</p>}
      </div>
    </div>
  )
}
