import type { FunctionComponent } from "react"

import { QueryClient } from "@tanstack/react-query"
import {
  createRootRouteWithContext,
  createRouter,
  RouterProvider,
} from "@tanstack/react-router"

import { queryClient } from "./queryClient.js"
import { TestAppWrapper } from "./TestAppWrapper.jsx"

const rootRoute = createRootRouteWithContext<MyRouterContext>()({})

type MyRouterContext = {
  queryClient: QueryClient
}

const router = createRouter({
  context: {
    queryClient,
  },
  routeTree: rootRoute,
})

type TestAppWrapperWithRouterProviderProps = { Component: FunctionComponent }

export function AppWrapperWithRouterProvider({
  Component,
  ...props
}: TestAppWrapperWithRouterProviderProps): React.JSX.Element {
  return (
    <TestAppWrapper {...props}>
      <RouterProvider
        context={{ queryClient }}
        defaultComponent={Component}
        router={router}
      />
    </TestAppWrapper>
  )
}
