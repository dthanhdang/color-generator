import { getUserFromLocalStorage } from "#client/auth"
import { SignUpPage } from "#client/pages/auth/sign_up"
import { createFileRoute, redirect } from "@tanstack/react-router"
import * as v from "valibot"

const searchParametersSchema = v.strictObject({
  email: v.optional(v.string()),
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
  const { email, role = "registered_user" } = Route.useSearch()

  return <SignUpPage email={email} role={role} />
}
