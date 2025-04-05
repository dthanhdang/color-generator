import { Fragment } from "react"
import {
  Link,
  Outlet,
  createRootRouteWithContext,
} from "@tanstack/react-router"
import { QueryClient } from "@tanstack/react-query"
import { Authenticated } from "#components/authenticated/Authenticated.tsx"

type MyRouterContext = {
  queryClient: QueryClient
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: RootComponent,
})

function RootComponent() {
  return (
    <Fragment>
      <div>
        {" "}
        <nav className="container mx-auto flex items-center justify-between py-4 px-6 mt-10">
          <Link to="/scale-palette">Scale Palette</Link>
          <Link to="/harmony-palette">Harmony Palette</Link>
          <Link to="/image-picker">Image Picker</Link>
          <Link to="/random-palette">Random Palette</Link>
          <Authenticated>
            <Link to="/my-palettes">My Palettes</Link>
          </Authenticated>
        </nav>
      </div>
      <Outlet />
    </Fragment>
  )
}
