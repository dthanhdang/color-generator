import type { JSX } from "react"
import { Button } from "@mantine/core"
import { Pen } from "lucide-react"
import type { ButtonProps, PolymorphicComponentProps } from "@mantine/core"
import { Link } from "@tanstack/react-router"
import type { Color } from "chroma-js"
import { stringifyChromaPalette } from "#utils/stringifyChromaPalette.ts"

export function OpenPaletteEditorButton({
  className,
  colors,
  ...props
}: PolymorphicComponentProps<typeof Link, ButtonProps> & {
  colors: Color[]
}): JSX.Element {
  return (
    <Button
      {...props}
      component={Link}
      className={className}
      leftSection={<Pen size={16} />}
      to={`/palette-editor?colors=${stringifyChromaPalette(colors)}`}
    />
  )
}
