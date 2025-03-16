import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./index.css"
import { App } from "./App.tsx"
import { MantineProvider } from "@mantine/core"
import { LandingPage } from "#pages/landing"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MantineProvider>
      {/*<App />*/}
      <LandingPage />
    </MantineProvider>
  </StrictMode>
)
