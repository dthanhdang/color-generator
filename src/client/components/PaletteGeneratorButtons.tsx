import type { JSX } from "react"
import { Button } from "@mantine/core"
import { Pen, Shuffle } from "lucide-react"
import type { ButtonProps, PolymorphicComponentProps } from "@mantine/core"

import { Link } from "@tanstack/react-router"
import type { ColorPaletteItem } from "./ColorPalette.tsx"
import { twMerge } from "tailwind-merge"

const buttonClassName = "bg-[oklch(0.511_0.262_276.966)] color-white"

export function GenerateRandomPaletteButton({
  className,
  ...props
}: PolymorphicComponentProps<"button", ButtonProps>): JSX.Element {
  return (
    <Button
      {...props}
      className={twMerge(buttonClassName, className)}
      leftSection={<Shuffle size={16} />}
    />
  )
}

export function OpenPaletteEditorButton({
  className,
  palette,
  ...props
}: PolymorphicComponentProps<typeof Link, ButtonProps> & {
  palette: ColorPaletteItem[]
}): JSX.Element {
  return (
    <Button
      {...props}
      component={Link}
      className={twMerge(buttonClassName, className)}
      leftSection={<Pen size={16} />}
      to={`/palette-editor?palette=${palette.map((color) => color.color.hex().substring(1)).join("-")}`}
    />
  )
}
