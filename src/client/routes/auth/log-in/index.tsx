import { getUserFromLocalStorage } from "#client/auth"
import { LogInPage } from "#client/pages/auth/log_in"
import { userRoleSchema } from "#server/schemas"
import { buildAuthPageProps } from "#utils/buildPageProps.ts"
import { createFileRoute, redirect } from "@tanstack/react-router"
import * as v from "valibot"

const searchParametersSchema = v.strictObject({
  email: v.optional(v.string()),
  redirect_to: v.optional(v.pipe(v.string(), v.minLength(1))),
  role: v.optional(userRoleSchema),
})

export const Route = createFileRoute("/auth/log-in/")({
  beforeLoad: () => {
    if (getUserFromLocalStorage("registered_user")) return redirect({ to: "/" })
    else if (getUserFromLocalStorage("administrator"))
      return redirect({ to: "/admin/users" })
  },
  component: PageWrapper,
  loaderDeps: ({ search: { role } }) => ({ role }),
  loader: ({ deps: { role } }) =>
    buildAuthPageProps(
      role === "administrator" ? "Log-in as Administrator" : "Log-in"
    ),
  validateSearch: searchParametersSchema,
})

function PageWrapper(): React.JSX.Element {
  const {
    email,
    redirect_to: redirectTo,
    role = "registered_user",
  } = Route.useSearch()

  return <LogInPage email={email} redirectTo={redirectTo} role={role} />
}
