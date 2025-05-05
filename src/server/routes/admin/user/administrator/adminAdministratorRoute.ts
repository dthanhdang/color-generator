import { buildHono, getEnvironmentVariables } from "#server/hono"
import { vValidator } from "@meow-meow-dev/server-utilities/validation"
import {
  createAdministratorHandler,
  createAdministratorJSONSchema,
} from "./createAdministratorHandler.ts"
import { checkPermissions } from "#server/auth/jwt"
import { authProps, dbProps } from "@meow-meow-dev/server-utilities/hono"
import { httpErrorFromHTTPErrorType } from "@meow-meow-dev/server-utilities/http/status"

export const adminAdministratorRoute = buildHono().post(
  "/",
  checkPermissions("users:write"),
  vValidator("json", createAdministratorJSONSchema),
  (c) =>
    getEnvironmentVariables(c, ["CONTACT_SENDER_EMAIL", "RESEND_API_KEY"])
      .asyncAndThen(([contactEmail, resendApiKey]) =>
        createAdministratorHandler({
          ...authProps(c),
          ...dbProps(c),
          ...c.req.valid("json"),
          contactEmail,
          resendApiKey,
        })
      )
      .match(
        (user) => c.json({ user }, 200),
        (error) => {
          if (error === "user_already_exists") return c.json({ error }, 200)
          else return httpErrorFromHTTPErrorType(c)(error)
        }
      )
)
