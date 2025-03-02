import { describe, it } from "vitest"
import { getColorName } from "./getColorName.js"
import chroma from "chroma-js"

describe("getColorName", () => {
  it("finds exact colors", ({ expect }) => {
    const output = getColorName(chroma("#ff3399"))
    if (output) {
      expect(output.exact).toBeTruthy()
      expect(output?.name).toEqual("Wild Strawberry")
      expect(output.color.hex()).toEqual("#ff3399")
    } else {
      expect.fail()
    }
  })

  it("finds approximate colors", ({ expect }) => {
    const output = getColorName(chroma("#0c1912"))
    if (output) {
      expect(output.exact).toBeFalsy()
      expect(output?.name).toEqual("Racing Green")
      expect(output.color.hex()).toEqual("#0c1911")
    } else {
      expect.fail()
    }
  })
})
