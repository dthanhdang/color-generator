import { checkIsAdministrator } from "#client/auth"
import { buildAdminPageProps } from "#utils/buildPageProps.ts"
import { createFileRoute, Outlet } from "@tanstack/react-router"

export const Route = createFileRoute("/admin")({
  beforeLoad: () => {
    checkIsAdministrator()
  },
  loader: () => buildAdminPageProps("Admin"),
  component: Outlet,
})
