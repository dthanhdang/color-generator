import { getUserFromLocalStorage } from "#client/auth"
import { SignUpPage } from "#client/pages/auth/sign_up"
import { createFileRoute, redirect } from "@tanstack/react-router"
import * as v from "valibot"

const searchParametersSchema = v.strictObject({
  email: v.optional(v.string()),
  redirect_to: v.optional(v.pipe(v.string(), v.minLength(1))),
  role: v.optional(v.picklist(["administrator", "registered_user"])),
})

export const Route = createFileRoute("/auth/sign-up/")({
  beforeLoad: () => {
    if (getUserFromLocalStorage("registered_user")) return redirect({ to: "/" })
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

  return <SignUpPage email={email} redirectTo={redirectTo} role={role} />
}
