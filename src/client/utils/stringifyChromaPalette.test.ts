import { describe, it } from "vitest"
import { stringifyChromaPalette } from "./stringifyChromaPalette.ts"
import chroma from "chroma-js"

describe("stringifyChromaPalette", () => {
  it("correctly stringifies a palettes", ({ expect }) => {
    expect(
      stringifyChromaPalette([chroma("123456"), chroma("abcdef")])
    ).toEqual("123456-abcdef")
  })
})
