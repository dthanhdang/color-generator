import { accessTokenCookieName } from "#server/auth/jwt"
import { buildHono } from "#server/hono"
import { getHTTPOnlyCookieOptions } from "@meow-meow-dev/server-utilities/cookie"
import { ok } from "@meow-meow-dev/server-utilities/http/status"
import { deleteCookie } from "hono/cookie"

export const signOutRoute = buildHono().post("/", (c) => {
  deleteCookie(c, accessTokenCookieName, getHTTPOnlyCookieOptions())

  return ok(c)
})
