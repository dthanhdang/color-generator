/// <reference types="vitest" />
import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"
import { TanStackRouterVite } from "@tanstack/router-plugin/vite"

export default defineConfig({
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
  server: {
    cors: true,
    host: true,
    port: 5173,
    proxy: {
      "/api": {
        changeOrigin: true,
        secure: false,
        target: `http://localhost:3000`,
      },
    },
    strictPort: true,
  },
  test: {
    css: true,
    environment: "jsdom",
    globals: true,
    include: ["./src/client/**/*.test.{ts,tsx}"],
    restoreMocks: true,
    setupFiles: ["./src/client/test/setup.ts"],
  },
})
