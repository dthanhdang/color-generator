import { DashboardPage } from "#client/pages/admin/dashboard"
import { buildAdminPageProps } from "#utils/buildPageProps.ts"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/admin/")({
  component: DashboardPage,
  loader: () => buildAdminPageProps("Dashboard"),
})
