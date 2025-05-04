import { buildHono, getEnvironmentVariable } from "#server/hono"
import { vValidator } from "@meow-meow-dev/server-utilities/validation"
import { sendEmailHandler, sendEmailJsonSchema } from "./sendEmailHandler.js"
import { defaultResponse } from "@meow-meow-dev/server-utilities/hono"
import { Result } from "neverthrow"

export const contactRoute = buildHono().post(
  "/",
  vValidator("json", sendEmailJsonSchema),
  async (c) => {
    return defaultResponse(
      c,
      Result.combine([
        getEnvironmentVariable(c, "CONTACT_EMAIL"),
        getEnvironmentVariable(c, "RESEND_API_KEY"),
      ]).asyncAndThen(([contactEmail, resendApiKey]) =>
        sendEmailHandler({
          ...c.req.valid("json"),
          contactEmail,
          resendApiKey,
        })
      )
    )
  }
)

export type ContactType = typeof contactRoute
