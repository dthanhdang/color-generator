import * as React from "react"

import {
  Link,
  Outlet,
  createRootRouteWithContext,
} from "@tanstack/react-router"
import { QueryClient } from "@tanstack/react-query"
import { Authenticated } from "#components/authenticated/Authenticated.tsx"
import { Header } from "../pages/landing/Header" // TODO move header to components
import { useAuthentication } from "#client/hooks"
import { buildPublicPageProps } from "#utils/buildPageProps.ts"

type MyRouterContext = {
  queryClient: QueryClient
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: RootComponent,
  loader: () => ({
    ...buildPublicPageProps("Home", {
      seoDescription:
        "Ucolorr allows you to quickly and easily create many kinds of different color palettes",
    }),
    crumb: "Home",
  }),
})

function RootComponent() {
  const { user } = useAuthentication()

  return (
    <React.Fragment>
      <div>
        <Header />{" "}
        {user?.role === "administrator" ? null : (
          <nav className="container mx-auto flex items-center justify-center py-4 px-6 mt-10">
            <div className="flex gap-6 bg-gray-50 px-6 py-3 rounded-full shadow-sm items-center">
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
              <Link
                to="/contrast-checker"
                className="hover:text-indigo-600 transition-colors"
              >
                Contrast Checker
              </Link>
              <Link
                to="/palettes-explorer"
                className="hover:text-indigo-600 transition-colors"
              >
                Palettes Explorer
              </Link>
              <Authenticated>
                <Link
                  className="hover:text-indigo-600 transition-colors"
                  to="/my-palettes"
                >
                  My Palettes
                </Link>
              </Authenticated>
            </div>
          </nav>
        )}
      </div>
      <Outlet />

      <div id="portal-container" />
    </React.Fragment>
  )
}
