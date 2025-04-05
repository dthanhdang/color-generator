import { createRoot } from "react-dom/client"
import "./index.css"
//import { App } from "./App.tsx"
//import { LandingPage } from "#pages/landing"
import { createRouter, RouterProvider } from "@tanstack/react-router"
import { routeTree } from "./routeTree.gen"
import { AppWrapper } from "#client/components/app_wrapper"
import { queryClient } from "#client/tanstack/query/client"

// Create a new router instance
const router = createRouter({ context: { queryClient }, routeTree })

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router
  }
}

createRoot(document.getElementById("root")!).render(
  <AppWrapper queryClient={queryClient}>
    <RouterProvider router={router} />
  </AppWrapper>
)
