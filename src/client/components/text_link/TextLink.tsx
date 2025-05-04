import type { LinkComponent } from "@tanstack/react-router"

import { twMerge } from "tailwind-merge"

import { CreatedLinkComponent } from "./CreatedLinkComponent.js"
import { MantineLinkComponent } from "./MantineLinkComponent.jsx"

export const TextLink: LinkComponent<typeof MantineLinkComponent> = ({
  className,
  ...props
}) => {
  return (
    // @ts-expect-error 2322 Doesn't work since upgrading to React 19
    <CreatedLinkComponent
      {...props}
      className={twMerge(
        "font-bold text-[var(--primary-color)] underline decoration-dotted",
        className
      )}
    />
  )
}
