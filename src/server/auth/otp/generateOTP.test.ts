import { describe, it } from "vitest"

import { generateOTP } from "./generateOTP.js"

describe("generateOTP", () => {
  it("respects given length", ({ expect }) => {
    const otp = generateOTP({
      length: 6,
    })

    expect(otp).toHaveLength(6)
  })

  it("doesn't generate the same code twice", ({ expect }) => {
    const otp1 = generateOTP({
      length: 6,
    })

    const otp2 = generateOTP({
      length: 6,
    })

    expect(otp1).not.toEqual(otp2)
  })
})
