import type { ExpectStatic } from "vitest"

import type { RPCFactoryOutput } from "./rpcFactory.js"

import { getOTP } from "./getOTP.js"

export async function signInWrapper(
  expect: ExpectStatic,
  { auth: { requestOTP, signIn } }: RPCFactoryOutput,
  email: string
): Promise<string> {
  await expect(requestOTP({ json: { email } })).toBeHTTPOk()

  const code = await getOTP(email)
  await expect(
    signIn({
      json: { code, email },
    })
  ).toBeHTTPOk(expect.objectContaining({ idToken: expect.any(String) }))

  return code
}
