import { accessTokenCookieName, generateTokens } from "#server/auth/jwt"
import { buildHono } from "#server/hono"
import { setAccesTokenCookieFromUser } from "@meow-meow-dev/server-utilities/cookie"
import { dbProps } from "@meow-meow-dev/server-utilities/hono"
import { httpErrorFromHTTPErrorType } from "@meow-meow-dev/server-utilities/http/status"
import { vValidator } from "@meow-meow-dev/server-utilities/validation"

import { logInHandler, logInJSONSchema } from "./logInHandler.js"

export const logInRoute = buildHono().post(
  "/",
  vValidator("json", logInJSONSchema),
  async (c) => {
    return logInHandler({ ...dbProps(c), ...c.req.valid("json") })
      .andThen((user) =>
        setAccesTokenCookieFromUser({
          accessTokenCookieName,
          c,
          tokensGenerator: generateTokens,
          user,
        })
      )
      .match(
        (idToken) => c.json({ idToken }, 200),
        (error) => {
          switch (error) {
            case "invalid_or_expired_code":
              return c.json({ error }, 200)
            case "not_found":
              return c.json({ error: "user_does_not_exist" as const }, 200)
            default:
              return httpErrorFromHTTPErrorType(c)(error)
          }
        }
      )
  }
)
