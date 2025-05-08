import type { JSX } from "react"
import type { Color } from "chroma-js"
import clsx from "clsx"

type ErrorLogoProps = {
  message: string
  colors: readonly Color[]
}

export function ErrorLogo({ colors, message }: ErrorLogoProps): JSX.Element {
  return (
    <p className="flex flex-row leading-tight tracking-tight g-0">
      {message.split("").map((character, index) => (
        <span
          className={clsx(
            message.length >= 6 ? "text-6xl" : "text-9xl",
            "lg:text-9xl font-bold"
          )}
          key={index}
          style={{ color: colors[index].hex() }}
        >
          {character}
        </span>
      ))}
    </p>
  )
}
