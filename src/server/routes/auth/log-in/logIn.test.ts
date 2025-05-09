import {
  getOTP,
  rpcFactory,
  logInWrapper,
  registerWrapper,
} from "#server/test/api"
import { generateTestSpecificEmail } from "#server/test/generators"
import { describe, it } from "vitest"

describe("logIn", () => {
  it("rejects invalid requests", async ({ expect }) => {
    const rpc = rpcFactory()
    const email = generateTestSpecificEmail(expect)

    await rpc.auth.requestOTP({ json: { email } })
    const code = await getOTP(email)
    // Non numerical
    await expect(
      rpc.auth.logIn({
        json: {
          code: "AbCdEf",
          email,
        },
      })
    ).toBeHTTPBadRequest()

    // Wrong length
    await expect(
      rpc.auth.logIn({
        json: {
          code: "1122445",
          email,
        },
      })
    ).toBeHTTPBadRequest()

    // Not an email
    await expect(
      rpc.auth.logIn({
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
      rpc.auth.logIn({
        json: {
          code: wrongCode,
          email,
        },
      })
    ).toBeHTTPOk({
      error: "invalid_or_expired_code",
    })
  })

  it("rejects log-in attemps with the correct code when not loged-up", async ({
    expect,
  }) => {
    const rpc = rpcFactory()
    const email = generateTestSpecificEmail(expect)

    await rpc.auth.requestOTP({ json: { email } })
    const code = await getOTP(email)
    await expect(
      rpc.auth.logIn({
        json: {
          code,
          email,
        },
      })
    ).toBeHTTPOk({
      error: "user_does_not_exist",
    })
  })

  it("accepts log-ins from a previously loged-up user", async ({ expect }) => {
    const rpc = rpcFactory()
    const email = generateTestSpecificEmail(expect)

    await registerWrapper(expect, rpc, email)

    await logInWrapper(expect, rpc, email)
  })

  it("rejects subsequent attempts to log-in with the same code", async ({
    expect,
  }) => {
    const rpc = rpcFactory()
    const email = generateTestSpecificEmail(expect)

    await registerWrapper(expect, rpc, email)
    const code = await logInWrapper(expect, rpc, email)

    await expect(
      rpc.auth.logIn({
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
