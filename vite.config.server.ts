import type { UserConfig } from "vite"

import build from "@hono/vite-cloudflare-pages"
import devServer from "@hono/vite-dev-server"
import cloudflareAdapter from "@hono/vite-dev-server/cloudflare"
import { generateDotenv } from "@meow-meow-dev/vite-plugin-generate-dotenv"
import { defineConfig } from "vite"

export default defineConfig(({ mode }): UserConfig => {
  const entry = "src/server/index.ts"

  const isDev = mode === "development"
  let devServerPlugin
  if (isDev) {
    devServerPlugin = devServer({
      adapter: cloudflareAdapter,
      entry,
    })
  }

  return {
    cacheDir: ".vite/server",
    plugins: [
      build({
        entry,
      }),
      devServerPlugin,
      generateDotenv({
        outputFile: ".dev.vars",
        prefix: "UCOLORR_DEVELOPMENT_",
        requiredKeys: ["CONTACT_EMAIL", "RESEND_API_KEY"],
      }),
    ],
    // Cf https://github.com/facebook/react/issues/31827
    resolve: {
      alias: [
        { find: "react-dom/server", replacement: "react-dom/server.edge" },
      ],
    },
    server: {
      port: 3000,
    },
  }
})
