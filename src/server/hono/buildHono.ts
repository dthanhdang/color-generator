import { Hono } from "hono";

export type EnvironmentVariableKey =
  | "CF_PAGES_URL"
  | "JWT_SECRET"
  | "STRIPE_SECRET_KEY"
  | "STRIPE_WEBHOOK_SECRET";

export type HonoEnv = {
  Bindings: Record<EnvironmentVariableKey, string | undefined> & {
    ASSETS?: Fetcher;
    DB: D1Database;
  };
};

export function buildHono(): Hono<HonoEnv> {
  return new Hono<HonoEnv>();
}
