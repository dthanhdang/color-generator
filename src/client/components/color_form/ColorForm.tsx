import type { ColorMode } from "#client/types"
import type { JSX } from "react"
import type { ColorFormProps } from "./ColorFormProps.ts"
import { FormHex } from "./FormHex.tsx"
import { FormHsl } from "./FormHsl.tsx"
import { FormOklch } from "./FormOklch.tsx"

const editors = {
  hex: FormHex,
  hsl: FormHsl,
  oklch: FormOklch,
}

export function ColorForm({
  colorMode,
  ...props
}: ColorFormProps & { colorMode: ColorMode }): JSX.Element {
  const Editor = editors[colorMode]
  return <Editor {...props} />
}
