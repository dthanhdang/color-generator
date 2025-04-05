/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";

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
  server: {
    proxy: {
      "/api": {
        changeOrigin: true,
        target: "http://localhost:3000",
      },
    },
  },
  test: {
    css: true,
    environment: "jsdom",
    globals: true,
    include: ["./src/client/**/*.test.{ts,tsx}"],
    restoreMocks: true,
    setupFiles: ["./src/client/test/setup/index.ts"],
  },
});
