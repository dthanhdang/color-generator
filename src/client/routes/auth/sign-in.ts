import { createFileRoute, Outlet } from "@tanstack/react-router"

export const Route = createFileRoute("/auth/sign-in")({
  component: Outlet,
  loader: () => {
    return { crumb: "Sign-in", seoTitle: "Sign-in" }
  },
})
