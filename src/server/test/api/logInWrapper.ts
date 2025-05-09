import type { ExpectStatic } from "vitest"

import type { RPCFactoryOutput } from "./rpcFactory.js"

import { getOTP } from "./getOTP.js"

export async function logInWrapper(
  expect: ExpectStatic,
  { auth: { requestOTP, logIn } }: RPCFactoryOutput,
  email: string
): Promise<string> {
  await expect(requestOTP({ json: { email } })).toBeHTTPOk()

  const code = await getOTP(email)
  await expect(
    logIn({
      json: { code, email },
    })
  ).toBeHTTPOk(expect.objectContaining({ idToken: expect.any(String) }))

  return code
}
