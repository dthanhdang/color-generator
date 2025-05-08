import type { JSX } from "react"
import type { Color } from "chroma-js"

type ErrorLogoProps = {
  message: string
  colors: readonly Color[]
}

export function ErrorLogo({ colors, message }: ErrorLogoProps): JSX.Element {
  return (
    <p className="flex flex-row leading-tight tracking-tight g-0">
      {message.split("").map((character, index) => (
        <span
          className="text-[10rem] font-bold"
          key={index}
          style={{ color: colors[index].hex() }}
        >
          {character}
        </span>
      ))}
    </p>
  )
}
