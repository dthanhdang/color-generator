import * as React from "react"

import {
  //Link,
  Outlet,
  createRootRouteWithContext,
} from "@tanstack/react-router"
import { QueryClient } from "@tanstack/react-query"

import { Header } from "../pages/landing/Header" // TODO move header to components
import Navbar from "../pages/landing/NavBar"
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
      <div className="sticky top-0 z-50 bg-white shadow">
        <Header />
        {user?.role === "administrator" ? null : <Navbar />}
      </div>
      <Outlet />
    </React.Fragment>
  )
}
