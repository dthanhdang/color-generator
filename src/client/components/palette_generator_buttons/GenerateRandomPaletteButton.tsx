import type { JSX } from "react"
import { Button } from "@mantine/core"
import { Shuffle } from "lucide-react"
import type { ButtonProps, PolymorphicComponentProps } from "@mantine/core"

export function GenerateRandomPaletteButton({
  className,
  ...props
}: PolymorphicComponentProps<"button", ButtonProps>): JSX.Element {
  return (
    <Button
      {...props}
      className={className}
      leftSection={<Shuffle size={16} />}
    />
  )
}
