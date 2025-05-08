import { buildAdminPageProps } from "#utils/buildPageProps.ts"
import { createFileRoute, Outlet } from "@tanstack/react-router"

export const Route = createFileRoute("/admin/public-palettes")({
  component: Outlet,
  loader: () => buildAdminPageProps("Public palettes", { crumb: "Palettes" }),
})
