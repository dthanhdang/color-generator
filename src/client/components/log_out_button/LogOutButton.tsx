import { useLocalStorage } from "#client/hooks"
import { logOut } from "#client/rpc/auth"
import { Button } from "@mantine/core"
import { useNavigate } from "@tanstack/react-router"
import React from "react"

export function LogOutButton(): React.JSX.Element {
  const { deleteUser } = useLocalStorage()
  const navigate = useNavigate()

  const handleSignOut = async (): Promise<void> => {
    await navigate({ to: "/" })
    await logOut()
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
