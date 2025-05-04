import { useLocalStorage } from "#client/hooks"
import { signOut } from "#client/rpc/auth"
import { Button } from "@mantine/core"
import { useNavigate } from "@tanstack/react-router"
import React from "react"

export function SignOutButton(): React.JSX.Element {
  const { deleteUser } = useLocalStorage()
  const navigate = useNavigate()

  const handleSignOut = async (): Promise<void> => {
    await navigate({ to: "/" })
    await signOut()
    await deleteUser()
  }

  return (
    <Button
      onClick={handleSignOut}
      variant="transparent"
      color="var(--primary-color)"
    >
      Sign out
    </Button>
  )
}
