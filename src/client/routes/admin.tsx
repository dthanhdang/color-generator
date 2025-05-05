import { checkIsAdministrator } from "#client/auth"
import { createFileRoute, Outlet } from "@tanstack/react-router"

export const Route = createFileRoute("/admin")({
  beforeLoad: () => {
    checkIsAdministrator()
  },
  component: Outlet,
})
