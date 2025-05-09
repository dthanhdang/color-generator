import { accessTokenCookieName, generateTokens } from "#server/auth/jwt"
import { buildHono } from "#server/hono"
import { setAccesTokenCookieFromUser } from "@meow-meow-dev/server-utilities/cookie"
import { dbProps } from "@meow-meow-dev/server-utilities/hono"
import { httpErrorFromHTTPErrorType } from "@meow-meow-dev/server-utilities/http/status"
import { vValidator } from "@meow-meow-dev/server-utilities/validation"

import { registerHandler, registerJsonSchema } from "./registerHandler.js"

export const registerRoute = buildHono().post(
  "/",
  vValidator("json", registerJsonSchema),
  async (c) => {
    const jsonProps = c.req.valid("json")

    return registerHandler({ ...dbProps(c), ...jsonProps })
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
            case "administrator_already_exists":
            case "invalid_or_expired_code":
            case "user_already_exists":
              return c.json({ error }, 200)
            default:
              return httpErrorFromHTTPErrorType(c)(error)
          }
        }
      )
  }
)
