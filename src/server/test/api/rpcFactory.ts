import type { AuthType } from "#server/routes"

export type RPCFactoryOutput = {
  auth: {
    requestOTP: AuthApi["request-otp"]["$post"]
    signIn: AuthApi["sign-in"]["$post"]
    signOut: AuthApi["sign-out"]["$post"]
    signUp: AuthApi["sign-up"]["$post"]
  }
}

import { mergeHeaders } from "@meow-meow-dev/server-utilities/http/headers"
import { env } from "cloudflare:test"
import { hc } from "hono/client"

type AuthApi = ReturnType<typeof hc<AuthType>>

export function rpcFactory(): RPCFactoryOutput {
  let setCookie: string | undefined

  const fetchWithAccessToken = async (
    input: globalThis.Request | string | URL,
    init?: RequestInit
  ): Promise<Response> => {
    const fetch = env.CHROMA_GEN.fetch.bind(env.CHROMA_GEN)

    const initWithCookie: RequestInit = init ?? {}
    if (setCookie)
      initWithCookie.headers = mergeHeaders(initWithCookie.headers ?? {}, {
        cookie: setCookie,
      })

    const response = await fetch(input, initWithCookie)
    setCookie = response.headers.get("Set-Cookie") ?? setCookie

    return response
  }

  const authApi = hc<AuthType>("http://localhost:5173/api/v1/auth", {
    fetch: fetchWithAccessToken,
  })

  return {
    auth: {
      requestOTP: authApi["request-otp"].$post,
      signIn: authApi["sign-in"].$post,
      signOut: authApi["sign-out"].$post,
      signUp: authApi["sign-up"].$post,
    },
  }
}
