import {
  defineWorkersProject,
  readD1Migrations,
} from "@cloudflare/vitest-pool-workers/config";
import path from "node:path";

export default defineWorkersProject(async () => {
  const migrationsPath = path.join(import.meta.dirname, "migrations");
  const migrations = await readD1Migrations(migrationsPath);

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
              TEST_MIGRATIONS: migrations,
            },
          },
          singleWorker: true,
          wrangler: {
            configPath: "./wrangler.toml",
          },
        },
      },
      server: { sourcemap: true },
      setupFiles: ["src/server/test/setup/index.ts"],
    },
  };
});
