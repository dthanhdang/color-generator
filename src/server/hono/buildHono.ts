import { Hono } from "hono"

export type EnvironmentVariableKey =
  | "CF_PAGES_URL"
  | "CONTACT_EMAIL"
  | "RESEND_API_KEY"

export type HonoEnv = {
  Bindings: Record<EnvironmentVariableKey, string | undefined> & {
    ASSETS?: Fetcher
    DB: D1Database
  }
}

export function buildHono(): Hono<HonoEnv> {
  return new Hono<HonoEnv>()
}
