import { createRoot } from "react-dom/client"
import { createRouter, RouterProvider } from "@tanstack/react-router"
import { routeTree } from "./_generated/tanstack-router/routeTree.gen.ts"
import { AppWrapper } from "#components/app_wrapper/AppWrapper.tsx"
import { queryClient } from "#client/tanstack/query/client"
import { ErrorPage, NotFoundPage } from "#client/pages/error"

import "./index.css"

// Create a new router instance
const router = createRouter({
  context: { queryClient },
  defaultErrorComponent: ErrorPage,
  defaultNotFoundComponent: NotFoundPage,
  routeTree,
})

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
