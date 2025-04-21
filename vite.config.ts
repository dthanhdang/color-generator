import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"
import { TanStackRouterVite } from "@tanstack/router-plugin/vite"

// https://vite.dev/config/
export default defineConfig({
  // TODO enable in dev only
  // // build: { sourcemap: true },
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
})
