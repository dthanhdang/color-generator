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
        <nav className="container mx-auto flex items-center justify-center py-4 px-6 mt-10">
          <div className="flex gap-6 bg-gray-50 px-6 py-3 rounded-full shadow-sm">
            {" "}
            <Link
              to="/scale-palette"
              className="hover:text-indigo-600 transition-colors"
            >
              Scale Palette
            </Link>
            <Link
              to="/harmony-palette"
              className="hover:text-indigo-600 transition-colors"
            >
              Harmony Palette
            </Link>
            <Link
              to="/image-picker"
              className="hover:text-indigo-600 transition-colors"
            >
              Image Picker
            </Link>
            <Link
              to="/random-palette"
              className="hover:text-indigo-600 transition-colors"
            >
              Random Palette
            </Link>
          </div>
        </nav>
      </div>
      <Outlet />
    </React.Fragment>
  )
}
