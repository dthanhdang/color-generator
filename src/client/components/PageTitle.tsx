import type { JSX } from "react"
import { clsx } from "clsx"

type PageTitleProps = { children: string }

export function PageTitle({ children: title }: PageTitleProps): JSX.Element {
  const parts = title.split("*").filter((part) => part !== "")
  const highlightedModulo = title[0] === "*" ? 0 : 1

  return (
    <h1 className="text-center text-5xl font-bold mb-14 mt-8">
      {parts.map((part, index) => (
        <span
          className={clsx({
            "text-[oklch(0.511_0.262_276.966)]":
              index % 2 === highlightedModulo,
          })}
          key={index}
        >
          {part}
        </span>
      ))}
    </h1>
  )
}
