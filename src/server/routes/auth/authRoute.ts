import { buildHono } from "#server/hono"

import { requestOtpRoute } from "./request-otp/requestOtpRoute.js"
import { logInRoute } from "./log-in/logInRoute.js"
import { logOutRoute } from "./log-out/logOutRoute.js"
import { registerRoute } from "./register/registerRoute.js"

export const authRoute = buildHono()
  .route("/request-otp", requestOtpRoute)
  .route("/log-in", logInRoute)
  .route("/log-out", logOutRoute)
  .route("/register", registerRoute)

export type AuthType = typeof authRoute
