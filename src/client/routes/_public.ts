import { getUserFromLocalStorage } from "#client/auth"
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router"

export const Route = createFileRoute("/_public")({
  beforeLoad: () => {
    const administrator = getUserFromLocalStorage("administrator")
    if (administrator) throw redirect({ to: "/admin" })
  },
  component: Outlet,
})
