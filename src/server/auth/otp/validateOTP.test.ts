import { generateTestSpecificEmail } from "#server/test/generators"
import {
  unsafeUnwrap,
  unsafeUnwrapErr,
} from "@meow-meow-dev/server-utilities/neverthrow"
import { env } from "cloudflare:test"
import { describe, it } from "vitest"

import type { StoreOTPProps } from "./storeOTP.js"

import { storeOTP as storeOTPBase } from "./storeOTP.js"
import { validateOTP } from "./validateOTP.js"

async function storeOTP(
  props: Omit<StoreOTPProps["otp"], "code" | "DB">
): Promise<void> {
  await storeOTPBase({
    db: env.DB,
    otp: {
      ...props,
      code: "123456",
    },
  })
}

describe("validateOTP", () => {
  it("fails when email doesn't exist", async ({ expect }) => {
    const email = generateTestSpecificEmail(expect)
    if (email) {
      expect(
        await unsafeUnwrapErr(
          validateOTP({
            code: "123456",
            db: env.DB,
            email,
          })
        )
      ).toEqual("invalid_or_expired_code")
    }
  })

  it("succeeds when code is correct", async ({ expect }) => {
    const email = generateTestSpecificEmail(expect)
    if (email) {
      await storeOTP({
        email,
        validity: new Date(2100, 1, 1),
      })

      expect(
        (
          await validateOTP({
            code: "123456",
            db: env.DB,
            email,
          })
        ).isOk
      ).toBeTruthy()
    }
  })

  it("fails when code is incorrect", async ({ expect }) => {
    const email = generateTestSpecificEmail(expect)
    if (email) {
      await storeOTP({
        email,
        validity: new Date(2100, 1, 1),
      })

      expect(
        await unsafeUnwrapErr(
          validateOTP({
            code: "123457",
            db: env.DB,
            email,
          })
        )
      ).toEqual("invalid_or_expired_code")
    }
  })

  it("fails when validity is over", async ({ expect }) => {
    const email = generateTestSpecificEmail(expect)
    if (email) {
      await storeOTP({
        email,
        validity: new Date(2020, 1, 1),
      })

      expect(
        await unsafeUnwrapErr(
          validateOTP({
            code: "123456",
            db: env.DB,
            email,
          })
        )
      ).toEqual("invalid_or_expired_code")
    }
  })

  it("fails when code is reused", async ({ expect }) => {
    const email = generateTestSpecificEmail(expect)
    if (email) {
      await storeOTP({
        email,
        validity: new Date(2100, 1, 1),
      })

      await unsafeUnwrap(
        validateOTP({
          code: "123456",
          db: env.DB,
          email,
        })
      )

      expect(
        await unsafeUnwrapErr(
          validateOTP({
            code: "123456",
            db: env.DB,
            email,
          })
        )
      ).toEqual("invalid_or_expired_code")
    }
  })

  it("succeeds after a failure", async ({ expect }) => {
    const email = generateTestSpecificEmail(expect)
    if (email) {
      await storeOTP({
        email,
        validity: new Date(2100, 1, 1),
      })

      expect(
        await unsafeUnwrapErr(
          validateOTP({
            code: "123457",
            db: env.DB,
            email,
          })
        )
      ).toEqual("invalid_or_expired_code")

      await unsafeUnwrap(
        validateOTP({
          code: "123456",
          db: env.DB,
          email,
        })
      )
    }
  })
})
