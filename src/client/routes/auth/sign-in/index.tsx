import { getUserFromLocalStorage } from "#client/auth"
import { SignInPage } from "#client/pages/auth/sign_in"
import { userRoleSchema } from "#server/schemas"
import { createFileRoute, redirect } from "@tanstack/react-router"
import * as v from "valibot"

const searchParametersSchema = v.strictObject({
  email: v.optional(v.string()),
  redirect_to: v.optional(v.pipe(v.string(), v.minLength(1))),
  role: v.optional(userRoleSchema),
})

export const Route = createFileRoute("/auth/sign-in/")({
  beforeLoad: () => {
    if (getUserFromLocalStorage("registered_user")) return redirect({ to: "/" })
    else if (getUserFromLocalStorage("administrator"))
      return redirect({ to: "/" /* TODO "/admin" */ })
  },
  component: PageWrapper,
  validateSearch: searchParametersSchema,
})

function PageWrapper(): React.JSX.Element {
  const {
    email,
    redirect_to: redirectTo,
    role = "registered_user",
  } = Route.useSearch()

  return <SignInPage email={email} redirectTo={redirectTo} role={role} />
}
