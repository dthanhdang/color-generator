import type {
  AuthType,
  CurrentUserType,
  PublicPaletteType,
} from "#server/routes"
import { mergeHeaders } from "@meow-meow-dev/server-utilities/http/headers"
import { env } from "cloudflare:test"
import { hc } from "hono/client"
export type RPCFactoryOutput = {
  auth: {
    requestOTP: AuthApi["request-otp"]["$post"]
    logIn: AuthApi["log-in"]["$post"]
    logOut: AuthApi["log-out"]["$post"]
    register: AuthApi["register"]["$post"]
  }
  currentUser: {
    get: CurrentUserApi["index"]["$get"]
    listFavoritePalettes: CurrentUserApi["palette"]["favorite"]["$get"]
    toggleFavoritePalette: CurrentUserApi["palette"]["favorite"]["$post"]
  }
  publicPalette: {
    getPublicPalette: PublicPaletteApi[":palette-id"]["$get"]
  }
}

type AuthApi = ReturnType<typeof hc<AuthType>>
type CurrentUserApi = ReturnType<typeof hc<CurrentUserType>>
type PublicPaletteApi = ReturnType<typeof hc<PublicPaletteType>>

export function rpcFactory(): RPCFactoryOutput {
  let setCookie: string | undefined

  const fetchWithAccessToken = async (
    input: globalThis.Request | string | URL,
    init?: RequestInit
  ): Promise<Response> => {
    const fetch = env.UCOLORR.fetch.bind(env.UCOLORR)

    const initWithCookie: RequestInit = init ?? {}
    if (setCookie) {
      initWithCookie.headers = mergeHeaders(initWithCookie.headers ?? {}, {
        cookie: setCookie,
      })
    }

    const response = await fetch(input, initWithCookie)
    setCookie = response.headers.get("Set-Cookie") ?? setCookie

    return response
  }

  const authApi = hc<AuthType>("http://localhost:5173/api/v1/auth", {
    fetch: fetchWithAccessToken,
  })

  const currentUserApi = hc<CurrentUserType>(
    "http://localhost:5173/api/v1/current-user",
    {
      fetch: fetchWithAccessToken,
    }
  )

  const publicPaletteApi = hc<PublicPaletteType>(
    "http://localhost:5173/api/v1/public-palette",
    {
      fetch: fetchWithAccessToken,
    }
  )

  return {
    auth: {
      requestOTP: authApi["request-otp"].$post,
      logIn: authApi["log-in"].$post,
      logOut: authApi["log-out"].$post,
      register: authApi.register.$post,
    },
    currentUser: {
      toggleFavoritePalette: currentUserApi.palette.favorite.$post,
      get: currentUserApi.index.$get,
      listFavoritePalettes: currentUserApi.palette.favorite.$get,
    },
    publicPalette: {
      getPublicPalette: publicPaletteApi[":palette-id"].$get,
    },
  }
}
