import {
  createRouter,
  createRoute,
  createRootRoute,
} from "@tanstack/react-router"
import { LandingPage } from "#pages/landing"
import { ScalePaletteGenerator } from "#pages/scale_palette"
import { RandomPalette } from "#pages/random"
import { HarmonyPalette } from "#pages/harmony_palette"
import { ImagePicker } from "#pages/image_picker"

const rootRoute = createRootRoute({
  component: LandingPage,
})

const scalePaletteRoute = createRoute({
  path: "/scale-palette",
  component: ScalePaletteGenerator,
  getParentRoute: () => rootRoute,
})

const harmonyPaletteRoute = createRoute({
  path: "/harmony-palette",
  component: HarmonyPalette,
  getParentRoute: () => rootRoute,
})

const imagePickerRoute = createRoute({
  path: "/image-picker",
  component: ImagePicker,
  getParentRoute: () => rootRoute,
})

const randomPaletteRoute = createRoute({
  path: "/random-palette",
  component: RandomPalette,
  getParentRoute: () => rootRoute,
})

const routeTree = rootRoute.addChildren([
  scalePaletteRoute,
  harmonyPaletteRoute,
  imagePickerRoute,
  randomPaletteRoute,
])
export const router = createRouter({ routeTree })

{
  /*declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router
  }
}*/
}
