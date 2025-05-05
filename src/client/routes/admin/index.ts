import { DashboardPage } from "#client/pages/admin/dashboard"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/admin/")({
  component: DashboardPage,
  loader: () => ({ seoTitle: "Admin" }),
})
