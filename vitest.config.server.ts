import { defineWorkersProject } from "@cloudflare/vitest-pool-workers/config"

export default defineWorkersProject(async () => {
  return {
    test: {
      coverage: {
        include: ["./src/server/**/*.ts"],
        provider: "istanbul",
      },
      env: {
        VITEST: "true",
      },
      include: ["./src/server/**/*.test.ts"],
      poolOptions: {
        workers: {
          main: "./src/server/index.ts",
          miniflare: {
            bindings: {
              CF_PAGES_URL: "http://localhost:5173",
            },
          },
          singleWorker: true,
          wrangler: {
            configPath: "./wrangler.toml",
          },
        },
      },
      setupFiles: ["src/server/test/setup/index.ts"],
    },
  }
})
