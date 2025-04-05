import { getOTP, rpcFactory, signUpWrapper } from "#server/test/api"
import { generateTestSpecificEmail } from "#server/test/generators"
import { describe, it } from "vitest"

const signUpProps = {
  firstName: "John",
  lastName: "Doe",
}

describe("signUp", () => {
  it("rejects invalid requests", async ({ expect }) => {
    const rpc = rpcFactory()
    const email = generateTestSpecificEmail(expect)

    await rpc.auth.requestOTP({ json: { email } })
    const code = await getOTP(email)

    // Non numerical
    await expect(
      rpc.auth.signUp({
        json: {
          ...signUpProps,
          code: "AbCdEf",
          email,
        },
      })
    ).toBeHTTPBadRequest()

    // Wrong length
    await expect(
      rpc.auth.signUp({
        json: {
          ...signUpProps,
          code: "1122445",
          email,
        },
      })
    ).toBeHTTPBadRequest()

    // Not an email
    await expect(
      rpc.auth.signUp({
        json: {
          ...signUpProps,
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
      rpc.auth.signUp({
        json: {
          ...signUpProps,
          code: wrongCode,
          email,
        },
      })
    ).toBeHTTPOk({
      error: "invalid_or_expired_code",
    })
  })

  it("accepts the correct code", async ({ expect }) => {
    const rpc = rpcFactory()
    const email = generateTestSpecificEmail(expect)

    await signUpWrapper(expect, rpc, email)
  })

  it("rejects subsequent attempts to sign-up with the same code", async ({
    expect,
  }) => {
    const rpc = rpcFactory()
    const email = generateTestSpecificEmail(expect)

    await rpc.auth.requestOTP({ json: { email } })
    const code = await getOTP(email)

    await expect(
      rpc.auth.signUp({
        json: {
          ...signUpProps,
          code,
          email,
        },
      })
    ).toBeHTTPOk({
      idToken: expect.any(String),
    })

    await expect(
      rpc.auth.signUp({
        json: {
          ...signUpProps,
          code,
          email,
        },
      })
    ).toBeHTTPOk({
      error: "invalid_or_expired_code",
    })
  })

  it("rejects duplicate attemps to sign-up with the same email", async ({
    expect,
  }) => {
    const rpc = rpcFactory()
    const email = generateTestSpecificEmail(expect)

    await signUpWrapper(expect, rpc, email)

    await rpc.auth.requestOTP({ json: { email } })
    const code = await getOTP(email)

    await expect(
      rpc.auth.signUp({
        json: {
          ...signUpProps,
          code,
          email,
        },
      })
    ).toBeHTTPOk({
      error: "user_already_exists",
    })
  })
})
