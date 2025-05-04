import { createFileRoute } from "@tanstack/react-router"
import * as v from "valibot"
import { EditPalettePage } from "#pages/edit_palette"
import chroma from "chroma-js"

function isValidHexColor(value: string): boolean {
  return /[a-f0-9]{6}/i.test(value)
}

function validateHexPalette(value: string | undefined): string[] | undefined {
  if (value === undefined) return undefined

  const tokens = value.split("-")
  if (tokens.every((token) => isValidHexColor(token))) {
    return tokens
  } else {
    return undefined
  }
}

export const Route = createFileRoute("/palette-editor/")({
  component: PageWrapper,
  validateSearch: v.strictObject({ palette: v.optional(v.string()) }),
})

function PageWrapper() {
  const { palette: searchPalette } = Route.useSearch()
  const palette = validateHexPalette(searchPalette) ?? [chroma.random().hex()]
  console.log(palette)

  return <EditPalettePage palette={palette} />
}
