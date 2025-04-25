import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./index.css"
//import { App } from "./App.tsx"
import { MantineProvider } from "@mantine/core"
//import { LandingPage } from "#pages/landing"
import { createRouter, RouterProvider } from "@tanstack/react-router"
import { routeTree } from "./routeTree.gen"

// Create a new router instance
const router = createRouter({ routeTree })

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router
  }
}

const inputClassNames = {
  description: "text-base",
  error: "text-lg",
  label: "text-lg font-[Inter] text-[#707070]",
  root: "flex flex-col gap-1",
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MantineProvider
      theme={{
        components: {
          InputWrapper: {
            classNames: inputClassNames,
          },
          Textarea: {
            classNames: {
              ...inputClassNames,
              input: "text-lg font-[Inter] text-[#202020]",
            },
          },
          TextInput: {
            classNames: {
              ...inputClassNames,
              input: "text-lg rounded-sm font-[Inter] text-[#202020]",
            },
          },
        },
      }}
    >
      {/*<App />*/}
      {/*<LandingPage />*/}
      <RouterProvider router={router} />
    </MantineProvider>
  </StrictMode>
)
