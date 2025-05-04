import type { ActionIconProps, PolymorphicComponentProps } from "@mantine/core"
import { ActionIcon, Tooltip } from "@mantine/core"
import { clsx } from "clsx"
import type { LucideIcon } from "lucide-react"
import { JSX } from "react"
import { twMerge } from "tailwind-merge"

type ColorIconProps = PolymorphicComponentProps<"button", ActionIconProps> & {
  active?: boolean
  Icon: LucideIcon
  tooltip: string
}

export function ColorIcon({
  active = false,
  className,
  Icon,
  tooltip,
  ...props
}: ColorIconProps): JSX.Element {
  const { onClick } = props

  return (
    <Tooltip label={tooltip}>
      <ActionIcon
        {...props}
        className={twMerge(
          clsx(
            "disabled:bg-transparent",
            // active && "scale-150",
            onClick !== undefined && "text-current",
            active && "text-red-800",
            className
          )
        )}
        disabled={onClick === undefined}
        size="lg"
        variant="transparent"
      >
        <Icon strokeWidth={active ? 3 : undefined} />
      </ActionIcon>
    </Tooltip>
  )
}
