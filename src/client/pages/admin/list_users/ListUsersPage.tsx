import { PageStyle } from "#components/PageStyle.tsx"
import type { UserSummary } from "#client/types"
import { JSX } from "react"
import { Button, Stack, Text, Title } from "@mantine/core"
import { UsersList } from "./UsersList.tsx"
import { PlusCircle } from "lucide-react"
import { modals } from "@mantine/modals"
import { SignUpForm } from "#components/sign_up_form/SignUpForm.tsx"
import type { SignUpFormData } from "#components/sign_up_form/SignUpForm.tsx"
import { useCreateAdministratorMutation } from "./useCreateAdministratorMutation.ts"

type ListUsersPageProps = {
  users: UserSummary[]
}

export function ListUsersPage({ users }: ListUsersPageProps): JSX.Element {
  const registeredUsers = users.filter(({ role }) => role === "registered_user")
  const administrators = users.filter(({ role }) => role === "administrator")
  const createAdministratorMutation = useCreateAdministratorMutation()

  const handleOpenAddAdministratorForm = (): undefined => {
    const handleSubmit = async (
      formData: SignUpFormData
    ): Promise<undefined> => {
      const output = await createAdministratorMutation.mutateAsync(formData)
      if ("user" in output) modals.closeAll()
    }

    modals.open({
      children: (
        <SignUpForm
          buttonLabel="Create administrator"
          onSubmit={handleSubmit}
        />
      ),
    })
  }

  return (
    <PageStyle title="Users">
      <Stack className="gap-10">
        <Stack className="gap-5">
          <Title order={2}>Administrators</Title>

          <UsersList displayTimeStamps={false} users={administrators} />

          <Button.Group className="ml-auto">
            <Button
              leftSection={<PlusCircle />}
              onClick={handleOpenAddAdministratorForm}
              variant="light"
            >
              Add an administrator
            </Button>
          </Button.Group>
        </Stack>

        <Stack className="gap-5">
          <Title order={2}>Registered users</Title>

          {registeredUsers.length === 0 ? (
            <Text c="dimmed">No user</Text>
          ) : (
            <UsersList users={registeredUsers} />
          )}
        </Stack>
      </Stack>
    </PageStyle>
  )
}
