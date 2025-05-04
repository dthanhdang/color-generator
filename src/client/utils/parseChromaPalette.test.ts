import { describe, it } from "vitest"
import { parseChromaPalette } from "./parseChromaPalette.ts"
import chroma from "chroma-js"

describe("parseChromaPalette", () => {
  it("correctly parses a palette with one color", ({ expect }) => {
    expect(parseChromaPalette("abcdef")).toEqual([chroma("abcdef")])
  })

  it("correctly parses a palette with several colors", ({ expect }) => {
    expect(parseChromaPalette("abcdef-123456")).toEqual([
      chroma("abcdef"),
      chroma("123456"),
    ])
  })

  it("detects invalid palettes", ({ expect }) => {
    expect(() => parseChromaPalette("abcdeg")).toThrowError(/Invalid palette/)
    expect(() => parseChromaPalette("#abcdef")).toThrowError(/Invalid palette/)
    expect(() => parseChromaPalette("abcdef-")).toThrowError(/Invalid palette/)
  })
})
