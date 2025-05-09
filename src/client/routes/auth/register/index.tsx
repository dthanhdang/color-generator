import { getUserFromLocalStorage } from "#client/auth"
import { RegisterPage } from "#client/pages/auth/register"
import { buildAuthPageProps } from "#utils/buildPageProps.ts"
import { createFileRoute, redirect } from "@tanstack/react-router"
import * as v from "valibot"

const searchParametersSchema = v.strictObject({
  email: v.optional(v.string()),
  redirect_to: v.optional(v.pipe(v.string(), v.minLength(1))),
})

export const Route = createFileRoute("/auth/register/")({
  beforeLoad: () => {
    if (getUserFromLocalStorage()) return redirect({ to: "/" })
  },
  component: PageWrapper,
  loader: () => buildAuthPageProps("Register"),
  validateSearch: searchParametersSchema,
})

function PageWrapper(): React.JSX.Element {
  const { email, redirect_to: redirectTo } = Route.useSearch()

  return <RegisterPage email={email} redirectTo={redirectTo} />
}
