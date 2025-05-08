import { buildHono, getEnvironmentVariables } from "#server/hono"
import { dbProps, defaultResponse } from "@meow-meow-dev/server-utilities/hono"
import { vValidator } from "@meow-meow-dev/server-utilities/validation"

import { requestOTPHandler, requestOTPJSONSchema } from "./requestOTPHandler.js"

export const requestOtpRoute = buildHono().post(
  "/",
  vValidator("json", requestOTPJSONSchema),
  (c) => {
    const developmentMode =
      c.env.CF_PAGES === undefined &&
      c.env.SEND_OTP_VIA_EMAIL_IN_DEVELOPMENT === undefined

    return defaultResponse(
      c,
      getEnvironmentVariables(c, [
        "RESEND_API_KEY",
        "OTP_SENDER_EMAIL",
      ]).asyncAndThen(([resendApiKey, sender]) =>
        requestOTPHandler({
          ...dbProps(c),
          developmentMode,
          recipient: c.req.valid("json").email,
          resendApiKey,
          sender,
        })
      )
    )
  }
)
