import {
  getOTP,
  rpcFactory,
  signInWrapper,
  signUpWrapper,
} from "#server/test/api"
import { generateTestSpecificEmail } from "#server/test/generators"
import { describe, it } from "vitest"

describe("signIn", () => {
  it("rejects invalid requests", async ({ expect }) => {
    const rpc = rpcFactory()
    const email = generateTestSpecificEmail(expect)

    await rpc.auth.requestOTP({ json: { email } })
    const code = await getOTP(email)
    // Non numerical
    await expect(
      rpc.auth.signIn({
        json: {
          code: "AbCdEf",
          email,
        },
      })
    ).toBeHTTPBadRequest()

    // Wrong length
    await expect(
      rpc.auth.signIn({
        json: {
          code: "1122445",
          email,
        },
      })
    ).toBeHTTPBadRequest()

    // Not an email
    await expect(
      rpc.auth.signIn({
        json: {
          code,
          email: "azerty",
        },
      })
    ).toBeHTTPBadRequest()
  })

  it("rejects invalid OTP", async ({ expect }) => {
    const rpc = rpcFactory()
    const email = generateTestSpecificEmail(expect)

    await rpc.auth.requestOTP({ json: { email } })
    const code = await getOTP(email)
    const wrongCode = ((Number.parseInt(code) + 1) % 1000000).toString()

    await expect(
      rpc.auth.signIn({
        json: {
          code: wrongCode,
          email,
        },
      })
    ).toBeHTTPOk({
      error: "invalid_or_expired_code",
    })
  })

  it("rejects sign-in attemps with the correct code when not signed-up", async ({
    expect,
  }) => {
    const rpc = rpcFactory()
    const email = generateTestSpecificEmail(expect)

    await rpc.auth.requestOTP({ json: { email } })
    const code = await getOTP(email)
    await expect(
      rpc.auth.signIn({
        json: {
          code,
          email,
        },
      })
    ).toBeHTTPOk({
      error: "user_does_not_exist",
    })
  })

  it("accepts sign-ins from a previously signed-up user", async ({
    expect,
  }) => {
    const rpc = rpcFactory()
    const email = generateTestSpecificEmail(expect)

    await signUpWrapper(expect, rpc, email)

    await signInWrapper(expect, rpc, email)
  })

  it("rejects subsequent attempts to sign-in with the same code", async ({
    expect,
  }) => {
    const rpc = rpcFactory()
    const email = generateTestSpecificEmail(expect)

    await signUpWrapper(expect, rpc, email)
    const code = await signInWrapper(expect, rpc, email)

    await expect(
      rpc.auth.signIn({
        json: {
          code,
          email,
        },
      })
    ).toBeHTTPOk({
      error: "invalid_or_expired_code",
    })
  })
})
