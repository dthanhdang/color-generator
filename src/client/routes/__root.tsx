import * as React from "react"

import {
  //Link,
  Outlet,
  createRootRouteWithContext,
} from "@tanstack/react-router"
import { QueryClient } from "@tanstack/react-query"

import { Header } from "../pages/landing/Header" // TODO move header to components
import Navbar from "../pages/landing/NavBar"

type MyRouterContext = {
  queryClient: QueryClient
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: RootComponent,
  loader: () => ({
    crumb: "Home",
    seoDescription:
      "Ucolorr allows you to quickly and easily create many kinds of different color palettes",
    pageTitle: "Home",
    seoTitle: "Home",
  }),
})

function RootComponent() {
  return (
    <React.Fragment>
      <div className="sticky top-0 z-50 bg-white shadow">
        <Header />
        <Navbar />
      </div>
      <Outlet />
    </React.Fragment>
  )
}
