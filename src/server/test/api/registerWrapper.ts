import type { ExpectStatic } from "vitest"

import type { RPCFactoryOutput } from "./rpcFactory.js"

import { getOTP } from "./getOTP.js"

export async function registerWrapper(
  expect: ExpectStatic,
  { auth: { register, requestOTP } }: RPCFactoryOutput,
  email: string
): Promise<void> {
  await expect(requestOTP({ json: { email } })).toBeHTTPOk()

  const code = await getOTP(email)
  await expect(
    register({
      json: {
        code,
        email,
        firstName: "John",
        lastName: "Doe",
      },
    })
  ).toBeHTTPOk(expect.objectContaining({ idToken: expect.any(String) }))
}
