import { describe, it } from "vitest"
import { computeEuclidianDistance } from "./computeEuclidianDistance.ts"

describe("computeEuclidianDistance", () => {
  it("computes distances correctly", ({ expect }) => {
    const p1 = [4, 0]
    const p2 = [0, 3]

    expect(
      computeEuclidianDistance([
        [p1[0], p2[0]],
        [p1[1], p2[1]],
      ])
    ).toEqual(5) // sqrt(4^2+3^2) = sqrt(25) = 5
  })
})
