import { buildHono } from "#server/hono"
import { dbProps, defaultResponse } from "@meow-meow-dev/server-utilities/hono"
import { vValidator } from "@meow-meow-dev/server-utilities/validation"

import { requestOTPHandler, requestOTPJSONSchema } from "./requestOTPHandler.js"

export const requestOtpRoute = buildHono().post(
  "/",
  vValidator("json", requestOTPJSONSchema),
  (c) =>
    defaultResponse(
      c,
      requestOTPHandler({ ...dbProps(c), ...c.req.valid("json") })
    )
)
