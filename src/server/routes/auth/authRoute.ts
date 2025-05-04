import { buildHono } from "#server/hono"

import { requestOtpRoute } from "./request-otp/requestOtpRoute.js"
import { signInRoute } from "./sign-in/signInRoute.js"
import { signOutRoute } from "./sign-out/signOutRoute.js"
import { signUpRoute } from "./sign-up/signUpRoute.js"

export const authRoute = buildHono()
  .route("/request-otp", requestOtpRoute)
  .route("/sign-in", signInRoute)
  .route("/sign-out", signOutRoute)
  .route("/sign-up", signUpRoute)

export type AuthType = typeof authRoute
