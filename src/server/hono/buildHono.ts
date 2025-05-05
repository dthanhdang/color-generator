import { Hono } from "hono"

export type EnvironmentVariableKey =
  | "CF_PAGES_URL"
  | "CONTACT_SENDER_EMAIL"
  | "JWT_SECRET"
  | "OTP_SENDER_EMAIL"
  | "RESEND_API_KEY"

export type HonoEnv = {
  Bindings: Record<EnvironmentVariableKey, string | undefined> & {
    ASSETS?: Fetcher
    CF_PAGES?: "1" | undefined
    DB: D1Database
    SEND_OTP_VIA_EMAIL_IN_DEVELOPMENT: unknown
  }
}

export function buildHono(): Hono<HonoEnv> {
  return new Hono<HonoEnv>()
}
