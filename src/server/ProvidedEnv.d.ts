declare module "cloudflare:test" {
  interface ProvidedEnv extends Env {
    DB: D1Database
    UCOLORR: Service
    TEST_MIGRATIONS: D1Migration[]
  }
}
