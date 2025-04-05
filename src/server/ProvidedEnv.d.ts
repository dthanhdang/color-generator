declare module "cloudflare:test" {
  interface ProvidedEnv extends Env {
    DB: D1Database;
    CHROMA_GEN: Service;
    TEST_MIGRATIONS: D1Migration[];
  }
}
