import * as React from "react"
import { Link, Outlet, createRootRoute } from "@tanstack/react-router"

export const Route = createRootRoute({
  component: RootComponent,
  loader: () => ({
    crumb: "Home",
    seoDescription:
      "ChromaGen allows you to quickly and easily create many kinds of different color palettes",
    pageTitle: "Home",
    seoTitle: "Home",
  }),
})

function RootComponent() {
  return (
    <React.Fragment>
      <div>
        {" "}
        <nav className="container mx-auto flex items-center justify-between py-4 px-6 mt-10">
          <Link to="/scale-palette">Scale Palette</Link>
          <Link to="/harmony-palette">Harmony Palette</Link>
          <Link to="/image-picker">Image Picker</Link>
          <Link to="/random-palette">Random Palette</Link>
        </nav>
      </div>
      <Outlet />
    </React.Fragment>
  )
}
