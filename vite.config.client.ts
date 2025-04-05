/// <reference types="vitest" />
import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"
import { TanStackRouterVite } from "@tanstack/router-plugin/vite"

// https://vite.dev/config/
export default defineConfig({
  cacheDir: ".vite/client",
  plugins: [
    tailwindcss(),
    TanStackRouterVite({
      target: "react",
      routesDirectory: "./src/client/routes",
      generatedRouteTree: "./src/client/routeTree.gen.ts",
      autoCodeSplitting: true,
    }),
    react(),
    // ...,
  ],
  // root: "./src/client",
  server: {
    proxy: {
      "/api": {
        changeOrigin: true,
        target: "http://localhost:3000",
      },
    },
  },
  // Paths are relative to root (./src/client)
  test: {
    css: true,
    environment: "jsdom",
    globals: true,
    include: ["./**/*.test.{ts,tsx}"],
    restoreMocks: true,
    setupFiles: ["./test/setup/index.ts"],
  },
})
