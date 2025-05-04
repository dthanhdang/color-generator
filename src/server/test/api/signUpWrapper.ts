import type { ExpectStatic } from "vitest"

import type { RPCFactoryOutput } from "./rpcFactory.js"

import { getOTP } from "./getOTP.js"

export async function signUpWrapper(
  expect: ExpectStatic,
  { auth: { requestOTP, signUp } }: RPCFactoryOutput,
  email: string,
  role?: "administrator"
): Promise<void> {
  await expect(requestOTP({ json: { email } })).toBeHTTPOk()

  const code = await getOTP(email)
  await expect(
    signUp({
      json: {
        code,
        email,
        firstName: "John",
        lastName: "Doe",
        role,
      },
    })
  ).toBeHTTPOk(expect.objectContaining({ idToken: expect.any(String) }))
}
